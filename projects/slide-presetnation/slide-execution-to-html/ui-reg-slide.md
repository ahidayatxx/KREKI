# UI Registry Slide - Template Presentasi Desktop untuk Cetak

## Deskripsi
Template HTML untuk membuat presentasi format desktop yang dapat dicetak dengan baik. Dioptimalkan untuk tampilan satu screen penuh dan output print yang profesional.

## Struktur Dasar

### 1. Head Section
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[JUDUL PRESENTASI]</title>
    <style>
        /* CSS styling di sini */
    </style>
</head>
```

### 2. CSS Core Components

#### Base Styles (Print Version)
- `*` - Reset margin/padding
- `body` - Font Segoe UI, 11pt, background white
- `.print-container` - Max width 210mm (A4), centered
- `.slide` - Page break setiap slide, border, padding 15mm

#### Base Styles (Desktop Interactive Version)
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    overflow: hidden;
    height: 100vh;
    font-size: 18px; /* Base font size untuk desktop */
}
```

#### Typography
- `h1` - 20pt, color #1e3c72, bold
- `.subtitle` - 12pt, color #666
- `.slide-title` - Background #2a5298, white text, 14pt
- Gunakan line-height 1.6 untuk keterbacaan

#### Layout Components

**Grid Systems:**
- `.framework-grid` - Display grid, 1 kolom, gap 15px
- `.governance-structure` - Grid untuk struktur organisasi
- `.goals-grid` - Grid untuk goal cards
- `.discussion-grid` - Grid untuk diskusi items

**Cards & Boxes:**
- `.framework-card` - Background #f8f9fa, border-left 4px
- `.governance-box` - Border 2px, text-align center
- `.info-box` - Background #f8f9fa, border-left 4px
- `.alert-box` - Background #fff9e6, border-left warning

**Process Flow:**
- `.process-flow` - Container untuk alur proses
- `.flow-step` - Flex layout dengan step number
- `.step-number` - Circle background, 35px diameter
- `.step-content` - Title dan description

**Tables:**
- `.criteria-table` - Width 100%, 10pt font
- Header - Background #2a5298, white text
- Cell - Padding 10px, border-bottom

#### Color Palette
```css
Primary Blue: #2a5298, #1e3c72, #3498db
Secondary: #27ae60 (green), #e74c3c (red), #9b59b6 (purple)
Warning: #ffc107, #856404
Neutrals: #f8f9fa, #e0e0e0, #666, #333
```

#### Responsive Design (Desktop Interactive)
```css
/* Desktop besar */
@media (min-width: 1920px) {
    body {
        font-size: 20px;
    }

    .slide {
        padding: 80px 120px;
    }

    .slide-title {
        font-size: 3em;
    }

    h1 {
        font-size: 3.8em;
    }
}

/* Desktop kecil/laptop */
@media (max-width: 1366px) {
    .slide {
        padding: 40px 60px;
    }

    .framework-grid {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
}
```

#### Print Optimization
```css
@media print {
    .slide { page-break-after: always; }
    /* Color preservation */
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    /* Prevent breaking */
    break-inside: avoid;
    page-break-inside: avoid;
}

@page {
    size: A4;
    margin: 15mm;
}
```

### 3. Body Structure

#### Container
```html
<body>
    <div class="print-container">
        <!-- Slides di sini -->
    </div>
</body>
```

#### Slide Template
```html
<div class="slide">
    <!-- Header (opsional untuk slide pertama) -->
    <div class="slide-header">
        <h1>[JUDUL UTAMA]</h1>
        <p class="subtitle">[SUBTITLE]</p>
    </div>

    <!-- Title bar slide -->
    <div class="slide-title">
        [JUDUL SLIDE]
    </div>

    <!-- Konten slide -->
    [KONTEN]

    <!-- Page number -->
    <div class="page-number">Halaman X dari Y</div>
</div>
```

## Navigation Controls (Untuk Versi Desktop Interaktif)

### Navigation Bar (Fixed di Kanan Bawah)
```css
.navigation {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(0,0,0,0.7);
    border-radius: 20px;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1000;
    box-shadow: 0 3px 15px rgba(0,0,0,0.2);
}

.nav-btn {
    background: #2a5298;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    transition: background 0.3s, transform 0.2s;
}

.nav-btn:hover {
    background: #1e3c72;
    transform: translateY(-1px);
}

.nav-btn:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
}

.slide-counter {
    color: white;
    font-size: 12px;
    font-weight: 500;
    min-width: 50px;
    text-align: center;
}
```

### HTML Navigation
```html
<!-- Navigation Controls -->
<div class="navigation">
    <button class="nav-btn" id="prevBtn" onclick="changeSlide(-1)">◀ Prev</button>
    <span class="slide-counter">
        <span id="currentSlide">1</span> / <span id="totalSlides">15</span>
    </span>
    <button class="nav-btn" id="nextBtn" onclick="changeSlide(1)">Next ▶</button>
</div>
```

### JavaScript untuk Navigation
```javascript
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.getElementById('totalSlides').textContent = totalSlides;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    document.getElementById('currentSlide').textContent = index + 1;

    // Update navigation buttons
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === totalSlides - 1;

    // Scroll to top of slide
    slides[index].scrollTop = 0;
}

function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;
    if (newIndex >= 0 && newIndex < totalSlides) {
        currentSlideIndex = newIndex;
        showSlide(currentSlideIndex);
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            changeSlide(-1);
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Space bar
            changeSlide(1);
            e.preventDefault();
            break;
        case 'Home':
            currentSlideIndex = 0;
            showSlide(currentSlideIndex);
            e.preventDefault();
            break;
        case 'End':
            currentSlideIndex = totalSlides - 1;
            showSlide(currentSlideIndex);
            e.preventDefault();
            break;
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Initialize first slide
showSlide(0);

// Prevent zooming on mobile double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add fullscreen toggle (F11 alternative)
document.addEventListener('keydown', function(e) {
    if (e.key === 'F11') {
        e.preventDefault();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});
```

### Slide Management CSS
```css
.presentation-container {
    position: relative;
    width: 100%;
    height: 100vh;
}

.slide {
    display: none;
    width: 100%;
    height: 100vh;
    padding: 60px 80px;
    background: white;
    box-sizing: border-box;
    overflow-y: auto;
    animation: slideIn 0.5s ease-in-out;
}

.slide.active {
    display: block;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```

## Layout Variations

### Grid Patterns
```css
/* 2 Kolom */
.two-column-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
}

/* 3 Kolom */
.three-column-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

/* 5 Kolom (untuk best practices) */
.five-column-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
}

/* Auto-fit responsive */
.framework-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
}
```

## Gradient & Enhanced Styling Patterns

### Gradient Backgrounds
```css
/* Gradient Header (Purple) */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Gradient Header (Red) */
background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);

/* Gradient Header (Orange) */
background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);

/* Gradient Background (Blue) */
background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
```

### Box Styling Patterns
```css
/* Enhanced Box dengan Shadow */
.enhanced-box {
    background: white;
    padding: 35px;
    border-radius: 20px;
    border-left: 8px solid #2a5298;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.enhanced-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}
```

## Pattern Components

### 1. Speaker Info Box (Desktop Interactive)
```html
<div class="speaker-info">
    <h3>📢 [NAMA PEMBICARA]</h3>
    <p>[JABATAN & EVENT]</p>
</div>
```

**CSS:**
```css
.speaker-info {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 40px;
    text-align: center;
}

.speaker-info h3 {
    font-size: 1.8em;
    margin-bottom: 10px;
}

.speaker-info p {
    font-size: 1.3em;
}
```

### 1b. Speaker Info Box (Print Version)
```html
<div class="speaker-info">
    <h3>[NAMA PEMBICARA]</h3>
    <p>[JABATAN & EVENT]</p>
</div>
```

### 2. Online Version Link
```html
<div class="online-version-link">
    <h4>🌐 Versi Interaktif Online</h4>
    <p>Untuk pengalaman presentasi yang lebih interaktif, kunjungi:</p>
    <p><a href="[URL]" target="_blank">[URL]</a></p>
</div>
```

### 3. Goal Cards Grid
```html
<div class="goals-grid">
    <div class="goal-card">
        <h4>[JUDUL GOAL]</h4>
        <p>[DESKRIPSI]</p>
    </div>
    <!-- Repeat -->
</div>
```

### 4. Framework Cards
```html
<div class="framework-grid">
    <div class="framework-card" style="border-left-color: #3498db;">
        <h3 style="color: #3498db;">[JUDUL]</h3>
        <ul>
            <li>[POIN 1]</li>
            <li>[POIN 2]</li>
        </ul>
    </div>
</div>
```

### 5. Process Flow Steps
```html
<div class="process-flow">
    <div class="flow-step">
        <div class="step-number" style="background: #3498db;">1</div>
        <div class="step-content">
            <div class="step-title" style="color: #3498db;">[JUDUL STEP]</div>
            <div class="step-desc">[DESKRIPSI]</div>
        </div>
    </div>
    <!-- Repeat -->
</div>
```

### 6. Criteria Table
```html
<table class="criteria-table">
    <thead>
        <tr>
            <th>[KOLOM 1]</th>
            <th>[KOLOM 2]</th>
            <th>[KOLOM 3]</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>[DATA]</td>
            <td>[DATA]</td>
            <td>[DATA]</td>
        </tr>
    </tbody>
</table>
```

### 7. Priority Badges
```html
<span class="priority-badge high-priority">Tinggi</span>
<span class="priority-badge medium-priority">Sedang</span>
```

### 8. Alert/Info Boxes
```html
<div class="alert-box">
    <div class="alert-title">[JUDUL PERINGATAN]</div>
    <div class="alert-content">[ISI PERINGATAN]</div>
</div>

<div class="info-box">
    <h4>[JUDUL INFO]</h4>
    <p>[KONTEN]</p>
</div>
```

### 9. Key Points Section
```html
<div class="key-points">
    <h3>[JUDUL]</h3>
    <ul>
        <li>[POIN 1]</li>
        <li>[POIN 2]</li>
    </ul>
</div>
```

### 10. Discussion Items
```html
<div class="discussion-grid">
    <div class="discussion-item" style="border-left-color: #2a5298;">
        <h4>[PERTANYAAN/TOPIK]</h4>
        <p>[DESKRIPSI]</p>
    </div>
</div>
```

### 11. Thank You Slide
```html
<div class="slide">
    <div class="thank-you-content">
        <div class="thank-you-main">
            <h1>🙏 Terima Kasih</h1>
            <p>[SUBTITLE]</p>
        </div>

        <div class="contact-info">
            <h3>📧 Kontak & Tindak Lanjut</h3>
            <p>[INFO KONTAK]</p>
        </div>

        <div class="closing-message">
            <p>[PESAN PENUTUP]</p>
        </div>
    </div>
</div>
```

## Best Practices

### Desktop Display
- Gunakan max-width 210mm untuk simulasi ukuran A4
- Font size minimal 10pt untuk keterbacaan
- Padding/margin cukup (15mm standar)
- Contrast ratio minimal 4.5:1

### Print Optimization
- Gunakan `print-color-adjust: exact` untuk preserve warna
- Set `break-inside: avoid` untuk cards/boxes
- Page breaks di `.slide` class
- Border minimal/tipis untuk print

### Content Structure
- 1 ide utama per slide
- Maksimal 5-7 bullet points per section
- Gunakan visual hierarchy (size, color, weight)
- Konsisten dalam spacing

### Accessibility
- Semantic HTML (h1-h6 hierarchy)
- Sufficient color contrast
- Font size readable (min 10pt)
- Clear visual separators

## File Naming Convention
`presentation-desktop-[topik]-[tanggal]-print.html`

Contoh: `presentation-desktop-fgd-access-mechanism-print.html`

## Perbedaan Versi Print vs Desktop Interaktif

### Versi Print (`-print.html`)
- Untuk cetak/PDF export
- Tidak ada navigation controls
- Page breaks untuk setiap slide
- `.page-number` di setiap slide
- Container max-width 210mm (A4)

### Versi Desktop Interaktif (`.html`)
- Untuk presentasi langsung
- Ada navigation controls di kanan bawah
- Slide tampil satu per satu (display: none/block)
- Full viewport height (100vh)
- Background gradient
- Keyboard navigation support
- Touch/swipe untuk mobile

## Workflow Penggunaan

### Untuk Versi Print
1. **Copy template CSS** dari file referensi print
2. **Sesuaikan warna** sesuai tema presentasi
3. **Buat struktur slide** dengan div.slide
4. **Isi konten** menggunakan pattern components
5. **Test print preview** di browser
6. **Export PDF** jika diperlukan

### Untuk Versi Desktop Interaktif
1. **Copy template CSS + JavaScript** dari file referensi
2. **Sesuaikan warna** dan font sizes (lebih besar untuk desktop)
3. **Buat presentation-container** dan div.slide dengan class "active" untuk slide pertama
4. **Tambahkan navigation controls** di luar container
5. **Isi konten** menggunakan pattern components
6. **Test navigation** (keyboard arrows, buttons, swipe)

## Complete Slide Templates

### Title Slide (Desktop Interactive)
```html
<div class="slide active">
    <div class="slide-header">
        <h1>🔐 [JUDUL UTAMA]</h1>
        <p class="subtitle">[SUBTITLE]</p>
    </div>

    <div class="speaker-info">
        <h3>📢 [NAMA PEMBICARA]</h3>
        <p>[JABATAN & EVENT]</p>
    </div>

    <div style="background: #f8f9fa; padding: 40px; border-radius: 20px; border-left: 8px solid #2a5298;">
        <h3 style="color: #1e3c72; margin-bottom: 30px; font-size: 1.8em; text-align: center;">🎯 Tujuan Presentasi</h3>
        <div class="goals-grid">
            <div class="goal-card">
                <h4>📚 [GOAL 1]</h4>
                <p>[DESKRIPSI]</p>
            </div>
            <div class="goal-card">
                <h4>🏗️ [GOAL 2]</h4>
                <p>[DESKRIPSI]</p>
            </div>
            <div class="goal-card">
                <h4>🚀 [GOAL 3]</h4>
                <p>[DESKRIPSI]</p>
            </div>
        </div>
    </div>
</div>
```

### Content Slide dengan Framework Cards
```html
<div class="slide">
    <div class="slide-title">
        <span>🌍</span>
        <span>[JUDUL SLIDE]</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 25px; margin: 30px 0;">
        <div class="framework-card" style="border-left-color: #3498db;">
            <h3 style="color: #3498db;">🇬🇧 [JUDUL]</h3>
            <ul>
                <li>[POIN 1]</li>
                <li>[POIN 2]</li>
                <li>[POIN 3]</li>
            </ul>
        </div>
        <!-- Repeat untuk card lainnya -->
    </div>
</div>
```

### Discussion/Q&A Slide
```html
<div class="slide">
    <div class="slide-title">
        <span>💬</span>
        <span>Pertanyaan untuk Diskusi Panel</span>
    </div>

    <div class="discussion-grid">
        <div class="discussion-item" style="border-left-color: #2a5298;">
            <h4>1. [TOPIK]</h4>
            <p>[PERTANYAAN DETAIL]</p>
        </div>
        <div class="discussion-item" style="border-left-color: #27ae60;">
            <h4>2. [TOPIK]</h4>
            <p>[PERTANYAAN DETAIL]</p>
        </div>
    </div>
</div>
```

### Thank You Slide
```html
<div class="slide">
    <div class="thank-you-content">
        <div class="thank-you-main">
            <h1>🙏 Terima Kasih</h1>
            <p>[SUBTITLE PENUTUP]</p>
        </div>

        <div class="contact-info">
            <h3>📧 Kontak & Tindak Lanjut</h3>
            <p>
                <strong>[NAMA]</strong><br>
                [JABATAN]<br>
                [EVENT/LOKASI]
            </p>
        </div>

        <div class="closing-message">
            <p>🎯 <em>[PESAN PENUTUP]</em></p>
        </div>
    </div>
</div>
```

## Inline Styling Patterns (Sering Digunakan)

### Highlighted Box dengan Gradient
```html
<div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); padding: 40px; border-radius: 20px; color: white; text-align: center; margin-bottom: 40px;">
    <h3 style="margin-bottom: 20px; font-size: 2.2em; font-weight: 600;">[JUDUL]</h3>
    <p style="font-size: 1.4em; opacity: 0.95; font-style: italic;">[SUBTITLE]</p>
</div>
```

### Two Column Layout dengan Border
```html
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-bottom: 40px;">
    <div style="background: #f8f9fa; padding: 35px; border-radius: 20px; border-left: 8px solid #e74c3c;">
        <h3 style="color: #c0392b; margin-bottom: 25px; font-size: 1.6em; font-weight: 600;">[JUDUL KIRI]</h3>
        <ul style="list-style: none; padding-left: 0; line-height: 2; font-size: 1.1em; color: #2c3e50;">
            <li>[ITEM 1]</li>
            <li>[ITEM 2]</li>
        </ul>
    </div>

    <div style="background: #f8f9fa; padding: 35px; border-radius: 20px; border-left: 8px solid #3498db;">
        <h3 style="color: #2980b9; margin-bottom: 25px; font-size: 1.6em; font-weight: 600;">[JUDUL KANAN]</h3>
        <ul style="list-style: none; padding-left: 0; line-height: 2; font-size: 1.1em; color: #2c3e50;">
            <li>[ITEM 1]</li>
            <li>[ITEM 2]</li>
        </ul>
    </div>
</div>
```

### Flow Steps dengan Inline Styling
```html
<div style="background: white; border-radius: 20px; padding: 40px; border-left: 8px solid #3498db; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
    <div style="display: flex; align-items: flex-start; gap: 30px;">
        <div style="background: #3498db; color: white; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 2.2em; flex-shrink: 0; box-shadow: 0 4px 15px rgba(52,152,219,0.3);">1</div>
        <div style="flex-grow: 1;">
            <h3 style="color: #3498db; font-size: 1.8em; margin-bottom: 15px; font-weight: 600;">[JUDUL STEP]</h3>
            <div style="color: #7f8c8d; font-size: 1.1em; line-height: 1.6;">[DESKRIPSI]</div>
        </div>
    </div>
</div>
```

## Font Sizing Guide

### Desktop Interactive (base: 18px)
- h1: 3.2em (57.6px)
- h2 / .slide-title: 2.5em (45px)
- h3: 1.8em (32.4px)
- h4: 1.4em (25.2px)
- Body text: 1.1-1.2em (19.8-21.6px)
- Small text: 1em (18px)

### Print Version (base: 11pt)
- h1: 20pt
- .slide-title: 14pt
- h3: 12-13pt
- h4: 11pt
- Body text: 10-11pt
- Small text: 9pt

## Tips
- Gunakan emoji secukupnya untuk visual appeal
- Konsisten dalam penggunaan icon/emoji
- Test di berbagai browser untuk print compatibility
- Simpan inline CSS untuk portabilitas
- Gunakan web-safe fonts (Segoe UI, Arial, sans-serif)
- Font size untuk desktop 1.5-2x lebih besar dari print
- Navigation keyboard: Arrow keys, Space, Home, End, F11 (fullscreen)
- Gunakan `em` units untuk font sizing agar responsive terhadap base font size
- Hover effects hanya untuk desktop interactive version
- Gradient backgrounds tidak akan print dengan baik, gunakan solid colors untuk print version
