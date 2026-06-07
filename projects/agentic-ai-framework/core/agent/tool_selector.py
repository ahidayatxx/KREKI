"""
Tool Selector Module

Provides tool selection, execution, and schema generation capabilities.
"""

from typing import Callable, List, Dict, Any, Optional, get_type_hints
from dataclasses import dataclass
from enum import Enum
import inspect
import logging
import json


class ToolCategory(Enum):
    """Categories of tools."""
    FILE_OPERATIONS = "file_operations"
    API_CALLS = "api_calls"
    DATABASE = "database"
    ANALYSIS = "analysis"
    GENERATION = "generation"
    SYSTEM = "system"


@dataclass
class ToolCall:
    """Represents a tool call."""
    id: str
    name: str
    arguments: Dict[str, Any]
    type: str = "function"


@dataclass
class ToolResult:
    """Result from tool execution."""
    tool_call_id: str
    content: str
    success: bool = True
    metadata: Dict[str, Any] = None
    error: Optional[str] = None

    def __post_init__(self):
        if self.metadata is None:
            self.metadata = {}

    def to_message(self) -> Dict[str, Any]:
        """Convert tool result to message format."""
        return {
            "role": "tool",
            "tool_call_id": self.tool_call_id,
            "content": self.content if self.success else f"Error: {self.error}"
        }


@dataclass
class ToolSchema:
    """Schema definition for a tool."""
    name: str
    description: str
    parameters: Dict[str, Any]
    category: ToolCategory
    function: Callable
    is_destructive: bool = False
    is_read_only: bool = False


class ToolSelector:
    """
    Manages tool selection and execution.

    This class handles:
    - Tool registration and schema generation
    - Tool selection based on context
    - Safe tool execution with error handling
    """

    def __init__(self, tools: Optional[List[Callable]] = None):
        """
        Initialize the tool selector.

        Args:
            tools: Optional list of initial tools
        """
        self.logger = logging.getLogger("tool_selector")
        self._tools: Dict[str, ToolSchema] = {}

        if tools:
            for tool in tools:
                self.add_tool(tool)

    def add_tool(
        self,
        tool: Callable,
        category: Optional[ToolCategory] = None,
        is_destructive: bool = False,
        is_read_only: bool = False,
    ) -> None:
        """
        Add a tool to the available tools.

        Args:
            tool: The tool function
            category: Optional tool category
            is_destructive: Whether the tool makes destructive changes
            is_read_only: Whether the tool is read-only
        """
        name = tool.__name__
        schema = self._generate_tool_schema(
            tool,
            category or self._infer_category(tool),
            is_destructive,
            is_read_only
        )
        self._tools[name] = schema
        self.logger.info(f"Added tool: {name}")

    def remove_tool(self, tool_name: str) -> None:
        """Remove a tool by name."""
        if tool_name in self._tools:
            del self._tools[tool_name]
            self.logger.info(f"Removed tool: {tool_name}")

    async def execute_tool(self, tool_call: ToolCall) -> ToolResult:
        """
        Execute a tool call.

        Args:
            tool_call: The tool call to execute

        Returns:
            ToolResult with execution outcome
        """
        tool_name = tool_call.name

        if tool_name not in self._tools:
            return ToolResult(
                tool_call_id=tool_call.id,
                content="",
                success=False,
                error=f"Tool '{tool_name}' not found"
            )

        tool_schema = self._tools[tool_name]

        try:
            # Execute the tool
            result = await self._execute_tool_function(
                tool_schema.function,
                tool_call.arguments
            )

            # Convert result to string
            if isinstance(result, str):
                content = result
            elif isinstance(result, dict):
                content = json.dumps(result, indent=2)
            else:
                content = str(result)

            self.logger.debug(f"Tool {tool_name} executed successfully")
            return ToolResult(
                tool_call_id=tool_call.id,
                content=content,
                success=True,
                metadata={"tool_name": tool_name}
            )

        except Exception as e:
            self.logger.error(f"Tool {tool_name} execution failed: {e}", exc_info=True)
            return ToolResult(
                tool_call_id=tool_call.id,
                content="",
                success=False,
                error=str(e)
            )

    async def _execute_tool_function(
        self,
        func: Callable,
        arguments: Dict[str, Any]
    ) -> Any:
        """Execute the tool function with arguments."""
        # Check if function is async
        if inspect.iscoroutinefunction(func):
            return await func(**arguments)
        else:
            return func(**arguments)

    def get_tool_schemas(self) -> List[Dict[str, Any]]:
        """
        Get tool schemas in the format expected by LLM providers.

        Returns:
            List of tool schema dictionaries
        """
        return [
            {
                "type": "function",
                "function": {
                    "name": schema.name,
                    "description": schema.description,
                    "parameters": schema.parameters
                }
            }
            for schema in self._tools.values()
        ]

    async def get_tools_description(self) -> str:
        """Get a human-readable description of available tools."""
        descriptions = []
        for name, schema in self._tools.items():
            desc = f"- **{name}**: {schema.description}"
            if schema.is_destructive:
                desc += " (⚠️ Destructive)"
            elif schema.is_read_only:
                desc += " (📖 Read-only)"
            descriptions.append(desc)
        return "\n".join(descriptions)

    def _generate_tool_schema(
        self,
        tool: Callable,
        category: ToolCategory,
        is_destructive: bool,
        is_read_only: bool
    ) -> ToolSchema:
        """Generate a tool schema from a function."""
        name = tool.__name__
        docstring = inspect.getdoc(tool) or f"Execute {name}"

        # Get function signature
        sig = inspect.signature(tool)
        parameters = self._build_parameters_schema(sig)

        return ToolSchema(
            name=name,
            description=docstring,
            parameters=parameters,
            category=category,
            function=tool,
            is_destructive=is_destructive,
            is_read_only=is_read_only
        )

    def _build_parameters_schema(self, signature: inspect.Signature) -> Dict[str, Any]:
        """Build JSON schema for function parameters."""
        properties = {}
        required = []

        for param_name, param in signature.parameters.items():
            # Skip self parameter
            if param_name == "self":
                continue

            param_type = self._get_parameter_type(param)
            properties[param_name] = {
                "type": param_type,
                "description": f"Parameter {param_name}"
            }

            if param.default == param.empty:
                required.append(param_name)

        return {
            "type": "object",
            "properties": properties,
            "required": required
        }

    def _get_parameter_type(self, param: inspect.Parameter) -> str:
        """Map Python type to JSON schema type."""
        annotation = param.annotation

        if annotation == param.empty:
            return "string"

        type_map = {
            str: "string",
            int: "integer",
            float: "number",
            bool: "boolean",
            list: "array",
            dict: "object",
        }

        return type_map.get(annotation, "string")

    def _infer_category(self, tool: Callable) -> ToolCategory:
        """Infer tool category from function name and docstring."""
        name = tool.__name__.lower()
        docstring = inspect.getdoc(tool) or ""

        if any(x in name for x in ["file", "read", "write", "save", "load"]):
            return ToolCategory.FILE_OPERATIONS
        elif any(x in name for x in ["api", "fetch", "request", "call"]):
            return ToolCategory.API_CALLS
        elif any(x in name for x in ["db", "database", "query", "sql"]):
            return ToolCategory.DATABASE
        elif any(x in name for x in ["analyze", "parse", "extract", "compute"]):
            return ToolCategory.ANALYSIS
        elif any(x in name for x in ["generate", "create", "write", "build"]):
            return ToolCategory.GENERATION
        else:
            return ToolCategory.SYSTEM
