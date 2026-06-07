---
name: analysis
version: 1.0.0
description: Comprehensive analysis capabilities including data analysis, text analysis, code analysis, pattern recognition, and insight generation
model: claude-opus-4-6
tools:
  - data-processing
  - statistical-analysis
  - pattern-recognition
tags: [analysis, data, insights]
categories: [analysis, core-cognitive]
---

# Analysis Skill

## Overview

This skill provides powerful analysis capabilities for extracting insights from various data types including structured data, unstructured text, and code. It enables agents to identify patterns, anomalies, trends, and generate actionable insights.

## Core Capabilities

### 1. Data Analysis
- **Statistical Analysis**: Descriptive and inferential statistics
- **Pattern Recognition**: Identify trends, cycles, correlations
- **Anomaly Detection**: Find outliers and unusual patterns
- **Data Visualization**: Create charts, graphs, visual summaries
- **Time Series Analysis**: Temporal pattern detection and forecasting
- **Comparative Analysis**: Compare datasets and identify differences

### 2. Text Analysis
- **Sentiment Analysis**: Detect emotional tone and opinion
- **Entity Extraction**: Identify people, places, organizations, dates
- **Topic Modeling**: Discover themes and subject matter
- **Summarization**: Condense information while preserving meaning
- **Keyword Extraction**: Identify important terms and phrases
- **Relationship Extraction**: Find connections between entities

### 3. Code Analysis
- **Code Review**: Identify issues, improvements, vulnerabilities
- **Dependency Analysis**: Map software dependencies
- **Performance Analysis**: Identify bottlenecks and optimization opportunities
- **Security Audit**: Find vulnerabilities and compliance issues
- **Code Metrics**: Calculate complexity, maintainability scores
- **Pattern Detection**: Identify anti-patterns and best practices

## Progressive Disclosure

### Level 1: Metadata
- Data type and format
- Analysis objectives
- Output format requirements
- Quality criteria

### Level 2: Methodology
- Analysis techniques and algorithms
- Statistical methods
- Validation procedures
- Interpretation frameworks

### Level 3: Advanced Techniques
- Machine learning models
- Advanced statistical methods
- Multi-dimensional analysis
- Predictive analytics

## Analysis Process

### 1. Understanding Phase
- Define analysis objectives
- Understand data context
- Identify constraints and requirements
- Determine appropriate techniques

### 2. Preparation Phase
- Data cleaning and preprocessing
- Handle missing values
- Normalize/standardize data
- Feature engineering

### 3. Analysis Phase
- Apply appropriate techniques
- Generate visualizations
- Identify patterns and insights
- Validate findings

### 4. Interpretation Phase
- Draw conclusions from findings
- Generate actionable insights
- Identify limitations and uncertainties
- Create recommendations

## Output Format

### Analysis Report Structure
```markdown
# Analysis Report: [Topic]

## Executive Summary
[Key findings and insights]

## Methodology
[Analysis approach and techniques used]

## Data Overview
[Data characteristics and quality]

## Findings
### 1. [Finding Category]
- [Insight 1]
- [Insight 2]
- [Supporting data]

### 2. [Finding Category]
[Additional findings]

## Visualizations
[Charts, graphs, tables]

## Insights and Implications
[What the findings mean]

## Recommendations
[Actionable recommendations]

## Limitations
[Analysis constraints and uncertainties]

## Appendix
[Detailed data, methodology notes]
```

## Analysis Techniques

### Statistical Methods
- **Descriptive Statistics**: Mean, median, mode, std dev, percentiles
- **Inferential Statistics**: Hypothesis testing, confidence intervals
- **Correlation Analysis**: Pearson, Spearman correlation coefficients
- **Regression Analysis**: Linear, logistic, polynomial regression
- **Time Series**: ARIMA, exponential smoothing, trend decomposition

### Text Analysis Methods
- **Sentiment Scoring**: Positive/negative/neutral classification
- **Named Entity Recognition**: Extract entities with types
- **Topic Modeling**: LDA, NMF for topic discovery
- **N-gram Analysis**: Phrase frequency analysis
- **Word Embeddings**: Semantic similarity analysis

### Code Analysis Methods
- **Static Analysis**: Code structure without execution
- **Dynamic Analysis**: Runtime behavior analysis
- **Dependency Graph Analysis**: Module/package relationships
- **Complexity Metrics**: Cyclomatic complexity, maintainability index
- **Security Scanning**: Vulnerability pattern matching

## Visualization Types

### Data Visualizations
- **Line Charts**: Trends over time
- **Bar Charts**: Categorical comparisons
- **Scatter Plots**: Relationships between variables
- **Heat Maps**: Correlation matrices
- **Box Plots**: Distribution summaries
- **Histograms**: Frequency distributions

### Text Visualizations
- **Word Clouds**: Term frequency visualization
- **Network Graphs**: Entity relationship maps
- **Topic Distributions**: Topic prevalence over time
- **Sentiment Timelines**: Sentiment changes over time

### Code Visualizations
- **Dependency Graphs**: Module dependency maps
- **Call Graphs**: Function call relationships
- **Control Flow Graphs**: Program flow visualization
- **Complexity Charts**: Code complexity by module

## Best Practices

### Data Quality
1. Verify data completeness
2. Check for inconsistencies
3. Handle outliers appropriately
4. Document data transformations
5. Validate assumptions

### Analysis Rigor
1. Use appropriate statistical methods
2. Validate findings with multiple approaches
3. Consider alternative explanations
4. Quantify uncertainty
5. Distinguish correlation from causation

### Communication
1. Start with key insights
2. Use visualizations effectively
3. Provide context for findings
4. Explain methodology clearly
5. Make recommendations actionable

## Common Pitfalls

1. **Confirmation Bias**: Interpreting data to confirm preconceptions
2. **Data Dredging**: Overfitting patterns to noise
3. **Correlation vs. Causation**: Assuming causal relationships
4. **Sample Bias**: Unrepresentative data samples
5. **Overlooking Context**: Ignoring relevant background information

## Integration with Other Skills

- **Research Skill**: Validate analysis findings with literature
- **Writing Skill**: Present analysis results clearly
- **Domain Skills**: Apply domain-specific analysis methods

## Example Usage

```
Task: "Analyze customer churn patterns for subscription service"

1. Understand: Identify churn definition, relevant data
2. Prepare: Clean customer data, handle missing values
3. Analyze: Identify churn predictors, segment customers
4. Interpret: Determine key drivers, quantify impact
5. Report: Visualize findings, recommend retention strategies
```

## Performance Metrics

- **Accuracy**: Correctness of analysis results
- **Precision**: Reproducibility of findings
- **Completeness**: Coverage of relevant aspects
- **Actionability**: Practical value of insights
- **Clarity**: Understandability of presentations
