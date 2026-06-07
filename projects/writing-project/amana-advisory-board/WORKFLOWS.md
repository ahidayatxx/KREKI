# AMANA Advisory Board Writing Assistant - Standard Operating Procedures

**Version:** 1.0
**Last Updated:** 2025-01-14
**Purpose:** Standard operating procedures for all content generation workflows

---

## Table of Contents

1. [Research Activation Workflow](#1-research-activation-workflow)
2. [Strategic Insight Generation Workflow](#2-strategic-insight-generation-workflow)
3. [Thought Leadership Creation Workflow](#3-thought-leadership-creation-workflow)
4. [Coaching Material Development Workflow](#4-coaching-material-development-workflow)
5. [Stakeholder Communication Workflow](#5-stakeholder-communication-workflow)
6. [Policy Brief Development Workflow](#6-policy-brief-development-workflow)
7. [Quality Assurance Checklist](#7-quality-assurance-checklist)
8. [File Naming Conventions](#8-file-naming-conventions)
9. [System Maintenance](#9-system-maintenance)

---

## 1. Research Activation Workflow

**Purpose:** Generate research on ASEAN health sector, public goods delivery, and advisory best practices

**Prerequisites:** MCP server configured (Tavily), context profiles loaded

### Steps

#### Step 1: Define Research Objective

**Prompt Pattern:**
```
Use your advisory research agent to [specific research objective]

Examples:
- "Use your advisory research agent to analyze ASEAN digital health governance trends in 2026"
- "Use your advisory research agent to investigate public goods delivery best practices in Southeast Asia"
- "Use your advisory research agent to explore leadership development methodologies for health sector professionals"
```

**What Happens:**
- Research agent loads context files (business_profile, icp, voice_dna)
- Identifies target ICP segment
- Selects appropriate Tavily tool based on research depth

#### Step 2: Agent Conducts Research

**What Happens:**
- Agent constructs research queries with AMANA advisory context
- Uses Tavily tools (tavily_search, tavily_searchContext, or tavily_extract)
- Filters findings through advisory context
- Generates structured output

#### Step 3: Review Research Output

**Quality Checks:**
- [ ] Executive summary provides clear synthesis
- [ ] Key findings evidence-based with APA 7th citations
- [ ] Strategic implications clear for AMANA
- [ ] Recommendations actionable
- [ ] Voice DNA consistent

#### Step 4: Save Research Output

**Location:** `knowledge/research-reports/`

**File Naming:** `[topic]-[date-YYYYMMDD]-[focus-area].md`

**Example:** `asean-digital-health-governance-20260114-health-policy.md`

---

## 2. Strategic Insight Generation Workflow

**Purpose:** Generate strategic advisory briefs, policy analysis, and decision support

**Prerequisites:** Research completed (optional), context profiles loaded

### Steps

#### Step 1: Define Strategic Need

**Prompt Pattern:**
```
Use strategic-insight to create [content type] on [topic] for [audience]

Examples:
- "Use strategic-insight to create advisory brief on digital health governance for AMANA leadership"
- "Use strategic-insight to create policy analysis on ASEAN health data sharing for ASEAN policymakers"
```

#### Step 2: Skill Loads Context and Generates Content

**What Happens:**
- Skill loads business_profile.json, icp.json, voice_dna_profile.json
- Consults research in knowledge/ if relevant
- Generates content following strategic-advisory template
- Applies APA 7th citations throughout

#### Step 3: Review and Refine

**Quality Checks:**
- [ ] Executive summary provides clear synthesis
- [ ] Strategic analysis logically structured
- [ ] Options assessment balanced
- [ ] Recommendations prioritized and actionable
- [ ] APA 7th citations complete
- [ ] SEED values considered

#### Step 4: Save Output

**Location:** `outputs/strategic-insights/`

**File Naming:** `strategic-[topic-slug]-[date-YYYYMMDD].md`

**Example:** `strategic-digital-health-governance-20260114.md`

---

## 3. Thought Leadership Creation Workflow

**Purpose:** Generate articles, op-eds, speaking content for publications and events

**Prerequisites:** Research or topic knowledge available, context profiles loaded

### Steps

#### Step 1: Define Thought Leadership Opportunity

**Prompt Pattern:**
```
Use thought-leadership to create [content type] on [topic] for [audience]

Examples:
- "Use thought-leadership to create article on ASEAN health collaboration for health sector professionals"
- "Use thought-leadership to create conference presentation on digital health transformation"
- "Use thought-leadership to create LinkedIn post on public goods innovation"
```

#### Step 2: Skill Generates Content

**What Happens:**
- Skill loads context profiles
- Creates compelling hook and narrative
- Develops evidence-based insights (2-3 themes)
- Generates recommendations and call to action
- Includes author bio establishing credibility

#### Step 3: Review for Impact

**Quality Checks:**
- [ ] Compelling title and hook
- [ ] Clear progression from issue to action
- [ ] Evidence-based insights with APA 7th citations
- [ ] ASEAN/Indonesia context included
- [ ] Human impact focus evident
- [ ] Inspiring and forward-looking

#### Step 4: Save Output

**Location:** `outputs/thought-leadership/`

**File Naming:** `article-[topic-slug]-[date-YYYYMMDD].md`

**Example:** `article-asean-health-collaboration-20260114.md`

---

## 4. Coaching Material Development Workflow

**Purpose:** Generate leadership development and training content for AMANA team

**Prerequisites:** Learning objectives defined, context profiles loaded

### Steps

#### Step 1: Define Development Need

**Prompt Pattern:**
```
Use coaching-material to create [content type] on [topic] for AMANA staff

Examples:
- "Use coaching-material to create strategic thinking framework for AMANA consultants"
- "Use coaching-material to create stakeholder engagement training session for AMANA team"
- "Use coaching-material to create leadership development resources for emerging leaders"
```

#### Step 2: Skill Generates Development Content

**What Happens:**
- Skill loads context profiles (focus on ICP-04)
- Creates learning objectives and session agenda
- Develops framework with clear explanation
- Includes practical scenarios and exercises
- Provides tools and templates for application
- Adds reflection prompts and action planning

#### Step 3: Review for Learning Effectiveness

**Quality Checks:**
- [ ] Clear, achievable learning objectives
- [ ] Framework well-explained and practical
- [ ] Scenarios realistic for AMANA context
- [ ] Exercises actionable and engaging
- [ ] Tools/templates immediately usable
- [ ] Developmental tone with appropriate challenge
- [ ] SEED values integrated

#### Step 4: Save Output

**Location:** `outputs/coaching-materials/`

**File Naming:** `coaching-[topic-slug]-[date-YYYYMMDD].md`

**Example:** `coaching-strategic-thinking-20260114.md`

---

## 5. Stakeholder Communication Workflow

**Purpose:** Generate board updates, partnership communications, stakeholder briefings

**Prerequisites:** Communication purpose clear, context profiles loaded

### Steps

#### Step 1: Define Communication Need

**Prompt Pattern:**
```
Use stakeholder-comm to create [content type] on [topic] for [stakeholder]

Examples:
- "Use stakeholder-comm to create board update on advisory session outcomes for AMANA leadership"
- "Use stakeholder-comm to create partnership introduction for ASEAN health ministry"
- "Use stakeholder-comm to create meeting summary for project stakeholders"
```

#### Step 2: Skill Generates Communication

**What Happens:**
- Skill loads context profiles for target stakeholder
- Creates clear purpose and scope
- Organizes content by priority
- Includes strategic highlights
- Specifies next steps and commitments
- Maintains appropriate tone for stakeholder

#### Step 3: Review for Effectiveness

**Quality Checks:**
- [ ] Clear purpose stated
- [ ] Information organized by priority
- [ ] Strategic highlights identify key points
- [ ] Implications clear for stakeholder
- [ ] Next steps specific and actionable
- [ ] Professional tone maintained
- [ ] Contact information included
- [ ] Confidentiality respected

#### Step 4: Save Output

**Location:** `outputs/stakeholder-comm/`

**File Naming:** `comm-[audience]-[topic-slug]-[date-YYYYMMDD].md`

**Example:** `comm-board-advisory-session-summary-20260114.md`

---

## 6. Policy Brief Development Workflow

**Purpose:** Generate policy briefs, position papers, and advocacy materials

**Prerequisites:** Policy issue defined, research evidence available, context profiles loaded

### Steps

#### Step 1: Define Policy Issue

**Prompt Pattern:**
```
Use policy-brief to create [content type] on [topic] for [policy audience]

Examples:
- "Use policy-brief to create policy brief on ASEAN health data sharing for ASEAN health ministers"
- "Use policy-brief to create position paper on digital health regulation for policymakers"
- "Use policy-brief to create testimony content for health committee hearing"
```

#### Step 2: Skill Generates Policy Content

**What Happens:**
- Skill loads context profiles (focus on ICP-02 or ICP-03)
- Defines policy issue with data support
- Conducts stakeholder analysis
- Presents 2-4 policy options with assessment
- Recommends preferred approach with rationale
- Includes implementation pathway
- All claims cited in APA 7th format

#### Step 3: Review for Policy Impact

**Quality Checks:**
- [ ] Executive summary concise and compelling
- [ ] Issue statement clear and data-supported
- [ ] Policy context thorough
- [ ] Stakeholder analysis balanced
- [ ] Policy options fairly presented
- [ ] Recommendations evidence-based
- [ ] Implementation pathway realistic
- [ ] APA 7th citations complete
- [ ] Equity considerations prominent

#### Step 4: Save Output

**Location:** `outputs/strategic-insights/` (or appropriate folder based on use)

**File Naming:** `policy-brief-[topic-slug]-[date-YYYYMMDD].md`

**Example:** `policy-brief-asean-health-data-sharing-20260114.md`

---

## 7. Quality Assurance Checklist

### Universal Quality Checks (All Content Types)

**Context Loading:**
- [ ] business_profile.json loaded
- [ ] icp.json loaded - segment identified
- [ ] voice_dna_profile.json loaded

**Content Standards:**
- [ ] Logical coherence and analytical progression
- [ ] Evidence-based claims with APA 7th citations
- [ ] Practical relevance and implementation insights
- [ ] SEED values considered and addressed
- [ ] Appropriate formality level for audience

**Technical Standards:**
- [ ] APA 7th citation format applied correctly
- [ ] Reference list complete and alphabetized
- [ ] All in-text citations have corresponding references
- [ ] File follows naming convention

**Voice and Tone:**
- [ ] Advisory-collaborative-authoritative tone maintained
- [ ] Domain-specific language used appropriately
- [ ] Avoided phrases not used
- [ ] Level of detail appropriate for audience

### Output Verification

**Before Finalizing:**
- [ ] Content saved to correct directory
- [ ] File name follows convention
- [ ] Metadata complete (date, audience, purpose)
- [ ] No placeholder text remaining
- [ ] Professional formatting applied

---

## 8. File Naming Conventions

### Research Reports
```
[topic]-[date-YYYYMMDD]-[focus-area].md
```
**Examples:**
- `asean-digital-health-governance-20260114-health-policy.md`
- `public-goods-advisory-models-20260114-strategic-advisory.md`
- `leadership-coaching-frameworks-20260114-capacity-building.md`

### Strategic Insights
```
strategic-[topic-slug]-[date-YYYYMMDD].md
```
**Examples:**
- `strategic-digital-health-governance-20260114.md`
- `strategic-asean-partnerships-20260114.md`

### Thought Leadership
```
article-[topic-slug]-[date-YYYYMMDD].md
```
**Examples:**
- `article-asean-health-collaboration-20260114.md`
- `article-public-goods-innovation-20260114.md`

### Coaching Materials
```
coaching-[topic-slug]-[date-YYYYMMDD].md
```
**Examples:**
- `coaching-strategic-thinking-20260114.md`
- `coaching-stakeholder-engagement-20260114.md`

### Stakeholder Communications
```
comm-[audience]-[topic-slug]-[date-YYYYMMDD].md
```
**Examples:**
- `comm-board-advisory-session-summary-20260114.md`
- `comm-asean-ministry-partnership-20260114.md`

### Policy Briefs
```
policy-brief-[topic-slug]-[date-YYYYMMDD].md
```
**Examples:**
- `policy-brief-asean-health-data-sharing-20260114.md`
- `policy-brief-digital-health-regulation-20260114.md`

---

## 9. System Maintenance

### Regular Maintenance Tasks

**Weekly:**
- [ ] Review generated outputs for quality
- [ ] Organize knowledge base findings
- [ ] Update market intelligence by ICP segment

**Monthly:**
- [ ] Review and refine context profiles if needed
- [ ] Update skill prompts based on usage patterns
- [ ] Refresh reference materials in knowledge/

**Quarterly:**
- [ ] Full system audit - all files and templates
- [ ] Skill performance review and refinement
- [ ] Template updates based on feedback
- [ ] Citation guide updates if standards change

### Context Profile Updates

**When to Update business_profile.json:**
- New affiliations or credentials added
- Service portfolio changes
- Geographic scope adjustments
- SEED values clarification needed

**When to Update icp.json:**
- New audience segments identified
- Segment priorities change
- Stakeholder landscape shifts
- New patterns in stakeholder engagement

**When to Update voice_dna_profile.json:**
- Communication style evolution
- New avoided phrases identified
- Domain-specific voices refined
- Feedback on tone or style

---

## Quick Reference

### Common Prompt Patterns

**Research:**
```
Use your advisory research agent to [objective]
```

**Content Generation:**
```
Use [skill-name] to create [content type] on [topic] for [audience]
```

**Multi-Format from Research:**
```
1. Use your advisory research agent to investigate [topic]

2. Use thought-leadership to create article on [topic] based on research

3. Use stakeholder-comm to create briefing summary on [topic]
```

### Tool Selection Guide

| Research Need | Tool |
|---------------|------|
| Quick facts, overview | tavily_search |
| Context-specific, deeper search | tavily_searchContext |
| Analyzing multiple sources | tavily_extract |

### Skill Selection Guide

| Content Type | Skill |
|--------------|-------|
| Strategic advisory, policy analysis | strategic-insight |
| Articles, op-eds, speaking content | thought-leadership |
| Training, frameworks, development | coaching-material |
| Board updates, partnerships | stakeholder-comm |
| Policy briefs, position papers | policy-brief |

---

**SOP Version:** 1.0
**Last Updated:** 2025-01-14
**Maintained by:** AMANA Advisory Board Writing System
