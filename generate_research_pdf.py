#!/usr/bin/env python3
"""
Generate professional PDF from FHIR market research markdown
"""

from weasyprint import HTML, CSS
from datetime import datetime
import re

# Read the markdown file
with open('/Users/ahmadhidayat/claude-code/FHIR-services-market-demand-validation-indonesia-2026-01-08.md', 'r') as f:
    content = f.read()

# Extract title and metadata
title = "FHIR Services Market Demand Validation: Indonesia & Southeast Asia"
research_date = "January 8, 2026"

# Convert markdown to HTML with professional styling
def markdown_to_html(md_content):
    html = md_content

    # Headers
    html = re.sub(r'^# (.+)$', r'<h1 class="main-title">\1</h1>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2 class="section-title">\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^### (.+)$', r'<h3 class="subsection-title">\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^#### (.+)$', r'<h4 class="sub-subsection-title">\1</h4>', html, flags=re.MULTILINE)

    # Bold
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)

    # Italic
    html = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html)

    # Checkboxes
    html = re.sub(r'^- \*\*(.+?)\*\*:', r'<li class="checklist-item"><strong>\1</strong>:', html, flags=re.MULTILINE)
    html = re.sub(r'^- (.+)$', r'<li class="list-item">\1</li>', html, flags=re.MULTILINE)

    # Numbered lists
    html = re.sub(r'^(\d+)\. (.+)$', r'<li class="numbered-item">\2</li>', html, flags=re.MULTILINE)

    # Code/inline
    html = re.sub(r'`(.+?)`', r'<code>\1</code>', html)

    # Tables - convert markdown tables to HTML
    table_pattern = r'(\|.+?\|\n)+'
    def convert_table(match):
        lines = match.group(0).strip().split('\n')
        html_table = '<table class="data-table">'

        for i, line in enumerate(lines):
            cells = [cell.strip() for cell in line.split('|')[1:-1]]
            if i == 0:
                html_table += '<thead><tr>'
                for cell in cells:
                    html_table += f'<th>{cell}</th>'
                html_table += '</tr></thead><tbody>'
            elif i == 1:
                # Skip separator line
                continue
            else:
                html_table += '<tr>'
                for cell in cells:
                    html_table += f'<td>{cell}</td>'
                html_table += '</tr>'

        html_table += '</tbody></table>'
        return html_table

    html = re.sub(table_pattern, convert_table, html, flags=re.MULTILINE)

    # Horizontal rules
    html = re.sub(r'^---$', '<hr class="divider"/>', html, flags=re.MULTILINE)

    # Paragraphs - wrap text that's not already in HTML tags
    lines = html.split('\n')
    wrapped_lines = []
    in_list = False

    for line in lines:
        if line.strip() == '':
            if in_list:
                wrapped_lines.append('</ul>')
                in_list = False
            continue

        if line.strip().startswith('<li') or line.strip().startswith('- '):
            if not in_list:
                wrapped_lines.append('<ul class="content-list">')
                in_list = True
            if not line.strip().startswith('<li'):
                line = f'<li class="list-item">{line.strip()[2:]}</li>'
            wrapped_lines.append(line)
        elif line.strip().startswith('<'):
            # Already HTML
            if in_list:
                wrapped_lines.append('</ul>')
                in_list = False
            wrapped_lines.append(line)
        elif line.strip().startswith('|'):
            # Table row - skip (already handled)
            pass
        else:
            if in_list:
                wrapped_lines.append('</ul>')
                in_list = False
            if not any(tag in line for tag in ['<h1>', '<h2>', '<h3>', '<h4>', '<hr', '<table']):
                line = f'<p class="content">{line}</p>'
            wrapped_lines.append(line)

    if in_list:
        wrapped_lines.append('</ul>')

    html = '\n'.join(wrapped_lines)
    return html

# Create the HTML template
html_template = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        @page {{
            size: A4;
            margin: 2cm;
            @bottom-center {{
                content: counter(page);
                font-size: 10pt;
                color: #666;
            }}
        }}

        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            font-size: 11pt;
        }}

        .header {{
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 40px 30px;
            margin: -2cm -2cm 40px -2cm;
            text-align: center;
        }}

        .main-title {{
            font-size: 28pt;
            font-weight: 700;
            margin-bottom: 10px;
            color: white !important;
            letter-spacing: -0.5px;
        }}

        .meta-info {{
            font-size: 10pt;
            opacity: 0.9;
            margin-top: 15px;
        }}

        .meta-badge {{
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 5px 15px;
            border-radius: 20px;
            margin: 0 5px;
            font-size: 9pt;
        }}

        .section-title {{
            font-size: 18pt;
            font-weight: 700;
            color: #1e3c72;
            margin: 35px 0 20px 0;
            padding-bottom: 8px;
            border-bottom: 3px solid #3498db;
            page-break-after: avoid;
        }}

        .subsection-title {{
            font-size: 14pt;
            font-weight: 600;
            color: #2c3e50;
            margin: 25px 0 15px 0;
            page-break-after: avoid;
        }}

        .sub-subsection-title {{
            font-size: 12pt;
            font-weight: 600;
            color: #34495e;
            margin: 20px 0 10px 0;
            page-break-after: avoid;
        }}

        .content {{
            margin: 12px 0;
            text-align: justify;
        }}

        .content-list {{
            margin: 12px 0;
            padding-left: 25px;
        }}

        .list-item, .checklist-item {{
            margin: 8px 0;
            padding-left: 8px;
        }}

        .checklist-item {{
            font-weight: 500;
        }}

        .data-table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 10pt;
            page-break-inside: avoid;
        }}

        .data-table thead {{
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
            color: white;
        }}

        .data-table th {{
            padding: 12px 10px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #2980b9;
        }}

        .data-table td {{
            padding: 10px;
            border: 1px solid #ddd;
        }}

        .data-table tbody tr:nth-child(even) {{
            background: #f8f9fa;
        }}

        .data-table tbody tr:hover {{
            background: #e9ecef;
        }}

        .divider {{
            border: none;
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, #3498db 50%, transparent 100%);
            margin: 30px 0;
        }}

        strong {{
            color: #1e3c72;
            font-weight: 600;
        }}

        code {{
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 10pt;
            color: #e74c3c;
        }}

        .verdict {{
            background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            font-weight: 600;
            font-size: 14pt;
            page-break-inside: avoid;
        }}

        .success-factors {{
            background: #e8f4f8;
            border-left: 4px solid #3498db;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }}

        .references-section {{
            margin-top: 40px;
            page-break-before: always;
        }}

        .reference-item {{
            margin: 15px 0;
            padding-left: 20px;
            text-indent: -20px;
            font-size: 10pt;
            line-height: 1.5;
        }}

        .footer {{
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 9pt;
            color: #7f8c8d;
            font-style: italic;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1 class="main-title">FHIR Services Market Demand Validation</h1>
        <div style="font-size: 14pt; margin: 10px 0;">Indonesia & Southeast Asia</div>
        <div class="meta-info">
            <span class="meta-badge">Research Date: {research_date}</span>
            <span class="meta-badge">Status: HIGH DEMAND - VALIDATED ✓</span>
        </div>
    </div>

    <div class="content-body">
        {markdown_to_html(content)}
    </div>

    <div class="footer">
        This market research was conducted on {research_date} using comprehensive analysis
        of Indonesian healthcare regulations, competitive landscape, and demand validation
        for FHIR implementation services.
    </div>
</body>
</html>
"""

# Generate PDF
print("Generating PDF...")
HTML(string=html_template).write_pdf(
    '/Users/ahmadhidayat/claude-code/FHIR-Services-Market-Demand-Validation-Indonesia-2026-01-08.pdf',
    stylesheets=[CSS(string='@page { margin: 2cm; }')]
)
print("PDF generated successfully: FHIR-Services-Market-Demand-Validation-Indonesia-2026-01-08.pdf")
