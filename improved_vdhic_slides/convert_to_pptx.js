const PptxGenJS = require("pptxgenjs");
const fs = require('fs');
const path = require('path');

// Create presentation
let pptx = new PptxGenJS();

// Set presentation properties
pptx.defineLayout({ name: 'VDHIC', width: 10, height: 5.625 });
pptx.layout = 'VDHIC';

// Slide 1: Title Slide
const slide1 = pptx.addSlide();
slide1.addText(
    [
        { text: 'Value-Based Digital Health', options: { fontSize: 32, fontFace: 'Arial', bold: true, color: 'FFFFFF' } },
        { text: 'Innovation Canvas', options: { breakLine: true, fontSize: 32, fontFace: 'Arial', bold: true, color: 'FFFFFF' } },
        { text: 'VDHIC Instruction Guide', options: { breakLine: true, fontSize: 20, fontFace: 'Arial', color: 'BFDBFE' } },
        { text: 'From Problem to Impact: Navigating Indonesia\'s Digital Health Ecosystem', options: { breakLine: true, fontSize: 14, fontFace: 'Arial', color: 'DBEAFE' } },
        { text: 'Featuring the Quintuple Aim Framework', options: { breakLine: true, fontSize: 12, fontFace: 'Arial', color: 'BFDBFE' } },
        { text: 'Australia Awards Fellowship 2025 • Monash University', options: { breakLine: true, fontSize: 10, fontFace: 'Arial', color: '93C5FD' } }
    ],
    { x: 0, y: 1, w: 10, h: 3.625, align: 'center', valign: 'middle', fill: { color: '1E3A8A' } }
);

// Add gradient background effect
slide1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: '1E3A8A' }, line: { color: '1E3A8A', width: 0 } });
slide1.addText(
    { text: 'Value-Based Digital Health Innovation Canvas', options: { fontSize: 40, fontFace: 'Arial', bold: true, color: 'FFFFFF' } },
    { x: 0.5, y: 1.5, w: 9, h: 1, align: 'center', valign: 'middle' }
);
slide1.addText(
    { text: 'VDHIC Instruction Guide', options: { fontSize: 24, fontFace: 'Arial', color: 'BFDBFE' } },
    { x: 0.5, y: 2.5, w: 9, h: 0.5, align: 'center', valign: 'middle' }
);
slide1.addText(
    { text: 'From Problem to Impact: Navigating Indonesia\'s Digital Health Ecosystem', options: { fontSize: 14, fontFace: 'Arial', color: 'DBEAFE' } },
    { x: 0.5, y: 3.2, w: 9, h: 0.5, align: 'center', valign: 'middle' }
);
slide1.addText(
    { text: 'Featuring the Quintuple Aim Framework\nAustralia Awards Fellowship 2025 • Monash University', options: { fontSize: 11, fontFace: 'Arial', color: '93C5FD' } },
    { x: 0.5, y: 4.2, w: 9, h: 0.8, align: 'center', valign: 'middle' }
);

// Slide 2: What is VDHIC?
const slide2 = pptx.addSlide();

// Add left panel background
slide2.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 4, h: 5.625, fill: { color: '1E3A8A' }, line: { color: '1E3A8A', width: 0 } });

// Add right panel background
slide2.addShape(pptx.ShapeType.rect, { x: 4, y: 0, w: 6, h: 5.625, fill: { color: 'F8FAFC' }, line: { color: 'F8FAFC', width: 0 } });

// Left panel content
slide2.addText(
    { text: 'What is VDHIC?', options: { fontSize: 30, fontFace: 'Arial', bold: true, color: 'FFFFFF' } },
    { x: 0.5, y: 0.8, w: 3, h: 0.8 }
);
slide2.addText(
    { text: 'The Value-Based Digital Health Innovation Canvas transforms Indonesia\'s Digital Health Transformation Toolkit into a practical, actionable tool for innovators.', options: { fontSize: 14, fontFace: 'Arial', color: 'FFFFFF' } },
    { x: 0.5, y: 2, w: 3, h: 2 }
);

// Right panel content
slide2.addText(
    { text: 'Purpose', options: { fontSize: 20, fontFace: 'Arial', bold: true, color: '1E3A8A' } },
    { x: 4.5, y: 0.8, w: 5, h: 0.5 }
);

const purposeList = [
    'Structured framework for digital health innovation in Indonesia',
    'Embed governance considerations from the start',
    'Facilitate multi-stakeholder dialogue',
    'Bridge design to implementation gap',
    'Support regulatory sandbox applications',
    'Align with Quintuple Aim outcomes'
];

purposeList.forEach((item, index) => {
    slide2.addText(
        { text: item, options: { fontSize: 14, fontFace: 'Arial', color: '334155', bullet: { code: '→' } } },
        { x: 4.5, y: 1.5 + (index * 0.4), w: 5, h: 0.3 }
    );
});

// Slide 3: Canvas Structure
const slide3 = pptx.addSlide();

// Add header background
slide3.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.5, fill: { color: '1E3A8A' }, line: { color: '1E3A8A', width: 0 } });
slide3.addText(
    { text: 'Canvas Structure', options: { fontSize: 28, fontFace: 'Arial', bold: true, color: 'FFFFFF' } },
    { x: 0, y: 0.2, w: 10, h: 0.5, align: 'center' }
);
slide3.addText(
    { text: 'Four integrated layers forming a comprehensive innovation framework', options: { fontSize: 14, fontFace: 'Arial', color: 'BFDBFE' } },
    { x: 0, y: 0.7, w: 10, h: 0.3, align: 'center' }
);

// Add grid items
const gridItems = [
    { icon: '🛡️', title: 'Governance Spine', desc: 'Four governance blocks forming the comprehensive compliance framework ensuring safety and regulatory adherence', color: '3B82F6', x: 0.5, y: 1.8 },
    { icon: '🎯', title: 'Main Canvas Grid', desc: 'Nine blocks organized in three phases: Discover → Design → Deliver', color: '10B981', x: 5.5, y: 1.8 },
    { icon: '⚖️', title: 'Value Anchor', desc: 'Five Quintuple Aim outcome indicators measuring comprehensive value creation', color: 'F59E0B', x: 0.5, y: 3.3 },
    { icon: '🔄', title: 'Innovation Phases', desc: 'Systematic progression from problem identification through solution design to market delivery', color: 'EF4444', x: 5.5, y: 3.3 }
];

gridItems.forEach(item => {
    // Add background rectangle
    slide3.addShape(pptx.ShapeType.rect, {
        x: item.x,
        y: item.y,
        w: 4,
        h: 1.3,
        fill: { color: 'FFFFFF' },
        line: { color: item.color, width: 2 }
    });

    // Add accent bar
    slide3.addShape(pptx.ShapeType.rect, {
        x: item.x,
        y: item.y,
        w: 0.1,
        h: 1.3,
        fill: { color: item.color }
    });

    // Add icon and text
    slide2.addText(
        { text: item.icon, options: { fontSize: 24 } },
        { x: item.x + 0.2, y: item.y + 0.1, w: 0.5, h: 0.3 }
    );
    slide3.addText(
        { text: item.title, options: { fontSize: 16, fontFace: 'Arial', bold: true, color: '1E3A8A' } },
        { x: item.x + 0.8, y: item.y + 0.1, w: 3, h: 0.3 }
    );
    slide3.addText(
        { text: item.desc, options: { fontSize: 11, fontFace: 'Arial', color: '475569' } },
        { x: item.x + 0.2, y: item.y + 0.4, w: 3.6, h: 0.8 }
    );
});

// Slide 4: Innovation Journey
const slide4 = pptx.addSlide();

// Add header
slide4.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.2, fill: { color: '1E3A8A' }, line: { color: '1E3A8A', width: 0 } });
slide4.addText(
    { text: 'Innovation Journey', options: { fontSize: 28, fontFace: 'Arial', bold: true, color: 'FFFFFF' } },
    { x: 0, y: 0.2, w: 10, h: 0.5, align: 'center' }
);

// Add phases
const phases = [
    { icon: '🔍', title: 'DISCOVER', items: ['Health Challenge', 'User Profiles', 'Stakeholder Map'], desc: 'Understanding the problem space before solutions', color: '3B82F6', x: 0.8, y: 1.5 },
    { icon: '🎨', title: 'DESIGN', items: ['Solution Architecture', 'User Experience', 'SATUSEHAT Integration'], desc: 'Translating insights into concrete solutions', color: '10B981', x: 3.5, y: 1.5 },
    { icon: '🚀', title: 'DELIVER', items: ['Evidence Plan', 'Scale Strategy', 'Business Model'], desc: 'Validation, scaling, and sustainability', color: 'F59E0B', x: 6.2, y: 1.5 }
];

phases.forEach(phase => {
    // Add phase box
    slide4.addShape(pptx.ShapeType.rect, {
        x: phase.x,
        y: phase.y,
        w: 2.4,
        h: 3.5,
        fill: { color: 'FFFFFF' },
        line: { color: phase.color, width: 3 }
    });

    // Add icon and title
    slide4.addText(
        { text: phase.icon, options: { fontSize: 32 } },
        { x: phase.x + 0.9, y: phase.y + 0.2, w: 0.6, h: 0.4, align: 'center' }
    );
    slide4.addText(
        { text: phase.title, options: { fontSize: 18, fontFace: 'Arial', bold: true, color: '1E3A8A' } },
        { x: phase.x, y: phase.y + 0.7, w: 2.4, h: 0.3, align: 'center' }
    );

    // Add items
    phase.items.forEach((item, index) => {
        slide4.addText(
            { text: item, options: { fontSize: 12, fontFace: 'Arial', color: '475569', bullet: true } },
            { x: phase.x + 0.2, y: phase.y + 1.2 + (index * 0.25), w: 2, h: 0.2 }
        );
    });

    // Add description
    slide4.addShape(pptx.ShapeType.rect, {
        x: phase.x,
        y: phase.y + 2.8,
        w: 2.4,
        h: 0.7,
        fill: { color: 'F8FAFC' }
    });
    slide4.addText(
        { text: phase.desc, options: { fontSize: 10, fontFace: 'Arial', italic: true, color: '64748B' } },
        { x: phase.x + 0.1, y: phase.y + 2.9, w: 2.2, h: 0.5, align: 'center', valign: 'middle' }
    );
});

// Slide 5: Quintuple Aim
const slide5 = pptx.addSlide();

// Add header
slide5.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.2, fill: { color: '1E3A8A' }, line: { color: '1E3A8A', width: 0 } });
slide5.addText(
    { text: 'The Quintuple Aim', options: { fontSize: 28, fontFace: 'Arial', bold: true, color: 'FFFFFF' } },
    { x: 0, y: 0.2, w: 10, h: 0.5, align: 'center' }
);
slide5.addText(
    { text: 'Every innovation must demonstrate clear alignment with these five outcomes', options: { fontSize: 14, fontFace: 'Arial', color: 'BFDBFE' } },
    { x: 0, y: 0.7, w: 10, h: 0.3, align: 'center' }
);

// Add quintuple items
const quintuple = [
    { icon: '🏥', title: 'Population Health', desc: 'Clinical outcomes at population level', color: 'EF4444', x: 0.6, y: 1.5 },
    { icon: '😊', title: 'Patient Experience', desc: 'Satisfaction & engagement', color: '3B82F6', x: 2.04, y: 1.5 },
    { icon: '👨‍⚕️', title: 'Provider Satisfaction', desc: 'Clinician workflow improvement', color: '10B981', x: 3.48, y: 1.5 },
    { icon: '💰', title: 'Cost Reduction', desc: 'Efficiency gains', color: 'F59E0B', x: 4.92, y: 1.5 },
    { icon: '⚖️', title: 'Health Equity', desc: 'Reduce healthcare disparities', color: '8B5CF6', x: 6.36, y: 1.5 }
];

quintuple.forEach(item => {
    // Add background
    slide5.addShape(pptx.ShapeType.rect, {
        x: item.x,
        y: item.y,
        w: 1.2,
        h: 2.5,
        fill: { color: 'FFFFFF' },
        line: { color: item.color, width: 2 }
    });

    // Add icon
    slide5.addText(
        { text: item.icon, options: { fontSize: 28 } },
        { x: item.x + 0.35, y: item.y + 0.2, w: 0.5, h: 0.4, align: 'center' }
    );

    // Add title
    slide5.addText(
        { text: item.title, options: { fontSize: 12, fontFace: 'Arial', bold: true, color: '1E3A8A' } },
        { x: item.x, y: item.y + 0.7, w: 1.2, h: 0.4, align: 'center' }
    );

    // Add description
    slide5.addText(
        { text: item.desc, options: { fontSize: 10, fontFace: 'Arial', color: '647569' } },
        { x: item.x + 0.05, y: item.y + 1.2, w: 1.1, h: 0.8, align: 'center', valign: 'middle' }
    );
});

// Save presentation
pptx.writeFile({ fileName: 'VDHIC_Improved_Presentation.pptx' })
    .then(fileName => {
        console.log(`Presentation created: ${fileName}`);
    })
    .catch(err => {
        console.error(err);
    });