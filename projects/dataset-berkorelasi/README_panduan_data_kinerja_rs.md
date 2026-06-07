# Ringkasan: Panduan Pengumpulan Data Kinerja RS

## Dokumen yang Dibuat

| File | Deskripsi |
|------|-----------|
| `panduan_pengumpulan_data_kinerja_rs.md` | Panduan lengkap untuk mengumpulkan variabel kinerja RS |
| `template_input_data_kinerja_rs.txt` | Template input data untuk diisi oleh RS |

---

## Struktur Panduan

### 1. Panduan Pengumpulan Data (`panduan_pengumpulan_data_kinerja_rs.md)

**Bagian-bagian**:

| Section | Konten |
|---------|--------|
| **Pendahuluan** | Tujuan, prinsip, sumber data individual |
| **Sumber Data Individual** | Template data pasien, karyawan, fasilitas, keuangan |
| **Panduan A-H** | Panduan per kategori variabel dengan rumus dan SQL queries |
| **Template Input** | Form input terstruktur (YAML format) |
| **Rumus Lengkap** | Kumpulan rumus dan kalkulasi |
| **Quality Control** | Validasi, range check, logic check, trend check |
| **SQL Queries** | Query siap pakai untuk ekstraksi data |
| **Referensi** | Dokumen referensi resmi (Permenkes, KARS, WHO) |

### 2. Template Input Data (`template_input_data_kinerja_rs.txt)

**10 Section Template**:

| Section | Variabel | Jumlah |
|---------|----------|--------|
| 1. Identitas RS | Nama, provinsi, kelas, akreditasi, dll | 7 |
| 2. Klinis (A1-A10) | Waiting time, occupancy, mortality, dll | 10 |
| 3. Operasional (B1-B8) | Ratio, efficiency, digital readiness, dll | 8 |
| 4. Keuangan (C1-C7) | Profit margin, cost efficiency, ROA, dll | 7 |
| 5. Kualitas (D1-D7) | 13 Indikator MoH | 7 |
| 6. Infrastruktur (E1-E6) | Fasilitas, peralatan, sertifikasi, dll | 6 |
| 7. Akreditasi (F3-F4) | Compliance SIRS, MOH regulations | 2 |
| 8. Sosial Demografi (G1-G4) | Distribusi pasien, wilayah, dll | 4 |
| 9. Kinerja Strategis (H1-H4) | Capaian target, efektivitas, dll | 4 |
| **TOTAL** | | **55 variabel** |

---

## Cara Penggunaan

### Untuk Rumah Sakit

1. **Baca Panduan**
   - Pelajari definisi setiap variabel
   - Pahami sumber data yang diperlukan
   - Siapkan SQL queries untuk ekstraksi data

2. **Ekstrak Data Individual**
   - Ambil data dari EMR, HRIS, sistem keuangan
   - Gunakan SQL queries yang disediakan
   - Ekspor ke format CSV/Excel

3. **Isi Template**
   - Salin template `template_input_data_kinerja_rs.txt`
   - Isi nilai untuk setiap variabel
   - Hitung variabel turunan (otomatis atau manual)

4. **Validasi Data**
   - Lakukan range check
   - Lakukan logic check
   - Periksa trend dan anomali

5. **Submit Data**
   - Konversi ke format CSV/Excel
   - Kirim ke sistem evaluasi kinerja

### Untuk Developer/Analis

1. **Gunakan SQL Queries**
   - Modifikasi sesuai skema database
   - Jalankan untuk ekstraksi data otomatis

2. **Buat Dashboard**
   - Gunakan variabel sebagai KPI
   - Visualisasi dengan grafik

3. **Analisis Korelasi**
   - Hubungkan dengan kinerja RS (Baik/Kurang)
   - Identifikasi variabel prediktor

---

## Contoh Pengisian Data

### Input Individual (Raw Data)

```csv
no_rm,tanggal_masuk,tanggal_keluar,ruang_rawat,los_hari,status_keluar
RM001,2024-01-05,2024-01-10,Anggrek,5,Sembuh
RM002,2024-01-06,2024-01-12,Mawar,6,Membaik
RM003,2024-01-07,2024-01-15,Melati,8,Pindah
...
```

### Agregat ke Variabel Kinerja

```yaml
# A3. Occupancy Rate
JUMLAH_TEMPAT_TIDUR: 45
JUMLAH_HARI_OPERASIONAL: 30
TOTAL_HARI_PERAWATAN: 1050
A3_OCCUPANCY_RATE_PERCENT: 77.8  # (1050/(45*30))*100

# A5. ALOS
TOTAL_HARI_RAWAT_INAP: 1050
PASIEN_KELUAR_EXCLUDE_MENINGGAL: 200
A5_AVERAGE_LENGTH_OF_STAY_HARI: 5.25  # 1050/200
```

---

## Alur Pengumpulan Data

```
┌─────────────────────────────────────────────────────────────┐
│                  ALUR PENGUMPULAN DATA KINERJA RS            │
└─────────────────────────────────────────────────────────────┘

┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  SISTEM  │───▶│  EKSTRAK │───▶│  HITUNG  │───▶│ VALIDASI │
│  SOURCE  │    │   DATA   │    │AGREGASI │    │  DATA   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     │              │               │               │
     ▼              ▼               ▼               ▼
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│   EMR    │    │   SQL    │    │  RUMUS   │    │  QC      │
│   HRIS   │    │ QUERIES  │    │ FORMULA  │    │  CHECK   │
│FINANCE/SY│    │          │    │          │    │          │
│   ASHET  │    │          │    │          │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                            │
                                            ▼
                                   ┌──────────────────┐
                                   │   LAPORAN AKHIR  │
                                   │   CSV/Excel/YAML │
                                   └──────────────────┘
```

---

## Quick Reference: Rumus Utama

### Clinical Metrics

| Metrik | Rumus Singkat |
|--------|---------------|
| Occupancy Rate | (Patient Days / Bed Days) × 100% |
| ALOS | Patient Days / Discharges |
| BTO | Discharges / Avg Beds |
| Mortality ICU | (Deaths ICU / Discharges ICU) × 100% |
| Readmission 30d | (Readmission / Discharges) × 100% |

### Operational Metrics

| Metrik | Rumus Singkat |
|--------|---------------|
| Ratio Pasien-Dokter | Daily Visits / Doctor FTE |
| Efficiency Score | (Occ + Labor + Service) / 3 |
| Digital Readiness | Avg of 6 dimensions (0-5) |

### Financial Metrics

| Metrik | Rumus Singkat |
|--------|---------------|
| Net Profit Margin | (Net Income / Revenue) × 100% |
| Cost Efficiency | Revenue / Total Cost |
| ROA | (Net Income / Assets) × 100% |

---

## File Locations

```
dataset-berkorelasi/
├── panduan_pengumpulan_data_kinerja_rs.md     # Panduan lengkap
├── template_input_data_kinerja_rs.txt        # Template input
└── dataset_kinerja_rs_jawa.csv                # Dataset sintetik (contoh)
```

---

## Dukungan Teknis

### SQL Query untuk Ekstraksi Data Lengkap

```sql
-- QUERY LENGKAP UNTUK SEMUA VARIABEL KINERJA
-- Copy dan modifikasi sesuai struktur database RS Anda

-- ==========================================
-- A. VARIABEL KLINIS
-- ==========================================

-- A1-A5: Clinical Metrics
WITH clinical_metrics AS (
    SELECT
        -- A1. Lama Tunggu Rawat Inap (jam)
        AVG(TIMESTAMPDIFF(HOUR, decision_date, admission_date)) as A1_lama_tunggu_inap,

        -- A5. ALOS (hari)
        AVG(DATEDIFF(discharge_date, admission_date)) as A5_alos,

        -- A3. Occupancy (%)
        (SUM(DATEDIFF(discharge_date, admission_date)) * 100.0 /
         (SELECT COUNT(*) FROM tempat_tidur WHERE status='Aktif') * 30) as A3_occupancy_rate,

        -- A6. Mortality ICU (%)
        (SUM(CASE WHEN unit='ICU' AND discharge_status='Meninggal' THEN 1 ELSE 0 END) * 100.0 /
         SUM(CASE WHEN unit='ICU' THEN 1 ELSE 0 END)) as A6_mortality_icu

    FROM pasien_rawat_inap
    WHERE discharge_date BETWEEN '2024-01-01' AND '2024-01-31'
)
SELECT * FROM clinical_metrics;

-- ==========================================
-- B. VARIABEL OPERASIONAL
-- ==========================================

-- B1-B2: SDM Ratios
WITH sdm_metrics AS (
    SELECT
        -- Jumlah kunjungan harian rata-rata
        (COUNT(DISTINCT visit_id) * 1.0 / 30) as daily_visits,

        -- Jumlah dokter FTE
        (SELECT COUNT(*) FROM karyawan
         WHERE kategori LIKE '%Dokter%'
           AND employment_status IN ('PNS', 'Kontrak Full-time')) as doctors_fte,

        -- Jumlah perawat FTE
        (SELECT COUNT(*) FROM karyawan
         WHERE kategori LIKE '%Perawat%'
           AND employment_status IN ('PNS', 'Kontrak Full-time')) as nurses_fte

    FROM kunjungan_pasien
    WHERE visit_date BETWEEN '2024-01-01' AND '2024-01-31'
)
SELECT
    daily_visits / doctors_fte as B1_ratio_pasien_dokter,
    daily_visits / nurses_fte as B2_ratio_pasien_perawat
FROM sdm_metrics;

-- ==========================================
-- C. VARIABEL KEUANGAN
-- ==========================================

-- C1, C2, C7: Financial Metrics
SELECT
    -- C1. Net Profit Margin
    ((revenue - total_cost) * 100.0 / revenue) as C1_net_profit_margin,

    -- C2. Cost Efficiency Ratio
    (revenue * 1.0 / total_cost) as C2_cost_efficiency,

    -- C7. Return on Assets
    ((revenue - total_cost) * 100.0 / total_assets) as C7_roa

FROM keuangan_bulanan
WHERE periode = '2024-01-01';

-- ==========================================
-- D-H. VARIABEL LAINNYA
-- ==========================================

-- Gunakan queries spesifik sesuai kebutuhan
-- Lihat panduan lengkap untuk detail per variabel
```

---

## Catatan Penting

1. **Periode Data**: Selalu gunakan periode yang konsisten (bulanan)
2. **Definisi Variabel**: Pastikan definisi sama antar RS untuk perbandingan
3. **Validasi**: Lakukan quality control sebelum submit
4. **Dokumentasi**: Simpan data mentah untuk audit trail

---

## Kontak dan Dukungan

Untuk pertanyaan atau klarifikasi:
- Referensi: `panduan_pengumpulan_data_kinerja_rs.md`
- Template: `template_input_data_kinerja_rs.txt`
- Dataset Sintetik: `dataset_kinerja_rs_jawa.csv`

---

*Dokumen ini dibuat untuk mendukung pengumpulan data kinerja RS Indonesia*
*Versi: 1.0 | Tanggal: 2025*
