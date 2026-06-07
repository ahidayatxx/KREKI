"""
Base Agent Implementation

Provides the core agent class that orchestrates reasoning,
memory management, and tool selection for agentic AI systems.
"""

from typing import Any, Dict, List, Optional, Union, Callable
from dataclasses import dataclass, field
from enum import Enum
import logging
import time

from ..providers.base import LLMProvider, Message, ToolCall
from .reasoning_engine import ReasoningEngine, ThoughtStep
from .memory_manager import MemoryManager, MemoryType
from .tool_selector import ToolSelector, ToolResult


class AgentState(Enum):
    """Represents the current state of an agent."""
    IDLE = "idle"
    THINKING = "thinking"
    ACTING = "acting"
    WAITING = "waiting"
    DONE = "done"
    ERROR = "error"


@dataclass
class AgentConfig:
    """Configuration for an agent instance."""
    name: str
    description: str
    system_prompt: str
    provider: LLMProvider
    model: str
    temperature: float = 0.7
    max_tokens: int = 4096
    enable_reasoning: bool = True
    enable_memory: bool = True
    enable_tools: bool = True
    max_iterations: int = 10
    timeout_seconds: int = 300


@dataclass
class AgentResponse:
    """Response from an agent."""
    content: str
    tool_calls: List[ToolCall] = field(default_factory=list)
    reasoning_steps: List[ThoughtStep] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)
    tokens_used: int = 0
    duration_ms: float = 0.0
    success: bool = True
    error_message: Optional[str] = None


class BaseAgent:
    """
    Base agent class that provides the foundation for agentic AI systems.

    The agent orchestrates three core capabilities:
    1. Reasoning: Breaking down problems and planning actions
    2. Memory: Storing and retrieving context and knowledge
    3. Tool Use: Selecting and executing tools to take actions
    """

    def __init__(
        self,
        config: AgentConfig,
        tools: Optional[List[Callable]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        """
        Initialize the agent.

        Args:
            config: Agent configuration
            tools: Optional list of available tools
            context: Optional initial context/knowledge
        """
        self.config = config
        self.state = AgentState.IDLE
        self._tools = tools or []
        self._context = context or {}

        # Initialize core components
        self._reasoning_engine = ReasoningEngine() if config.enable_reasoning else None
        self._memory_manager = MemoryManager() if config.enable_memory else None
        self._tool_selector = ToolSelector(self._tools) if config.enable_tools else None

        self.logger = logging.getLogger(f"agent.{config.name}")

    @property
    def state(self) -> AgentState:
        """Get the current agent state."""
        return self._state

    @state.setter
    def state(self, value: AgentState):
        """Set the agent state."""
        self._state = value
        self.logger.debug(f"Agent state: {value.value}")

    async def run(
        self,
        input_text: str,
        session_id: Optional[str] = None,
        **kwargs
    ) -> AgentResponse:
        """
        Run the agent on the given input.

        Args:
            input_text: The user input or task description
            session_id: Optional session identifier for memory persistence
            **kwargs: Additional parameters for the run

        Returns:
            AgentResponse with the result
        """
        start_time = time.time()
        self.state = AgentState.THINKING

        try:
            # Load session context if memory is enabled
            if self._memory_manager and session_id:
                session_context = await self._memory_manager.load_session(session_id)
                self._context.update(session_context)

            # Build message history
            messages = await self._build_messages(input_text, session_id)

            # Run the agent loop
            response = await self._agent_loop(messages, **kwargs)

            # Store interaction in memory
            if self._memory_manager and session_id:
                await self._memory_manager.store_interaction(
                    session_id,
                    input_text,
                    response.content,
                    response.metadata
                )

            response.duration_ms = (time.time() - start_time) * 1000
            self.state = AgentState.DONE
            return response

        except Exception as e:
            self.logger.error(f"Agent error: {e}", exc_info=True)
            self.state = AgentState.ERROR
            return AgentResponse(
                content="",
                success=False,
                error_message=str(e),
                duration_ms=(time.time() - start_time) * 1000
            )

    async def _agent_loop(
        self,
        messages: List[Message],
        **kwargs
    ) -> AgentResponse:
        """
        Execute the main agent loop: think → act → observe → repeat.

        Args:
            messages: Message history
            **kwargs: Additional parameters

        Returns:
            Final AgentResponse
        """
        reasoning_steps = []
        all_tool_calls = []
        iteration = 0

        while iteration < self.config.max_iterations:
            iteration += 1
            self.logger.debug(f"Agent loop iteration {iteration}")

            # Generate response with tool calls
            llm_response = await self.config.provider.chat_completion(
                messages=messages,
                tools=self._tool_selector.get_tool_schemas() if self._tool_selector else None,
                temperature=self.config.temperature,
                max_tokens=self.config.max_tokens,
            )

            # Extract reasoning if available
            if self._reasoning_engine:
                steps = await self._reasoning_engine.extract_reasoning(llm_response.content)
                reasoning_steps.extend(steps)

            # Check if tool calls were made
            if llm_response.tool_calls:
                self.state = AgentState.ACTING
                all_tool_calls.extend(llm_response.tool_calls)

                # Execute tool calls
                tool_results = await self._execute_tools(llm_response.tool_calls)

                # Add tool results to messages
                messages.append(llm_response.to_message())
                for result in tool_results:
                    messages.append(result.to_message())

                # Continue loop
                continue

            # No more tool calls, we're done
            response = AgentResponse(
                content=llm_response.content,
                tool_calls=all_tool_calls,
                reasoning_steps=reasoning_steps,
                tokens_used=llm_response.tokens_used,
                metadata={
                    "iterations": iteration,
                    "provider": self.config.provider.name,
                    "model": self.config.model,
                }
            )

            return response

        # Max iterations reached
        return AgentResponse(
            content="Maximum iterations reached. Agent may need more iterations to complete the task.",
            tool_calls=all_tool_calls,
            reasoning_steps=reasoning_steps,
            success=False,
            error_message="Max iterations exceeded"
        )

    async def _build_messages(
        self,
        input_text: str,
        session_id: Optional[str] = None
    ) -> List[Message]:
        """Build the message history for the LLM call."""
        messages = []

        # System message
        system_message = await self._build_system_prompt()
        messages.append(Message(role="system", content=system_message))

        # Load conversation history if available
        if self._memory_manager and session_id:
            history = await self._memory_manager.get_conversation_history(session_id)
            messages.extend(history)

        # User input
        messages.append(Message(role="user", content=input_text))

        return messages

    async def _build_system_prompt(self) -> str:
        """Build the system prompt with context and instructions."""
        prompt_parts = [self.config.system_prompt]

        # Add context information
        if self._context:
            context_str = "\n\n## Context\n" + "\n".join(
                f"- {k}: {v}" for k, v in self._context.items()
            )
            prompt_parts.append(context_str)

        # Add tool information
        if self._tool_selector:
            tools_info = await self._tool_selector.get_tools_description()
            if tools_info:
                prompt_parts.append(f"\n\n## Available Tools\n{tools_info}")

        return "\n".join(prompt_parts)

    async def _execute_tools(self, tool_calls: List[ToolCall]) -> List[ToolResult]:
        """Execute a list of tool calls."""
        results = []

        for tool_call in tool_calls:
            if not self._tool_selector:
                results.append(ToolResult(
                    tool_call_id=tool_call.id,
                    content="Tool execution not enabled",
                    success=False
                ))
                continue

            result = await self._tool_selector.execute_tool(tool_call)
            results.append(result)

        return results

    def add_tool(self, tool: Callable) -> None:
        """Add a tool to the agent's available tools."""
        self._tools.append(tool)
        if self._tool_selector:
            self._tool_selector.add_tool(tool)

    def remove_tool(self, tool_name: str) -> None:
        """Remove a tool by name."""
        self._tools = [t for t in self._tools if getattr(t, "__name__", "") != tool_name]
        if self._tool_selector:
            self._tool_selector.remove_tool(tool_name)

    def update_context(self, context: Dict[str, Any]) -> None:
        """Update the agent's context."""
        self._context.update(context)

    def clear_context(self) -> None:
        """Clear all context."""
        self._context.clear()

    async def cleanup(self, session_id: Optional[str] = None) -> None:
        """Clean up resources. Call this when done with the agent."""
        if self._memory_manager and session_id:
            await self._memory_manager.close_session(session_id)
        self.state = AgentState.IDLE
