"""
LLM Provider Abstraction Layer

Provides a unified interface for different LLM providers including
Claude (Anthropic), OpenAI (GPT), and Google (Gemini).
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional, Union
from dataclasses import dataclass, field
from enum import Enum
import logging


class ProviderType(Enum):
    """Supported LLM providers."""
    CLAUDE = "claude"
    OPENAI = "openai"
    GEMINI = "gemini"
    CUSTOM = "custom"


@dataclass
class Message:
    """A message in a conversation."""
    role: str  # "system", "user", "assistant", "tool"
    content: str
    tool_calls: List['ToolCall'] = field(default_factory=list)
    tool_call_id: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary format."""
        result = {"role": self.role, "content": self.content}
        if self.tool_calls:
            result["tool_calls"] = [tc.to_dict() for tc in self.tool_calls]
        if self.tool_call_id:
            result["tool_call_id"] = self.tool_call_id
        return result


@dataclass
class ToolCall:
    """A tool call requested by the LLM."""
    id: str
    name: str
    arguments: Dict[str, Any]
    type: str = "function"

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary format."""
        return {
            "id": self.id,
            "type": self.type,
            "function": {
                "name": self.name,
                "arguments": self.arguments
            }
        }


@dataclass
class LLMResponse:
    """Response from an LLM provider."""
    content: str
    tool_calls: List[ToolCall] = field(default_factory=list)
    tokens_used: int = 0
    model: str = ""
    finish_reason: str = ""
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_message(self) -> Message:
        """Convert to Message format."""
        return Message(
            role="assistant",
            content=self.content,
            tool_calls=self.tool_calls
        )


@dataclass
class EmbeddingResponse:
    """Response from an embedding model."""
    embedding: List[float]
    tokens_used: int = 0
    model: str = ""


class LLMProvider(ABC):
    """
    Abstract base class for LLM providers.

    This defines the common interface that all providers must implement,
    allowing applications to switch between providers without code changes.
    """

    def __init__(self, api_key: str, model: str):
        """
        Initialize the provider.

        Args:
            api_key: API key for authentication
            model: Model identifier to use
        """
        self.api_key = api_key
        self.model = model
        self.logger = logging.getLogger(f"provider.{self.__class__.__name__}")
        self.name = self.__class__.__name__.replace("Provider", "").lower()

    @abstractmethod
    async def chat_completion(
        self,
        messages: List[Message],
        tools: Optional[List[Dict[str, Any]]] = None,
        temperature: float = 0.7,
        max_tokens: int = 4096,
        **kwargs
    ) -> LLMResponse:
        """
        Generate a chat completion.

        Args:
            messages: Conversation history
            tools: Optional list of available tools
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            **kwargs: Additional provider-specific parameters

        Returns:
            LLMResponse with generated content and tool calls
        """
        pass

    @abstractmethod
    async def stream_completion(
        self,
        messages: List[Message],
        tools: Optional[List[Dict[str, Any]]] = None,
        temperature: float = 0.7,
        max_tokens: int = 4096,
        **kwargs
    ):
        """
        Generate a streaming chat completion.

        Args:
            messages: Conversation history
            tools: Optional list of available tools
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            **kwargs: Additional provider-specific parameters

        Yields:
            Chunks of the generated content
        """
        pass

    @abstractmethod
    async def embed(self, text: str) -> EmbeddingResponse:
        """
        Generate embeddings for text.

        Args:
            text: Text to embed

        Returns:
            EmbeddingResponse with embedding vector
        """
        pass

    def supports_tool_calling(self) -> bool:
        """Check if provider supports tool calling."""
        return True

    def supports_streaming(self) -> bool:
        """Check if provider supports streaming."""
        return True

    def supports_embeddings(self) -> bool:
        """Check if provider supports embeddings."""
        return True


class ProviderFactory:
    """Factory for creating LLM provider instances."""

    _providers: Dict[ProviderType, type] = {}

    @classmethod
    def register(cls, provider_type: ProviderType, provider_class: type):
        """Register a provider class."""
        cls._providers[provider_type] = provider_class

    @classmethod
    def create(
        cls,
        provider_type: ProviderType,
        api_key: str,
        model: str,
        **kwargs
    ) -> LLMProvider:
        """
        Create a provider instance.

        Args:
            provider_type: Type of provider to create
            api_key: API key for authentication
            model: Model identifier
            **kwargs: Additional provider-specific parameters

        Returns:
            LLMProvider instance
        """
        provider_class = cls._providers.get(provider_type)
        if not provider_class:
            raise ValueError(f"Unknown provider type: {provider_type}")
        return provider_class(api_key, model, **kwargs)

    @classmethod
    def from_config(cls, config: Dict[str, Any]) -> LLMProvider:
        """
        Create a provider from configuration dictionary.

        Args:
            config: Configuration with 'type', 'api_key', 'model', etc.

        Returns:
            LLMProvider instance
        """
        provider_type = ProviderType(config["type"])
        return cls.create(
            provider_type=provider_type,
            api_key=config["api_key"],
            model=config["model"],
            **{k: v for k, v in config.items() if k not in ["type", "api_key", "model"]}
        )
