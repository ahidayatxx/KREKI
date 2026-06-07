# Agentic AI Framework - Architecture Guide

This document provides a comprehensive overview of the framework architecture, design decisions, and implementation patterns.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Core Components](#core-components)
3. [Design Patterns](#design-patterns)
4. [Data Flow](#data-flow)
5. [Extensibility](#extensibility)
6. [Performance Considerations](#performance-considerations)

## System Architecture

### Layer Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                        │
│   Domain-Specific Agents (Research, Writing, Healthcare)    │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                     SKILL LAYER                             │
│  Research | Writing | Analysis | Domain-Specific Skills    │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                    AGENT LAYER                              │
│  Reasoning Engine | Memory Manager | Tool Selector         │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                    TOOL LAYER                               │
│  MCP Servers | API Clients | File System | Databases       │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                   PROVIDER LAYER                            │
│  Claude | OpenAI | Gemini | Custom Providers               │
└─────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### Provider Layer
- Abstracts LLM provider implementations
- Provides unified interface for different APIs
- Handles provider-specific quirks and formats
- Manages API authentication and rate limiting

#### Tool Layer
- Manages external service integrations
- Provides tool discovery and execution
- Handles MCP server communication
- Implements tool composition patterns

#### Agent Layer
- Orchestrates reasoning and planning
- Manages conversation memory
- Selects and executes tools
- Implements the agent loop

#### Skill Layer
- Defines agent capabilities
- Provides progressive disclosure
- Encapsulates domain knowledge
- Enables skill composition

#### Application Layer
- Domain-specific agent implementations
- Workflow orchestration
- Multi-agent collaboration
- User interface integration

## Core Components

### 1. Base Agent

The `BaseAgent` class is the foundation for all agents:

```python
class BaseAgent:
    """
    Core agent orchestrating:
    - Reasoning: Problem decomposition and planning
    - Memory: Context and conversation management
    - Tool Use: External action execution
    """

    async def run(
        self,
        input_text: str,
        session_id: Optional[str] = None
    ) -> AgentResponse:
        """
        Main agent loop:
        1. Load context and history
        2. Build messages
        3. Execute agent loop
        4. Store interaction
        5. Return response
        """
```

**Key Features:**
- Agent state management (IDLE, THINKING, ACTING, DONE, ERROR)
- Session-based memory persistence
- Configurable reasoning, memory, and tool capabilities
- Graceful error handling

### 2. Reasoning Engine

Implements sequential thinking for complex problem solving:

```python
class ReasoningEngine:
    """
    Breaks down complex problems into logical steps:
    - Observation: What do I see?
    - Hypothesis: What might be true?
    - Analysis: What does this mean?
    - Conclusion: What do I know now?
    """

    async def extract_reasoning(self, text: str) -> List[ThoughtStep]
    async def decompose_problem(self, problem: str) -> List[str]
    async def generate_hypotheses(self, context: str) -> List[ThoughtStep]
```

**Thought Types:**
- OBSERVATION: Perceived facts and data
- HYPOTHESIS: Tentative explanations
- ANALYSIS: Examination and evaluation
- CONCLUSION: Final determinations
- PLAN: Proposed actions
- QUESTION: Uncertainties to explore

### 3. Memory Manager

Handles multiple types of memory:

```python
class MemoryManager:
    """
    Manages:
    - Episodic Memory: Conversation history
    - Semantic Memory: Facts and concepts
    - Working Memory: Temporary context
    - Persistence: Session storage
    """

    async def store_interaction(
        self,
        session_id: str,
        user_input: str,
        assistant_response: str
    )

    async def retrieve_semantic_memory(
        self,
        query: str,
        top_k: int = 5
    ) -> List[Memory]
```

**Memory Types:**
- **Episodic**: Conversation turns and events
- **Semantic**: Facts, concepts, knowledge
- **Procedural**: Skills and workflows
- **Working**: Temporary task context

### 4. Tool Selector

Manages tool discovery and execution:

```python
class ToolSelector:
    """
    Handles:
    - Tool registration and schema generation
    - Tool selection based on context
    - Safe execution with error handling
    - Result formatting
    """

    def add_tool(self, tool: Callable) -> None
    async def execute_tool(self, tool_call: ToolCall) -> ToolResult
    def get_tool_schemas(self) -> List[Dict[str, Any]]
```

**Tool Categories:**
- FILE_OPERATIONS: File system interactions
- API_CALLS: External API requests
- DATABASE: Data storage queries
- ANALYSIS: Data processing
- GENERATION: Content creation
- SYSTEM: Administrative tasks

### 5. Provider Abstraction

Unified interface for LLM providers:

```python
class LLMProvider(ABC):
    """
    Abstract interface for all providers:
    - Chat completion with tool calling
    - Streaming responses
    - Embeddings generation
    """

    @abstractmethod
    async def chat_completion(
        self,
        messages: List[Message],
        tools: Optional[List[Dict]] = None
    ) -> LLMResponse

    @abstractmethod
    async def embed(self, text: str) -> EmbeddingResponse
```

**Supported Providers:**
- `ClaudeProvider`: Anthropic Claude API
- `OpenAIProvider`: OpenAI GPT API
- `GeminiProvider`: Google Gemini API

### 6. MCP Client

Model Context Protocol client implementation:

```python
class MCPClient:
    """
    Handles:
    - Server process management
    - JSON-RPC communication
    - Tool discovery and execution
    - Resource access
    """

    async def start(self) -> None
    async def call_tool(self, tool_name: str, arguments: Dict) -> MCPToolResult
    async def read_resource(self, uri: str) -> str
```

**Features:**
- Automatic server lifecycle management
- Async communication
- Tool and resource discovery
- Error handling and recovery

## Design Patterns

### 1. Progressive Disclosure

Minimize token usage by loading information incrementally:

```yaml
Level 1: Metadata
  - Name, description, capabilities
  - Prerequisites and dependencies

Level 2: Core Instructions
  - Primary system prompt
  - Key behavioral guidelines

Level 3: Resources & Context
  - Domain-specific knowledge
  - Reference materials
```

**Implementation:**
```python
async def load_skill(skill_name: str, level: int = 1):
    if level == 1:
        return load_metadata(skill_name)
    elif level == 2:
        return load_instructions(skill_name)
    elif level == 3:
        return load_resources(skill_name)
```

### 2. Strategy Pattern

Provider abstraction allows runtime switching:

```python
# Configure at runtime
provider_type = os.getenv("PROVIDER_TYPE", "claude")
provider = ProviderFactory.create(
    provider_type=ProviderType(provider_type),
    api_key=get_api_key(),
    model=get_model()
)
```

### 3. Observer Pattern

Agent state changes are observable:

```python
class AgentObserver:
    async def on_state_change(self, agent: BaseAgent, new_state: AgentState):
        # React to state changes
        pass

agent.add_observer(AgentObserver())
```

### 4. Chain of Responsibility

Tool execution follows a chain:

```
Tool Selector → Permission Check → Input Validation →
Tool Execution → Result Validation → Response Formatting
```

## Data Flow

### Agent Execution Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User Input                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Load Context (Progressive Disclosure)                    │
│    - Session history                                       │
│    - Semantic memories                                     │
│    - Skill instructions                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Build Messages                                           │
│    - System prompt                                         │
│    - Conversation history                                  │
│    - User input                                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Agent Loop (Iterate until done)                         │
│    a. Generate response with tool calls                    │
│    b. If tool calls:                                       │
│       - Execute tools                                      │
│       - Add results to messages                            │
│       - Continue loop                                      │
│    c. Else: Return response                                │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Store Interaction                                        │
│    - Add to episodic memory                                │
│    - Update semantic memory                                │
│    - Persist session                                       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. Return Response                                          │
└─────────────────────────────────────────────────────────────┘
```

### Tool Composition Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Complex Task                                                │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Decompose into Subtasks                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Select Tools for Each Subtask                              │
│    - Research Tool (gather information)                    │
│    - Analysis Tool (process data)                          │
│    - Writing Tool (format output)                          │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Execute Tools in Order                                     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Synthesize Results                                         │
└─────────────────────────────────────────────────────────────┘
```

## Extensibility

### Adding a New Provider

```python
from agentic_ai_framework.core.providers import LLMProvider, ProviderFactory, ProviderType

class CustomProvider(LLMProvider):
    async def chat_completion(self, messages, tools, **kwargs):
        # Implementation
        pass

    async def embed(self, text):
        # Implementation
        pass

# Register the provider
ProviderFactory.register(ProviderType.CUSTOM, CustomProvider)
```

### Adding a New Skill

```markdown
---
name: my-custom-skill
version: 1.0.0
description: Custom capability description
---

# My Custom Skill

## Overview
Description of what this skill does...

## Usage Guidelines
How to use this skill...

## Output Format
Expected output structure...
```

### Adding a New Tool

```python
from agentic_ai_framework.core.agent import ToolSelector, ToolCategory

def my_custom_tool(param1: str, param2: int) -> str:
    """Tool description for schema generation."""
    # Implementation
    return result

# Register with agent
agent.add_tool(my_custom_tool)
```

## Performance Considerations

### Token Optimization

1. **Progressive Disclosure**: Load only necessary context
2. **Context Filtering**: Relevance-based selection
3. **Caching**: Store frequently accessed data
4. **Compression**: Use concise representations

### Latency Reduction

1. **Parallel Tool Execution**: Run independent tools concurrently
2. **Streaming**: Use streaming responses where possible
3. **Caching**: Cache LLM responses for similar queries
4. **Async I/O**: Non-blocking operations throughout

### Cost Management

1. **Model Selection**: Use appropriate models for tasks
2. **Token Limits**: Set max_tokens appropriately
3. **Caching**: Avoid redundant API calls
4. **Monitoring**: Track usage and costs

### Scalability

1. **Session Management**: Efficient memory cleanup
2. **Connection Pooling**: Reuse provider connections
3. **Rate Limiting**: Respect API limits
4. **Graceful Degradation**: Handle failures gracefully

## Security Considerations

### API Key Management

```python
# Use environment variables
api_key = os.getenv("ANTHROPIC_API_KEY")

# Never hardcode keys
# BAD: provider = ClaudeProvider("sk-ant-...")
# GOOD: provider = ClaudeProvider(os.getenv("ANTHROPIC_API_KEY"))
```

### Tool Execution Safety

- Validate all tool inputs
- Use sandboxes for code execution
- Implement rate limiting
- Log all tool executions

### Data Privacy

- Sanitize sensitive data
- Implement data retention policies
- Secure session storage
- Compliance with regulations

---

For more information, see:
- [Skills Catalog](skills-catalog.md)
- [Deployment Guide](deployment-guide.md)
- [API Reference](api-reference.md)
