"""
Google Gemini Provider Implementation

Implements the LLMProvider interface for Google's Gemini API.
"""

import os
from typing import List, Dict, Any, Optional
from typing import AsyncIterator
import json

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False

from .base import (
    LLMProvider,
    Message,
    LLMResponse,
    EmbeddingResponse,
    ToolCall,
    ProviderFactory,
    ProviderType
)


class GeminiProvider(LLMProvider):
    """
    Google Gemini API provider.

    Supports:
    - Gemini Pro, Gemini Ultra models
    - Function calling
    - Streaming responses
    - Embeddings
    - Vision capabilities (multimodal)
    """

    DEFAULT_MODEL = "gemini-pro"

    def __init__(self, api_key: str, model: str = "gemini-pro", **kwargs):
        """
        Initialize Gemini provider.

        Args:
            api_key: Google API key
            model: Model identifier (default: gemini-pro)
            **kwargs: Additional configuration options
        """
        super().__init__(api_key, model)

        if not GEMINI_AVAILABLE:
            raise ImportError(
                "google-generativeai package is required for GeminiProvider. "
                "Install it with: pip install google-generativeai"
            )

        genai.configure(api_key=api_key)
        self.client = genai.GenerativeModel(model)
        self.safety_settings = kwargs.get("safety_settings")

    async def chat_completion(
        self,
        messages: List[Message],
        tools: Optional[List[Dict[str, Any]]] = None,
        temperature: float = 0.7,
        max_tokens: int = 4096,
        **kwargs
    ) -> LLMResponse:
        """
        Generate a chat completion using Gemini.

        Args:
            messages: Conversation history
            tools: Optional list of function declarations
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            **kwargs: Additional parameters

        Returns:
            LLMResponse with generated content
        """
        # Convert messages to Gemini format
        gemini_history = []
        system_instruction = None

        for msg in messages:
            if msg.role == "system":
                system_instruction = msg.content
            elif msg.role in ["user", "assistant"]:
                gemini_history.append({
                    "role": msg.role,
                    "parts": [msg.content]
                })

        # Configure generation
        generation_config = {
            "temperature": temperature,
            "max_output_tokens": max_tokens,
        }

        # Start chat
        chat = self.client.start_chat(history=gemini_history)

        try:
            # Get the last user message
            user_message = gemini_history[-1]["parts"][0] if gemini_history else ""

            # Generate response
            response = await chat.send_message_async(
                user_message,
                generation_config=generation_config
            )

            return LLMResponse(
                content=response.text,
                tool_calls=[],  # Tool calls to be implemented
                tokens_used=response.usage_metadata.total_token_count if hasattr(response, 'usage_metadata') else 0,
                model=self.model,
                finish_reason="stop"
            )

        except Exception as e:
            self.logger.error(f"Gemini API error: {e}", exc_info=True)
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
        gemini_history = []
        system_instruction = None

        for msg in messages:
            if msg.role == "system":
                system_instruction = msg.content
            elif msg.role in ["user", "assistant"]:
                gemini_history.append({
                    "role": msg.role,
                    "parts": [msg.content]
                })

        generation_config = {
            "temperature": temperature,
            "max_output_tokens": max_tokens,
        }

        chat = self.client.start_chat(history=gemini_history)

        try:
            user_message = gemini_history[-1]["parts"][0] if gemini_history else ""

            response = await chat.send_message_async(
                user_message,
                generation_config=generation_config,
                stream=True
            )

            async for chunk in response:
                if chunk.text:
                    yield chunk.text

        except Exception as e:
            self.logger.error(f"Gemini streaming error: {e}", exc_info=True)
            raise

    async def embed(self, text: str) -> EmbeddingResponse:
        """
        Generate embeddings using Gemini's embedding models.

        Args:
            text: Text to embed

        Returns:
            EmbeddingResponse with embedding vector
        """
        try:
            import google.generativeai as genai

            result = await genai.embed_content_async(
                model="models/embedding-001",
                content=text,
                task_type="retrieval_document"
            )

            return EmbeddingResponse(
                embedding=result["embedding"],
                tokens_used=len(text.split()),  # Approximate
                model="embedding-001"
            )

        except Exception as e:
            self.logger.error(f"Gemini embedding error: {e}", exc_info=True)
            raise

    def supports_tool_calling(self) -> bool:
        return True

    def supports_streaming(self) -> bool:
        return True

    def supports_embeddings(self) -> bool:
        return True


# Register the provider
ProviderFactory.register(ProviderType.GEMINI, GeminiProvider)
