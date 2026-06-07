"""
OpenAI Provider Implementation

Implements the LLMProvider interface for OpenAI's GPT API.
"""

import os
from typing import List, Dict, Any, Optional
from typing import AsyncIterator

try:
    import openai
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

from .base import (
    LLMProvider,
    Message,
    LLMResponse,
    EmbeddingResponse,
    ToolCall,
    ProviderFactory,
    ProviderType
)


class OpenAIProvider(LLMProvider):
    """
    OpenAI GPT API provider.

    Supports:
    - GPT-4, GPT-4 Turbo, GPT-3.5 Turbo models
    - Function calling
    - Streaming responses
    - Embeddings
    - Vision capabilities (GPT-4 Vision)
    """

    DEFAULT_BASE_URL = "https://api.openai.com/v1"
    DEFAULT_MAX_TOKENS = 4096

    def __init__(
        self,
        api_key: str,
        model: str = "gpt-4-turbo-preview",
        base_url: Optional[str] = None
    ):
        """
        Initialize OpenAI provider.

        Args:
            api_key: OpenAI API key
            model: Model identifier (default: gpt-4-turbo-preview)
            base_url: Optional custom base URL
        """
        super().__init__(api_key, model)

        if not OPENAI_AVAILABLE:
            raise ImportError(
                "openai package is required for OpenAIProvider. "
                "Install it with: pip install openai"
            )

        self.client = openai.AsyncOpenAI(
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
        Generate a chat completion using OpenAI.

        Args:
            messages: Conversation history
            tools: Optional list of function definitions
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            **kwargs: Additional parameters (top_p, frequency_penalty, etc.)

        Returns:
            LLMResponse with generated content
        """
        # Convert messages to OpenAI format
        openai_messages = [msg.to_dict() for msg in messages]

        # Build request parameters
        params = {
            "model": self.model,
            "messages": openai_messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }

        # Add function calling if tools provided
        if tools:
            params["tools"] = tools
            params["tool_choice"] = "auto"

        # Add additional kwargs
        params.update(kwargs)

        try:
            response = await self.client.chat.completions.create(**params)

            message = response.choices[0].message

            # Extract content and tool calls
            content = message.content or ""
            tool_calls = []

            if message.tool_calls:
                for tc in message.tool_calls:
                    tool_calls.append(ToolCall(
                        id=tc.id,
                        name=tc.function.name,
                        arguments=json.loads(tc.function.arguments)
                    ))

            return LLMResponse(
                content=content,
                tool_calls=tool_calls,
                tokens_used=response.usage.total_tokens,
                model=response.model,
                finish_reason=response.choices[0].finish_reason
            )

        except Exception as e:
            self.logger.error(f"OpenAI API error: {e}", exc_info=True)
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
        openai_messages = [msg.to_dict() for msg in messages]

        params = {
            "model": self.model,
            "messages": openai_messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": True,
        }

        if tools:
            params["tools"] = tools
            params["tool_choice"] = "auto"

        params.update(kwargs)

        try:
            stream = await self.client.chat.completions.create(**params)

            async for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content

        except Exception as e:
            self.logger.error(f"OpenAI streaming error: {e}", exc_info=True)
            raise

    async def embed(self, text: str) -> EmbeddingResponse:
        """
        Generate embeddings using OpenAI's embedding models.

        Args:
            text: Text to embed

        Returns:
            EmbeddingResponse with embedding vector
        """
        try:
            response = await self.client.embeddings.create(
                model="text-embedding-3-small",
                input=text
            )

            return EmbeddingResponse(
                embedding=response.data[0].embedding,
                tokens_used=response.usage.total_tokens,
                model=response.model
            )

        except Exception as e:
            self.logger.error(f"OpenAI embedding error: {e}", exc_info=True)
            raise

    def supports_tool_calling(self) -> bool:
        return True

    def supports_streaming(self) -> bool:
        return True

    def supports_embeddings(self) -> bool:
        return True


# Register the provider
ProviderFactory.register(ProviderType.OPENAI, OpenAIProvider)
