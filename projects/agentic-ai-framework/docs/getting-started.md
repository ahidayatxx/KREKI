# Agentic AI Framework - Quick Start Guide

Welcome to the Agentic AI Framework! This guide will help you get started with building autonomous AI agents.

## What Was Built

This framework provides a comprehensive, technology-agnostic system for building agentic AI applications. Here's what's included:

### Core Framework Components

| Component | Description | Location |
|-----------|-------------|----------|
| **Base Agent** | Foundation for all agents with reasoning, memory, and tool use | `core/agent/base_agent.py` |
| **Reasoning Engine** | Sequential thinking and problem decomposition | `core/agent/reasoning_engine.py` |
| **Memory Manager** | Episodic, semantic, and working memory | `core/agent/memory_manager.py` |
| **Tool Selector** | Tool discovery and execution | `core/agent/tool_selector.py` |
| **Provider Abstraction** | Unified interface for Claude, OpenAI, Gemini | `core/providers/` |
| **MCP Client** | Model Context Protocol integration | `core/tools/mcp_client.py` |

### Skills Library

| Skill | Capabilities | Location |
|-------|--------------|----------|
| **Research** | Web search, literature review, fact-checking | `skills/research/SKILL.md` |
| **Writing** | Technical docs, business reports, creative content | `skills/writing/SKILL.md` |
| **Analysis** | Data/text/code analysis, pattern recognition | `skills/analysis/SKILL.md` |

### Pre-configured Agents

| Agent | Purpose | Location |
|-------|---------|----------|
| **Research Agent** | Information gathering and synthesis | `agents/research-agent/agent.py` |
| **Writing Agent** | Professional content creation | `agents/writing-agent/agent.py` |

### Configuration

| File | Purpose |
|------|---------|
| `config/providers.yaml` | LLM provider settings |
| `config/agents.yaml` | Pre-configured agent templates |

## Installation

```bash
# Navigate to framework directory
cd projects/agentic-ai-framework

# Install core dependencies
pip install pydantic

# Install provider dependencies (choose what you need)
pip install anthropic      # For Claude
pip install openai         # For OpenAI
pip install google-generativeai  # For Gemini
```

## Quick Start Examples

### Example 1: Basic Agent

```python
import asyncio
import os
from agentic_ai_framework.core.agent import BaseAgent, AgentConfig
from agentic_ai_framework.core.providers import ClaudeProvider

async def main():
    # Create provider
    provider = ClaudeProvider(
        api_key=os.getenv("ANTHROPIC_API_KEY"),
        model="claude-3-opus-20240229"
    )

    # Configure agent
    config = AgentConfig(
        name="MyAgent",
        description="A helpful AI assistant",
        system_prompt="You are a helpful assistant.",
        provider=provider,
        model="claude-3-opus-20240229"
    )

    # Create and run agent
    agent = BaseAgent(config)
    response = await agent.run("What is the capital of France?")
    print(response.content)

asyncio.run(main())
```

### Example 2: Research Agent

```python
import asyncio
from agentic_ai_framework.agents.research_agent.agent import ResearchAgent

async def main():
    # Create research agent
    agent = ResearchAgent()

    # Conduct research
    response = await agent.research(
        "The current state of quantum computing",
        research_type="comprehensive"
    )

    print(response.content)
    print(f"\nTokens used: {response.tokens_used}")

asyncio.run(main())
```

### Example 3: Writing Agent

```python
import asyncio
from agentic_ai_framework.agents.writing_agent.agent import WritingAgent

async def main():
    # Create writing agent
    agent = WritingAgent()

    # Write a blog post
    response = await agent.write_blog_post(
        topic="The Future of AI Agents",
        target_audience="technical professionals"
    )

    print(response.content)

asyncio.run(main())
```

### Example 4: Switching Providers

```python
from agentic_ai_framework.core.providers import ProviderFactory, ProviderType

# Use Claude
claude = ProviderFactory.create(
    provider_type=ProviderType.CLAUDE,
    api_key=os.getenv("ANTHROPIC_API_KEY"),
    model="claude-3-opus-20240229"
)

# Use OpenAI
openai = ProviderFactory.create(
    provider_type=ProviderType.OPENAI,
    api_key=os.getenv("OPENAI_API_KEY"),
    model="gpt-4-turbo-preview"
)

# Use Gemini
gemini = ProviderFactory.create(
    provider_type=ProviderType.GEMINI,
    api_key=os.getenv("GOOGLE_API_KEY"),
    model="gemini-pro"
)
```

## Configuration Files

### Setting API Keys

Create a `.env` file:

```bash
# Claude (Anthropic)
ANTHROPIC_API_KEY=your-claude-api-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Google
GOOGLE_API_KEY=your-gemini-api-key
```

### Using Configuration Files

```python
import yaml
from agentic_ai_framework.core.providers import ProviderFactory

# Load provider config
with open("config/providers.yaml") as f:
    provider_config = yaml.safe_load(f)["claude"]

# Create provider from config
provider = ProviderFactory.from_config(provider_config)
```

## Framework Patterns

### Progressive Disclosure

Load information incrementally to save tokens:

```python
# Level 1: Metadata only
skill = load_skill_level("research", level=1)

# Level 2: Add instructions
skill = load_skill_level("research", level=2)

# Level 3: Add resources
skill = load_skill_level("research", level=3)
```

### Tool Composition

Combine multiple tools:

```python
from agentic_ai_framework.core.agent.tool_selector import ToolSelector

# Create tool selector
selector = ToolSelector([
    web_search,
    analyze_data,
    generate_report
])

# Agent will compose these tools intelligently
agent = BaseAgent(config, tools=selector.get_tools())
```

### Context-First Design

Filter operations through domain context:

```python
# Set domain context
agent.update_context({
    "domain": "healthcare",
    "regulations": ["HIPAA", "FDA"],
    "expertise_level": "specialist"
})
```

## Next Steps

1. **Explore the Skills**: Check `skills/` for available capabilities
2. **Review Examples**: Look in `agents/` for working examples
3. **Read Documentation**: See `docs/architecture.md` for deep dive
4. **Create Custom Agents**: Build domain-specific agents
5. **Add Tools**: Extend with custom tools via MCP
6. **Configure Skills**: Create skill definitions for your use case

## File Structure

```
agentic-ai-framework/
├── core/                  # Core framework
│   ├── agent/            # Agent implementation
│   ├── providers/        # LLM provider abstractions
│   └── tools/            # Tool integration
├── skills/               # Skill definitions
│   ├── research/
│   ├── writing/
│   └── analysis/
├── agents/               # Example agents
│   ├── research-agent/
│   └── writing-agent/
├── config/               # Configuration files
│   ├── providers.yaml
│   └── agents.yaml
├── docs/                 # Documentation
│   ├── architecture.md
│   ├── getting-started.md
│   └── skills-catalog.md
└── tests/                # Test suite
    ├── unit/
    ├── integration/
    └── evaluation/
```

## Support

For more information:
- Read the [Architecture Guide](architecture.md)
- Check the [Skills Catalog](skills-catalog.md)
- Review example agents in `agents/`

---

Happy building! 🚀
