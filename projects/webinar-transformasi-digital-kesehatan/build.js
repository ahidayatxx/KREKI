const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/ahmadhidayat/.claude/skills/pptx/scripts/html2pptx.js');
const path = require('path');

async function buildPresentation() {
  console.log('Creating PowerPoint presentation...\n');

  // Initialize presentation
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'dr. Ahmad Hidayat, M.Sc., MBA';
  pptx.title = 'Transformasi Digital Kesehatan Indonesia';
  pptx.subject = 'Webinar: Implementasi Transformasi Digital Kesehatan';

  // Process all 20 slides
  const slidesDir = path.join(__dirname, 'slides');

  console.log('Processing HTML slides...');
  await html2pptx(path.join(slidesDir, 'slide01.html'), pptx);
  console.log('  ✓ Slide 1: Title');

  await html2pptx(path.join(slidesDir, 'slide02.html'), pptx);
  console.log('  ✓ Slide 2: Roadmap');

  await html2pptx(path.join(slidesDir, 'slide03.html'), pptx);
  console.log('  ✓ Slide 3: Fondasi SATUSEHAT');

  await html2pptx(path.join(slidesDir, 'slide04.html'), pptx);
  console.log('  ✓ Slide 4: Ekosistem Aplikasi');

  await html2pptx(path.join(slidesDir, 'slide05.html'), pptx);
  console.log('  ✓ Slide 5: Momentum 2025');

  // Slide 6 with chart
  const { slide: slide6, placeholders: p6 } = await html2pptx(path.join(slidesDir, 'slide06.html'), pptx);
  console.log('  ✓ Slide 6: Program Konkret');

  if (p6.length > 0) {
    const programData = [{
      name: 'Program Cek Kesehatan',
      labels: ['2025', '2026 (Target)'],
      values: [70.8, 46]
    }];

    slide6.addChart(pptx.charts.BAR, programData, {
      ...p6[0],
      barDir: 'col',
      showTitle: true,
      title: 'Program Cek Kesehatan Gratis (Juta Orang)',
      showLegend: false,
      showCatAxisTitle: true,
      catAxisTitle: 'Tahun',
      showValAxisTitle: true,
      valAxisTitle: 'Juta Orang',
      valAxisMaxVal: 80,
      valAxisMinVal: 0,
      dataLabelPosition: 'outEnd',
      chartColors: ['4E9F3D', '1E5128']
    });
  }

  await html2pptx(path.join(slidesDir, 'slide07.html'), pptx);
  console.log('  ✓ Slide 7: Pergeseran Paradigma');

  await html2pptx(path.join(slidesDir, 'slide08.html'), pptx);
  console.log('  ✓ Slide 8: Kesimpulan Bagian I');

  await html2pptx(path.join(slidesDir, 'slide09.html'), pptx);
  console.log('  ✓ Slide 9: Framework Tantangan');

  // Slide 10 with chart
  const { slide: slide10, placeholders: p10 } = await html2pptx(path.join(slidesDir, 'slide10.html'), pptx);
  console.log('  ✓ Slide 10: Tantangan Infrastruktur');

  if (p10.length > 0) {
    const infraData = [{
      name: 'Infrastruktur',
      labels: ['Puskesmas', 'Sekolah'],
      values: [75, 86]
    }];

    slide10.addChart(pptx.charts.BAR, infraData, {
      ...p10[0],
      barDir: 'bar',
      showTitle: true,
      title: 'Kesenjangan Infrastruktur Digital (%)',
      showLegend: false,
      showCatAxisTitle: true,
      catAxisTitle: 'Persentase Belum Terhubung',
      showValAxisTitle: true,
      valAxisTitle: 'Tipe Fasilitas',
      valAxisMaxVal: 100,
      dataLabelPosition: 'outEnd',
      chartColors: ['C0392B']
    });
  }

  // Slide 11 with chart
  const { slide: slide11, placeholders: p11 } = await html2pptx(path.join(slidesDir, 'slide11.html'), pptx);
  console.log('  ✓ Slide 11: Tantangan SDM');

  if (p11.length > 0) {
    const sdmData = [{
      name: 'Kapasitas Saat Ini',
      labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
      values: [40, 42, 45, 48, 52, 55]
    }, {
      name: 'Kebutuhan',
      labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
      values: [60, 65, 70, 78, 85, 95]
    }];

    slide11.addChart(pptx.charts.LINE, sdmData, {
      ...p11[0],
      showTitle: true,
      title: 'Gap Kapasitas SDM Digital',
      showLegend: true,
      legendPos: 'b',
      showCatAxisTitle: true,
      catAxisTitle: 'Tahun',
      showValAxisTitle: true,
      valAxisTitle: 'Indeks Kapasitas',
      valAxisMinVal: 30,
      valAxisMaxVal: 100,
      lineSize: 3,
      chartColors: ['4E9F3D', 'C0392B']
    });
  }

  await html2pptx(path.join(slidesDir, 'slide12.html'), pptx);
  console.log('  ✓ Slide 12: Interoperabilitas & Data Quality');

  await html2pptx(path.join(slidesDir, 'slide13.html'), pptx);
  console.log('  ✓ Slide 13: Governance & Sustainabilitas');

  await html2pptx(path.join(slidesDir, 'slide14.html'), pptx);
  console.log('  ✓ Slide 14: Ekosistem Inovasi');

  await html2pptx(path.join(slidesDir, 'slide15.html'), pptx);
  console.log('  ✓ Slide 15: Digital Divide & Equity');

  await html2pptx(path.join(slidesDir, 'slide16.html'), pptx);
  console.log('  ✓ Slide 16: Framework Connectivity to Capability');

  await html2pptx(path.join(slidesDir, 'slide17.html'), pptx);
  console.log('  ✓ Slide 17: Strategi Konsolidasi');

  await html2pptx(path.join(slidesDir, 'slide18.html'), pptx);
  console.log('  ✓ Slide 18: Strategi Kapitalisasi');

  await html2pptx(path.join(slidesDir, 'slide19.html'), pptx);
  console.log('  ✓ Slide 19: Vision 2029');

  await html2pptx(path.join(slidesDir, 'slide20.html'), pptx);
  console.log('  ✓ Slide 20: Call to Action');

  // Save presentation
  const outputPath = path.join(__dirname, 'Transformasi-Digital-Kesehatan-2025.pptx');
  await pptx.writeFile({ fileName: outputPath });

  console.log(`\n✓ Presentation created: ${outputPath}`);
  console.log('✓ Total slides: 20');
  console.log('✓ Charts added: 3');
}

buildPresentation().catch(error => {
  console.error('Error creating presentation:', error);
  process.exit(1);
});
