---
name: research
version: 1.0.0
description: Advanced research capabilities including web search, literature review, fact-checking, and information synthesis
model: claude-opus-4-6
tools:
  - tavily-search
  - web-search
  - sequential-thinking
tags: [research, analysis, information-gathering]
categories: [core-cognitive, research]
---

# Research Skill

## Overview

This skill provides comprehensive research capabilities for gathering, analyzing, and synthesizing information from multiple sources. It enables agents to conduct thorough investigations on any topic using web search, academic literature, and fact-checking methodologies.

## Core Capabilities

### 1. Web Research
- Browse and extract information from web sources
- Follow citation chains and reference trails
- Cross-reference information across multiple sources
- Identify primary vs. secondary sources

### 2. Literature Review
- Search academic databases (PubMed, Google Scholar, arXiv)
- Synthesize findings from multiple papers
- Extract key insights and methodologies
- Build citation networks

### 3. Fact-Checking
- Verify claims against reliable sources
- Identify potential misinformation
- Assess source credibility
- Flag uncertain or disputed information

### 4. Information Synthesis
- Combine findings from multiple sources
- Identify patterns and trends
- Generate comprehensive summaries
- Create structured knowledge bases

## Progressive Disclosure

### Level 1: Metadata
- Search query formulation
- Source selection criteria
- Quality assessment indicators

### Level 2: Methodology
- Research strategy development
- Source evaluation frameworks
- Citation standards (APA 7th edition)
- Ethical research guidelines

### Level 3: Advanced Techniques
- Systematic literature review
- Meta-analysis methodologies
- Citation network analysis
- Temporal trend analysis

## Usage Guidelines

### When to Use This Skill
- Need to gather information on unfamiliar topics
- Verify claims or statements
- Find supporting evidence
- Explore multiple perspectives
- Build comprehensive understanding

### Research Process

1. **Planning Phase**
   - Define research objectives
   - Identify key questions
   - Determine source types needed
   - Set quality criteria

2. **Search Phase**
   - Formulate targeted queries
   - Use multiple search strategies
   - Follow relevant citations
   - Expand/narrow scope as needed

3. **Evaluation Phase**
   - Assess source credibility
   - Check for bias and conflicts
   - Verify factual claims
   - Cross-reference information

4. **Synthesis Phase**
   - Identify common themes
   - Resolve contradictions
   - Build coherent narrative
   - Document sources properly

## Output Format

### Research Summary Structure
```markdown
# Research Summary: [Topic]

## Executive Summary
[2-3 sentence overview]

## Key Findings
1. [Finding 1 with source]
2. [Finding 2 with source]
3. [Finding 3 with source]

## Detailed Analysis
[Comprehensive analysis with citations]

## Sources
[Full citations in APA 7th format]

## Knowledge Gaps
[Areas needing further research]

## Confidence Assessment
[Overall confidence level and reasoning]
```

## Best Practices

### Source Evaluation
- Prioritize peer-reviewed sources
- Check publication dates and relevance
- Verify author credentials
- Assess publisher reputation

### Citation Standards
- Use APA 7th edition format
- Include DOIs when available
- Provide direct links for web sources
- Distinguish between primary and secondary sources

### Quality Indicators
- **High Confidence**: Multiple credible sources agree
- **Medium Confidence**: Limited or conflicting sources
- **Low Confidence**: Single or questionable source
- **Unverified**: Unable to verify from reliable sources

## Common Pitfalls

1. **Confirmation Bias**: Only seeking sources that confirm existing beliefs
2. **Source Over-reliance**: Relying too heavily on single sources
3. **Publication Bias**: Overlooking unpublished or negative results
4. **Currency Issues**: Using outdated information
5. **Citation Errors**: Misattributing or misquoting sources

## Integration with Other Skills

- **Writing Skill**: Research findings can be structured into various formats
- **Analysis Skill**: Raw data can be analyzed for patterns and insights
- **Domain Skills**: Healthcare, business, or technical domain knowledge filters research findings

## Example Usage

```
Task: "Research the current state of quantum computing applications in healthcare"

1. Plan: Identify key areas (imaging, drug discovery, diagnostics)
2. Search: Query academic databases and news sources
3. Evaluate: Assess source quality and relevance
4. Synthesize: Create structured summary with citations
5. Gaps: Note areas needing more research
```

## Performance Metrics

- **Search Precision**: Percentage of relevant results
- **Source Quality**: Average credibility score of sources
- **Citation Accuracy**: Correctness of citations
- **Synthesis Completeness**: Coverage of key aspects
- **Time Efficiency**: Research completion time
