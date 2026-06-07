"""
Memory Manager Module

Provides memory capabilities for agents including episodic memory,
semantic memory, and context management.
"""

from typing import Dict, List, Any, Optional, Union
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
import json
import logging
from pathlib import Path


class MemoryType(Enum):
    """Types of memory storage."""
    EPISODIC = "episodic"  # Conversation history, events
    SEMANTIC = "semantic"  # Facts, concepts, knowledge
    PROCEDURAL = "procedural"  # Skills, workflows
    WORKING = "working"  # Temporary context for current task


@dataclass
class Memory:
    """A single memory item."""
    content: str
    memory_type: MemoryType
    timestamp: datetime = field(default_factory=datetime.now)
    metadata: Dict[str, Any] = field(default_factory=dict)
    importance: float = 0.5  # 0.0 to 1.0
    access_count: int = 0


@dataclass
class ConversationTurn:
    """A single turn in a conversation."""
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime = field(default_factory=datetime.now)
    metadata: Dict[str, Any] = field(default_factory=dict)


class MemoryManager:
    """
    Manages agent memory including conversation history,
    knowledge base, and context management.
    """

    def __init__(self, storage_path: Optional[Path] = None):
        """
        Initialize the memory manager.

        Args:
            storage_path: Optional path for persistent storage
        """
        self.logger = logging.getLogger("memory_manager")
        self._storage_path = storage_path
        self._episodic_memory: Dict[str, List[ConversationTurn]] = {}
        self._semantic_memory: Dict[str, Memory] = {}
        self._working_context: Dict[str, Any] = {}

    async def store_interaction(
        self,
        session_id: str,
        user_input: str,
        assistant_response: str,
        metadata: Optional[Dict[str, Any]] = None
    ) -> None:
        """
        Store a conversation interaction.

        Args:
            session_id: Session identifier
            user_input: User's input
            assistant_response: Agent's response
            metadata: Optional metadata
        """
        if session_id not in self._episodic_memory:
            self._episodic_memory[session_id] = []

        self._episodic_memory[session_id].extend([
            ConversationTurn(role="user", content=user_input, metadata=metadata or {}),
            ConversationTurn(role="assistant", content=assistant_response, metadata=metadata or {})
        ])

        # Persist if storage path is configured
        if self._storage_path:
            await self._persist_session(session_id)

    async def get_conversation_history(
        self,
        session_id: str,
        max_turns: Optional[int] = None
    ) -> List[Dict[str, str]]:
        """
        Get conversation history for a session.

        Args:
            session_id: Session identifier
            max_turns: Maximum number of turns to retrieve

        Returns:
            List of message dictionaries
        """
        if session_id not in self._episodic_memory:
            return []

        turns = self._episodic_memory[session_id]
        if max_turns:
            turns = turns[-max_turns:]

        return [
            {"role": turn.role, "content": turn.content}
            for turn in turns
        ]

    async def store_semantic_memory(
        self,
        key: str,
        content: str,
        importance: float = 0.5,
        metadata: Optional[Dict[str, Any]] = None
    ) -> None:
        """
        Store a semantic memory (fact, concept, knowledge).

        Args:
            key: Unique identifier for the memory
            content: Memory content
            importance: Importance score (0.0 to 1.0)
            metadata: Optional metadata
        """
        self._semantic_memory[key] = Memory(
            content=content,
            memory_type=MemoryType.SEMANTIC,
            importance=importance,
            metadata=metadata or {}
        )

    async def retrieve_semantic_memory(
        self,
        query: str,
        top_k: int = 5
    ) -> List[Memory]:
        """
        Retrieve semantic memories based on query.

        Args:
            query: Search query
            top_k: Number of results to return

        Returns:
            List of relevant memories
        """
        # Simple keyword matching for now
        # In production, this would use vector embeddings
        results = []
        query_lower = query.lower()

        for key, memory in self._semantic_memory.items():
            if query_lower in memory.content.lower() or query_lower in key.lower():
                memory.access_count += 1
                results.append(memory)

        # Sort by importance * access_count
        results.sort(key=lambda m: m.importance * (1 + m.access_count * 0.1), reverse=True)
        return results[:top_k]

    async def set_working_context(
        self,
        key: str,
        value: Any
    ) -> None:
        """Set a value in working context."""
        self._working_context[key] = value

    async def get_working_context(self, key: str) -> Optional[Any]:
        """Get a value from working context."""
        return self._working_context.get(key)

    async def clear_working_context(self) -> None:
        """Clear all working context."""
        self._working_context.clear()

    async def load_session(self, session_id: str) -> Dict[str, Any]:
        """
        Load session context including conversation history and semantic memories.

        Args:
            session_id: Session identifier

        Returns:
            Combined context dictionary
        """
        context = {}

        # Load conversation history summary
        if session_id in self._episodic_memory:
            context["conversation_summary"] = self._summarize_conversation(session_id)

        # Load relevant semantic memories
        context["semantic_memories"] = list(self._semantic_memory.values())

        return context

    async def close_session(self, session_id: str) -> None:
        """Close a session and persist its data."""
        if self._storage_path and session_id in self._episodic_memory:
            await self._persist_session(session_id)

    def _summarize_conversation(self, session_id: str) -> str:
        """Create a summary of the conversation."""
        if session_id not in self._episodic_memory:
            return ""

        turns = self._episodic_memory[session_id]
        return f"Conversation with {len(turns)} turns"

    async def _persist_session(self, session_id: str) -> None:
        """Persist session to storage."""
        if not self._storage_path:
            return

        session_file = self._storage_path / f"{session_id}.json"
        data = {
            "session_id": session_id,
            "turns": [
                {
                    "role": turn.role,
                    "content": turn.content,
                    "timestamp": turn.timestamp.isoformat(),
                    "metadata": turn.metadata
                }
                for turn in self._episodic_memory.get(session_id, [])
            ]
        }

        session_file.parent.mkdir(parents=True, exist_ok=True)
        with open(session_file, 'w') as f:
            json.dump(data, f, indent=2)

    async def _load_session_from_storage(self, session_id: str) -> None:
        """Load session from persistent storage."""
        if not self._storage_path:
            return

        session_file = self._storage_path / f"{session_id}.json"
        if not session_file.exists():
            return

        with open(session_file, 'r') as f:
            data = json.load(f)

        turns = []
        for turn_data in data.get("turns", []):
            turns.append(ConversationTurn(
                role=turn_data["role"],
                content=turn_data["content"],
                timestamp=datetime.fromisoformat(turn_data["timestamp"]),
                metadata=turn_data.get("metadata", {})
            ))

        self._episodic_memory[session_id] = turns
