const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, PageBreak, UnderlineType } = require('docx');

// McKinsey Brand Colors
const MCKINSEY_BLUE = "051C2C";
const MCKINSEY_ACCENT = "0077C8";
const MCKINSEY_GRAY = "CCCCCC";
const MCKINSEY_LIGHT_BLUE = "D5E8F0";
const MCKINSEY_DARK_GRAY = "666666";

// Table border style
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: MCKINSEY_GRAY };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// Helper function for key insight boxes
function keyInsightBox(title, text) {
    return new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: cellBorders,
                        shading: { fill: MCKINSEY_LIGHT_BLUE, type: ShadingType.CLEAR },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph({
                                spacing: { before: 120, after: 120 },
                                children: [
                                    new TextRun({ text: title, bold: true, size: 24, color: MCKINSEY_BLUE }),
                                    new TextRun({ text: "\n" + text, size: 22 })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

// Helper function for strategic boxes
function strategicBox(title, content) {
    const paragraphs = content.split('\n').map(line =>
        new Paragraph({
            spacing: { after: 80 },
            children: [new TextRun({ text: line, size: 20 })]
        })
    );

    return new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: cellBorders,
                        shading: { fill: MCKINSEY_LIGHT_BLUE, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({
                                spacing: { before: 120, after: 120 },
                                children: [new TextRun({ text: title, bold: true, size: 22, color: MCKINSEY_BLUE })]
                            }),
                            ...paragraphs
                        ]
                    })
                ]
            })
        ]
    });
}

// Create document
const doc = new Document({
    styles: {
        default: {
            document: {
                run: { font: "Arial", size: 22 }
            }
        },
        paragraphStyles: [
            {
                id: "Title",
                name: "Title",
                basedOn: "Normal",
                run: { size: 44, bold: true, color: MCKINSEY_BLUE, font: "Arial" },
                paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER }
            },
            {
                id: "Heading1",
                name: "Heading 1",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 32, bold: true, color: MCKINSEY_BLUE, font: "Arial" },
                paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 }
            },
            {
                id: "Heading2",
                name: "Heading 2",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 26, bold: true, color: MCKINSEY_BLUE, font: "Arial" },
                paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 }
            },
            {
                id: "Normal",
                name: "Normal",
                run: { size: 22, color: "000000", font: "Arial" },
                paragraph: { spacing: { after: 120 } }
            }
        ]
    },
    sections: [{
        properties: {
            page: {
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
            }
        },
        children: [
            // Title Page
            new Paragraph({
                heading: HeadingLevel.TITLE,
                spacing: { before: 2880, after: 480 },
                children: [new TextRun({ text: "Indonesia Digital Health Sector", color: MCKINSEY_BLUE })]
            }),
            new Paragraph({
                heading: HeadingLevel.TITLE,
                spacing: { after: 240 },
                children: [new TextRun({ text: "Financing and Infrastructure Strategic Analysis", color: MCKINSEY_BLUE })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
                children: [new TextRun({ text: "AMANA Advisory Board Briefing", size: 24, italics: true, color: MCKINSEY_DARK_GRAY })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 360 },
                children: [new TextRun({ text: "January 14, 2025", size: 22, color: MCKINSEY_DARK_GRAY })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
                children: [new TextRun({ text: "Prepared by: Dr. Ahmad Hidayat, MBA", size: 22, bold: true, color: MCKINSEY_BLUE })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 240 },
                children: [new TextRun({ text: "AMANA Advisory Board Member", size: 20, color: MCKINSEY_DARK_GRAY })]
            }),
            keyInsightBox(
                "IN BRIEF",
                "Indonesia's digital health market projected to surpass USD 900 billion by 2025. Only 46.72% of health facilities integrated with SATUSEHAT against 70% target. Requires coordinated financing strategy addressing infrastructure gaps and accelerating SATUSEHAT integration."
            ),
            new Paragraph({ children: [new PageBreak()] }),

            // Executive Summary
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "Executive Summary", color: MCKINSEY_BLUE })]
            }),
            new Paragraph({
                spacing: { after: 200 },
                children: [new TextRun({ text: "Indonesia's digital health transformation stands at a critical juncture. The government has made substantial investments through the SATUSEHAT platform (launched July 2022) and SATUSEHAT Logistik (October 2024), creating a unified health information system designed to integrate all health-related digital platforms. However, significant challenges remain:", color: "000000", size: 22 })]
            }),
            keyInsightBox(
                "KEY CHALLENGES",
                "• Only 46.72% of health facilities have integrated with SATUSEHAT against 70% target\n• Infrastructure gaps persist in rural areas, particularly Eastern Indonesia\n• Out-of-pocket health expenditure remains high at 49.6% despite JKN coverage of 84%\n• Digital health market projected to surpass USD 900 billion by 2025, growing from USD 148 billion in 2019"
            ),
            keyInsightBox(
                "BOTTOM LINE",
                "Indonesia's digital health transformation requires a coordinated financing strategy that addresses infrastructure gaps, accelerates SATUSEHAT integration, and leverages innovative funding models to achieve universal health coverage through digital enablement."
            ),
            new Paragraph({ children: [new PageBreak()] }),

            // Strategic Analysis
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "Strategic Analysis", color: MCKINSEY_BLUE })]
            }),

            // Theme 1
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "1. Infrastructure Gaps and Digital Divide", color: MCKINSEY_BLUE })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "The geographic distribution of digital health services reveals significant disparities between Western and Central regions versus Eastern Indonesia. Research shows that digital health services dominate in Western and Central Indonesia, while Eastern regions face limited digital transformation due to infrastructure constraints, particularly internet connectivity and electricity supply.", size: 22 })]
            }),
            keyInsightBox(
                "IMPLICATIONS FOR AMANA",
                "• Advisory work must prioritize infrastructure development strategies for underserved regions\n• Partnership opportunities exist with telecommunications providers for last-mile connectivity\n• Digital literacy programs should be integrated into health system transformation initiatives\n• Regional differentiation strategy required for Western/Central vs. Eastern Indonesia"
            ),

            // Theme 2
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "2. SATUSEHAT Integration Challenges", color: MCKINSEY_BLUE })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Despite strong governance and policy frameworks, SATUSEHAT integration faces significant implementation barriers. The platform is currently treated as a guideline rather than a mandate, leading to inconsistent adoption rates across health facilities. Technical barriers include API implementation challenges and compatibility issues between legacy systems and SATUSEHAT's modern architecture.", size: 22 })]
            }),
            keyInsightBox(
                "IMPLICATIONS FOR AMANA",
                "• Advisory should focus on incentive design and phased implementation strategies\n• Technical assistance capacity building required for smaller facilities\n• Governance framework strengthening needed to move from voluntary to mandatory integration\n• Public-private partnership opportunities for technical infrastructure support"
            ),

            // Theme 3
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "3. Financing Landscape and Investment Opportunities", color: MCKINSEY_BLUE })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Indonesia's health financing model combines National Health Insurance (JKN) under BPJS with government subsidies, out-of-pocket payments, and donor funding. The private sector has demonstrated strong interest, with HealthTech startups raising approximately USD 231.7 million over the past eight years. However, funding remains concentrated in urban areas and consumer-facing applications rather than infrastructure.", size: 22 })]
            }),
            keyInsightBox(
                "IMPLICATIONS FOR AMANA",
                "• Advisory should address both public financing mechanisms and private investment mobilization\n• Opportunity to develop blended finance models for digital health infrastructure\n• Focus on impact investment frameworks for underserved regions\n• Support for fiscal space analysis and innovative financing mechanism development"
            ),

            // Theme 4
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "4. Emerging Technologies and Innovation Ecosystem", color: MCKINSEY_BLUE })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Indonesia's National AI Roadmap sets concrete targets: 100,000 AI talents per year, 20 million AI-literate citizens by 2029, and sovereign AI infrastructure. The AI in healthcare market reached USD 1.01 billion in 2023. Major initiatives include Sahabat-AI and cloud platforms bringing language-aware models and clinical decision support.", size: 22 })]
            }),
            keyInsightBox(
                "IMPLICATIONS FOR AMANA",
                "• Advisory should encompass governance frameworks for emerging technologies\n• Opportunity to facilitate public-private innovation partnerships\n• Capacity building needs for AI and advanced analytics in health sector\n• Ethical guidelines and regulatory frameworks for AI in healthcare"
            ),
            new Paragraph({ children: [new PageBreak()] }),

            // Options Assessment
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "Options Assessment", color: MCKINSEY_BLUE })]
            }),

            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "Option A: Accelerated Public Investment", color: MCKINSEY_BLUE })]
            }),
            strategicBox(
                "DESCRIPTION",
                "Direct government investment in digital health infrastructure, focusing on last-mile connectivity for rural health facilities, data center capacity for SATUSEHAT hosting, and nationwide EMR implementation with mandatory integration requirements."
            ),
            strategicBox(
                "ADVANTAGES",
                "• Ensures universal access to digital health infrastructure\n• Creates public goods foundation for private sector innovation\n• Enables faster achievement of SATUSEHAT integration targets\n• Addresses equity concerns through directed investment"
            ),
            strategicBox(
                "STRATEGIC FIT",
                "High alignment with AMANA's public goods mission and SEED values, particularly Skin-in-the-Game through direct government commitment and Empathy through equity focus."
            ),

            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "Option B: Blended Finance Model", color: MCKINSEY_BLUE })]
            }),
            strategicBox(
                "DESCRIPTION",
                "Leverage private capital and expertise through innovative financing models including development impact bonds, output-based aid, and risk-sharing facilities. Private sector leads technology deployment with government providing enabling regulation and performance guarantees."
            ),
            strategicBox(
                "ADVANTAGES",
                "• Mobilizes significant private capital beyond government budget constraints\n• Brings private sector innovation and efficiency to service delivery\n• Transfers implementation risk to private sector with appropriate risk-sharing\n• Creates sustainable market-based ecosystem"
            ),
            strategicBox(
                "STRATEGIC FIT",
                "Moderate alignment with Excellence and innovation, but requires careful governance to ensure Empathy and equity considerations."
            ),
            new Paragraph({ children: [new PageBreak()] }),

            // Recommendations
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "Prioritized Recommendations", color: MCKINSEY_BLUE })]
            }),

            keyInsightBox(
                "RECOMMENDATION 1 (HIGH PRIORITY)",
                "Establish Digital Health Infrastructure Fund (DHIIF) with blended financing combining government allocation, development finance institution funding, and private capital. Initial capitalization of USD 200-300 million within 6-12 months."
            ),

            keyInsightBox(
                "RECOMMENDATION 2 (HIGH PRIORITY)",
                "Strengthen SATUSEHAT integration from voluntary to requirement through regulatory mandates, financial incentives, and technical support. Mandatory for public facilities by 2026, linked to accreditation and JKN reimbursement."
            ),

            keyInsightBox(
                "RECOMMENDATION 3 (MEDIUM PRIORITY)",
                "Develop fintech-enabled health payment ecosystem integrating with SATUSEHAT, enabling real-time claims processing, capitated payments, and value-based care models."
            ),

            keyInsightBox(
                "RECOMMENDATION 4 (MEDIUM PRIORITY)",
                "Invest in health AI workforce and governance. Develop national capacity building program aligned with National AI Roadmap targets of 100,000 AI talents annually."
            ),

            keyInsightBox(
                "RECOMMENDATION 5 (MEDIUM PRIORITY)",
                "Establish regional digital health collaboration platforms in Western, Central, and Eastern Indonesia, facilitating peer learning, shared infrastructure, and coordinated investment."
            ),
            new Paragraph({ children: [new PageBreak()] }),

            // References
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "References", color: MCKINSEY_BLUE })]
            }),

            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "ASEAN. (2024). Assessing Digital Health Adoption in ASEAN. ASEAN Secretariat.", size: 20 })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Asian Development Bank Institute. (2022). Leveraging Fintech for Health: Case Studies from Indonesia, the Philippines, and Singapore. ADBI.", size: 20 })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Asian Insiders. (2025). Indonesian Digital Health Industry Enters Its Next Phase.", size: 20 })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Cheng, Q., et al. (2022). Equity of health financing in Indonesia: A 5-year financing analysis. The Lancet Global Health, 11(5), E770-E780.", size: 20 })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Ken Research. (2024). Indonesia Telemedicine and Digital Health Market Report.", size: 20 })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Mitaart, G. (2024). Indonesia's Health Transformation: On Track or Leaving Some Behind? Medium.", size: 20 })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "nucamp. (2025). The Complete Guide to Using AI in the Healthcare Industry in Indonesia in 2025.", size: 20 })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Orissa International. (2025). Opportunities in Indonesia: HealthTech Market Analysis.", size: 20 })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Paluttri, A. H. (2024). Implementation of digital health services in Indonesia: Challenges and opportunities. Journal of Public Health Research, 11(3).", size: 20 })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "Setiaji. (2024). Unlocking A Lifeline for Indonesia's Health System. UNDP Indonesia.", size: 20 })]
            }),
            new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: "World Bank. (2025). National Health Compacts: Indonesia. World Bank.", size: 20 })]
            }),

            // Footer
            new Paragraph({
                spacing: { before: 400, after: 40 },
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "_____________________________________________________________________________________________________________________", size: 8, color: MCKINSEY_GRAY })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "Classification: Advisory Brief | Next Review: 2025-07-01 | Distribution: AMANA Leadership, ASEAN Health Sector Partners", size: 16, italics: true, color: MCKINSEY_GRAY })]
            })
        ]
    }]
});

// Save document
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("strategic-indonesia-digital-health-financing-mckinsey-style-20250114.docx", buffer);
    console.log("Document created successfully!");
}).catch(err => {
    console.error("Error creating document:", err);
});
