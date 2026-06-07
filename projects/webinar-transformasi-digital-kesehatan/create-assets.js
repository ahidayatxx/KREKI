const sharp = require('sharp');
const path = require('path');

async function createGradientBackground() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="562.5">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1E5128"/>
          <stop offset="50%" style="stop-color:#2C3E50"/>
          <stop offset="100%" style="stop-color:#1E5128"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGradient)"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(__dirname, 'assets/background-gradient.png'));

  console.log('✓ Created background-gradient.png');
}

async function createTimelineIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <circle cx="128" cy="128" r="100" fill="#4E9F3D" opacity="0.2"/>
      <circle cx="128" cy="128" r="80" fill="none" stroke="#4E9F3D" stroke-width="8"/>
      <text x="128" y="148" font-family="Arial" font-size="96" font-weight="bold" fill="#4E9F3D" text-anchor="middle">→</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(__dirname, 'assets/timeline-icon.png'));

  console.log('✓ Created timeline-icon.png');
}

async function createTransformationArrow() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="200" viewBox="0 0 800 200">
      <defs>
        <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#4E9F3D"/>
          <stop offset="100%" style="stop-color:#1E5128"/>
        </linearGradient>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#1E5128"/>
        </marker>
      </defs>

      <!-- Left box -->
      <rect x="20" y="50" width="200" height="100" rx="10" fill="#4E9F3D" opacity="0.8"/>
      <text x="120" y="95" font-family="Arial" font-size="24" font-weight="bold" fill="white" text-anchor="middle">CONNECTIVITY</text>
      <text x="120" y="125" font-family="Arial" font-size="18" fill="white" text-anchor="middle">2020-2024</text>

      <!-- Right box -->
      <rect x="380" y="50" width="200" height="100" rx="10" fill="#1E5128" opacity="0.8"/>
      <text x="480" y="95" font-family="Arial" font-size="24" font-weight="bold" fill="white" text-anchor="middle">CAPABILITY</text>
      <text x="480" y="125" font-family="Arial" font-size="18" fill="white" text-anchor="middle">2025-2029</text>

      <!-- Arrow -->
      <line x1="230" y1="100" x2="370" y2="100" stroke="#2C3E50" stroke-width="8" marker-end="url(#arrowhead)"/>

      <!-- Label above arrow -->
      <text x="300" y="70" font-family="Arial" font-size="20" font-weight="bold" fill="#C0392B" text-anchor="middle">TRANSFORMASI</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(__dirname, 'assets/transformation-arrow.png'));

  console.log('✓ Created transformation-arrow.png');
}

async function createPhaseTimeline() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="300" viewBox="0 0 900 300">
      <!-- Phase 1: CONNECT -->
      <rect x="20" y="50" width="260" height="200" rx="15" fill="#4E9F3D" opacity="0.3"/>
      <rect x="20" y="50" width="260" height="200" rx="15" fill="none" stroke="#4E9F3D" stroke-width="4"/>
      <text x="150" y="100" font-family="Arial" font-size="28" font-weight="bold" fill="#1E5128" text-anchor="middle">PHASE 1</text>
      <text x="150" y="135" font-family="Arial" font-size="32" font-weight="bold" fill="#4E9F3D" text-anchor="middle">CONNECT</text>
      <text x="150" y="170" font-family="Arial" font-size="18" fill="#2C3E50" text-anchor="middle">2020-2024</text>
      <text x="150" y="200" font-family="Arial" font-size="14" fill="#2C3E50" text-anchor="middle">Build infrastructure</text>
      <text x="150" y="220" font-family="Arial" font-size="14" fill="#2C3E50" text-anchor="middle">Standardize systems</text>
      <text x="150" y="240" font-family="Arial" font-size="14" fill="#2C3E50" text-anchor="middle">Establish platforms</text>

      <!-- Phase 2: CONSOLIDATE -->
      <rect x="300" y="50" width="260" height="200" rx="15" fill="#C0392B" opacity="0.3"/>
      <rect x="300" y="50" width="260" height="200" rx="15" fill="none" stroke="#C0392B" stroke-width="4"/>
      <text x="430" y="100" font-family="Arial" font-size="28" font-weight="bold" fill="#1E5128" text-anchor="middle">PHASE 2</text>
      <text x="430" y="135" font-family="Arial" font-size="32" font-weight="bold" fill="#C0392B" text-anchor="middle">CONSOLIDATE</text>
      <text x="430" y="170" font-family="Arial" font-size="18" fill="#2C3E50" text-anchor="middle">2025-2026</text>
      <text x="430" y="200" font-family="Arial" font-size="14" fill="#2C3E50" text-anchor="middle">← WE ARE HERE</text>
      <text x="430" y="220" font-family="Arial" font-size="14" fill="#2C3E50" text-anchor="middle">Close capability gaps</text>
      <text x="430" y="240" font-family="Arial" font-size="14" fill="#2C3E50" text-anchor="middle">Ensure sustainability</text>

      <!-- Phase 3: CAPITALIZE -->
      <rect x="580" y="50" width="260" height="200" rx="15" fill="#1E5128" opacity="0.3"/>
      <rect x="580" y="50" width="260" height="200" rx="15" fill="none" stroke="#1E5128" stroke-width="4"/>
      <text x="710" y="100" font-family="Arial" font-size="28" font-weight="bold" fill="#2C3E50" text-anchor="middle">PHASE 3</text>
      <text x="710" y="135" font-family="Arial" font-size="32" font-weight="bold" fill="#1E5128" text-anchor="middle">CAPITALIZE</text>
      <text x="710" y="170" font-family="Arial" font-size="18" fill="#2C3E50" text-anchor="middle">2027+</text>
      <text x="710" y="200" font-family="Arial" font-size="14" fill="#2C3E50" text-anchor="middle">Data-driven decisions</text>
      <text x="710" y="220" font-family="Arial" font-size="14" fill="#2C3E50" text-anchor="middle">AI-enabled care</text>
      <text x="710" y="240" font-family="Arial" font-size="14" fill="#2C3E50" text-anchor="middle">Innovation ecosystem</text>

      <!-- Arrows between phases -->
      <polygon points="290,150 295,140 295,160" fill="#2C3E50"/>
      <polygon points="570,150 575,140 575,160" fill="#2C3E50"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(__dirname, 'assets/phase-timeline.png'));

  console.log('✓ Created phase-timeline.png');
}

async function createAllAssets() {
  console.log('Creating visual assets...\n');
  await createGradientBackground();
  await createTimelineIcon();
  await createTransformationArrow();
  await createPhaseTimeline();
  console.log('\n✓ All visual assets created successfully!');
}

createAllAssets().catch(console.error);
