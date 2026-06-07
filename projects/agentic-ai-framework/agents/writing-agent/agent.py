"""
Writing Agent Example

A specialized agent for creating professional content across
various formats, audiences, and purposes.
"""

import asyncio
import os
from typing import Dict, Any, Optional, List
from datetime import datetime
import json

# Import framework components
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../..'))

from core.agent.base_agent import BaseAgent, AgentConfig, AgentResponse
from core.providers import ProviderFactory, ProviderType


# Writing tools
async def save_file(content: str, filename: str, format: str = "markdown") -> str:
    """Save content to a file.

    Args:
        content: Content to save
        filename: Name of the file
        format: File format (markdown, html, txt)

    Returns:
        Confirmation message with file path
    """
    extension = {
        "markdown": ".md",
        "html": ".html",
        "txt": ".txt"
    }.get(format, ".md")

    filepath = f"output/{filename}{extension}"

    # Create output directory if it doesn't exist
    os.makedirs("output", exist_ok=True)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    return f"Content saved to {filepath}"


async def convert_format(content: str, from_format: str, to_format: str) -> str:
    """Convert content between formats.

    Args:
        content: Content to convert
        from_format: Source format
        to_format: Target format

    Returns:
        Converted content
    """
    # Simplified format conversion
    # In production, this would use proper conversion libraries
    if from_format == "markdown" and to_format == "html":
        # Basic markdown to HTML conversion
        lines = content.split('\n')
        html_lines = []
        for line in lines:
            if line.startswith('# '):
                html_lines.append(f"<h1>{line[2:]}</h1>")
            elif line.startswith('## '):
                html_lines.append(f"<h2>{line[3:]}</h2>")
            else:
                html_lines.append(f"<p>{line}</p>")
        return '\n'.join(html_lines)

    return content


async def check_readability(content: str) -> str:
    """Analyze text readability.

    Args:
        content: Text to analyze

    Returns:
        Readability metrics and suggestions
    """
    words = content.split()
    sentences = content.split('.')

    avg_sentence_length = len(words) / len(sentences) if sentences else 0

    return f"""Readability Analysis:
- Average sentence length: {avg_sentence_length:.1f} words
- Total words: {len(words)}
- Total sentences: {len(sentences)}

Recommendations:
{'- Sentences are too long. Consider breaking them up.' if avg_sentence_length > 20 else '- Sentence length is good.'}"""


async def apply_template(template_name: str, context: Dict[str, Any]) -> str:
    """Apply a writing template with context.

    Args:
        template_name: Name of the template
        context: Variables to fill in

    Returns:
        Formatted content with applied template
    """
    templates = {
        "blog_post": """# {title}

{hook}

## Introduction
{introduction}

## Main Content
{main_content}

## Key Takeaways
{key_takeaways}

## Conclusion
{conclusion}

---
*Published on {date}*""",
    }

    template = templates.get(template_name, "{content}")
    return template.format(**context, date=datetime.now().strftime("%Y-%m-%d"))


class WritingAgent:
    """
    Specialized agent for creating professional content.

    Capabilities:
    - Technical documentation
    - Business reports and proposals
    - Academic writing
    - Blog posts and articles
    - Multilingual content
    - Format conversion
    """

    def __init__(
        self,
        provider_type: ProviderType = ProviderType.CLAUDE,
        model: str = "claude-3-5-sonnet-20241022",
        api_key: Optional[str] = None
    ):
        """
        Initialize the writing agent.

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

        # Create agent configuration
        self.config = AgentConfig(
            name="WritingAgent",
            description="Professional content creation specialist",
            system_prompt=self._get_system_prompt(),
            provider=self.provider,
            model=model,
            temperature=0.7,  # Higher temperature for creativity
            max_tokens=8192,
            enable_reasoning=True,
            enable_memory=True,
            max_iterations=10
        )

        # Create base agent
        self.agent = BaseAgent(
            config=self.config,
            tools=[save_file, convert_format, check_readability, apply_template],
            context=self._get_default_context()
        )

    def _get_system_prompt(self) -> str:
        """Get the system prompt for the writing agent."""
        return """You are an expert writing agent capable of producing high-quality content across multiple formats and domains.

Your capabilities include:
- Technical documentation and user guides
- Business reports, proposals, and executive summaries
- Academic papers with proper citations
- Blog posts, articles, and marketing copy
- Multilingual communication and localization

Writing Principles:
1. Clarity First: Use simple, direct language
2. Audience Awareness: Adapt tone and complexity to the reader
3. Structure: Use clear headings and logical flow
4. Active Voice: Prefer active over passive constructions
5. Conciseness: Eliminate unnecessary words

Tone Guidelines:
- Formal: Academic, legal, executive communications
- Professional: Business reports, documentation
- Conversational: Blog posts, internal communications
- Persuasive: Marketing copy, proposals

Process:
1. Understand: Clarify purpose, audience, and format
2. Plan: Create outline and structure
3. Draft: Develop content with appropriate style
4. Refine: Review for clarity, grammar, and flow
5. Finalize: Format and polish

Quality Checklist:
- Purpose achieved?
- Audience appropriate?
- Tone consistent?
- Structure logical?
- Content accurate?
- Language clear?

Always deliver content that is:
- Well-structured and organized
- Appropriate for the intended audience
- Free of grammatical errors
- Formatted correctly for the medium"""

    def _get_default_context(self) -> Dict[str, Any]:
        """Get default context for the writing agent."""
        return {
            "default_tone": "professional",
            "default_readability": "standard",
            "citation_style": "APA_7th",
            "output_formats": ["markdown", "html", "txt"]
        }

    async def write(
        self,
        task: str,
        content_type: str = "article",
        audience: str = "general",
        tone: str = "professional",
        session_id: Optional[str] = None
    ) -> AgentResponse:
        """
        Write content based on specifications.

        Args:
            task: Writing task description
            content_type: Type of content (article, report, documentation, etc.)
            audience: Target audience
            tone: Desired tone
            session_id: Optional session ID

        Returns:
            Written content
        """
        prompt = f"""Write the following content:

Task: {task}

Content Type: {content_type}
Target Audience: {audience}
Tone: {tone}

Please:
1. Create appropriate structure for this content type
2. Adapt language for the specified audience
3. Maintain the requested tone throughout
4. Ensure clarity and coherence
5. Use formatting (headings, lists, etc.) effectively

Deliver the content ready for use."""

        return await self.agent.run(prompt, session_id)

    async def write_blog_post(
        self,
        topic: str,
        target_audience: str = "professionals",
        key_points: Optional[List[str]] = None,
        session_id: Optional[str] = None
    ) -> AgentResponse:
        """
        Write a blog post on a topic.

        Args:
            topic: Blog post topic
            target_audience: Who the post is for
            key_points: Optional key points to cover
            session_id: Optional session ID

        Returns:
            Blog post content
        """
        key_points_str = "\n".join([f"- {p}" for p in (key_points or [])])

        prompt = f"""Write a compelling blog post on: {topic}

Target Audience: {target_audience}

Key Points to Cover:
{key_points_str or "Determine appropriate key points"}

Requirements:
1. Compelling headline
2. Engaging introduction that hooks the reader
3. Well-structured body with clear headings
4. Actionable takeaways
5. Strong conclusion with call-to-action
6. SEO-friendly structure

Tone: Conversational but professional
Length: 800-1200 words"""

        return await self.agent.run(prompt, session_id)

    async def write_technical_documentation(
        self,
        feature: str,
        documentation_type: str = "user_guide",
        technical_level: str = "intermediate",
        session_id: Optional[str] = None
    ) -> AgentResponse:
        """
        Write technical documentation.

        Args:
            feature: Feature or system to document
            documentation_type: Type of documentation
            technical_level: Technical depth required
            session_id: Optional session ID

        Returns:
            Technical documentation
        """
        prompt = f"""Write technical documentation for: {feature}

Documentation Type: {documentation_type}
Technical Level: {technical_level}

Include:
1. Overview/Description
2. Prerequisites (if applicable)
3. Setup/Installation instructions
4. Usage examples with code
5. Configuration options
6. Troubleshooting common issues
7. API reference (if applicable)

Style guidelines:
- Clear, concise instructions
- Step-by-step procedures
- Code examples with comments
- Diagram descriptions where helpful
- Troubleshooting section

Audience: {technical_level} technical users"""

        return await self.agent.run(prompt, session_id)

    async def write_business_report(
        self,
        subject: str,
        report_type: str = "status",
        key_data: Optional[Dict[str, Any]] = None,
        session_id: Optional[str] = None
    ) -> AgentResponse:
        """
        Write a business report.

        Args:
            subject: Report subject
            report_type: Type of report (status, proposal, analysis, etc.)
            key_data: Optional data to include
            session_id: Optional session ID

        Returns:
            Business report
        """
        data_str = json.dumps(key_data, indent=2) if key_data else "No specific data provided"

        prompt = f"""Write a business report on: {subject}

Report Type: {report_type}

Key Data:
{data_str}

Structure:
1. Executive Summary (1-2 paragraphs)
2. Introduction/Background
3. Analysis or Findings
4. Key Recommendations
5. Next Steps/Action Items
6. Appendices (if needed)

Style:
- Professional business language
- Clear headings and sections
- Data-driven insights
- Actionable recommendations
- Concise and to-the-point"""

        return await self.agent.run(prompt, session_id)

    async def rewrite_for_audience(
        self,
        content: str,
        new_audience: str,
        session_id: Optional[str] = None
    ) -> AgentResponse:
        """
        Rewrite content for a different audience.

        Args:
            content: Original content
            new_audience: Target audience to adapt for
            session_id: Optional session ID

        Returns:
            Rewritten content
        """
        prompt = f"""Rewrite the following content for a {new_audience} audience:

Original Content:
{content}

Please:
1. Maintain the core message and information
2. Adapt language and complexity for the new audience
3. Adjust tone appropriately
4. Use examples relevant to the audience
5. Ensure clarity and accessibility

Deliver the rewritten content ready for use."""

        return await self.agent.run(prompt, session_id)

    async def improve_readability(
        self,
        content: str,
        target_grade_level: float = 8.0,
        session_id: Optional[str] = None
    ) -> AgentResponse:
        """
        Improve the readability of content.

        Args:
            content: Content to improve
            target_grade_level: Target reading grade level
            session_id: Optional session ID

        Returns:
            Improved content with changes explained
        """
        prompt = f"""Improve the readability of the following content (target grade level: {target_grade_level}):

Original Content:
{content}

Please:
1. Simplify complex sentences
2. Break up long paragraphs
3. Replace jargon with simpler terms
4. Use active voice
5. Improve flow and clarity

Deliver:
- Improved content
- Summary of changes made
- Before/after comparison for major changes"""

        return await self.agent.run(prompt, session_id)


# Example usage
async def main():
    """Example usage of the WritingAgent."""

    # Create agent
    agent = WritingAgent()

    # Write a blog post
    response = await agent.write_blog_post(
        topic="The Future of Agentic AI Systems",
        target_audience="technical professionals",
        key_points=[
            "Current capabilities and limitations",
            "Key technical challenges",
            "Future research directions",
            "Practical applications"
        ]
    )

    print("=" * 80)
    print("BLOG POST")
    print("=" * 80)
    print(response.content)
    print("\nMetadata:")
    print(f"- Tokens used: {response.tokens_used}")
    print(f"- Duration: {response.duration_ms:.0f}ms")

    # Write technical documentation
    doc_response = await agent.write_technical_documentation(
        feature="REST API for user authentication",
        documentation_type="api_reference",
        technical_level="intermediate"
    )

    print("\n" + "=" * 80)
    print("TECHNICAL DOCUMENTATION")
    print("=" * 80)
    print(doc_response.content)


if __name__ == "__main__":
    asyncio.run(main())
