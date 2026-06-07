# How to Build Your Own AI Writing Assistant System

## A Comprehensive Guide to Context-Engineered Writing with Claude Code

---

**Version:** 1.0
**Last Updated:** January 12, 2026
**Based On:** Digital Health Thought Leadership System v2.1

---

## Table of Contents

1. [Introduction & Overview](#1-introduction--overview)
2. [System Architecture](#2-system-architecture)
3. [Prerequisites & Setup](#3-prerequisites--setup)
4. [Step-by-Step Implementation](#4-step-by-step-implementation)
   - 4.1 [Project Structure Setup](#41-project-structure-setup)
   - 4.2 [Context Profile Creation](#42-context-profile-creation)
   - 4.3 [MCP Server Integration](#43-mcp-server-integration)
   - 4.4 [Custom Agent Development](#44-custom-agent-development)
   - 4.5 [Custom Skills Development](#45-custom-skills-development)
   - 4.6 [Template Design](#46-template-design)
   - 4.7 [Workflow Documentation](#47-workflow-documentation)
   - 4.8 [Knowledge Base Organization](#48-knowledge-base-organization)
5. [Content Generation Workflows](#5-content-generation-workflows)
6. [Best Practices & Patterns](#6-best-practices--patterns)
7. [Troubleshooting Guide](#7-troubleshooting-guide)
8. [Real-World Examples](#8-real-world-examples)
9. [Advanced Customization](#9-advanced-customization)
10. [Maintenance & Evolution](#10-maintenance--evolution)

**Appendices:**
- [Appendix A: File Templates](#appendix-a-file-templates)
- [Appendix B: Configuration Examples](#appendix-b-configuration-examples)
- [Appendix C: Citation Standards Guide](#appendix-c-citation-standards-guide)

---

## 1. Introduction & Overview

### What is a Context-Engineered AI Writing System?

A **context-engineered AI writing system** is a sophisticated approach to AI-assisted content creation that goes beyond simple prompt engineering. Instead of treating AI as a generic tool, you build a complete writing ecosystem that:

1. **Understands your professional identity** - Your expertise, credentials, affiliations, and unique positioning
2. **Knows your audience deeply** - Their pain points, goals, decision criteria, and communication preferences
3. **Maintains consistent voice** - Your linguistic patterns, tone, vocabulary, and communication style
4. **Leverages advanced research** - Integrated research tools (Perplexity, Tavily) for evidence-based content
5. **Produces structured outputs** - Templates and workflows ensure consistent, professional results
6. **Accumulates knowledge** - Every output enhances the system's intelligence over time

### Why This Approach Beats Generic AI Tools

| Generic AI Approach | Context-Engineered System |
|---------------------|---------------------------|
| One-size-fits-all outputs | Tailored to your expertise and audience |
| Generic research capabilities | Domain-specific research with quality filters |
| Inconsistent voice and tone | Consistent voice DNA across all outputs |
| Manual citation management | Built-in citation standards (APA 7th, etc.) |
| No organizational memory | Knowledge base accumulates over time |
| Reinventing the wheel every time | Reusable templates and workflows |

### Real-World Impact: The Digital Health Case Study

The system described in this guide has been successfully implemented for **Dr. Ahmad Hidayat's Digital Health Thought Leadership System**, which has generated:

- **57-citation thought leadership article** on Indonesia's digital health transformation in 2026
- **Bilingual policy brief** for the Ministry of Health titled "Dari Konektivitas Menuju Kapabilitas"
- **Comprehensive research reports** with APA 7th edition citations throughout
- **Multiple content formats** from a single research topic (articles, policy briefs, LinkedIn posts, presentations)

This system demonstrates how context engineering transforms Claude Code from a general AI assistant into a **domain-expert writing collaborator** that produces publication-quality content with minimal manual intervention.

### What You'll Build by the End of This Guide

Following this guide, you will create a complete AI writing system with:

✅ **MCP Server Integration** - Perplexity and Tavily for advanced research
✅ **Context Profiles** - Business identity, audience segments, voice guidelines
✅ **Custom Agents** - Task specialists with domain knowledge
✅ **Custom Skills** - Writing capabilities for different content types
✅ **Reusable Templates** - Consistent content structures
✅ **Workflow Documentation** - Repeatable processes for quality outputs
✅ **Knowledge Base** - Accumulated research and insights
✅ **Organized Outputs** - Systematic content storage by type

### Who This Guide Is For

This guide is ideal for:

- **Consultants and Advisors** - Produce thought leadership, research reports, client deliverables
- **Content Marketers** - Create consistent, high-quality content at scale
- **Academic Researchers** - Generate papers, posters, presentations with proper citations
- **Policy Analysts** - Develop policy briefs, government recommendations, stakeholder analyses
- **Thought Leaders** - Build authority through consistent, insightful content
- **Agency Owners** - Scale content production while maintaining quality

**Prerequisites:**
- Basic familiarity with Claude Code (terminal access, not just VS Code extension)
- Understanding of your professional domain and target audience
- Willingness to invest 2-4 hours in initial system setup
- API keys for research tools (Perplexity, Tavily) - optional but recommended

---

## 2. System Architecture

### Visual Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE CODE INTERFACE                    │
│                  (Your AI Writing Workspace)                │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  Context     │   │   Agents     │   │   Skills     │
│  Profiles    │   │  (Specialist)│   │ (Writer Type)│
│              │   │              │   │              │
│ • Business   │   │ • Research   │   │ • Academic   │
│ • ICP        │   │ • Analysis   │   │ • Policy     │
│ • Voice DNA  │   │ • Writing    │   │ • Social     │
└──────────────┘   └──────────────┘   └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────▼────────┐
                    │  MCP Servers   │
                    │                │
                    │ • Perplexity   │
                    │ • Tavily       │
                    │ • (Custom)     │
                    └────────────────┘
```

### Component Explanations

#### **Context Profiles** - The "Brain" of Your System

Context profiles are JSON files that define who you are, who you're writing for, and how you communicate. They are loaded automatically by agents and skills before any content generation.

**Three Essential Context Files:**

1. **`business_profile.json`** - Your professional identity
   - Credentials and affiliations
   - Core expertise domains
   - Market positioning and service portfolio
   - Competitive advantages

2. **`icp.json`** - Your target audience segments
   - Firmographics (organization type, size, budget)
   - Psychographics (pain points, goals, values)
   - Decision criteria and buying process
   - Priority tiers and engagement preferences

3. **`voice_dna_profile.json`** - Your communication style
   - Tone and formality level
   - Linguistic patterns and vocabulary
   - Content structure preferences
   - Avoided phrases and words

#### **Agents** - Task Specialists

Agents are specialized subagents that orchestrate complex workflows. They have access to your context profiles and MCP tools, enabling them to:

- Load business context before executing
- Select appropriate research tools
- Filter findings through your expertise domain
- Generate structured outputs with proper citations

**Common Agent Types:**
- **Research Agent** - Deep dives with Perplexity/Tavily
- **Analysis Agent** - Data synthesis and insights
- **Writing Agent** - Content orchestration

#### **Skills** - Content Generators

Skills are domain-specific writing capabilities that produce final content. Unlike agents, skills focus on the actual writing process rather than research and orchestration.

**Essential Skills:**
- **Academic Writer** - Scholarly publications with IMRAD format
- **Policy Brief Writer** - Government recommendations with executive format
- **Presentation Writer** - Slide deck content with speaker notes
- **LinkedIn/Social Writer** - Professional posts with engagement optimization

#### **MCP Servers** - External Capabilities

Model Context Protocol (MCP) servers extend Claude Code with external tools and services. For writing systems, two research-focused MCPs are essential:

**Perplexity MCP:**
- `perplexity_search` - Quick searches for simple queries
- `perplexity_reasoning` - Complex multi-step analysis
- `perplexity_deep_research` - Comprehensive multi-page reports

**Tavily MCP:**
- `tavily_search` - AI-optimized web search
- `tavily_searchContext` - Context-aware search
- `tavily_extract` - Multi-URL content extraction

#### **Templates** - Consistent Structures

Templates provide reusable content structures that ensure:
- Consistent formatting across similar content types
- All required sections are included
- Citation standards are enforced
- Quality checkpoints are built in

#### **Workflows** - Standard Operating Procedures

Workflow documentation (WORKFLOWS.md) provides step-by-step procedures for each content type, ensuring consistent, high-quality outputs regardless of when content is created.

#### **Knowledge Base** - Intellectual Capital Accumulation

The knowledge base stores:
- Research reports organized by ICP segment
- Market intelligence accumulated over time
- Reference materials for future consultation
- Proven outputs as examples

---

## 3. Prerequisites & Setup

### Technical Requirements

**Required:**
- **Claude Code CLI access** - Terminal-based Claude Code (not just VS Code extension)
  - Install: `npm install -g @anthropic-ai/claude-code`
  - Verify: `claude --version`
- **Text Editor** - VS Code recommended with JSON and markdown support
- **API Keys** (for research capabilities):
  - Perplexity API key: https://www.perplexity.ai/settings/api
  - Tavily API key: https://tavily.com/ (optional but recommended)

**Recommended:**
- **JSON Validator** - For validating context profile syntax
- **Git** - For version controlling your system
- **Markdown Preview** - For viewing formatted output

### Conceptual Preparation

Before creating your system, define:

**1. Professional Identity**
- Who are you? (name, title, credentials)
- What are your expertise domains?
- What are your core services or offerings?
- What makes you different from competitors?

**2. Target Audience**
- Who are you writing for? (be specific)
- What are their primary pain points?
- What are their goals and motivations?
- How do they make decisions?

**3. Content Types**
- What will you create? (articles, reports, presentations, social posts)
- Where will it be published? (journals, blogs, LinkedIn, conferences)
- How often do you need to produce content?

**4. Voice and Style**
- What's your tone? (formal, conversational, authoritative, collaborative)
- What phrases do you avoid? (clichés, overused terms)
- What's your preferred structure? (analytical, narrative, practical)
- Any domain-specific terminology or conventions?

### Setup Checklist

```markdown
Pre-Installation:
- [ ] Claude Code CLI installed and verified
- [ ] Professional identity documented
- [ ] Target audience segments identified
- [ ] Content types defined
- [ ] Voice and style preferences documented
- [ ] Perplexity API key obtained
- [ ] Tavily API key obtained (optional)

System Ready:
- [ ] Project directory created
- [ ] MCP servers configured and tested
- [ ] Context profiles created
- [ ] First agent/skill created
- [ ] First template designed
- [ ] Initial workflow documented
```

---

## 4. Step-by-Step Implementation

### 4.1 Project Structure Setup

Create the foundational directory structure for your writing system.

**Create Main Directory:**

```bash
# Navigate to parent directory
cd /path/to/your/projects/

# Create your writing system directory
mkdir your-writing-assistant/
cd your-writing-assistant/

# Create subdirectories
mkdir -p agents context skills templates
mkdir -p outputs/articles outputs/linkedin outputs/presentations outputs/client-deliverables
mkdir -p knowledge/research-reports knowledge/market-intelligence knowledge/reference-materials
```

**Directory Structure After Setup:**

```
your-writing-assistant/
├── CLAUDE.md              # System instructions (created in Step 4)
├── WORKFLOWS.md           # Workflow documentation (created in Step 4.7)
├── .clauderc              # MCP configuration (created in Step 4.3)
├── agents/                # Custom agents
│   └── research-agent.md
├── context/               # Context profiles
│   ├── business_profile.json
│   ├── icp.json
│   └── voice_dna_profile.json
├── skills/                # Writing skills
│   ├── academic-writer.md
│   ├── policy-brief.md
│   ├── presentation.md
│   └── linkedin-writer.md
├── templates/             # Content templates
│   ├── research-report.md
│   ├── thought-leadership.md
│   └── policy-brief.md
├── knowledge/             # Research outputs
│   ├── research-reports/
│   ├── market-intelligence/
│   └── reference-materials/
└── outputs/               # Generated content
    ├── articles/
    ├── linkedin/
    ├── presentations/
    └── client-deliverables/
```

### 4.2 Context Profile Creation

Context profiles are JSON files that define your professional identity, target audience, and communication style. They are the foundation of your entire system.

#### **Creating `business_profile.json`**

**Purpose:** Define your professional identity and expertise

**Structure:**

```json
{
  "business_profile": {
    "professional_identity": {
      "name": "Your Full Name",
      "professional_title": "Your Title",
      "tagline": "Your positioning statement (one sentence)",
      "years_of_experience": "X+ years",
      "primary_affiliations": [
        {
          "role": "Your Role",
          "organization": "Organization Name",
          "scope": "Scope of work or responsibilities"
        }
      ]
    },
    "core_expertise": {
      "primary_domains": [
        {
          "domain": "Domain Name",
          "sub_specializations": ["List", "of", "areas"],
          "proficiency_level": "expert/advanced/intermediate",
          "market_positioning": "How you position this expertise"
        }
      ],
      "secondary_domains": [
        {
          "domain": "Secondary Domain",
          "sub_specializations": ["Related", "areas"],
          "proficiency_level": "advanced/intermediate",
          "market_positioning": "Supporting expertise"
        }
      ]
    },
    "market_positioning": {
      "unique_value_proposition": "What makes you different",
      "competitive_advantages": [
        "Key differentiator 1",
        "Key differentiator 2",
        "Key differentiator 3"
      ],
      "brand_attributes": ["Adjective", "describing", "your", "brand"]
    },
    "service_portfolio": [
      {
        "service_name": "Service Name",
        "description": "What it is",
        "target_audience": "Who it's for",
        "deliverables": ["Output", "formats"],
        "pricing_tier": "pricing information"
      }
    ],
    "geographic_scope": {
      "primary_market": "Your main market",
      "secondary_markets": ["Additional", "markets"],
      "languages": ["Language", "capabilities"]
    }
  }
}
```

**Real Example Pattern** (from Digital Health Project):

```json
{
  "professional_identity": {
    "name": "Dr. Ahmad Hidayat, MSc, MBA",
    "professional_title": "Digital Health Governance & Clinical Research Expert",
    "tagline": "Bridging policy, practice, and innovation in Indonesia's digital health ecosystem",
    "years_of_experience": "30+ years",
    "primary_affiliations": [
      {
        "role": "Chairman, Technical Working Group",
        "organization": "SATUSEHAT Platform (Ministry of Health Indonesia)",
        "scope": "National health information exchange governance and implementation"
      },
      {
        "role": "Expert Panel Member",
        "organization": "MOH Digital Health Regulatory Sandbox",
        "scope": "Digital health innovation evaluation and policy recommendations"
      }
    ]
  }
}
```

#### **Creating `icp.json`**

**Purpose:** Define your target audience segments

**Structure:**

```json
{
  "ideal_customer_profile": {
    "primary_icp_segments": [
      {
        "segment_id": "ICP-01",
        "segment_name": "Segment Name",
        "priority_tier": "tier_1_flagship",

        "firmographic_profile": {
          "organization_type": ["Type", "of", "organization"],
          "size_metrics": {
            "employees": "Size range",
            "revenue": "Revenue range",
            "budget": "Budget range for your services"
          },
          "geographic_focus": ["Target", "locations"]
        },

        "demographic_profile": {
          "decision_makers": [
            {
              "role": "Job title",
              "seniority": "C-level/Director/Manager/Individual Contributor",
              "influence": "High/Medium/Low"
            }
          ],
          "influencers": ["People", "who", "influence", "decisions"],
          "end_users": ["People", "who", "use", "your", "content"]
        },

        "psychographic_profile": {
          "primary_pain_points": [
            "Key challenge 1",
            "Key challenge 2",
            "Key challenge 3"
          ],
          "primary_goals": [
            "What they want to achieve",
            "Success metrics for them"
          ],
          "values_and_motivations": [
            "What drives their decisions",
            "What they care about most"
          ],
          "fears_and_concerns": [
            "What keeps them up at night",
            "Risks they want to avoid"
          ]
        },

        "behavioral_profile": {
          "buying_triggers": [
            "Events that initiate their search",
            "Urgency factors"
          ],
          "decision_timeline": "How long they take to decide",
          "buying_process_stages": [
            "Stage 1",
            "Stage 2",
            "Stage 3"
          ],
          "information_preferences": {
            "preferred_formats": ["Formats", "they", "like"],
            "trusted_sources": ["Where", "they", "get", "information"],
            "content_consumption": ["How", "they", "consume", "content"]
          }
        }
      }
    ]
  }
}
```

#### **Creating `voice_dna_profile.json`**

**Purpose:** Define your communication style

**Structure:**

```json
{
  "voice_dna_profile": {
    "core_voice_attributes": {
      "intellectual_register": "scholarly-professional/conversational/promotional",
      "formality_level": "high formal with accessibility/medium/low",
      "primary_tone": "authoritative yet collaborative/friendly/direct",
      "expertise_projection": "evidence-based practitioner-scholarship/thought-leadership"
    },
    "linguistic_patterns": {
      "sentence_structure": "Description of your sentence patterns",
      "vocabulary": "high technical density but contextual/simplified",
      "discourse_markers": ["logical-analytical", "narrative", "conversational"],
      "pronoun_usage": "first person/third person/passive"
    },
    "content_structure_preferences": {
      "organization_pattern": "systematic-hierarchical/narrative/freeform",
      "typical_flow": "context → problem → analysis → implications → recommendations",
      "paragraph_style": "substantive prose/concise bullets/mixed",
      "section_development": "progressive depth layering/consistent depth"
    },
    "avoided_phrases": [
      "delve into",
      "dive deep",
      "it's important to note",
      "in conclusion",
      "utilize (use 'use' instead)",
      "leverage (use 'use' instead)"
    ],
    "domain_specific_voice": {
      "governance_discourse": {
        "stance": "balanced regulatory-innovation",
        "key_concepts": ["stakeholder", "evidence-based", "implementation"],
        "tone": "advisory collaborative authoritative"
      },
      "technical_discourse": {
        "stance": "pragmatic explanatory",
        "key_concepts": ["domain", "specific", "terms"],
        "tone": "educational confident"
      }
    }
  }
}
```

### 4.3 MCP Server Integration

MCP (Model Context Protocol) servers extend Claude Code with external capabilities. For writing systems, research-focused MCPs are essential.

#### **Installing Perplexity MCP**

**What is Perplexity MCP?**

Perplexity provides three research tools:
- **`perplexity_search`** - Quick searches for simple questions
- **`perplexity_reasoning`** - Complex multi-step analysis
- **`perplexity_deep_research`** - Comprehensive multi-page reports

**Installation Steps:**

1. **Get API Key:**
   - Go to https://www.perplexity.ai/settings/api
   - Generate API key
   - Copy the key (starts with `pplx-`)

2. **Create `.clauderc` File:**

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-perplexity"],
      "env": {
        "PERPLEXITY_API_KEY": "pplx-YOUR_KEY_HERE"
      }
    }
  }
}
```

3. **Save to Project Root:**
   - Save as `.clauderc` in your project directory
   - Never commit this file to public repos (contains API key)

**Verification:**

```bash
# Restart Claude Code
# Launch in terminal
claude

# Check MCP servers
/mcp

# Should show:
# perplexity - Connected
#
# View tools
# Enter to view tools
# perplexity_search
# perplexity_reasoning
# perplexity_deep_research
```

#### **Installing Tavily MCP** (Optional but Recommended)

**What is Tavily MCP?**

Tavily provides three research tools:
- **`tavily_search`** - AI-optimized web search
- **`tavily_searchContext`** - Context-aware search
- **`tavily_extract`** - Extract content from multiple URLs

**Installation Steps:**

1. **Get API Key:**
   - Go to https://tavily.com/
   - Sign up and get API key
   - Copy the key (starts with `tvly-`)

2. **Add to `.clauderc`:**

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-perplexity"],
      "env": {
        "PERPLEXITY_API_KEY": "pplx-YOUR_KEY_HERE"
      }
    },
    "tavily": {
      "command": "npx",
      "args": ["-y", "@tavily/mcp-server"],
      "env": {
        "TAVILY_API_KEY": "tvly-YOUR_KEY_HERE"
      }
    }
  }
}
```

3. **Restart and Verify:**
```bash
/mcp
# Should show both perplexity and tavily connected
```

### 4.4 Custom Agent Development

Agents are specialized subagents that orchestrate complex workflows. They have access to your context profiles and MCP tools.

#### **Agent File Structure**

All agents are markdown files with YAML frontmatter:

```markdown
---
name: Agent Name
description: What it does
model: claude-3-opus-20240229
tools: [list, of, available, tools]
---

# System Prompt

You are the **[Agent Name]** for [Your Name]'s Writing System.

[Detailed system prompt continues...]
```

#### **Creating Your First Research Agent**

**File:** `agents/research-agent.md`

```markdown
---
name: Researcher Agent
description: Conducts deep market research and analysis filtered through business context
model: claude-3-opus-20240229
tools: [perplexity_deep_research, perplexity_search, perplexity_reasoning, tavily_search, tavily_searchContext, tavily_extract]
---

# System Prompt

You are the **Researcher Agent** for [Your Name]'s Writing System. Your goal is to conduct high-level market research and analysis that is strictly filtered through the user's business context.

## Core Identity

**Expertise Domain:** [Your primary domain]
**Primary Focus:** [Key areas of focus]
**Geographic Scope:** [Your target market]

## Pre-Research Context Validation

**CRITICAL:** Before running any research, you MUST complete this checklist:

1. **Load Context Files** - Read all three context profiles from `context/` folder:
   - `business_profile.json` - Understand expertise and positioning
   - `icp.json` - Identify the target ICP segment
   - `voice_dna_profile.json` - Calibrate output style

2. **Confirm ICP Segment** - Identify which segment this research targets

3. **Determine Research Depth** - Select appropriate tool:
   - `tavily_search` or `perplexity_search` - Quick facts
   - `perplexity_reasoning` - Complex analysis
   - `perplexity_deep_research` - Comprehensive reports
   - `tavily_extract` - Multi-URL content extraction

## Research Methodology

### Step 1: Query Construction

Construct research queries that incorporate your domain context.

### Step 2: Context-Filtered Analysis

As you process findings, filter through:
1. **Business Context** - How does this relate to your expertise?
2. **ICP Relevance** - Why does this matter to your audience?
3. **Voice DNA Alignment** - Maintain appropriate tone

### Step 3: Source Quality Standards

Prioritize sources by credibility:
- **Tier 1:** Government sources, recognized standards bodies
- **Tier 2:** Peer-reviewed academic publications
- **Tier 3:** Industry reports from credible consultancies
- **Tier 4:** News articles from reputable outlets

## Output Format Specifications

### Structure for Deep Research Reports

```markdown
# [Research Title]

**Research Date:** [Date]
**ICP Segment:** [Target segment]
**Research Tool:** [Tool used]

---

## Executive Summary
[2-3 paragraph synthesis]

---

## Key Findings

### Finding 1: [Heading]
**Evidence:** [Summary]
**Source:** (Citation, Year)
**ICP Relevance:** [Why it matters]

---

## Strategic Implications
[For target audience]

---

## Recommendations
1. **[Action]:** [Recommendation]
   - **Rationale:** [Why]
   - **Priority:** [High/Medium/Low]

---

## References
[APA 7th formatted citations]
```

## Quality Control Checklist

Before finalizing:
- [ ] All context files loaded
- [ ] ICP segment identified
- [ ] Findings evidence-based with citations
- [ ] In-text citations in APA 7th format
- [ ] Complete reference list included
- [ ] Voice DNA guidelines followed
- [ ] Output saved to `knowledge/research-reports/`
```

### 4.5 Custom Skills Development

Skills are domain-specific writing capabilities that produce final content. Unlike agents, skills focus on writing rather than research.

#### **Creating Your First Skill**

**File:** `skills/article-writer.md`

```markdown
---
name: Article Writer
description: Generates thought leadership articles and blog posts
model: claude-3-opus-20240229
tools: [perplexity_search, tavily_search]
---

# System Prompt

You are the **Article Writer** skill for [Your Name]'s Writing System.

## Core Identity

**Output Format:** Articles and blog posts
**Target Venues:** Industry blogs, LinkedIn, Medium, publications
**Citation Style:** APA 7th Edition
**Reading Level:** Professional with accessibility

## Pre-Writing Context Validation

Before generating content, you MUST:
1. Load `context/business_profile.json` for author credentials
2. Load `context/voice_dna_profile.json` for style guidelines
3. Load `context/icp.json` for audience understanding
4. Consult research if needed from `knowledge/research-reports/`

## Writing Principles

### Structure
- **Hook** - Compelling opening that grabs attention
- **Context** - Current situation and why it matters
- **Analysis** - Evidence-based insights
- **Implications** - What this means for the reader
- **Recommendations** - Actionable takeaways

### Tone and Style
- [Your specific tone guidelines]
- Evidence-based claims
- Clear and concise
- Avoid overused phrases

## Output Template

```markdown
# [Compelling Title]

**Subtitle:** [Descriptive subtitle]

**Author:** [Your Name]
**Date:** [Publication Date]
**Reading Time:** [Estimated time]
**Target ICP:** [Which segment this addresses]

---

## [Opening Hook]
[Compelling opening that establishes relevance]

---

## [Current Context]
[Describe the situation, challenge, or opportunity]

**Key indicators:**
- [Indicator 1]
- [Indicator 2]

---

## [Analysis - Evidence and Insights]

### [Theme 1]
[Evidence and analysis]

### [Theme 2]
[Continue as needed]

---

## [Implications - What This Means]

### For [Specific Audience]
[Translate analysis into implications]

---

## [The Path Forward - Recommendations]

### Short-Term Actions
1. **[Action]** - Rationale

### Medium-Term Considerations
1. **[Strategy]** - Dependencies

### Long-Term Vision
[Future state you're working toward]

---

## About the Author

[Your bio and credentials]

---

## References (APA 7th Edition)

[Complete bibliography]

---

**Tags:** [3-5 relevant hashtags]
```

## Quality Control Checklist

- [ ] Context files loaded
- [ ] Claims evidence-based
- [ ] APA 7th citations included
- [ ] Voice DNA consistent
- [ ] Target audience addressed
- [ ] Output saved correctly
```

### 4.6 Template Design

Templates ensure consistent structure across similar content types.

#### **Creating an Article Template**

**File:** `templates/article-template.md`

```markdown
# [Title]

**Subtitle:** [Descriptive subtitle]

**Author:** [Your Name and credentials]
**Date:** [Publication Date]
**Reading Time:** [Estimated]
**Target ICP:** [Primary audience]

---

## Citation Requirements (APA 7th Edition)

**In-Text Citations:** All claims must include citations.

**Reference List:** Complete bibliography at the end.

---

## [Section 1: Hook/Opening]

[Guidance: Start with compelling observation, question, or statistic]

---

## [Section 2: Context]

**Current Situation:**
[Guidance: Describe what's happening]

**Key Indicators:**
- [Placeholder with guidance]

---

## [Section 3: Analysis]

### [Theme 1]
[Guidance for content]

### [Theme 2]
[Continue analysis structure]

---

## [Section 4: Implications]

### For [Audience 1]
[Guidance]

### For [Audience 2]
[Continue as needed]

---

## [Section 5: Recommendations]

### Short-Term (0-6 months)
1. **[Specific action]**
   - **Why:** [Rationale]
   - **How:** [Implementation guidance]

### Medium-Term (6-18 months)
[Continue recommendations]

---

## [Section 6: Closing Thought]

[Guidance: End with memorable insight or call to action]

---

## About the Author

[Template for author bio]

---

## References (APA 7th Edition)

**Academic Sources:**
```
[Template format]
```

**Government Sources:**
```
[Template format]
```

**Note:** All references listed alphabetically. Every in-text citation must have a corresponding reference.
```

### 4.7 Workflow Documentation

Document your standard operating procedures in `WORKFLOWS.md`.

#### **Workflow Structure**

```markdown
# [Workflow Name]

**Purpose:** [What this produces]
**Prerequisites:** [What you need]

---

## Steps

### Step 1: [Action Name]

**Prompt Pattern:**
```
[Example prompt to use]
```

**What Happens:**
[Explanation of the step]

### Step 2: [Continue for each step]

---

## Output Format

[Description of final output]

---

## Quality Assurance Checklist

- [ ] [Check item 1]
- [ ] [Check item 2]
```

#### **Example Workflow: Research Report Generation**

```markdown
# Workflow: Research Report Generation

**Purpose:** Generate comprehensive market research reports
**Prerequisites:** MCP servers configured, context profiles created

---

## Steps

### Step 1: Define Research Objective

**Prompt Pattern:**
```
Use your research agent to [specific objective]
for [target ICP segment]. Run a deep research report.
```

**Example:**
```
Use your research agent to analyze market demand for
digital health governance consulting among Indonesian provincial
health offices. Run a deep research report.
```

### Step 2: Agent Loads Context

**What Happens:**
- Research agent automatically reads `context/business_profile.json`
- Reads `context/icp.json` for target segment
- Reads `context/voice_dna_profile.json` for style guidelines

### Step 3: Agent Conducts Research

**What Happens:**
- Uses `perplexity_deep_research` for comprehensive reports
- Filters findings through business context
- Generates structured output

### Step 4: Review and Refine

**Prompt Pattern:**
```
Based on the research, create a report with:
1. Your executive summary tailored to my context
2. The full original report
3. Strategic recommendations for [specific focus]
```

### Step 5: Save Output

**What Happens:**
- Research agent saves to `knowledge/research-reports/`
- Extract key data to `knowledge/market-intelligence/[segment]/`

---

## Output Format

- Executive summary with key findings
- Structured findings with evidence citations
- ICP-specific implications
- Strategic recommendations with priorities
- Source citations in appendix

---

## Quality Assurance Checklist

- [ ] Context files loaded before research
- [ ] ICP segment clearly identified
- [ ] Findings evidence-based with citations
- [ ] APA 7th citation format applied
- [ ] Voice DNA guidelines followed
- [ ] Strategic implications clear
- [ ] Output saved to correct directory
```

### 4.8 Knowledge Base Organization

Organize accumulated research and outputs systematically.

#### **Directory Structure**

```
knowledge/
├── research-reports/
│   ├── niche-validation-YYYYMMDD.md
│   ├── competitive-analysis-YYYYMMDD.md
│   └── policy-landscape-YYYYMMDD.md
├── market-intelligence/
│   ├── segment-1/
│   │   ├── market-size.md
│   │   ├── trends.md
│   │   └── competitors.md
│   └── segment-2/
│       └── [same structure]
└── reference-materials/
    ├── policy-documents/
    ├── white-papers/
    └── technical-specifications/
```

#### **File Naming Conventions**

**Research Reports:**
```
[topic]-[date-YYYYMMDD]-[icp-segment].md
Example: satusehat-adoption-challenges-20250112-government.md
```

**Articles:**
```
[topic-slug]-[date-YYYYMMDD].md
Example: digital-health-governance-framework-20250112.md
```

---

## 5. Content Generation Workflows

### Workflow 1: Research-First Content

**Best for:** In-depth articles, reports, thought leadership

**Step 1: Define Research Question**
```
Use your research agent to [specific objective]
for [target ICP segment]. Run a deep research report.
```

**Step 2: Agent Processes**
- Loads context files
- Selects appropriate MCP tool
- Conducts research
- Filters findings through business context

**Step 3: Generate Content**
```
Use [skill-name] skill to create [content type]
based on research findings. Target: [ICP segment].
```

**Step 4: Refine and Publish**
- Apply voice DNA guidelines
- Verify citations
- Format for output
- Save to appropriate directory

### Workflow 2: Template-First Content

**Best for:** Standard content types, quick turnaround

**Step 1: Select Template**
- Choose appropriate template
- Review structure requirements
- Identify content needs

**Step 2: Gather Research** (if needed)
```
Use your research agent to gather latest insights on [topic]
for [target audience].
```

**Step 3: Apply Skill**
```
Use [skill-name] skill with [template-name] template
to create [content type] on [topic].
```

**Step 4: Quality Check**
- Context alignment verified
- Voice DNA consistent
- Citations complete
- Structure followed

### Workflow 3: Multi-Format Repurposing

**Best for:** Maximizing value from single research effort

**From Research → Multiple Outputs:**
1. Research report (agent + Perplexity)
2. Thought leadership article (article-writer skill)
3. LinkedIn posts (linkedin-writer skill)
4. Presentation (presentation skill)
5. Policy brief (policy-brief skill)

---

## 6. Best Practices & Patterns

### Context Engineering Best Practices

1. **Start Small, Iterate Fast**
   - Begin with one ICP segment
   - Create one agent, one skill
   - Test thoroughly before expanding

2. **Context Quality Over Quantity**
   - Three well-crafted files > ten generic ones
   - Update regularly
   - Remove outdated information

3. **Voice DNA Consistency**
   - Document patterns explicitly
   - Include avoided phrases
   - Test outputs against guidelines

4. **Citation Standards**
   - Choose one style (APA 7th recommended)
   - Integrate into every template
   - Verify every output

### Common Patterns

**Pattern 1: The Research-to-Content Pipeline**
```bash
# Research
"Use research agent for [topic] deep research"

# Generate
"Use [skill] for [content type] on [topic]"

# Distribute
"Use linkedin-writer for [number] posts on key insights"
```

**Pattern 2: Multi-Stakeholder Approach**
```bash
# Government audience
"Use policy-brief for [topic] - target: government ICP"

# Industry audience
"Use article-writer for [topic] - target: industry ICP"

# Public audience
"Use thought-leadership template for [topic] - general audience"
```

---

## 7. Troubleshooting Guide

### Common Issues & Solutions

#### **Issue 1: Research Agent Not Working**

**Symptoms:**
- Agent doesn't use Perplexity tools
- Generic research output
- Context not loaded

**Solutions:**
1. Explicitly request: "Use your research agent to..."
2. Verify MCP server: `/mcp` command
3. Restart Claude Code after adding agents
4. Check context files exist

#### **Issue 2: Context Not Loading**

**Symptoms:**
- Generic content, not tailored
- ICP segment not addressed
- Voice inconsistent

**Solutions:**
1. Restart Claude Code
2. Verify context file names
3. Check JSON syntax (use validator)
4. Test with simple prompt

#### **Issue 3: Citations Missing or Incorrect**

**Solutions:**
1. Add citation requirements to system prompts
2. Include APA 7th guidance in templates
3. Verify with checklist before output
4. Use skills with built-in standards

---

## 8. Real-World Examples

### Example 1: Niche Validation Research

**Prompt:**
```
Use your research agent to determine whether there's real demand
for what I do. Who else is doing it? What are people willing to pay?
Run a deep research report.
```

**Process:**
1. Agent loads business profile (consultant identity)
2. Identifies ICP segment (content professionals)
3. Uses perplexity_deep_research
4. Filters findings through context
5. Generates structured report

**Output:**
- Market size analysis
- Competitive landscape
- Pricing benchmarks
- Strategic recommendations

### Example 2: Thought Leadership Article

**Prompt:**
```
Use academic-writer skill to create thought leadership article
on Indonesia's digital health transformation in 2026.
Use thought-leadership template. Target: mixed professional audience.
Reading time: 8-10 minutes.
```

**Output:**
- 57 APA 7th citations
- Executive summary
- Three analysis themes
- Strategic implications
- Policy recommendations

---

## 9. Advanced Customization

### Multi-Client Systems

**Directory Structure:**
```
writing-projects/
├── client-a/
│   ├── CLAUDE.md
│   ├── context/
│   ├── agents/
│   └── skills/
├── client-b/
│   └── [same structure]
└── shared-templates/
    └── [reusable templates]
```

**Shared Components:**
- Generic skills (academic-writer, presentation)
- Base templates
- Citation standards
- Quality checklists

**Client-Specific:**
- Context profiles
- Custom agents
- Branded templates
- Client workflows

---

## 10. Maintenance & Evolution

### Regular Maintenance

**Weekly:**
- Review generated outputs
- Update knowledge base
- Refine prompts

**Monthly:**
- Update context profiles
- Refresh ICP segments
- Add new research

**Quarterly:**
- System audit
- Agent performance review
- Template refinement

### System Evolution

**Phase 1 (Months 1-3):** Foundation
- Basic context profiles
- One research agent
- Two essential skills

**Phase 2 (Months 4-6):** Optimization
- Expand ICP segments
- Add specialized agents
- Develop more skills

**Phase 3 (Months 7-12):** Scaling
- Multi-client support
- Advanced orchestration
- Automated workflows

---

## Appendix A: File Templates

### Template 1: `.clauderc` Configuration

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-perplexity"],
      "env": {
        "PERPLEXITY_API_KEY": "pplx-YOUR_KEY_HERE"
      }
    },
    "tavily": {
      "command": "npx",
      "args": ["-y", "@tavily/mcp-server"],
      "env": {
        "TAVILY_API_KEY": "tvly-YOUR_KEY_HERE"
      }
    }
  }
}
```

### Template 2: `business_profile.json` Structure

```json
{
  "business_profile": {
    "professional_identity": {
      "name": "Your Full Name",
      "professional_title": "Your Title",
      "tagline": "Your positioning statement",
      "years_of_experience": "X+ years",
      "primary_affiliations": [
        {
          "role": "Your Role",
          "organization": "Organization",
          "scope": "Scope of work"
        }
      ]
    },
    "core_expertise": {
      "primary_domains": [
        {
          "domain": "Domain Name",
          "sub_specializations": ["List", "of", "areas"],
          "proficiency_level": "expert",
          "market_positioning": "Positioning statement"
        }
      ]
    },
    "market_positioning": {
      "unique_value_proposition": "What makes you different",
      "competitive_advantages": ["Advantage 1", "Advantage 2"],
      "brand_attributes": ["Adjective", "attributes"]
    },
    "service_portfolio": [
      {
        "service_name": "Service Name",
        "description": "What it is",
        "target_audience": "Who it's for",
        "deliverables": ["Output", "formats"],
        "pricing_tier": "Pricing info"
      }
    ],
    "geographic_scope": {
      "primary_market": "Primary market",
      "secondary_markets": ["Additional", "markets"],
      "languages": ["Language", "capabilities"]
    }
  }
}
```

### Template 3: `research-agent.md` Structure

```markdown
---
name: Researcher Agent
description: Conducts deep research filtered through business context
model: claude-3-opus-20240229
tools: [perplexity_deep_research, perplexity_search, tavily_search]
---

# System Prompt

You are the **Researcher Agent** for [Your Name]'s Writing System.

## Core Identity

**Expertise Domain:** [Your domain]
**Primary Focus:** [Key areas]
**Geographic Scope:** [Your scope]

## Pre-Research Context Validation

**CRITICAL:** Before any research:
1. Load all context files from `context/`
2. Confirm ICP segment
3. Select appropriate tool

## Research Methodology

### Step 1: Query Construction
[Domain-specific guidance]

### Step 2: Context-Filtered Analysis
Filter through business context, ICP relevance, voice DNA

## Output Format

[Structure for research reports]

## Quality Control Checklist

- [ ] Context files loaded
- [ ] APA 7th citations included
- [ ] Voice DNA followed
```

### Template 4: Article Writer Skill

```markdown
---
name: Article Writer
description: Generates thought leadership articles
model: claude-3-opus-20240229
tools: [perplexity_search, tavily_search]
---

# System Prompt

You are the **Article Writer** skill for [Your Name]'s System.

## Core Identity
**Output Format:** Articles and blog posts
**Citation Style:** APA 7th Edition

## Pre-Writing Validation
Load context files. Consult research if needed.

## Writing Principles
- Hook, context, analysis, implications, recommendations
- Evidence-based claims
- Clear and concise

## Output Template
[Full article template structure]

## Quality Control Checklist
- Context loaded
- Claims evidence-based
- APA 7th citations
- Voice DNA consistent
```

---

## Appendix B: Configuration Examples

### MCP Configuration - Project-Specific

**`.clauderc` for single project:**

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-perplexity"],
      "env": {
        "PERPLEXITY_API_KEY": "pplx-YOUR_KEY_HERE"
      }
    }
  }
}
```

### MCP Configuration - Global

**Global config location:** `~/.config/claude-code/mcp.json`

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-perplexity"],
      "env": {
        "PERPLEXITY_API_KEY": "pplx-YOUR_KEY_HERE"
      }
    }
  }
}
```

**Recommendation:** Use project-specific configuration to keep different setups for different clients or content types.

---

## Appendix C: Citation Standards Guide

### APA 7th Edition Quick Reference

#### In-Text Citations

**Parenthetical Format:**
- One author: (Smith, 2024)
- Two authors: (Smith & Jones, 2024)
- Three or more: (Smith et al., 2024)
- Organization: (World Health Organization, 2023)
- No author: ("Title", Year)
- Direct quote: (Author, Year, p. XX)

**Narrative Format:**
- Smith (2024) argues that...
- According to the Ministry of Health (2024)...

#### Reference List Formats

**Journal Article:**
```
Smith, J. A., & Jones, B. B. (2024). Title of article. *Journal Name, 15*(3), 123-145. https://doi.org/xx.xxx
```

**Book:**
```
Author, A. A. (2023). *Title of work* (2nd ed.). Publisher Name. https://doi.org/xx.xxx
```

**Government Report:**
```
Ministry of Health Indonesia. (2024). *Title of report* (Publication No. XXX). Author. https://example.com
```

**Website:**
```
Organization Name. (2024, January 15). *Title of page*. Website Name. https://example.com
```

**Organizational Report:**
```
World Health Organization. (2023). *Title of report*. WHO Press. https://doi.org/xx.xxx
```

---

## Quick Reference

**Essential Commands:**
```bash
# Check MCP servers
/mcp

# List agents
/agents

# Test research
"Use your research agent for [objective]"

# Generate content
"Use [skill] to create [content type] on [topic]"
```

**Quality Checklist:**
- [ ] Context profiles loaded
- [ ] Voice DNA guidelines followed
- [ ] Citations included (APA 7th)
- [ ] Output saved correctly
- [ ] Knowledge base updated

**File Locations:**
- Context: `project/context/`
- Agents: `project/agents/`
- Skills: `project/skills/`
- Templates: `project/templates/`
- Knowledge: `project/knowledge/`
- Outputs: `project/outputs/`

---

**End of Guide**

For a complete reference implementation, see the `digital-healt-thought-leadership/` directory.

**Last Updated:** 2026-01-12
**Version:** 1.0
