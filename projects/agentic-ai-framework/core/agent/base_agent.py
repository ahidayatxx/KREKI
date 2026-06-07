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

# Import from sibling modules
from ..providers.base import LLMProvider, Message, ToolCall


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
    reasoning_steps: List[str] = field(default_factory=list)
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
        self._state = AgentState.IDLE
        self._tools = tools or []
        self._context = context or {}
        self._reasoning_engine = None
        self._memory_manager = None
        self._tool_selector = None

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
            # Build message history
            messages = await self._build_messages(input_text, session_id)

            # Run the agent loop
            response = await self._agent_loop(messages, **kwargs)

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
        """Execute the main agent loop: think → act → observe → repeat."""
        reasoning_steps = []
        all_tool_calls = []
        iteration = 0

        while iteration < self.config.max_iterations:
            iteration += 1

            # Generate response with tool calls
            llm_response = await self.config.provider.chat_completion(
                messages=messages,
                tools=None,  # Tools will be added by tool_selector
                temperature=self.config.temperature,
                max_tokens=self.config.max_tokens,
            )

            # Check if tool calls were made (simplified for now)
            if hasattr(llm_response, 'tool_calls') and llm_response.tool_calls:
                self.state = AgentState.ACTING
                all_tool_calls.extend(llm_response.tool_calls)
                # Continue loop after tool execution
                continue

            # No more tool calls, we're done
            return AgentResponse(
                content=llm_response.content,
                tool_calls=all_tool_calls,
                reasoning_steps=reasoning_steps,
                tokens_used=getattr(llm_response, 'tokens_used', 0),
                metadata={
                    "iterations": iteration,
                    "provider": self.config.provider.name,
                    "model": self.config.model,
                }
            )

        # Max iterations reached
        return AgentResponse(
            content="Maximum iterations reached.",
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
        messages = [
            Message(role="system", content=self.config.system_prompt),
            Message(role="user", content=input_text)
        ]
        return messages

    def add_tool(self, tool: Callable) -> None:
        """Add a tool to the agent's available tools."""
        self._tools.append(tool)

    def update_context(self, context: Dict[str, Any]) -> None:
        """Update the agent's context."""
        self._context.update(context)

    def clear_context(self) -> None:
        """Clear all context."""
        self._context.clear()
