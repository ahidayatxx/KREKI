"""
Claude (Anthropic) Provider Implementation

Implements the LLMProvider interface for Anthropic's Claude API.
"""

import os
import json
from typing import List, Dict, Any, Optional
from typing import AsyncIterator

try:
    import anthropic
    ANTHROPIC_AVAILABLE = True
except ImportError:
    ANTHROPIC_AVAILABLE = False

from .base import (
    LLMProvider,
    Message,
    LLMResponse,
    EmbeddingResponse,
    ToolCall,
    ProviderFactory,
    ProviderType
)


class ClaudeProvider(LLMProvider):
    """
    Anthropic Claude API provider.

    Supports:
    - Claude 3 Opus, Sonnet, Haiku models
    - Tool calling
    - Streaming responses
    - Vision capabilities (images in messages)
    """

    DEFAULT_BASE_URL = "https://api.anthropic.com"
    DEFAULT_MAX_TOKENS = 4096

    def __init__(self, api_key: str, model: str = "claude-3-opus-20240229", base_url: Optional[str] = None):
        """
        Initialize Claude provider.

        Args:
            api_key: Anthropic API key
            model: Model identifier (default: claude-3-opus-20240229)
            base_url: Optional custom base URL
        """
        super().__init__(api_key, model)

        if not ANTHROPIC_AVAILABLE:
            raise ImportError(
                "anthropic package is required for ClaudeProvider. "
                "Install it with: pip install anthropic"
            )

        self.client = anthropic.AsyncAnthropic(
            api_key=api_key,
            base_url=base_url or self.DEFAULT_BASE_URL
        )

    async def chat_completion(
        self,
        messages: List[Message],
        tools: Optional[List[Dict[str, Any]]] = None,
        temperature: float = 0.7,
        max_tokens: int = 4096,
        **kwargs
    ) -> LLMResponse:
        """
        Generate a chat completion using Claude.

        Args:
            messages: Conversation history
            tools: Optional list of tool definitions
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            **kwargs: Additional parameters (top_k, top_p, etc.)

        Returns:
            LLMResponse with generated content
        """
        # Convert messages to Claude format
        system_message = None
        claude_messages = []

        for msg in messages:
            if msg.role == "system":
                system_message = msg.content
            else:
                claude_messages.append({
                    "role": msg.role,
                    "content": msg.content
                })

        # Build request parameters
        params = {
            "model": self.model,
            "messages": claude_messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
        }

        if system_message:
            params["system"] = system_message

        if tools:
            params["tools"] = tools

        # Add additional kwargs
        params.update(kwargs)

        try:
            response = await self.client.messages.create(**params)

            # Extract content and tool calls
            content = ""
            tool_calls = []

            for block in response.content:
                if block.type == "text":
                    content += block.text
                elif block.type == "tool_use":
                    tool_calls.append(ToolCall(
                        id=block.id,
                        name=block.name,
                        arguments=block.input
                    ))

            return LLMResponse(
                content=content,
                tool_calls=tool_calls,
                tokens_used=response.usage.input_tokens + response.usage.output_tokens,
                model=response.model,
                finish_reason=response.stop_reason
            )

        except Exception as e:
            self.logger.error(f"Claude API error: {e}", exc_info=True)
            raise

    async def stream_completion(
        self,
        messages: List[Message],
        tools: Optional[List[Dict[str, Any]]] = None,
        temperature: float = 0.7,
        max_tokens: int = 4096,
        **kwargs
    ) -> AsyncIterator[str]:
        """
        Generate a streaming chat completion.

        Yields chunks of content as they are generated.
        """
        # Convert messages to Claude format
        system_message = None
        claude_messages = []

        for msg in messages:
            if msg.role == "system":
                system_message = msg.content
            else:
                claude_messages.append({
                    "role": msg.role,
                    "content": msg.content
                })

        params = {
            "model": self.model,
            "messages": claude_messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
        }

        if system_message:
            params["system"] = system_message

        if tools:
            params["tools"] = tools

        params.update(kwargs)

        try:
            async with self.client.messages.stream(**params) as stream:
                async for text in stream.text_stream:
                    yield text

        except Exception as e:
            self.logger.error(f"Claude streaming error: {e}", exc_info=True)
            raise

    async def embed(self, text: str) -> EmbeddingResponse:
        """
        Generate embeddings using Claude.

        Note: Claude doesn't have a native embedding API.
        This method uses a placeholder implementation.
        In production, you would use a dedicated embedding service.
        """
        # Claude doesn't provide embeddings, so we raise an error
        raise NotImplementedError(
            "Claude does not provide native embeddings. "
            "Use a dedicated embedding provider like OpenAI or Cohere."
        )

    def supports_tool_calling(self) -> bool:
        return True

    def supports_streaming(self) -> bool:
        return True

    def supports_embeddings(self) -> bool:
        return False


# Register the provider
ProviderFactory.register(ProviderType.CLAUDE, ClaudeProvider)
