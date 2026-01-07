---
title: "Strategi Aksesibilitas & Jangkauan"
description: "Strategi aksesibilitas untuk seluruh Indonesia dengan pertimbangan konektivitas dan multibahasa"
category: "architecture"
last_updated: 2025-01-07
---

# Strategi Aksesibilitas & Jangkauan

Dokumen ini menjelaskan strategi teknis dan operasional untuk memastikan sistem HELP 119 dapat diakses dan digunakan di seluruh wilayah Indonesia, dengan memperhatikan keragaman konektivitas, bahasa, dan kemampuan teknis masyarakat.

## Overview

**Tujuan:** Memastikan setiap warga Indonesia, terlepas dari lokasi geografis, kemampuan ekonomi, dan latar belakang teknis, dapat mengakses bantuan darurat kesehatan melalui HELP 119.

**Tantangan Spesifik Indonesia:**
- **Konektivitas:** 3T (Tertinggal, Terluar, Terdepan) dengan koneksi terbatas
- **Multibahasa:** 700+ bahasa daerah di seluruh Indonesia
- **Literasi Digital:** Varian kemampuan teknis yang luas
- **Diversitas Perangkat:** Dari smartphone flagship hingga phone lawas
- **Infrastruktur:** Daerah dengan sering blackout atau gangguan jaringan

---

## Strategi Konektivitas

### Klasifikasi Area Berdasarkan Konektivitas

| Tipe Area | Karakteristik | % Populasi | Pendekatan Teknis |
|-----------|---------------|------------|-------------------|
| **Urban** | 4G/5G stabil, listrik reliable | ~45% | Full feature app, real-time sync |
| **Semi-Urban** | 3G/4G stabil, listrik kadang gangguan | ~30% | Optimized app, sync saat available |
| **Rural** | 2G/3G lemah, listrik tidak reliable | ~20% | Lite app, offline-first, SMS fallback |
| **Remote/3T** | 2G sporadis/satellite phone, listrik terbatas | ~5% | USSD, SMS, satphone gateway |

### Offline-First Architecture

#### Prinsip Desain

**1. Core Functionality Must Work Offline**

Fungsi yang **WAJIB** dapat dijalankan tanpa internet:
- **Panic Button** - Mengirimkan sinyal darurat
- **GPS Location Capture** - Mendapatkan koordinat terakhir
- **First Aid Instructions** - Menampilkan panduan BHD dasar
- **Volunteer Contacts** - Menampilkan daftar relawan terdekat (tersimpan)
- **Emergency History** - Menampilkan riwayat emergency sendiri

**2. Data Sync Strategy**

```
Online Mode:
- Real-time sync ke server
- Push notifications aktif
- Live location tracking

Offline Mode:
- Simpan semua data di local storage (SQLite/IndexedDB)
- Queue API calls untuk sync saat online
- Background sync saat koneksi tersedia
- Local notifications untuk pengingat
```

**3. Graceful Degradation**

| Connectivity | App Behavior | Features Available |
|--------------|--------------|-------------------|
| **Full 4G/5G** | Full experience | All features, real-time, video call |
| **3G** | Optimized | No video, compressed images, delayed sync |
| **2G/EDGE** | Essential mode | Panic button, GPS, basic first aid, SMS sync |
| **No Internet** | Offline mode | Panic button (SMS/GPS), cached first aid, local data |
| **No Signal** | Emergency cache | GPS logging, cached first aid, flashlight SOS |

#### Technical Implementation

**App Architecture:**
```
HELP 119 App
├── Local Storage (SQLite/IndexedDB)
│   ├── User Profile & Auth Credentials
│   ├── Cached Volunteer Data (radius 10km)
│   ├── Offline First Aid Guides
│   ├── Queued API Requests (sync queue)
│   └── Emergency History (local)
│
├── Sync Manager
│   ├── Detect connectivity change
│   ├── Process sync queue (FIFO)
│   ├── Conflict resolution (last-write-wins)
│   └── Retry logic (exponential backoff)
│
└── Fallback Mechanisms
    ├── SMS Gateway (when no internet)
    ├── USSD Menu (for feature phones)
    └── Offline panic button (GPS + SMS)
```

**Data Strategy:**

| Data Type | Storage Strategy | Sync Logic |
|-----------|------------------|------------|
| **User Profile** | Local + Remote | Bi-directional, merge on conflict |
| **Volunteer List** | Cache radius 10km | Pull daily, invalidate after 7 days |
| **Emergency Request** | Queue local | Push immediately when online, SMS fallback |
| **First Aid Content** | Pre-loaded | Update monthly, versioning |
| **Location Data** | Local log | Upload when online, compress for 2G |

#### SMS Fallback System

**Ketika Panic Button Ditekan Tanpa Internet:**

```
1. App detect no internet
   ↓
2. Capture GPS coordinates (last known or current)
   ↓
3. Formulate SMS:
   "DARURAT HELP 119 [NAMA] [LOKASI] [DESKRIPSI]"
   ↓
4. Send SMS to Emergency Core Gateway:
   - Gateway Number: 08888-119-119
   - Or local volunteer hub number
   ↓
5. SMS Gateway processes and creates emergency ticket
   ↓
6. System dispatches volunteers (SMS/call)
```

**SMS Format:**
```
DARURAT <space> ID_USER <space> LAT,LONG <space> JENIS <space> DESKRIPSI

Contoh:
DARURAT 12345 -6.2088,106.8456 CARDIAC_CARDIAC ARREST victim unconscious
```

**Cost Considerations:**
- SMS ke gateway HELP 119: **Gratis** (telco sponsorship required)
- Balasan SMS ke user: **Gratis**
- Relawan tidak dikenakan biaya SMS untuk emergency response

---

## Strategi Multibahasa

### Bahasa yang Didukung

| Bahasa | Target Pengguna | Priority | Status |
|--------|----------------|----------|--------|
| **Bahasa Indonesia** | Seluruh Indonesia | P0 | ✅ Primary |
| **Bahasa Inggris** | Expatriates, tourism areas | P0 | ✅ Secondary |
| **Javanese** | Jawa Tengah, DIY, Jawa Timur | P1 | 🔄 Roadmap |
| **Sundanese** | Jawa Barat, Banten | P1 | 🔄 Roadmap |
| **Balinese** | Bali | P2 | 🔄 Roadmap |
| **Papuan Languages** | Papua | P2 | 🔄 Roadmap |
| **Local Script Support** | Wilayah dengan aksara daerah | P3 | 📋 Future |

### Implementation Strategy

**1. Unicode & Font Support**

```json
{
  "fonts": {
    "primary": "Noto Sans (Google Fonts)",
    "coverage": "Latin, Javanese, Sundanese, Balinese scripts"
  }
}
```

**2. Content Structure**

```
App Content
├── Static Text (UI labels, buttons)
│   └── Stored in JSON per language: /locales/id.json, /locales/en.json
├── Dynamic Content (first aid guides, emergency instructions)
│   └── CMS dengan multi-language fields
└── User-Generated Content (emergency descriptions)
    └── Auto-translate untuk volunteer understanding
```

**3. Language Detection**

**First Launch:**
- Detect dari system language
- Jika tidak didukung, default ke Bahasa Indonesia
- Prompt user untuk konfirmasi/ubah bahasa

**In-App Language Switcher:**
- Always accessible di settings
- No need untuk reinstall app
- Change language instantly (no restart)

**4. Translation Management**

**Approach:**
- Professional translation untuk UI static text
- Community translation untuk first aid content (peer review)
- Machine translation backup untuk emergency descriptions (Google Translate API)

**Workflow:**
```
Content Created (Bahasa Indonesia)
    ↓
Professional Translation (English)
    ↓
Community Translation (Local Languages)
    ↓
Peer Review & Approval
    ↓
Publish to App (via CMS)
```

---

## Aksesibilitas untuk Disabilitas

### Visual Impairment

**App Features:**
- **Screen Reader Compatibility**: TalkBack (Android), VoiceOver (iOS)
- **High Contrast Mode**: Untuk low vision users
- **Font Scaling**: Up to 200% without breaking layout
- **Audio-First Aid Instructions**: Text-to-speech untuk panduan
- **Haptic Feedback**: Vibration patterns untuk navigation

**Panic Button for Blind Users:**
- Large button di tengah screen
- Triple-tap shortcut dari anywhere in app
- Voice command: "HELP 119 DARURAT" (via Google Assistant/Siri)
- Audio confirmation: "Panic button ditekan, lokasi sedang dicari..."

### Hearing Impairment

**App Features:**
- **Visual Alerts**: Flash screen untuk emergency notifications
- **Vibration Patterns**: Distinct patterns untuk different alert types
- **Video Call with Sign Language**: Connect dengan relawan yang bisa BISINDO
- **Text-Based Communication**: Chat interface untuk emergency communication

### Motor Impairment

**App Features:**
- **Large Touch Targets**: Minimum 48x48dp (Android), 44x44pt (iOS)
- **Voice Command**: Hands-free operation untuk panic button
- **External Device Integration**: Bluetooth button, smartwatch trigger
- **Simplified UI**: One-handed mode untuk stroke/paralysis victims

### Cognitive Disabilities

**App Features:**
- **Simple Language**: Avoid medical jargon, use plain Indonesian
- **Visual Aids**: Icons, illustrations untuk first aid steps
- **Guided Flow**: Step-by-step dengan clear progress indicator
- **Emergency Card**: Pre-filled info (medical conditions, allergies)

---

## Optimasi untuk Perangkat Low-End

### App Lite Version

**Target:** Android phones dengan RAM < 2GB, Android 5.0+

**Technical Specifications:**

| Requirement | Full App | Lite App |
|-------------|----------|----------|
| **APK Size** | ~50 MB | ~15 MB |
| **RAM Usage** | ~150 MB | ~80 MB |
| **Storage** | 100 MB | 30 MB |
| **Android Version** | 6.0+ | 5.0+ |

**Feature Differences:**

| Feature | Full App | Lite App |
|---------|----------|----------|
| Panic Button | ✅ | ✅ |
| GPS Location | ✅ (high accuracy) | ✅ (network-based) |
| First Aid Guides | ✅ (rich media) | ✅ (text only) |
| Video Call | ✅ | ❌ |
| Maps | ✅ (interactive) | ✅ (static) |
| Push Notifications | ✅ | ✅ (SMS fallback) |
| Offline Mode | ✅ | ✅ (enhanced) |

**Technical Optimizations:**
- No external libraries (use native Android components)
- Compress images (WebP format)
- Lazy loading untuk content
- ProGuard/R8 untuk code shrinking
- Disable animations untuk battery saving

---

## Adaptasi Budaya & Konteks Lokal

### Pertimbangan Lokal

**Urban vs Rural:**
- Urban: Emphasis pada speed, accuracy, technology
- Rural: Emphasis pada community, simplicity, low-tech

**Cultural Sensitivity:**
- Gender considerations (pasien dapat meminta relawan wanita)
- Religious considerations (hormati waktu ibadah)
- Local customs (adat istiadat di daerah tertentu)

### Community Trust Building

**Strategi Adopsi:**

1. **Collaboration dengan Tokoh Masyarakat**
   - RT/RW, religious leaders, community organizers
   - Mereka menjadi advocate untuk HELP 119

2. **Local Volunteer Hubs**
   - Setiap desa/kelurahan memiliki minimal 5 relawan
   - Relawan adalah orang lokal yang dikenal

3. **Regular Community Training**
   - Gratis BHD Basic training untuk komunitas
   - Build trust melalui education

4. **Success Story Sharing**
   - Highlight cases ketika HELP 119 menyelamatkan nyawa
   - Testimonial dari korban dan relawan

---

## Monitoring & KPIs

### KPIs Aksesibilitas

| Metric | Target | Measurement |
|--------|--------|-------------|
| **App Launch Success Rate** | > 99% | Crashlytics |
| **Panic Button Success Rate** | > 99.9% | Emergency logs |
| **Time to Panic Button Press** | < 3 seconds | User analytics |
| **Offline Mode Usage** | 20-30% total requests | System logs |
| **SMS Fallback Success Rate** | > 95% | Gateway logs |
| **Multi-Language Adoption** | > 10% non-ID users | User settings |
| **Low-End Device Performance** | < 5s app launch | Device analytics |

### Monitoring Connectivity

**Dashboard Metrics:**
- User distribution by connectivity type
- Offline mode usage per region
- SMS fallback rate per province
- App performance by device tier

**Alerting:**
- Spike di offline mode usage (indikasi gangguan jaringan)
- Panic button failure rate > 1% (critical)
- SMS gateway downtime

---

## Pilot & Rollout Strategy

### Phased Rollout

**Phase 1: Urban Pilot (6 bulan)**
- Jakarta, Surabaya, Medan, Makassar
- Full feature app, 4G/5G focus
- Target: 10.000 users, 500 relawan

**Phase 2: Semi-Urban Expansion (6 bulan)**
- Kota-kota kabupaten di Jawa, Sumatera, Kalimantan
- Optimized app, 3G focus
- Target: 50.000 users, 2.000 relawan

**Phase 3: Rural Rollout (12 bulan)**
- Kecamatan-kelamatan di seluruh Indonesia
- Lite app, offline-first, SMS focus
- Target: 200.000 users, 5.000 relawan

**Phase 4: 3T & Remote (Ongoing)**
- Papua, NTT, Maluku, daerah terpencil
- USSD/SMS-based, satphone gateway
- Target: Reach 100% kecamatan di Indonesia

### Success Criteria per Phase

| Phase | User Adoption | Volunteer Coverage | Response Time | Panic Button Success |
|-------|---------------|-------------------|---------------|---------------------|
| **1 (Urban)** | 10.000 | 500 | < 5 min | > 99.5% |
| **2 (Semi-Urban)** | 50.000 | 2.000 | < 8 min | > 99% |
| **3 (Rural)** | 200.000 | 5.000 | < 12 min | > 98% |
| **4 (Remote)** | All kecamatan | 10.000 | < 15 min | > 95% |

---

## Related Documentation

- [System Architecture](./system-architecture.md) - Technical design considerations
- [Microservices Design](./microservices-design.md) - Service specifications
- [Emergency Response Playbook](../governance/emergency-playbook.md) - Operational procedures

---

*Kembali ke [Architecture](./index.md)*
