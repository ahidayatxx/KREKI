# Digital Health Thought Leadership System - Workflows

**Version:** 2.0
**Last Updated:** 2025-01-12
**System:** Dr. Ahmad Hidayat's Digital Health Thought Leadership AI Writing System

This document outlines standard operating procedures (SOPs) for generating research reports, thought leadership content, client deliverables, and social media content using the context-engineered AI writing system.

---

## System Overview

### Core Components

1. **Context Profiles** (`context/`)
   - `business_profile.json` - Professional identity and market positioning
   - `icp.json` - Ideal Customer Profiles (5 segments)
   - `voice_dna_profile.json` - Communication and linguistic guidelines

2. **Custom Agents** (`agents/`)
   - `research-agent.md` - Enhanced research specialist with Perplexity & Tavily MCP

3. **Skills** (`skills/`)
   - `academic-writer.md` - Scholarly publication writing with APA 7th citations
   - `policy-brief.md` - Policy recommendation documents with APA 7th citations
   - `presentation.md` - Conference/slide deck content with APA 7th citations
   - `linkedin-writer.md` - Professional social media content with source attribution

4. **Templates** (`templates/`)
   - `research-report.md` - Market research report structure with APA 7th bibliography
   - `thought-leadership.md` - Article/blog post template with APA 7th references
   - `policy-brief.md` - Government policy format with APA 7th citations

5. **Output Directories** (`outputs/`)
   - `articles/` - Thought leadership publications
   - `linkedin/` - Social media content
   - `presentations/` - Conference materials
   - `client-deliverables/` - Client-facing work

6. **Knowledge Base** (`knowledge/`)
   - `research-reports/` - Accumulated research outputs
   - `market-intelligence/` - Segment-specific data
   - `reference-materials/` - Policy docs, white papers

### MCP Integration

**Perplexity MCP Server** provides three research tools:
- `perplexity_search` - Quick searches for simple queries using Perplexity Sonar model
- `perplexity_reasoning` - Multi-step complex tasks using Perplexity Sonar Reasoning Pro model
- `perplexity_deep_research` - In-depth analysis generating detailed multi-page reports

**Tavily MCP Server** provides three research tools:
- `tavily_search` - General web search with AI-optimized results
- `tavily_searchContext` - Context-aware search for relevant information
- `tavily_extract` - Extract structured content from multiple URLs

### Citation Standards (APA 7th Edition)

**ALL system outputs MUST include:**
1. **In-text citations** in APA 7th edition parenthetical format: (Author, Year) or (Organization, Year)
2. **Complete reference list** in APA 7th edition format at the end of every output
3. **Source attribution** for all statistics, data, and research findings
4. **Consistent formatting** following APA 7th guidelines for different source types

---

## Workflow 1: Research Report Generation

**Purpose:** Generate comprehensive market research reports for niche validation, competitive analysis, or market intelligence.

### Prerequisites
- Perplexity MCP server configured and accessible
- Target ICP segment identified
- Research question clearly defined

### Steps

#### 1.1 Define Research Objective
```
Prompt: "Use your research agent to [specific research objective]
for [target ICP segment]. Run a deep research report."

Example: "Use your research agent to determine market demand for
digital health governance consulting services among Indonesian provincial
health offices. Run a deep research report."
```

#### 1.2 Agent Loads Context
The research agent will automatically:
- Read `context/business_profile.json`
- Read `context/icp.json` for the target segment
- Read `context/voice_dna_profile.json`

#### 1.3 Agent Conducts Research
- Uses `perplexity_deep_research` for comprehensive reports
- Filters findings through business context
- Generates structured output with executive summary

#### 1.4 Review and Refine
```
If content needs adjustment:
"Based on the research, create a PDF report with:
1. Your executive summary tailored to my context
2. The full original report
3. Strategic recommendations for [specific focus]"
```

#### 1.5 Save Output
- Research agent saves to `knowledge/research-reports/`
- Extract key data to `knowledge/market-intelligence/[icp-segment]/`
- Note: File naming convention: `[topic]-[date]-[icp].md`

### Output Format
- Executive summary with key findings
- Structured findings with evidence citations
- ICP-segment-specific implications
- Strategic recommendations with priorities
- Source citations in appendix

---

## Workflow 2: Thought Leadership Article

**Purpose:** Generate articles or blog posts demonstrating expertise and addressing industry challenges.

### Prerequisites
- Clear topic and angle defined
- Target publication/venue identified
- Optional: Research data to incorporate

### Steps

#### 2.1 Gather Research (if needed)
```
Prompt: "Use your research agent to gather latest insights on [topic]
specifically for [target ICP segment]. Focus on [specific aspect]."
```

#### 2.2 Apply Appropriate Skill
```
For academic publications:
"Use academic-writer skill to generate a journal article on [topic]
based on research findings."

For general thought leadership:
"Create a thought leadership article on [topic] using the
thought-leadership template. Target audience: [ICP segment]."
```

#### 2.3 Review and Edit
- Verify voice DNA alignment (scholarly-professional)
- Check business profile references (credentials, affiliations)
- Ensure ICP segment pain points are addressed
- Confirm evidence-based claims with citations

#### 2.4 Final Polish
```
"Refine the article to emphasize [specific angle]. Ensure tone is
authoritative yet collaborative. Add specific references to
[SATUSEHAT/Regulatory Sandbox/work experience]."
```

#### 2.5 Save Output
- Save to `outputs/articles/` with descriptive filename
- Include metadata: topic, date, target ICP, publication venue

### Output Format
- Compelling title and subtitle
- Hook-based opening
- Evidence-based analysis
- Strategic implications
- Actionable recommendations
- Author bio section

---

## Workflow 3: Policy Brief Creation

**Purpose:** Generate concise policy recommendations for government decision-makers.

### Prerequisites
- Specific policy issue identified
- Target government official/agency defined
- Relevant research or data available

### Steps

#### 3.1 Research Policy Landscape
```
Prompt: "Use your research agent to analyze current policy landscape
for [specific issue] in Indonesian digital health. Focus on
government decision-maker considerations."
```

#### 3.2 Apply Policy Brief Skill
```
"Use policy-brief skill to create a policy brief on [issue] for
[target official/agency]. Include policy options analysis and
specific recommendations."
```

#### 3.3 Incorporate Insider Perspective
- Leverage SATUSEHAT TWG Chairman perspective where relevant
- Draw on Regulatory Sandbox Expert Panel experience
- Reference government affiliations appropriately
- Maintain appropriate advisory tone

#### 3.4 Review for Political Context
- Consider bureaucratic constraints
- Acknowledge stakeholder interests
- Provide realistic implementation pathways
- Include risk mitigation strategies

#### 3.5 Save Output
- Save to `outputs/client-deliverables/` or `outputs/articles/`
- Label clearly as policy brief

### Output Format
- Executive summary upfront
- Clear issue statement with urgency
- 2-3 policy options with comparative analysis
- Specific recommendation with rationale
- Implementation timeline and considerations
- Stakeholder mapping

---

## Workflow 4: Conference Presentation

**Purpose:** Generate slide deck content for conference talks, academic presentations, or workshops.

### Prerequisites
- Conference and topic defined
- Presentation length known
- Audience knowledge level assessed

### Steps

#### 4.1 Research Topic (if needed)
```
Prompt: "Use your research agent to gather latest findings on
[topic] for a [length] presentation at [conference type]."
```

#### 4.2 Apply Presentation Skill
```
"Use presentation skill to create slide content for [topic].
Presentation type: [keynote/conference talk/workshop]
Duration: [minutes]
Audience: [description]"
```

#### 4.3 Develop Visual Descriptions
- For each slide, provide visual content specifications
- Include chart/graph data and styling instructions
- Add diagram descriptions where needed
- Note image suggestions for relevant slides

#### 4.4 Write Speaker Notes
- Provide talking points for each slide
- Include timing cues
- Add transition language between slides
- Note emphasis points and examples

#### 4.5 Review Time Allocation
- Verify slide count fits presentation time
- Aim for ~2 minutes per slide average
- Adjust content for Q&A time allocation
- Ensure opening establishes relevance quickly

#### 4.6 Save Output
- Save to `outputs/presentations/`
- Include conference name, date, audience info

### Output Format
- Slide-by-slide content outline
- Title/subtitle for each slide
- Bullet points (3-5 per slide, 6-8 words each)
- Visual descriptions with specifications
- Comprehensive speaker notes
- Contact/Q&A slide

---

## Workflow 5: LinkedIn/Social Media Content

**Purpose:** Generate engaging LinkedIn posts to build thought leadership and professional network.

### Prerequisites
- Content theme or news hook identified
- Engagement goal defined
- Posting schedule considered

### Steps

#### 5.1 Choose Content Type
- **Insight Post** - Share learning or perspective
- **News Commentary** - React to industry news
- **Question/Poll** - Spark conversation
- **Achievement Share** - Celebrate milestones
- **Resource Share** - Curate valuable content

#### 5.2 Apply LinkedIn Writer Skill
```
"Use linkedin-writer skill to create a LinkedIn post about [topic].
Content type: [insight/news-commentary/question/etc.]
Target engagement: [goal - e.g., spark discussion on X]"
```

#### 5.3 Optimize for LinkedIn Algorithm
- Ensure hook grabs attention in first 1-2 lines
- Verify text is broken into short paragraphs
- Check 3-5 relevant hashtags included
- Confirm engagement element (question/poll) present
- Keep total character count under 1,500 for optimal reach

#### 5.4 Add Visual Element (optional but recommended)
```
"Suggest an image for this LinkedIn post with:
- Dimensions: 1200 x 627 pixels
- Subject: [description]
- Style: [professional/clinical/chart/etc.]"
```

#### 5.5 Review Voice and Tone
- Professional yet conversational
- Specific over generic
- Evidence-based claims
- Appropriate for professional network
- Avoids overused phrases

#### 5.6 Save Output
- Save to `outputs/linkedin/`
- Include topic, date, suggested hashtags

### Output Format
- Attention-grabbing hook (first 1-2 lines)
- Concise body paragraphs (mobile-optimized)
- Clear value or insight
- Engagement element (question/discussion prompt)
- 3-5 relevant hashtags
- Optional: Visual content description

---

## Workflow 6: Client Deliverable Creation

**Purpose:** Generate client-facing reports, analyses, or advisory outputs.

### Prerequisites
- Client requirements defined
- Scope and deliverables agreed
- Timeline and format specified

### Steps

#### 6.1 Conduct Research
```
Prompt: "Use your research agent to prepare [deliverable type] for
[client type]. Focus on [specific question/challenge]. Run deep
research and save to knowledge/research-reports/."
```

#### 6.2 Generate Deliverable
```
For research reports:
"Create a client-facing report based on the research. Include:
1. Executive summary with client context
2. Key findings and implications
3. Strategic recommendations
4. Implementation roadmap
5. Save to outputs/client-deliverables/"

For presentations:
"Use presentation skill to create slide content for client
presentation on [topic]. Audience: [client roles]"
```

#### 6.3 Apply Quality Control
- Verify client confidentiality (no sensitive info)
- Check all claims are supported
- Ensure recommendations are actionable
- Confirm alignment with client context
- Review for competitive sensitivity

#### 6.4 Format for Delivery
- Apply client branding if specified
- Use client's preferred format (PDF, PPTX, etc.)
- Include proper attribution if research sourced
- Add client cover page/metadata if needed

#### 6.5 Save Output
- Save to `outputs/client-deliverables/`
- Include client name, date, deliverable type

### Output Format
- Professional report structure
- Client-contextualized insights
- Actionable recommendations
- Implementation considerations
- Confidentiality-appropriate content

---

## Quality Assurance Checklist

All content should be verified against:

### Context Alignment
- [ ] Business profile credentials accurately reflected
- [ ] ICP segment pain points addressed
- [ ] Voice DNA guidelines followed (scholarly-professional, authoritative yet collaborative)
- [ ] Indonesian healthcare ecosystem context applied

### Content Standards
- [ ] All claims evidence-based with citations where applicable
- [ ] **In-text citations included in APA 7th edition format**
- [ ] **Complete reference list/bibliography in APA 7th edition format**
- [ ] **All sources cited have corresponding references in bibliography**
- [ ] Logical flow with clear transitions
- [ ] Specific over generic assertions
- [ ] Acknowledges limitations where appropriate

### Technical Standards
- [ ] Proper file naming convention used
- [ ] Output saved to appropriate directory
- [ ] Metadata included for future reference
- [ ] Knowledge base updated if research generated

### Professional Standards
- [ ] No prohibited phrases ("delve into", "dive deep", etc.)
- [ ] Maintains appropriate formality level
- [ ] Balances technical depth with accessibility
- [ ] Demonstrates systems thinking and multi-stakeholder perspective

---

## File Naming Conventions

### Research Reports
```
knowledge/research-reports/[topic]-[date-YYYYMMDD]-[icp-segment].md
Example: satusehat-adoption-challenges-20250112-government.md
```

### Articles
```
outputs/articles/[topic-slug]-[date-YYYYMMDD].md
Example: digital-health-governance-framework-20250112.md
```

### LinkedIn Posts
```
outputs/linkedin/[topic-slug]-[date-YYYYMMDD].md
Example: satusehat-interoperability-lessons-20250112.md
```

### Presentations
```
outputs/presentations/[conference-name]-[topic-slug]-[date-YYYYMMDD].md
Example: SHARE-2025-satusehat-governance-20250112.md
```

### Client Deliverables
```
outputs/client-deliverables/[client-name]-[deliverable-type]-[date-YYYYMMDD].md
Example: MOH-advisory-satusehat-roadmap-20250112.md
```

---

## Common Command Patterns

### Research Queries
```
"Use your research agent to [research objective]"
"Use your research agent to run gap analysis for [ICP segment]"
"Use your research agent to validate market demand for [service]"
```

### Content Generation
```
"Use academic-writer skill to create [output type] on [topic]"
"Use policy-brief skill to create brief on [issue] for [official]"
"Use presentation skill for [presentation type] on [topic]"
"Use linkedin-writer skill for post about [topic]"
```

### Report Generation
```
"Create a PDF research report with your executive summary"
"Generate a thought leadership article using the template"
"Compile research findings into client-facing format"
```

---

## Workflow Integration

The system is designed for iterative workflows:

1. **Research → Content** - Research informs content generation
2. **Content → Knowledge** - Generated content adds to knowledge base
3. **Knowledge → Research** - Accumulated knowledge enhances future research

**Example Integrated Workflow:**
```
1. Research agent investigates topic → Saved to knowledge/
2. Academic writer skill uses research → Creates article
3. LinkedIn writer skill extracts insights → Creates social post
4. Presentation skill synthesizes content → Creates conference talk
5. All outputs reference context profiles for consistency
```

---

## Troubleshooting

### Research Agent Not Working
- **Symptom:** Agent doesn't use Perplexity tools
- **Solution:** Explicitly request: "Use your research agent to..."
- **Verify:** MCP server accessible with `/mcp` command

### Context Not Loading
- **Symptom:** Generic content not tailored to ICP
- **Solution:** Restart Claude Code to load new agents
- **Verify:** Context files exist in `context/` folder

### Output Wrong Directory
- **Symptom:** Files saved to wrong location
- **Solution:** Explicitly specify output location in prompt
- **Pattern:** "Save to outputs/[directory]/"

### Voice DNA Inconsistency
- **Symptom:** Tone too casual or too academic
- **Solution:** Reference voice_dna_profile.json explicitly
- **Check:** For prohibited phrases and formality level

---

**System Version:** 2.0
**Last Updated:** 2025-01-12
**Maintainer:** Dr. Ahmad Hidayat, MSc, MBA
