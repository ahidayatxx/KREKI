"""
Research Agent Example

A specialized agent for conducting comprehensive research including
web search, literature review, and information synthesis.
"""

import asyncio
import os
from typing import Dict, Any, Optional, List

# Import framework components
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../..'))

from core.agent.base_agent import BaseAgent, AgentConfig, AgentResponse
from core.providers import ProviderFactory, ProviderType
from core.agent.tool_selector import ToolSelector, ToolCategory


# Research tools
async def web_search(query: str, num_results: int = 5) -> str:
    """Search the web for information on a topic.

    Args:
        query: Search query string
        num_results: Number of results to return (default: 5)

    Returns:
        Search results as formatted text
    """
    # This would integrate with a real search API
    # For example, implement Tavily or Perplexity search
    return f"Search results for '{query}':\n- Result 1: ...\n- Result 2: ..."


async def search_literature(topic: str, max_papers: int = 10) -> str:
    """Search academic literature for papers on a topic.

    Args:
        topic: Research topic
        max_papers: Maximum number of papers to retrieve

    Returns:
        Literature search results with citations
    """
    # This would integrate with PubMed, Google Scholar, etc.
    return f"Literature search for '{topic}':\n1. Paper 1 (2024)\n2. Paper 2 (2023)"


async def fact_check(claim: str) -> str:
    """Verify a claim against reliable sources.

    Args:
        claim: The claim to verify

    Returns:
        Fact-check result with credibility assessment
    """
    return f"Fact check for '{claim}':\nStatus: Verified\nSources: [1], [2]"


async def extract_citations(text: str) -> str:
    """Extract and format citations from text.

    Args:
        text: Text containing citations

    Returns:
        Formatted citations in APA 7th edition
    """
    return "APA 7th Edition Citations:\n- Author, A. A. (Year). Title..."


class ResearchAgent:
    """
    Specialized agent for conducting comprehensive research.

    Capabilities:
    - Web search and information gathering
    - Academic literature review
    - Fact-checking and verification
    - Information synthesis with proper citations
    """

    def __init__(
        self,
        provider_type: ProviderType = ProviderType.CLAUDE,
        model: str = "claude-3-opus-20240229",
        api_key: Optional[str] = None
    ):
        """
        Initialize the research agent.

        Args:
            provider_type: LLM provider to use
            model: Model identifier
            api_key: API key (defaults to environment variable)
        """
        # Get API key from environment if not provided
        if not api_key:
            if provider_type == ProviderType.CLAUDE:
                api_key = os.getenv("ANTHROPIC_API_KEY")
            elif provider_type == ProviderType.OPENAI:
                api_key = os.getenv("OPENAI_API_KEY")
            elif provider_type == ProviderType.GEMINI:
                api_key = os.getenv("GOOGLE_API_KEY")

        # Create provider
        self.provider = ProviderFactory.create(
            provider_type=provider_type,
            api_key=api_key,
            model=model
        )

        # Create tool selector with research tools
        self.tool_selector = ToolSelector([
            web_search,
            search_literature,
            fact_check,
            extract_citations
        ])

        # Create agent configuration
        self.config = AgentConfig(
            name="ResearchAgent",
            description="Context-aware research specialist",
            system_prompt=self._get_system_prompt(),
            provider=self.provider,
            model=model,
            temperature=0.5,  # Lower temperature for factual accuracy
            max_tokens=4096,
            enable_reasoning=True,
            enable_memory=True,
            max_iterations=15
        )

        # Create base agent
        self.agent = BaseAgent(
            config=self.config,
            tools=[web_search, search_literature, fact_check, extract_citations],
            context=self._get_default_context()
        )

    def _get_system_prompt(self) -> str:
        """Get the system prompt for the research agent."""
        return """You are an expert research agent with deep knowledge of research methodologies, information evaluation, and synthesis techniques.

Your capabilities include:
- Conducting comprehensive web searches and literature reviews
- Evaluating source credibility and fact-checking claims
- Synthesizing findings from multiple sources
- Providing properly cited results in APA 7th edition format

Always:
1. Clearly state your research approach
2. Cite all sources with proper attribution
3. Indicate confidence levels for findings (High/Medium/Low)
4. Flag uncertain or disputed information
5. Provide actionable insights based on evidence
6. Distinguish between primary and secondary sources

Research Process:
1. Planning: Define objectives and identify key questions
2. Search: Use multiple search strategies and follow citations
3. Evaluation: Assess source credibility and check for bias
4. Synthesis: Combine findings and identify patterns
5. Reporting: Present with proper citations and confidence levels

Output Format:
- Executive Summary (2-3 sentences)
- Key Findings (with source citations)
- Detailed Analysis (with evidence)
- Sources (APA 7th edition format)
- Knowledge Gaps (areas needing more research)
- Confidence Assessment (overall and per finding)"""

    def _get_default_context(self) -> Dict[str, Any]:
        """Get default context for the research agent."""
        return {
            "research_domain": "general",
            "citation_style": "APA_7th",
            "source_quality_threshold": "medium",
            "confidence_reporting": True
        }

    async def research(
        self,
        topic: str,
        session_id: Optional[str] = None,
        research_type: str = "comprehensive"
    ) -> AgentResponse:
        """
        Conduct research on a topic.

        Args:
            topic: Research topic or question
            session_id: Optional session ID for context persistence
            research_type: Type of research (comprehensive, quick, literature, fact_check)

        Returns:
            Research findings with citations
        """
        # Craft research request
        if research_type == "comprehensive":
            prompt = f"""Conduct comprehensive research on: {topic}

Please:
1. Search for recent information and expert sources
2. Review academic literature if applicable
3. Synthesize findings from multiple perspectives
4. Provide properly cited conclusions with confidence levels

Format your response with:
- Executive Summary
- Key Findings (with citations)
- Detailed Analysis
- Sources (APA 7th edition)
- Confidence Assessment"""

        elif research_type == "quick":
            prompt = f"""Quick research on: {topic}

Provide a brief summary with:
- Main facts and information
- Key sources
- Confidence level"""

        elif research_type == "literature":
            prompt = f"""Conduct a literature review on: {topic}

Search for and analyze academic papers, focusing on:
- Recent publications (last 5 years)
- Key findings and methodologies
- Research gaps and future directions
- Citation network analysis

Provide APA 7th edition citations."""

        elif research_type == "fact_check":
            prompt = f"""Fact-check this claim: {topic}

Evaluate:
- Factual accuracy
- Source credibility
- Supporting or contradicting evidence
- Overall verdict (True/False/Mixed/Unverified)"""

        else:
            prompt = f"Research: {topic}"

        # Run the agent
        return await self.agent.run(prompt, session_id)

    async def literature_review(
        self,
        topic: str,
        max_papers: int = 10,
        session_id: Optional[str] = None
    ) -> AgentResponse:
        """
        Conduct a systematic literature review.

        Args:
            topic: Research topic
            max_papers: Maximum number of papers to review
            session_id: Optional session ID

        Returns:
            Literature review with synthesized findings
        """
        prompt = f"""Conduct a systematic literature review on: {topic}

Requirements:
- Review up to {max_papers} relevant papers
- Focus on recent research (last 5 years when possible)
- Synthesize key findings and methodologies
- Identify research gaps and contradictions
- Provide complete APA 7th edition citations

Structure your response:
1. Abstract/Summary
2. Methodology (search strategy)
3. Key Findings by Theme
4. Discussion and Synthesis
5. Research Gaps
6. References"""

        return await self.agent.run(prompt, session_id)

    async def fact_check(
        self,
        claim: str,
        session_id: Optional[str] = None
    ) -> AgentResponse:
        """
        Verify a factual claim.

        Args:
            claim: Claim to verify
            session_id: Optional session ID

        Returns:
            Fact-check result with credibility assessment
        """
        prompt = f"""Fact-check the following claim: "{claim}"

Please:
1. Search for reliable sources that confirm or refute this claim
2. Assess the credibility of sources
3. Evaluate the accuracy of the claim
4. Provide a clear verdict (True/False/Mixed/Unverified)
5. List supporting sources

Format:
- Claim: [restated claim]
- Verdict: [True/False/Mixed/Unverified]
- Confidence: [High/Medium/Low]
- Evidence: [supporting information]
- Sources: [with credibility assessment]"""

        return await self.agent.run(prompt, session_id)

    async def compare_sources(
        self,
        topic: str,
        session_id: Optional[str] = None
    ) -> AgentResponse:
        """
        Compare information from multiple sources on a topic.

        Args:
            topic: Topic to compare sources for
            session_id: Optional session ID

        Returns:
            Source comparison with consensus and discrepancies
        """
        prompt = f"""Research and compare multiple sources on: {topic}

Please:
1. Gather information from at least 3 different source types
2. Identify areas of consensus
3. Note discrepancies or conflicting information
4. Assess source credibility and potential biases
5. Provide a synthesized view with source attribution

Source types to include:
- Academic/peer-reviewed sources
- News/journalism sources
- Expert/industry sources
- Primary sources if applicable"""

        return await self.agent.run(prompt, session_id)


# Example usage
async def main():
    """Example usage of the ResearchAgent."""

    # Create agent
    agent = ResearchAgent()

    # Conduct comprehensive research
    response = await agent.research(
        "The current state of quantum computing applications in healthcare",
        research_type="comprehensive"
    )

    print("=" * 80)
    print("RESEARCH RESULTS")
    print("=" * 80)
    print(response.content)
    print("\nMetadata:")
    print(f"- Tokens used: {response.tokens_used}")
    print(f"- Duration: {response.duration_ms:.0f}ms")
    print(f"- Iterations: {response.metadata.get('iterations', 'N/A')}")

    # Fact check a claim
    fact_check_result = await agent.fact_check(
        "Quantum computers can solve all problems faster than classical computers"
    )

    print("\n" + "=" * 80)
    print("FACT CHECK RESULTS")
    print("=" * 80)
    print(fact_check_result.content)


if __name__ == "__main__":
    asyncio.run(main())
