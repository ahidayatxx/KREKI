"""
MCP (Model Context Protocol) Client

Provides client capabilities for interacting with MCP servers,
enabling agents to use tools provided by MCP servers.
"""

import asyncio
import json
from typing import Any, Dict, List, Optional, Callable
from dataclasses import dataclass, field
from enum import Enum
import logging
import subprocess
from pathlib import Path


class MCPTransportType(Enum):
    """Types of MCP transport."""
    STDIO = "stdio"
    SSE = "sse"
    WEBSOCKET = "websocket"


@dataclass
class MCPServerConfig:
    """Configuration for an MCP server."""
    name: str
    command: str
    args: List[str]
    env: Dict[str, str] = field(default_factory=dict)
    transport: MCPTransportType = MCPTransportType.STDIO
    timeout: int = 30


@dataclass
class MCPTool:
    """A tool provided by an MCP server."""
    name: str
    description: str
    input_schema: Dict[str, Any]
    server_name: str


@dataclass
class MCPResource:
    """A resource provided by an MCP server."""
    uri: str
    name: str
    description: str
    mime_type: Optional[str] = None


@dataclass
class MCPToolResult:
    """Result from executing an MCP tool."""
    content: List[Dict[str, Any]]
    is_error: bool = False
    meta: Dict[str, Any] = field(default_factory=dict)


class MCPClient:
    """
    Client for interacting with MCP servers.

    This client handles:
    - Server process management
    - JSON-RPC communication
    - Tool discovery and execution
    - Resource access
    """

    def __init__(self, config: MCPServerConfig):
        """
        Initialize the MCP client.

        Args:
            config: Server configuration
        """
        self.config = config
        self.logger = logging.getLogger(f"mcp.{config.name}")
        self._process: Optional[asyncio.subprocess.Process] = None
        self._request_id = 0
        self._tools: Dict[str, MCPTool] = {}
        self._resources: Dict[str, MCPResource] = {}

    async def start(self) -> None:
        """Start the MCP server process."""
        if self._process:
            self.logger.warning("Server already started")
            return

        self.logger.info(f"Starting MCP server: {self.config.name}")

        try:
            self._process = await asyncio.create_subprocess_exec(
                self.config.command,
                *self.config.args,
                stdin=asyncio.subprocess.PIPE,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                env=self.config.env
            )

            # Initialize connection
            await self._initialize()

            # Discover tools and resources
            await self._discover_capabilities()

        except Exception as e:
            self.logger.error(f"Failed to start MCP server: {e}", exc_info=True)
            await self.stop()
            raise

    async def stop(self) -> None:
        """Stop the MCP server process."""
        if not self._process:
            return

        self.logger.info(f"Stopping MCP server: {self.config.name}")

        try:
            self._process.terminate()
            await self._process.wait(timeout=5)
        except asyncio.TimeoutError:
            self._process.kill()
            await self._process.wait()
        except Exception as e:
            self.logger.error(f"Error stopping server: {e}")

        self._process = None

    async def _initialize(self) -> None:
        """Initialize the MCP connection."""
        request = {
            "jsonrpc": "2.0",
            "id": self._next_id(),
            "method": "initialize",
            "params": {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {},
                    "resources": {}
                },
                "clientInfo": {
                    "name": "agentic-ai-framework",
                    "version": "1.0.0"
                }
            }
        }

        response = await self._send_request(request)
        if response.get("error"):
            raise Exception(f"Initialization failed: {response['error']}")

        # Send initialized notification
        notification = {
            "jsonrpc": "2.0",
            "method": "notifications/initialized"
        }
        await self._send_notification(notification)

    async def _discover_capabilities(self) -> None:
        """Discover available tools and resources."""
        # List tools
        tools_request = {
            "jsonrpc": "2.0",
            "id": self._next_id(),
            "method": "tools/list",
            "params": {}
        }

        response = await self._send_request(tools_request)
        tools = response.get("result", {}).get("tools", [])

        for tool in tools:
            mcp_tool = MCPTool(
                name=tool["name"],
                description=tool.get("description", ""),
                input_schema=tool.get("inputSchema", {}),
                server_name=self.config.name
            )
            self._tools[f"{self.config.name}.{mcp_tool.name}"] = mcp_tool

        self.logger.info(f"Discovered {len(tools)} tools from {self.config.name}")

        # List resources
        resources_request = {
            "jsonrpc": "2.0",
            "id": self._next_id(),
            "method": "resources/list",
            "params": {}
        }

        response = await self._send_request(resources_request)
        resources = response.get("result", {}).get("resources", [])

        for resource in resources:
            mcp_resource = MCPResource(
                uri=resource["uri"],
                name=resource.get("name", ""),
                description=resource.get("description", ""),
                mime_type=resource.get("mimeType")
            )
            self._resources[mcp_resource.uri] = mcp_resource

        self.logger.info(f"Discovered {len(resources)} resources from {self.config.name}")

    async def call_tool(
        self,
        tool_name: str,
        arguments: Dict[str, Any]
    ) -> MCPToolResult:
        """
        Call a tool on the MCP server.

        Args:
            tool_name: Name of the tool (can include server prefix)
            arguments: Tool arguments

        Returns:
            MCPToolResult with the tool output
        """
        # Strip server prefix if present
        base_name = tool_name.split(".")[-1]

        request = {
            "jsonrpc": "2.0",
            "id": self._next_id(),
            "method": "tools/call",
            "params": {
                "name": base_name,
                "arguments": arguments
            }
        }

        try:
            response = await self._send_request(request)

            if "error" in response:
                return MCPToolResult(
                    content=[{"type": "text", "text": str(response["error"])}],
                    is_error=True
                )

            result = response.get("result", {})
            content = result.get("content", [])

            return MCPToolResult(
                content=content,
                is_error=False,
                meta=result.get("meta", {})
            )

        except Exception as e:
            self.logger.error(f"Tool call failed: {e}", exc_info=True)
            return MCPToolResult(
                content=[{"type": "text", "text": str(e)}],
                is_error=True
            )

    async def read_resource(self, uri: str) -> str:
        """
        Read a resource from the MCP server.

        Args:
            uri: Resource URI

        Returns:
            Resource content as string
        """
        request = {
            "jsonrpc": "2.0",
            "id": self._next_id(),
            "method": "resources/read",
            "params": {"uri": uri}
        }

        response = await self._send_request(request)

        if "error" in response:
            raise Exception(f"Resource read failed: {response['error']}")

        contents = response.get("result", {}).get("contents", [])
        if not contents:
            return ""

        # Handle different content types
        for content in contents:
            if "text" in content:
                return content["text"]
            elif "blob" in content:
                # Handle binary content
                import base64
                return base64.b64decode(content["blob"]).decode("utf-8")

        return ""

    def get_tools(self) -> Dict[str, MCPTool]:
        """Get all available tools from this server."""
        return self._tools.copy()

    def get_resources(self) -> Dict[str, MCPResource]:
        """Get all available resources from this server."""
        return self._resources.copy()

    async def _send_request(self, request: Dict[str, Any]) -> Dict[str, Any]:
        """Send a JSON-RPC request and wait for response."""
        if not self._process or not self._process.stdin:
            raise Exception("Server not started")

        # Send request
        message = json.dumps(request) + "\n"
        self._process.stdin.write(message.encode())
        await self._process.stdin.drain()

        # Read response
        response_line = await self._process.stdout.readline()
        if not response_line:
            raise Exception("No response from server")

        return json.loads(response_line.decode())

    async def _send_notification(self, notification: Dict[str, Any]) -> None:
        """Send a JSON-RPC notification (no response expected)."""
        if not self._process or not self._process.stdin:
            raise Exception("Server not started")

        message = json.dumps(notification) + "\n"
        self._process.stdin.write(message.encode())
        await self._process.stdin.drain()

    def _next_id(self) -> int:
        """Get next request ID."""
        self._request_id += 1
        return self._request_id

    async def __aenter__(self):
        """Async context manager entry."""
        await self.start()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit."""
        await self.stop()


class MCPClientManager:
    """
    Manages multiple MCP server clients.
    """

    def __init__(self):
        self._clients: Dict[str, MCPClient] = {}
        self.logger = logging.getLogger("mcp_manager")

    async def add_server(self, config: MCPServerConfig) -> MCPClient:
        """
        Add and start an MCP server.

        Args:
            config: Server configuration

        Returns:
            MCPClient instance
        """
        if config.name in self._clients:
            self.logger.warning(f"Server {config.name} already exists")
            return self._clients[config.name]

        client = MCPClient(config)
        await client.start()
        self._clients[config.name] = client
        return client

    async def remove_server(self, name: str) -> None:
        """Remove and stop an MCP server."""
        if name in self._clients:
            await self._clients[name].stop()
            del self._clients[name]

    def get_client(self, name: str) -> Optional[MCPClient]:
        """Get a client by name."""
        return self._clients.get(name)

    def get_all_tools(self) -> Dict[str, MCPTool]:
        """Get all tools from all servers."""
        all_tools = {}
        for client in self._clients.values():
            all_tools.update(client.get_tools())
        return all_tools

    async def shutdown(self) -> None:
        """Shutdown all servers."""
        for name, client in list(self._clients.items()):
            await client.stop()
        self._clients.clear()
