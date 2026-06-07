# Agentic AI Framework

A technology-agnostic framework for developing autonomous AI agents that can work with any LLM provider (Claude, OpenAI, Gemini, etc.) while maintaining consistent patterns, best practices, and architectural decisions.

## 🎯 Purpose

Current AI agent development is fragmented across different platforms with no standardized approach for building maintainable, scalable, and portable agentic systems. This framework provides:

- **Clear architectural patterns** for agent development
- **Recommended skill sets** and capabilities
- **Technology-agnostic interfaces** for LLM providers
- **Best practices** for production deployment
- **Reusable components** and templates

## 🏗️ Architecture

The framework is organized into 6 layers:

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                        │
│         (Domain-Specific Agents & Workflows)                │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                     SKILL LAYER                             │
│      (Capabilities: Research, Writing, Analysis, etc.)       │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                    AGENT LAYER                              │
│   (Reasoning, Planning, Memory, Tool Selection)             │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                    TOOL LAYER                               │
│  (MCP Servers, APIs, Database Connections, File System)     │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                   PROVIDER LAYER                            │
│      (LLM Abstraction: Claude, OpenAI, Gemini, etc.)        │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/agentic-ai-framework.git
cd agentic-ai-framework

# Install dependencies
pip install -r requirements.txt

# Or install specific provider dependencies
pip install anthropic  # For Claude
pip install openai     # For OpenAI
pip install google-generativeai  # For Gemini
```

## 🚀 Quick Start

### Basic Agent Example

```python
import asyncio
from agentic_ai_framework.core.agent import BaseAgent, AgentConfig
from agentic_ai_framework.core.providers import ClaudeProvider, ProviderType

async def main():
    # Create provider
    provider = ClaudeProvider(
        api_key="your-api-key",
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

### Using Configuration Files

```python
import yaml
from agentic_ai_framework.core.agent import BaseAgent, AgentConfig
from agentic_ai_framework.core.providers import ProviderFactory

# Load configuration
with open("config/agents.yaml") as f:
    agent_config = yaml.safe_load(f)["research_agent"]

# Create provider from config
provider = ProviderFactory.from_config(agent_config["provider"])

# Create agent
agent = BaseAgent(AgentConfig(**agent_config))
```

## 🎨 Core Concepts

### 1. Progressive Disclosure

Skills and contexts load in stages to minimize token usage:

- **Level 1**: Metadata (name, description, capabilities)
- **Level 2**: Core Instructions (system prompt, guidelines)
- **Level 3**: Resources & Context (domain knowledge, references)

### 2. Tool Composition

Combine multiple tools for complex workflows:

```
User Request → Agent Planner → Tool Selector → Tool Executor
                                      ↓
                [Research Tool] + [Analysis Tool] + [Writing Tool]
                                      ↓
                         Result Synthesizer → Final Output
```

### 3. Context-First Design

All operations filtered through domain context:
- Business Profile: Professional identity and goals
- ICP Segments: Target audience characteristics
- Voice DNA: Communication style and tone

### 4. Modular Skill System

Skills are reusable, composable capabilities:

```
skill/
├── SKILL.md              # Main skill definition with YAML metadata
├── instructions.md       # Detailed instructions
├── resources/            # Reference materials
├── templates/            # Reusable templates
└── scripts/              # Helper scripts
```

## 🛠️ Supported Providers

| Provider | Models | Tool Calling | Streaming | Embeddings |
|----------|--------|--------------|-----------|------------|
| Claude (Anthropic) | Opus, Sonnet, Haiku | ✅ | ✅ | ❌ |
| OpenAI | GPT-4, GPT-3.5 Turbo | ✅ | ✅ | ✅ |
| Gemini | Pro, Ultra | ✅ | ✅ | ✅ |

## 📚 Available Skills

### Core Cognitive Skills
- **Sequential Thinking**: Break down complex problems
- **Hypothesis Generation**: Create testable hypotheses
- **Decision Analysis**: Evaluate options with criteria
- **Critical Thinking**: Validate assumptions

### Communication Skills
- **Technical Writing**: Documentation and specs
- **Business Writing**: Reports and proposals
- **Multilingual**: Translation and localization
- **Format Conversion**: Markdown, HTML, JSON, YAML

### Analysis Skills
- **Data Analysis**: Statistics and patterns
- **Text Analysis**: Sentiment, entities, topics
- **Code Analysis**: Review, dependencies, security

See [docs/skills-catalog.md](docs/skills-catalog.md) for complete skill reference.

## 🤖 Pre-configured Agents

The framework includes several pre-configured agent templates:

- **Research Agent**: Information gathering and synthesis
- **Writing Agent**: Content creation across formats
- **Analysis Agent**: Data and text analysis
- **Healthcare Agent**: Clinical decision support
- **Code Review Agent**: Automated code review
- **Business Intelligence Agent**: Market research

See [config/agents.yaml](config/agents.yaml) for agent configurations.

## 🔧 Configuration

### Provider Configuration

```yaml
# config/providers.yaml
claude:
  type: claude
  models:
    opus:
      name: claude-3-opus-20240229
      max_tokens: 4096
  api_key_env: ANTHROPIC_API_KEY
```

### Agent Configuration

```yaml
# config/agents.yaml
research_agent:
  name: "Research Agent"
  description: "Context-aware research specialist"
  system_prompt: |
    You are an expert research agent with deep knowledge of
    research methodologies...
  provider:
    type: claude
    model: opus
  skills:
    - research
    - analysis
```

## 📖 Documentation

- [Architecture Guide](docs/architecture.md) - System architecture and design
- [Skills Catalog](docs/skills-catalog.md) - Complete skills reference
- [Deployment Guide](docs/deployment-guide.md) - Production deployment
- [API Reference](docs/api-reference.md) - Detailed API documentation

## 🧪 Testing

```bash
# Run unit tests
pytest tests/unit/

# Run integration tests
pytest tests/integration/

# Run evaluation suite
pytest tests/evaluation/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Related Projects

- [Claude Skills Factory](../Claude%20Skills%20Factory/) - Skill generation system
- [MCP Prompts as Slash Commands](../MCP%20Prompts%20as%20Slash%20Commands/) - MCP tool examples

## 🙏 Acknowledgments

Built on patterns from:
- Claude Skills Factory progressive disclosure architecture
- Model Context Protocol (MCP) for tool integration
- Best practices from production AI systems

---

**Made with ❤️ for the agentic AI community**
