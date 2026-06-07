# Agentic AI Framework - Beginner's Guide

**A simple, step-by-step guide to get you running AI agents in minutes.**

---

## 📋 Prerequisites Checklist

Before you start, make sure you have:

✅ **Python 3.10 or higher** installed
- To check: Open terminal and type `python --version`
- Download from: https://www.python.org/downloads/

✅ **An API Key** for at least one AI provider:
- **Claude (Recommended)**: Get key at https://console.anthropic.com/
- **OpenAI**: Get key at https://platform.openai.com/api-keys
- **Google Gemini**: Get key at https://makersuite.google.com/app/apikey

✅ **Basic terminal comfort** - We'll use simple commands

---

## 🚀 Step 1: Navigate to Framework

Open your terminal (Terminal on Mac/Linux, Command Prompt or PowerShell on Windows):

```bash
# Navigate to the framework directory
cd claude-code/projects/agentic-ai-framework

# You should see the framework files
ls
```

You should see folders like: `core/`, `skills/`, `agents/`, `config/`, `docs/`

---

## 🔑 Step 2: Set Up Your API Key

### Option A: Set Environment Variable (Recommended)

**Mac/Linux:**
```bash
# For Claude (recommended)
export ANTHROPIC_API_KEY="your-actual-api-key-here"

# For OpenAI
export OPENAI_API_KEY="your-actual-api-key-here"

# For Google Gemini
export GOOGLE_API_KEY="your-actual-api-key-here"
```

**Windows (Command Prompt):**
```cmd
set ANTHROPIC_API_KEY=your-actual-api-key-here
```

**Windows (PowerShell):**
```powershell
$env:ANTHROPIC_API_KEY="your-actual-api-key-here"
```

### Option B: Create .env File (Easier for Development)

Create a file named `.env` in the agentic-ai-framework directory:

```bash
# Create the file
touch .env

# Edit it (use any text editor: Notepad, VS Code, etc.)
```

Add this to the `.env` file:
```
ANTHROPIC_API_KEY=your-actual-api-key-here
```

---

## 📦 Step 3: Install Dependencies

### Install Python Package Manager (if needed)

```bash
# Make sure pip is up to date
pip install --upgrade pip
```

### Install Required Packages

```bash
# Install core dependencies
pip install pydantic

# Install for Claude (recommended)
pip install anthropic

# OR for OpenAI
pip install openai

# OR for Google Gemini
pip install google-generativeai
```

**Quick install for Claude (most common):**
```bash
pip install pydantic anthropic
```

---

## ▶️ Step 4: Run Your First Agent

### Method 1: Run the Research Agent (Easiest)

```bash
# Make sure you're in the framework directory
cd claude-code/projects/agentic-ai-framework

# Set your API key first
export ANTHROPIC_API_KEY="your-key-here"

# Run the research agent example
python agents/research-agent/agent.py
```

**What you should see:**
- The agent will research quantum computing in healthcare
- It will show you the research results
- Display metadata like tokens used and duration

### Method 2: Run the Writing Agent

```bash
# Make sure API key is set
export ANTHROPIC_API_KEY="your-key-here"

# Run the writing agent example
python agents/writing-agent/agent.py
```

**What you should see:**
- The agent will write a blog post about AI agents
- Display the complete blog post content

### Method 3: Create Your Own Simple Script

Create a file called `my_first_agent.py`:

```python
import asyncio
import os
import sys

# Add framework to path
sys.path.append('.')

# Import the framework
from core.agent.base_agent import BaseAgent, AgentConfig
from core.providers import ClaudeProvider

async def main():
    # 1. Set up the provider (Claude)
    provider = ClaudeProvider(
        api_key=os.getenv("ANTHROPIC_API_KEY"),
        model="claude-3-5-haiku-20241022"  # Use Haiku for faster/cheaper
    )

    # 2. Configure your agent
    config = AgentConfig(
        name="MyFirstAgent",
        description="My very first AI agent",
        system_prompt="You are a helpful and friendly assistant.",
        provider=provider,
        model="claude-3-5-haiku-20241022"
    )

    # 3. Create the agent
    agent = BaseAgent(config)

    # 4. Ask it something!
    response = await agent.run("Explain what an AI agent is like I'm 10 years old")

    # 5. See the result
    print("=" * 60)
    print("AGENT RESPONSE:")
    print("=" * 60)
    print(response.content)
    print("\nDone!")

# Run the agent
asyncio.run(main())
```

Run your script:
```bash
python my_first_agent.py
```

---

## 🎯 Common Commands Reference

| What You Want to Do | Command |
|---------------------|---------|
| Check Python version | `python --version` |
| Install framework dependencies | `pip install pydantic anthropic` |
| Set API key (Mac/Linux) | `export ANTHROPIC_API_KEY="your-key"` |
| Set API key (Windows CMD) | `set ANTHROPIC_API_KEY=your-key` |
| Run research agent | `python agents/research-agent/agent.py` |
| Run writing agent | `python agents/writing-agent/agent.py` |
| List files | `ls` (Mac/Linux) or `dir` (Windows) |

---

## 🔧 Troubleshooting

### Problem: "ModuleNotFoundError: No module named 'anthropic'"

**Solution:**
```bash
pip install anthropic
```

### Problem: "API key not found"

**Solution:**
```bash
# Make sure you set the environment variable
export ANTHROPIC_API_KEY="your-actual-key"

# Then run your script immediately
python your_script.py
```

### Problem: "Permission denied"

**Solution:**
```bash
# On Mac/Linux, make script executable
chmod +x agents/research-agent/agent.py
```

### Problem: "python command not found"

**Solution:**
```bash
# Try python3 instead
python3 --version
python3 agents/research-agent/agent.py
```

### Problem: Import errors

**Solution:**
```bash
# Make sure you're in the right directory
cd claude-code/projects/agentic-ai-framework

# Run with explicit Python path
PYTHONPATH=. python agents/research-agent/agent.py
```

---

## 📝 Example: Interactive Agent Session

Create a file called `interactive_agent.py`:

```python
import asyncio
import os
import sys

sys.path.append('.')

from core.agent.base_agent import BaseAgent, AgentConfig
from core.providers import ClaudeProvider

async def main():
    # Set up agent
    provider = ClaudeProvider(
        api_key=os.getenv("ANTHROPIC_API_KEY"),
        model="claude-3-5-haiku-20241022"
    )

    config = AgentConfig(
        name="ChatBot",
        description="Friendly chatbot",
        system_prompt="You are a helpful, friendly assistant. Keep answers concise.",
        provider=provider,
        model="claude-3-5-haiku-20241022"
    )

    agent = BaseAgent(config)

    # Chat loop
    print("🤖 Agent ready! Type 'quit' to exit.")
    print("=" * 60)

    while True:
        # Get user input
        user_input = input("\nYou: ")

        # Check if user wants to quit
        if user_input.lower() in ['quit', 'exit', 'q']:
            print("Goodbye! 👋")
            break

        # Get agent response
        response = await agent.run(user_input)

        # Show response
        print(f"\nAgent: {response.content}")
        print(f"(Tokens: {response.tokens_used}, Time: {response.duration_ms:.0f}ms)")

asyncio.run(main())
```

Run it:
```bash
python interactive_agent.py
```

---

## 💰 Cost-Saving Tips

AI APIs cost money. Here's how to save:

| Strategy | How | Savings |
|----------|-----|---------|
| **Use Haiku** | Change model to `claude-3-5-haiku-20241022` | ~90% cheaper |
| **Set max_tokens** | Add `max_tokens=1000` to config | Reduce token usage |
| **Use cache** | Agent caches session context | Fewer repeated calls |
| **Start quick** | Use `research_type="quick"` | Faster, cheaper results |

Example with Haiku:
```python
config = AgentConfig(
    name="BudgetAgent",
    # ... other settings ...
    model="claude-3-5-haiku-20241022",  # Cheaper option
    max_tokens=1000  # Limit output
)
```

---

## 🎓 Next Steps

Once you've got your first agent running:

1. **Try the Research Agent** - Experiment with different topics
2. **Try the Writing Agent** - Generate different types of content
3. **Read the Architecture Guide** - Understand how it works
4. **Create Your Own Agent** - Build something custom!

---

## 🆘 Need Help?

| Issue | Where to Look |
|-------|---------------|
| Installation issues | [Troubleshooting](#-troubleshooting) above |
| Want to understand more | Read [docs/architecture.md](architecture.md) |
| Want examples | Check `agents/` directory |
| API key problems | Check your provider's dashboard |

---

## ✅ Success Checklist

You're successfully running the framework when:

- [ ] You can run `python --version` and see 3.10+
- [ ] You've installed `pip install pydantic anthropic`
- [ ] Your API key is set (`export ANTHROPIC_API_KEY=...`)
- [ ] You can run an example agent without errors
- [ ] You see AI-generated output in your terminal

**Congratulations! You're now running AI agents! 🎉**

---

**Remember:** Start simple, use Haiku for testing, and don't forget to set your API key each terminal session!
