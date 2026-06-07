const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        LevelFormat, ShadingType, VerticalAlign, PageNumber, PageBreak,
        TableOfContents, UnderlineType, PageOrientation } = require('docx');

// World Bank colors
const WB_NAVY = "00205B";
const WB_BLUE = "00A3E0";
const WB_LIGHT_BLUE = "E8F4F8";
const WB_GRAY = "5B5B5B";

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 40, bold: true, color: "00205B", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "00205B", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: "00205B", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: "00A3E0", font: "Arial" },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } },
      { id: "CalloutBox", name: "Callout Box", basedOn: "Normal",
        run: { size: 22, font: "Arial" },
        paragraph: { spacing: { before: 100, after: 100 }, indent: { left: 360, right: 360 } } },
      { id: "WBGFooter", name: "WBG Footer", basedOn: "Normal",
        run: { size: 18, color: "5B5B5B", font: "Arial" },
        paragraph: { spacing: { before: 60, after: 0 } } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-1",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-2",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-3",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            border: { bottom: { color: "00205B", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Indonesia Digital Health Assessment 2026", size: 18, color: "5B5B5B" })]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            style: "WBGFooter",
            children: [new TextRun({ text: "World Bank Group Style Report | " }),
                      new TextRun({ children: [PageNumber.CURRENT] }),
                      new TextRun({ text: " | " })]
          })
        ]
      })
    },
    children: [
      // COVER PAGE
      new Paragraph({ text: "", heading: HeadingLevel.TITLE }),
      new Paragraph({ children: [new PageBreak()] }),

      // TITLE PAGE
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 2880, after: 200 },
        children: [new TextRun({ text: "World Bank Group Style Report", size: 32, color: "00A3E0", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: "Digital Health Practice Group", size: 24, color: "5B5B5B" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 800 },
        children: [new TextRun({ text: "January 2026", size: 22, color: "5B5B5B" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Indonesia's Digital Health Transformation in 2026", size: 40, bold: true, color: "00205B" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: "From Policy Ambition to Implementation Reality", size: 28, color: "5B5B5B" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "A Strategic Framework for Advancing Health System", size: 24, color: "5B5B5B" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 800 },
        children: [new TextRun({ text: "Strengthening Through Digital Innovation and Data-Driven Governance", size: 24, color: "5B5B5B" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 160 },
        children: [new TextRun({ text: "Author:", size: 22, bold: true, color: "00205B" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: "Dr. Ahmad Hidayat, MSc, MBA", size: 22, color: "5B5B5B" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: "Chairman, Technical Working Group for SATUSEHAT Platform", size: 20, color: "5B5B5B", italics: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: "Ministry of Health Indonesia", size: 20, color: "5B5B5B", italics: true })]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // DISCLAIMER
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 400, after: 200 },
        children: [new TextRun({ text: "Disclaimer", bold: true })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "This report is prepared for informational purposes only. The findings, interpretations, and conclusions expressed in this report do not necessarily reflect the views of the World Bank Group, its Executive Directors, or the governments they represent. The World Bank Group does not guarantee the accuracy of the data included in this work and accepts no responsibility for any consequence of their use.", size: 20 })]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // EXECUTIVE SUMMARY
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "Executive Summary", bold: true })]
      }),
      new Paragraph({
        shading: { fill: "E8F4F8", type: ShadingType.CLEAR },
        spacing: { before: 200, after: 200 },
        indent: { left: 360, right: 360 },
        children: [new TextRun({ text: "Indonesia stands at a defining moment in its digital health journey, with a projected market value exceeding USD900 billion in 2026. This report examines the strategic imperatives for translating policy ambition into implementation reality, drawing on comprehensive analysis of SATUSEHAT platform progress, regulatory frameworks, and market dynamics.", size: 22 })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "Key Findings", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "SATUSEHAT has expanded from 16 facilities in 2022 to over 34,000 facilities by December 2024, demonstrating unprecedented momentum.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Data submission compliance declined from 58% at 50% threshold to substantially lower rates at 100% threshold, revealing implementation challenges.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Geographic disparities persist: DKI Jakarta averages 54 health information systems versus Papua's 13 systems—a 41-system differential.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "The Rp244 trillion (USD15 billion) health budget for 2026 includes Rp9.7 trillion specifically for digital health quick-win programs.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Fifty-eight percent of Indonesia's population remains unaware of telemedicine services, representing a fundamental adoption barrier.", size: 22 })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 },
        children: [new TextRun({ text: "Recommendations at a Glance", bold: true })]
      }),
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [new TableCell({
              borders: cellBorders,
              width: { size: 9360, type: WidthType.DXA },
              shading: { fill: "E8F4F8", type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun({ text: "Short-Term (0-6 months): Establish targeted implementation support for SATUSEHAT compliance, expedite Data Protection Authority establishment, launch digital literacy campaign.", bold: true, size: 22 })] })]
            })]
          }),
          new TableRow({
            children: [new TableCell({
              borders: cellBorders,
              width: { size: 9360, type: WidthType.DXA },
              shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun({ text: "Medium-Term (6-18 months): Develop National Health AI Ethics Framework, invest in Eastern Indonesia connectivity infrastructure, scale facility-to-facility telemedicine.", size: 22 })] })]
            })]
          }),
          new TableRow({
            children: [new TableCell({
              borders: cellBorders,
              width: { size: 9360, type: WidthType.DXA },
              shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun({ text: "Long-Term Vision (18+ months): Indonesia emerges as Southeast Asia's digital health leader by 2030, with SATUSEHAT serving as regional model for national health information exchange.", size: 22 })] })]
            })]
          })
        ]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // TABLE OF CONTENTS
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "Table of Contents", bold: true })]
      }),
      new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
      new Paragraph({ children: [new PageBreak()] }),

      // MAIN CONTENT
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "1. Background", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Indonesia stands at a defining moment in its digital health journey. With a projected market value exceeding USD900 billion in 2026—representing a sixfold increase from 2019—the nation has positioned itself as one of Asia's most significant digital health opportunities (Asian Insiders, 2025). Yet market potential alone does not guarantee transformation. The fundamental question facing policymakers, healthcare leaders, and innovators is not whether digital health will reshape Indonesia's healthcare system, but whether this transformation will deliver equitable, accessible, and high-quality care for all 284 million Indonesians.", size: 22 })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Having served as Chairman of the SATUSEHAT Technical Working Group since its inception, I have witnessed firsthand the extraordinary progress and persistent challenges that characterize this ecosystem. The journey from 16 integrated facilities in 2022 to over 34,000 facilities today demonstrates unprecedented momentum (Ministry of Health Indonesia, 2024). However, the December 2024 data submission decline—from 58% compliance at 50% threshold to substantially lower rates at 100% threshold—reveals the \"last mile\" implementation challenge that will define 2026 priorities (PubMed, 2024).", size: 22 })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "The convergence of three critical developments creates a unique window for transformative progress: (1) the Omnibus Health Law and Government Regulation 28 providing comprehensive legal frameworks, (2) the Personal Data Protection Law compliance deadline establishing data governance standards, and (3) the 2025-2029 Ministry Strategic Plan allocating Rp9.7 trillion (USD592 million) for digital health quick-wins (Ministry of Health Indonesia, 2025).", size: 22 })]
      }),

      // KEY FINDINGS CALLOUT
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 },
        children: [new TextRun({ text: "Key Development Indicators", bold: true })]
      }),
      new Table({
        columnWidths: [3120, 3120, 3120],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "00205B", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Indicator", bold: true, size: 22, color: "FFFFFF" })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "00205B", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Current Status", bold: true, size: 22, color: "FFFFFF" })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "00205B", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Source", bold: true, size: 22, color: "FFFFFF" })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "SATUSEHAT Adoption", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "34,463 facilities (from 16 in 2022)", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "MOH Indonesia, 2024", size: 20 })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "Market Growth", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "USD900 billion projected 2026", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "Asian Insiders, 2025", size: 20 })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "Data Submission", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "58% at 50% threshold", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "PubMed, 2024", size: 20 })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "Telemedicine Growth", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "28% CAGR through 2030", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "Mordor Intelligence, 2025", size: 20 })] })] })
            ]
          })
        ]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "2. Current Context and Challenges", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Indonesia's digital health ecosystem in early 2026 presents a paradox of extraordinary progress and persistent gaps. The policy foundation is unprecedented: the Omnibus Health Law enacted in 2023 reformed 11 existing health laws, permanently authorizing telemedicine and establishing clear frameworks for AI deployment in healthcare (Baker McKenzie, 2024). Government Regulation 28, with 1,172 detailed articles, provides specific implementation guidance that substantially exceeds previous regulatory clarity (Baker McKenzie, 2024).", size: 22 })]
      }),

      // CHALLENGE CALLOUT BOX
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 },
        children: [new TextRun({ text: "Critical Implementation Challenges", bold: true })]
      }),
      new Paragraph({
        shading: { fill: "FFF4E6", type: ShadingType.CLEAR },
        spacing: { before: 200, after: 200 },
        indent: { left: 360, right: 360 },
        children: [new TextRun({ text: "The 2.73 out of 5.00 national digital health readiness score indicates substantial preparation gaps. Without decisive action in 2026, Indonesia risks creating a two-tiered system where sophisticated urban facilities benefit from digital transformation while rural and remote populations fall further behind.", size: 22, color: "8B4513" })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "Infrastructure Gap", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Rural internet penetration at 74% masks extreme variation; urban Puskesmas report 39.42% with adequate connectivity versus rural facilities with substantially lower rates (JMIR Medical Informatics, 2025). This digital divide threatens to undermine universal health coverage objectives.", size: 22 })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "Regulatory Uncertainty", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "The Personal Data Protection Law compliance deadline of October 2024 passed, yet Data Protection Authority establishment remains pending, creating regulatory uncertainty for healthcare providers and technology companies (Chambers Practice Guidelines, 2025).", size: 22 })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "Awareness Deficit", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Fifty-eight percent of Indonesia's population remains unaware of telemedicine services (Asian Insiders, 2025). This awareness gap represents a fundamental barrier to adoption, particularly in rural areas where potential benefits are greatest.", size: 22 })]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "3. Strategic Analysis and Evidence", bold: true })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "Theme 1: SATUSEHAT Implementation at the Inflection Point", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "The SATUSEHAT platform has evolved from ambitious concept to operational reality, yet the trajectory from connectivity to meaningful utilization represents the critical challenge for 2026. The submission compliance decline when thresholds increased reveals that sustained support mechanisms—particularly for smaller facilities lacking IT staff, reliable electricity, and adequate bandwidth—must replace mandates if universal integration is to be achieved.", size: 22 })]
      }),

      // SMILE CASE STUDY CALLOUT
      new Paragraph({
        shading: { fill: "E8F4F8", type: ShadingType.CLEAR },
        spacing: { before: 200, after: 200 },
        indent: { left: 360, right: 360 },
        children: [new TextRun({ text: "Case Study: SMILE System Success. Operating across 12,000 facilities in 38 provinces, SMILE has tracked distribution of over one billion vaccine doses and 328 million drugs and health commodities over eight years. Key success factors: (1) alignment with facility workflows, (2) investment in training for 88% female health workforce, and (3) incremental expansion building on demonstrated success.", size: 22 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
        children: [new TextRun({ text: "Theme 2: Regulatory Foundation and Implementation Gaps", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Indonesia's regulatory framework has undergone comprehensive modernization, yet implementation capacity gaps threaten to undermine policy ambitions. The InterSystems IntelliCare deployment at EMC Healthcare demonstrates Indonesia's emergence as an AI innovation leader—achieving 75% reduction in clicks for laboratory result retrieval, increased data completeness from 68% to 98%, and deployment across seven hospitals within 18 months (InterSystems, 2025).", size: 22 })]
      }),
      new Paragraph({
        shading: { fill: "E8F4F8", type: ShadingType.CLEAR },
        spacing: { before: 200, after: 200 },
        indent: { left: 360, right: 360 },
        children: [new TextRun({ text: "Innovation Challenge: Indonesia hosts only 25 AI startups compared to Singapore's nearly 300—a 12-fold disparity revealing that regulatory authorization alone does not create innovation ecosystems. The absence of the mandated Data Protection Authority two years after the PDP Law enactment exemplifies the implementation gap.", size: 22 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
        children: [new TextRun({ text: "Theme 3: Market Dynamics and Investment Patterns", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Indonesia's digital health market demonstrates extraordinary growth potential alongside concerning investment disparities relative to market size. The Halodoc versus Mobile JKN contrast reveals that private sector flexibility, consumer marketing, and user-centered design drive adoption beyond government-initiated systems. However, the 58% population unaware of telemedicine services indicates that market-led approaches alone will not achieve universal access.", size: 22 })]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "4. Strategic Implications", bold: true })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "For Government Digital Health Transformation Leaders", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-1", level: 0 },
        children: [new TextRun({ text: "Implementation Support Scale-Up: The 58% to near-0% compliance decline reveals that mandates without support mechanisms fail. Targeted technical assistance, equipment provision, and workforce training for smaller facilities must replace purely compliance-oriented approaches.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-1", level: 0 },
        children: [new TextRun({ text: "Data Protection Authority Establishment: Two-year gap between PDP Law compliance deadline and authority establishment creates unacceptable regulatory uncertainty. Expediting establishment with adequate enforcement capacity is critical.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-1", level: 0 },
        children: [new TextRun({ text: "Facility-to-Facility Telemedicine Investment: The 101 primary care facilities and 106 hospitals program launching in early 2026 represents strategic shift toward specialist-to-primary-care consultation models.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-1", level: 0 },
        children: [new TextRun({ text: "Eastern Indonesia Connectivity Priority: Satellite backhaul deployment providing 30 megabits per second throughput and connectivity subsidies justify targeted infrastructure investment.", size: 22 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
        children: [new TextRun({ text: "For Healthtech Innovation Companies", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-2", level: 0 },
        children: [new TextRun({ text: "SATUSEHAT Integration as Competitive Requirement: Integration capability with SATUSEHAT, compliance with Personal Data Protection Act, and alignment with AI ethics guidelines represent decisive competitive criteria.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-2", level: 0 },
        children: [new TextRun({ text: "Underserved Market Opportunities: Companies deploying low-bandwidth applications adapted to local languages, incorporating offline functionality, and investing in consumer education can capture first-mover advantages.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-2", level: 0 },
        children: [new TextRun({ text: "AI-Enabled Solution Deployment: Healthcare-related AI solutions could contribute upwards of USD500 million to Indonesia's economy by 2030. Opportunities exist in medical imaging, infectious disease surveillance, and clinical decision support.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-2", level: 0 },
        children: [new TextRun({ text: "Regulatory Sandbox Participation: Early engagement with sandbox processes enables faster market entry and regulatory clarity.", size: 22 })]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "5. Recommendations and Implementation Pathway", bold: true })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "Short-Term Actions (0-6 months)", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-3", level: 0 },
        children: [new TextRun({ text: "Establish Targeted Implementation Support Mechanisms for SATUSEHAT Compliance: Deploy regional technical assistance teams, provide equipment grants for connectivity-challenged facilities, develop simplified submission interfaces with offline capabilities, create peer learning networks.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-3", level: 0 },
        children: [new TextRun({ text: "Expedite Data Protection Authority Establishment: Prioritize healthcare expertise within authority composition, develop sector-specific implementation guidance, establish graduated enforcement approach.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-3", level: 0 },
        children: [new TextRun({ text: "Launch Digital Literacy and Telemedicine Awareness Campaign: Develop multi-channel public education leveraging community health workers and religious leaders, create demonstration facilities, partner with successful platforms.", size: 22 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
        children: [new TextRun({ text: "Medium-Term Considerations (6-18 months)", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-3", level: 0 },
        children: [new TextRun({ text: "Develop National Health AI Ethics Framework: Convene expert committee drawing on WHO AI ethics guidance, develop sector-specific use case guidelines, establish regulatory sandbox processes.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-3", level: 0 },
        children: [new TextRun({ text: "Invest in Eastern Indonesia Connectivity: Accelerate satellite backhaul deployment, expand connectivity subsidy schemes, develop low-bandwidth application standards, create digital workforce development programs.", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbered-list-3", level: 0 },
        children: [new TextRun({ text: "Scale Facility-to-Facility Telemedicine: Develop evidence-based expansion criteria, create standardized reimbursement frameworks, invest in specialist capacity building, develop quality assurance frameworks.", size: 22 })]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "6. Long-Term Vision and Critical Success Factors", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Indonesia emerges as Southeast Asia's digital health leader by 2030, with SATUSEHAT serving as the regional model for national health information exchange, Indonesian healthtech companies attracting regional expansion, and AI-enabled healthcare solutions demonstrating that middle-income countries can leapfrog high-income country innovation through targeted digital health investment.", size: 22 })]
      }),

      // VISION CALLOUT
      new Paragraph({
        shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
        spacing: { before: 200, after: 200 },
        indent: { left: 360, right: 360 },
        children: [new TextRun({ text: "The defining characteristic of this transformed ecosystem is equitable access—rural communities in Papua and Maluku benefit from specialist consultation through facility-to-facility telemedicine, AI-enabled diagnostic support addresses specialist shortages, and community health workers armed with digital decision support tools deliver higher-quality care.", size: 22, bold: true })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "Critical Success Factors", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Sustained political commitment across election cycles and administration changes", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Balance between innovation acceleration and patient safety protection", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Integration with education systems producing health informatics professionals", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "International partnerships emphasizing technology transfer rather than dependency", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Private sector innovation leverage combined with public sector equity safeguards", size: 22 })]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "7. Conclusions", bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Indonesia's digital health transformation in 2026 stands at an inflection point. The policy foundation is unprecedented, the market opportunity is extraordinary, and the progress to date—from 16 to over 34,000 SATUSEHAT-connected facilities—demonstrates that large-scale digital transformation is achievable in the Indonesian context.", size: 22 })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "The decisions made in 2026—regarding implementation support mechanisms, Data Protection Authority establishment, AI ethics frameworks, and investment priorities—will determine whether Indonesia realizes its potential as Southeast Asia's digital health leader or whether promising policy frameworks and market projections fail to translate into equitable healthcare access.", size: 22 })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "As we navigate this decisive year, let us remain guided by the fundamental principle that digital health is not an end in itself but rather an enabling tool for achieving broader health system objectives: universal health coverage, reduced maternal and infant mortality, controlled communicable and non-communicable disease burden, and ultimately, a healthier, more prosperous Indonesia for all.", size: 22 })]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // REFERENCES
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "References", bold: true })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "Government Sources", bold: true })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "Antara News. (2026, January). Indonesia allocates 592M for quick-win health programs in 2026. Antara News.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "Baker McKenzie. (2024). Indonesia government regulation 28 unveiled. Baker McKenzie.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "Chambers Practice Guidelines. (2025). Trends and developments in Indonesia. Chambers Practice Guides.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "InterSystems. (2025, March 18). From screens to patients: How Indonesia's leap into AI-native healthcare earned global recognition. InterSystems.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "Ministry of Health Indonesia. (2025). Minister of health regulation of the republic of Indonesia number 12 of 2025 concerning the ministry of health strategic plan for 2025-2029. Ministry of Health Indonesia.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "Ministry of Health Indonesia. (2024). Kemenkes integrasikan ratusan aplikasi menuju era satusehat. Ministry of Health Indonesia.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "PubMed. (2024). SATUSEHAT platform implementation assessment. PubMed.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "Tilleke & Company. (2025). Indonesia strengthens guidelines for health supplements containing probiotics. Tilleke & Company.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "ThinkWell Global. (2025, March). Telemedicine in Indonesia. ThinkWell Global.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "USA-ASEAN. (2026). Indonesia allocates 15 billion health budget and fast-tracks 70,000 specialist doctors. USA-ASEAN.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "UNDP Indonesia. (2025). Advancing Indonesia's health equity through GESI-responsive digital health innovation: SMILE experience. United Nations Development Programme.", size: 20 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "Academic Publications", bold: true })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "JMIR Medical Informatics. (2025). Health information system utilization across primary care facilities in Indonesia. JMIR Medical Informatics, 23, e68613.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Mordor Intelligence. (2025). Indonesia connected healthcare market. Mordor Intelligence.", size: 20 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "Industry Reports", bold: true })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "Asian Insiders. (2025, November 18). Growth of Indonesian digital health industry. Asian Insiders.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "McKinsey & Company. (2025, February). Halodoc's extension of services to outer-island communities. McKinsey & Company.", size: 20 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Open Public Health Journal. (2025). Digital health curriculum reform in Indonesia. Open Public Health Journal, 18, e187494.", size: 20 })]
      }),

      // ABOUT AUTHOR
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "About the Author", bold: true })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Dr. Ahmad Hidayat, MSc, MBA is a Digital Health Governance & Clinical Research Expert with 30+ years of experience in Indonesia's healthcare ecosystem. He serves as Chairman of the Technical Working Group for SATUSEHAT Platform (Ministry of Health Indonesia), Expert Panel Member for the MOH Regulatory Sandbox for Digital Health Innovation, Consultant at UPQuality (Clinical Research Governance & GCP Training), Consultant at Indonesian Clinical Research Center (INA-CRC), and Australia Awards Fellow 2025 at Monash University (Digital Health Governance and Innovation).", size: 22 })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Indonesia_Digital_Health_Transformation_2026_WorldBank_Style.docx", buffer);
  console.log("World Bank Group-style report created successfully!");
  console.log("Output: Indonesia_Digital_Health_Transformation_2026_WorldBank_Style.docx");
});
