# Panduan Pengumpulan Data Kinerja Rumah Sakit
## Hospital Performance Data Collection Guide

---

## Daftar Isi

1. [Pendahuluan](#pendahuluan)
2. [Sumber Data Individual](#sumber-data-individual)
3. [Panduan Per Kategori Variabel](#panduan-per-kategori-variabel)
4. [Template Input Data](#template-input-data)
5. [Rumus dan Kalkulasi](#rumus-dan-kalkulasi)
6. [Quality Control](#quality-control)

---

## Pendahuluan

### Tujuan
Dokumen ini memandu Rumah Sakit (RS) dalam mengumpulkan, menghitung, dan melaporkan variabel kinerja operasional untuk keperluan:
- Akreditasi Rumah Sakit (KARS)
- Pelaporan SIRS (Sistem Informasi Rumah Sakit)
- Evaluasi kinerja internal
- Perbandingan benchmarking

### Prinsip Pengumpulan Data
1. **Individual-Level Data**: Semua variabel dihitung dari data level pasien/karyawan individual
2. **Periode Pelaporan**: Bulanan (dengan akumulasi triwulan dan tahunan)
3. **Sumber Data**: EMR (Electronic Medical Record), sistem keuangan, HRIS, dll.

---

## Sumber Data Individual

### A. Data Pasien Individual (EMR/RM)
```
SET_DATA_PASIEN = {
    "no_rm": "Nomor Rekam Medis",
    "tanggal_kunjungan": "YYYY-MM-DD",
    "tipe_kunjungan": ["Rawat Jalan", "Rawat Inap", "IGD"],
    "tanggal_masuk": "YYYY-MM-DD HH:MM",
    "tanggal_keluar": "YYYY-MM-DD HH:MM",
    "ruang_rawat": "Nama ruangan/ward",
    "tipe_pasien": ["BPJS", "Asuransi Swasta", "Umum"],
    "diagnosa": "ICD-10 code",
    "tindakan": "Prosedur yang dilakukan",
    "status_keluar": ["Sembuh", "Membaik", "Pindah", "Pulang Paksa", "Meninggal"],
    "jenis_kematian": ["< 48 jam", "> 48 jam", "KLA", "post-operasi"],
}
```

### B. Data Karyawan Individual (HRIS)
```
SET_DATA_KARYAWAN = {
    "nik": "Nomor Induk Karyawan",
    "kategori": ["Dokter Spesialis", "Dokter Umum", "Perawat Spesialis", "Perawat Umum"],
    "status_pegawai": ["PNS", "PPPK", "Kontrak", "Harian Lepas"],
    "shift": ["Pagi", "Siang", "Malam"],
    "sertifikasi": ["Sertifikasi", "Belum"],
}
```

### C. Data Fasilitas & Peralatan (Asset Management)
```
SET_DATA_FASILITAS = {
    "kode_aset": "Kode inventaris",
    "nama_alat": "Nama peralatan",
    "lokasi": "Ruangan/Unit",
    "tanggal_beli": "YYYY-MM-DD",
    "status": ["Berfungsi", "Rusak", "Dalam Perbaikan"],
}
```

### D. Data Keuangan (Sistem Keuangan)
```
SET_DATA_KEUANGAN = {
    "jenis_pendapatan": ["Pelayanan", "Obat", "Administrasi"],
    "sumber_dana": ["BPJS", "Asuransi", "Pasien Umum"],
    "jenis_biaya": ["SDM", "Obat", "Alat Kesehatan", "Operasional"],
    "nominal": "Nilai dalam Rupiah",
}
```

---

## Panduan Per Kategori Variabel

---

## A. Variabel Klinis (Clinical)

### A1. lama_tunggu_rawat_inap (jam)
**Definisi**: Rata-rata waktu tunggu pasien dari keputusan rawat inap hingga masuk ke ruang rawat inap.

**Sumber Data Individual**:
```sql
-- Dari EMR, ambil pasien yang dirawat inap:
SELECT
    no_rm,
    tanggal_keputusan_rawat_inap,
    tanggal_masuk_ruang_rawat,
    TIMESTAMPDIFF(HOUR, tanggal_keputusan_rawat_inap, tanggal_masuk_ruang_rawat) as lama_tunggu_jam
FROM pasien_rawat_inap
WHERE tanggal_keluar BETWEEN '2024-01-01' AND '2024-01-31'
```

**Rumus**:
```
lama_tunggu_rawat_inap = SUM(lama_tunggu_jam untuk semua pasien rawat inap) / COUNT(pasien rawat inap)
```

**Panduan Pengisian**:
| Field | Input | Satuan |
|-------|-------|--------|
| Total jam tunggu (bulanan) | 1,250 | jam |
| Jumlah pasien rawat inap | 500 | pasien |
| **Rata-rata** | **2.5** | jam/pasien |

---

### A2. lama_tunggu_rawat_jalan (menit)
**Definisi**: Rata-rata waktu tunggu pasien dari registrasi hingga dilayani dokter.

**Sumber Data Individual**:
```sql
SELECT
    no_rm,
    waktu_registrasi,
    waktu_pelayanan_dokter,
    TIMESTAMPDIFF(MINUTE, waktu_registrasi, waktu_pelayanan_dokter) as lama_tunggu_menit
FROM pasien_rawat_jalan
WHERE tanggal_kunjungan BETWEEN '2024-01-01' AND '2024-01-31'
```

**Rumus**:
```
lama_tunggu_rawat_jalan = SUM(lama_tunggu_menit) / COUNT(pasien rawat jalan)
```

---

### A3. occupancy_rate_per_department (%)
**Definisi**: Persentase pemakaian tempat tidur per departemen/ruangan.

**Sumber Data Individual**:
- Jumlah tempat tidur yang tersedia per ruangan
- Jumlah pasien yang menempati tempat tidur per hari

**Rumus**:
```
Occupancy Rate = (Jumlah Hari Perawatan / Jumlah Hari Tempat Tidur Tersedia) × 100%

Jumlah Hari Perawatan = SUM(lama_rawat_inap_hari untuk semua pasien)
Jumlah Hari Tempat Tidur Tersedia = (jumlah_tempat_tidur × 30 hari)
```

**Panduan Pengisian**:

| Ruangan | TT Tersedia | Pasien × Rata-rata LOS | Hari Perawatan | Occupancy Rate |
|---------|-------------|----------------------|----------------|----------------|
| Anggrek | 20 | 18 × 5 hari | 900 | 150% → 100%* |
| Mawar | 15 | 12 × 4 hari | 480 | 107% |
| Melati | 10 | 8 × 3 hari | 240 | 80% |

*Occupancy rate maksimum 100%

**Rumus per departemen**:
```
Occupancy Rate Departemen = Total Hari Perawatan / (Total TT × 30 hari) × 100%
```

---

### A4. bed_turnover_rate
**Definisi**: Jumlah pasien yang menggunakan satu tempat tidur dalam satu periode.

**Rumus**:
```
Bed Turnover Rate = Jumlah Pasien Rawat Inap Keluar / Rata-rata Tempat Tidur Terpakai
```

**Panduan Pengisian**:

| Bulan | Pasien Keluar | Rata-rata TT Terpakai | BTO |
|-------|---------------|----------------------|-----|
| Januari | 450 | 45 | 10.0 |

---

### A5. average_length_of_stay / ALOS (hari)
**Definisi**: Rata-rata lama hari rawat inap pasien.

**Sumber Data Individual**:
```sql
SELECT
    no_rm,
    tanggal_masuk,
    tanggal_keluar,
    DATEDIFF(tanggal_keluar, tanggal_masuk) as los_hari
FROM pasien_rawat_inap
WHERE tanggal_keluar BETWEEN '2024-01-01' AND '2024-01-31'
  AND status_keluar IN ('Sembuh', 'Membaik', 'Pulang Paksa')
```

**Rumus**:
```
ALOS = Total Hari Rawat Inap / Jumlah Pasien Rawat Inap Keluar
```

---

### A6. mortality_rate_icu (%)
**Definisi**: Persentase kematian pasien di ICU terhadap total pasien ICU.

**Sumber Data Individual**:
```sql
SELECT
    no_rm,
    tanggal_masuk_icu,
    tanggal_keluar_icu,
    status_keluar  -- 'Meninggal' atau lainnya
FROM pasien_icu
WHERE tanggal_keluar_icu BETWEEN '2024-01-01' AND '2024-01-31'
```

**Rumus**:
```
Mortality Rate ICU = (Jumlah Pasien Meninggal di ICU / Jumlah Pasien Keluar ICU) × 100%
```

---

### A7. mortality_rate_post_operasi (%)
**Definisi**: Persentase kematian pasien dalam 30 hari pasca operasi.

**Sumber Data Individual**:
```sql
SELECT
    no_rm,
    tanggal_operasi,
    tanggal_meninggal,
    DATEDIFF(tanggal_meninggal, tanggal_operasi) as hari_post_operasi
FROM pasien_operasi
WHERE tanggal_operasi BETWEEN '2024-01-01' AND '2024-01-31'
  AND tanggal_meninggal IS NOT NULL
  AND DATEDIFF(tanggal_meninggal, tanggal_operasi) <= 30
```

**Rumus**:
```
Mortality Rate Post-Operasi = (Jumlah Kematian ≤ 30 hari post-op / Jumlah Operasi) × 100%
```

---

### A8. readmission_rate_30_hari (%)
**Definisi**: Persentase pasien yang kembali rawat inap dalam 30 hari setelah pulang.

**Sumber Data Individual**:
```sql
-- Pasien readmission dalam 30 hari
WITH readmission AS (
    SELECT
        no_rm,
        tanggal_keluar,
        LAG(tanggal_masuk, 1) OVER (PARTITION BY no_rm ORDER BY tanggal_masuk) as tanggal_masuk_sebelumnya
    FROM pasien_rawat_inap
)
SELECT
    no_rm,
    tanggal_masuk_sebelumnya,
    tanggal_keluar,
    DATEDIFF(tanggal_masuk, tanggal_keluar) as hari_readmission
FROM readmission
WHERE DATEDIFF(tanggal_masuk, tanggal_keluar) <= 30
  AND DATEDIFF(tanggal_masuk, tanggal_keluar) > 0
```

**Rumus**:
```
Readmission Rate = (Jumlah Readmission dalam 30 hari / Jumlah Pasien Pulang) × 100%
```

---

### A9. persentase_pasiensenyum (%)
**Definisi**: Persentase pasien yang memberikan respon "Puas" atau "Sangat Puas" pada survei kepuasan.

**Sumber Data Individual**:
- Hasil survei kepuasan pasien (bisa paper-based atau digital)

**Rumus**:
```
Persentase Puas = (Jumlah Respon Puas + Sangat Puas) / Total Respon Survei × 100%
```

**Panduan Pengisian**:

| Respon | Jumlah |
|--------|--------|
| Sangat Puas | 350 |
| Puas | 280 |
| Cukup | 45 |
| Kurang | 15 |
| Sangat Kurang | 10 |
| **Total** | **700** |
| **% Pasiensenyum** | **(350+280)/700 = 90%** |

---

### A10. indikator_kualitas_layanan_13 (%)
**Definisi**: Rata-rata capaian dari 13 indikator kualitas layanan sesuai Permenkes No. 30 Tahun 2022.

**13 Indikator Kualitas (Permenkes 30/2022)**:

| No | Indikator | Definisi |
|----|-----------|----------|
| 1 | Penyakit Menular | % pasien demam tifoid, diare, ISPA yang ditatalaksana sesuai standar |
| 2 | Pencegahan Infeksi | % kepatuhan pencucian tangan |
| 3 | Imunisasi | % bayi mendapat imunisasi lengkap |
| 4 | Penyakit Tidak Menular | % pasien DM, Hipertensi, Gagal Ginjal, Jantung, Stroke ditatalaksana sesuai standar |
| 5 | Suspek TB | % suspek TB dengan pemeriksaan dahak |
| 6 | Implementasi BPJS | % pasien BPJS dilayani sesuai standar |
| 7 | Safety Pasien | % kepatuhan identifikasi pasien, marking operasi, safety checklist |
| 8 | Pemeriksaan Kesehatan | % tenaga kesehatan melakukan pemeriksaan kesehatan berkala |
| 9 | Pelayanan Kesehatan Masyarakat | % kegiatan promosi kesehatan |
| 10 | Gizi | % pasien gizi buruk ditatalaksana sesuai standar |
| 11 | Obat Esensial | % ketersediaan obat esensial |
| 12 | Laboratorium | % kesesuaian waktu hasil laboratorium |
| 13 | Radiologi | % kesesuaian waktu hasil radiologi |

**Rumus**:
```
Indikator Kualitas 13 = (Sum of all 13 indicator percentages) / 13
```

**Panduan Pengisian**:
```
Indikator Kualitas 13 = (Indikator 1 + Indikator 2 + ... + Indikator 13) / 13

Contoh:
= (90% + 85% + 88% + 92% + 87% + 91% + 93% + 86% + 84% + 89% + 95% + 88% + 90%) / 13
= 1,158% / 13
= 89.1%
```

---

## B. Variabel Operasional (Operational)

### B1. ratio_pasien_ke_dokter
**Definisi**: Rasio jumlah pasien per dokter (termasuk semua kategori dokter).

**Sumber Data Individual**:
```sql
-- Jumlah pasien (harian/avg bulanan)
SELECT COUNT(DISTINCT no_rm) as total_pasien
FROM kunjungan_pasien
WHERE tanggal_kunjungan BETWEEN '2024-01-01' AND '2024-01-31'

-- Jumlah dokter (FTE full-time equivalent)
SELECT
    kategori,
    COUNT(*) as jumlah_dokter
FROM karyawan
WHERE kategori LIKE '%Dokter%'
  AND status_pegawai IN ('PNS', 'PPPK', 'Kontrak Full-time')
```

**Rumus**:
```
Ratio Pasien-Dokter = Rata-rata Kunjungan Harian / Jumlah Dokter FTE

Rata-rata Kunjungan Harian = Total Kunjungan Bulanan / 30 hari
```

**Panduan Pengisian**:

| Komponen | Nilai |
|----------|-------|
| Total kunjungan bulanan | 15,000 |
| Rata-rata kunjungan harian | 15,000 / 30 = 500 |
| Jumlah dokter FTE | 20 |
| **Ratio** | **500 / 20 = 25** |

*Catatan: Semakin rendah ratio, semakin baik*

---

### B2. ratio_pasien_ke_perawat
**Definisi**: Rasio jumlah pasien per perawat.

**Rumus**:
```
Ratio Pasien-Perawat = Rata-rata Kunjungan Harian / Jumlah Perawat FTE
```

---

### B3. waktu_tunggu_laboratorium (jam)
**Definisi**: Rata-rata waktu dari permintaan pemeriksaan hingga hasil keluar.

**Sumber Data Individual**:
```sql
SELECT
    no_lab,
    waktu_permintaan,
    waktu_hasil_keluar,
    TIMESTAMPDIFF(HOUR, waktu_permintaan, waktu_hasil_keluar) as turnaround_jam
FROM pemeriksaan_laboratorium
WHERE waktu_permintaan BETWEEN '2024-01-01' AND '2024-01-31'
```

**Rumus**:
```
Waktu Tunggu Lab = SUM(turnaround_jam) / COUNT(pemeriksaan)
```

**Target (umum)**:
- Rutin: ≤ 24 jam
- Cepat: ≤ 2 jam
- Statistik: ≤ 1 jam

---

### B4. waktu_antrean_pharmacy (menit)
**Definisi**: Rata-rata waktu tunggu di antrian farmasi.

**Rumus**:
```
Waktu Antrean Pharmacy = SUM(waktu_tunggu_menit) / COUNT(resep)
```

---

### B5. efficiency_score_v2 (0-100)
**Definisi**: Skor efisiensi operasional gabungan.

**Komponen**:
- Efisiensi tempat tidur (occupancy rate)
- Efisiensi tenaga kerja (ratio)
- Efisiensi pelayanan (waiting time)

**Rumus**:
```
Efficiency Score = (Occupancy Score + Labor Score + Service Score) / 3

Dimana:
- Occupancy Score = min(occupancy_rate, 100)
- Labor Score = 100 - (ratio_pasien_ke_dokter / 50 × 100)
- Service Score = 100 - (waktu_tunggu_rawat_jalan / 120 × 100)
```

---

### B6. digital_readiness_score (0-5)
**Definisi**: Tingkat kesiapan digital RS berdasarkan 6 dimensi.

**6 Dimensi Digital Readiness**:

| Dimensi | Kriteria Skor |
|---------|---------------|
| **1. Infrastruktur IT** | 0: Tidak ada, 1: Dasar, 2: Terkomputerisasi, 3: Terintegrasi, 4: Lanjut, 5: Inovatif |
| **2. EMR** | 0: Paper, 1: Digital parsial, 2: EMR dasar, 3: EMR lengkap, 4: EMR dengan CPOE, 5: EMR dengan AI |
| **3. Telehealth** | 0: Tidak ada, 1: Konseling telepon, 2: Video consult, 3: Telemedicine lengkap, 4: Remote monitoring, 5: Telehealth terintegrasi |
| **4. Interoperabilitas** | 0: Tidak ada, 1: Manual, 2: File-based, 3: API-based, 4: HL7/FHIR, 5: Real-time HIE |
| **5. Analytics** | 0: Tidak ada, 1: Report manual, 2: Dashboard dasar, 3: BI lengkap, 4: Predictive analytics, 5: AI/ML |
| **6. Security** | 0: Tidak ada, 1: Dasar, 2: Kebijakan, 3: Enkripsi, 4: Audit lengkap, 5: Zero-trust |

**Rumus**:
```
Digital Readiness Score = (Skor Infrastruktur + Skor EMR + Skor Telehealth + Skor Interoperabilitas + Skor Analytics + Skor Security) / 6
```

---

### B7. data_completeness_sirs (%)
**Definisi**: Persentase kelengkapan data pelaporan SIRS.

**Sumber**: SIRS Online Dashboard

**Rumus**:
```
Data Completeness SIRS = (Jumlah Data Terisi / Jumlah Data Wajib) × 100%
```

**Panduan Pengisian**:

| Data Wajib SIRS | Terisi | % |
|-----------------|--------|---|
| Data Identitas RS | 5/5 | 100% |
| Data SDM | 12/15 | 80% |
| Data Sarana | 8/10 | 80% |
| Data Pelayanan | 20/25 | 80% |
| **Total** | **45/55** | **81.8%** |

---

### B8. system_downtime_per_month (jam)
**Definisi**: Total jam sistem IT tidak berfungsi.

**Sumber**: IT Helpdesk / System Logs

**Rumus**:
```
System Downtime = SUM(durasi_downtime_jam) per bulan
```

---

## C. Variabel Keuangan (Financial)

### C1. net_profit_margin (%)
**Definisi**: Persentase laba bersih terhadap pendapatan total.

**Rumus Akuntansi**:
```
Net Profit Margin = (Laba Bersih / Pendapatan Total) × 100%

Laba Bersih = Pendapatan Total - Biaya Total
```

**Panduan Pengisian**:

| Item | Nilai (Rp) |
|------|------------|
| Pendapatan Total | 10,000,000,000 |
| Biaya Operasional | 8,500,000,000 |
| **Laba Bersih** | **1,500,000,000** |
| **Net Profit Margin** | **15%** |

---

### C2. cost_efficiency_ratio
**Definisi**: Rasio efisiensi biaya (output per biaya).

**Rumus**:
```
Cost Efficiency Ratio = Pendapatan Total / Biaya Total
```

*Nilai > 1 = efisien, < 1 = tidak efisien*

---

### C3. persentase_realisasi_anggaran (%)
**Definisi**: Persentase realisasi anggaran terhadap yang direncanakan.

**Rumus**:
```
Realisasi Anggaran = (Realisasi / Anggaran) × 100%
```

---

### C4. pendapatan_total_per_bulan (IDR)
**Definisi**: Total pendapatan RS dalam satu bulan.

**Komponen**:
- Pendapatan pelayanan medis (rawat inap, rawat jalan, IGD)
- Pendapatan penunjang (lab, radiologi, farmasi)
- Pendapatan lainnya

**Rumus**:
```
Pendapatan Total = Pendapatan Pelayanan + Pendapatan Penunjang + Pendapatan Lain
```

---

### C5. labor_cost_percentage (%)
**Definisi**: Persentase biaya tenaga kerja terhadap pendapatan.

**Rumus**:
```
Labor Cost % = (Total Biaya SDM / Pendapatan Total) × 100%

Total Biaya SDM = Gaji + Tunjangan + BPJS + Lembur + Bonus
```

---

### C6. operational_cost_percentage (%)
**Definisi**: Persentase biaya operasional non-SDM.

**Rumus**:
```
Operational Cost % = (Total Biaya Operasional / Pendapatan Total) × 100%

Total Biaya Operasional = Obat + Alat Kesehatan + Utility + Pemeliharaan + Sewa + Lain-lain
```

---

### C7. return_on_assets (%)
**Definisi**: Persentase laba bersih terhadap total aset.

**Rumus**:
```
ROA = (Laba Bersih / Total Aset) × 100%

Total Aset = Aset Lancar + Aset Tetap + Aset Lain
```

---

## D. Variabel Kualitas (Quality) - 13 Indikator MoH

Lihat penjelasan lengkap di **A10. indikator_kualitas_layanan_13**

### D1. persentase_penyakit_menular (%)
**Definisi**: % pasien penyakit menular yang ditatalaksana sesuai standar.

**Sumber Data Individual**:
```sql
-- Pasien demam tifoid, diare, ISPA
SELECT
    no_rm,
    diagnosa,
    tatalaksana_sesuai_standar,  -- Ya/Tidak
    CASE
        WHEN diagnosa IN ('A01', 'A09', 'J06', 'J18')  -- ICD-10 tifoid, diare, ISPA
        THEN 1 ELSE 0
    END as penyakit_menular
FROM pasien_rawat_inap
WHERE tanggal_keluar BETWEEN '2024-01-01' AND '2024-01-31'
```

**Rumus**:
```
% = (Pasien ditatalaksana sesuai standar / Total pasien penyakit menular) × 100%
```

---

### D2. persentase_tindakan_pencegahan_infeksi (%)
**Definisi**: % kepatuhan pencegahan infeksi (hand hygiene, APD, isolasi).

**Sumber Data Individual**:
- Audit hand hygiene (observasi)
- Checklist APD
- Checklist isolasi

**Rumus**:
```
% PPI = (Kegiatan PPI sesuai standar / Total observasi) × 100%
```

---

### D3. persentase_imunisasi_lengkap (%)
**Definisi**: % bayi yang mendapat imunisasi lengkap sesuai jadwal.

**Sumber Data Individual**:
```sql
SELECT
    no_rm_bayi,
    COUNT(DISTINCT jenis_imunisasi) as jumlah_imunisasi,
    CASE WHEN COUNT(DISTINCT jenis_imunisasi) >= 5 THEN 'Lengkap' ELSE 'Tidak' END as status_lengkap
FROM imunisasi
WHERE tanggal_imunisasi BETWEEN '2024-01-01' AND '2024-01-31'
GROUP BY no_rm_bayi
```

**Rumus**:
```
% Imunisasi Lengkap = (Bayi dengan imunisasi lengkap / Total bayi) × 100%
```

---

### D4-D7. (Lihat detail di A10)
- persentase_safety_pasien (%)
- persentase_obat_esensial (%)
- persentase_laboratorium (%)
- persentase_radiologi (%)

---

## E. Variabel Infrastruktur & SDM

### E1. jumlah_tempat_tidur_igd
**Definisi**: Jumlah tempat tidur yang tersedia di IGD.

**Sumber Data**: Inventory Ruangan IGD

---

### E2. jumlah_ruang_operasi
**Definisi**: Jumlah ruang operasi yang berfungsi.

**Sumber Data**: Inventory Ruang Operasi

---

### E3. persentase_peralatan_rusak (%)
**Definisi**: Persentase peralatan medis dalam kondisi rusak.

**Sumber Data Individual**:
```sql
SELECT
    COUNT(CASE WHEN status = 'Rusak' THEN 1 END) as total_rusak,
    COUNT(*) as total_alat,
    (COUNT(CASE WHEN status = 'Rusak' THEN 1 END) * 100.0 / COUNT(*)) as persentase_rusak
FROM inventory_peralatan
WHERE kategori = 'Peralatan Medis'
```

**Rumus**:
```
% Peralatan Rusak = (Jumlah Peralatan Rusak / Total Peralatan) × 100%
```

---

### E4. average_equipment_age_years
**Definisi**: Rata-rata usia peralatan medis.

**Sumber Data Individual**:
```sql
SELECT
    AVG(DATEDIFF(CURRENT_DATE, tanggal_beli) / 365) as avg_usia_tahun
FROM inventory_peralatan
WHERE status IN ('Berfungsi', 'Rusak')
```

**Rumus**:
```
Average Equipment Age = SUM(usia_tahun) / Jumlah Peralatan
```

---

### E5. certification_rate (%)
**Definisi**: Persentase tenaga kesehatan yang memiliki sertifikasi.

**Sumber Data Individual**:
```sql
SELECT
    kategori,
    COUNT(CASE WHEN sertifikasi = 'Sertifikasi' THEN 1 END) as tersertifikasi,
    COUNT(*) as total,
    (COUNT(CASE WHEN sertifikasi = 'Sertifikasi' THEN 1 END) * 100.0 / COUNT(*)) as persentase
FROM karyawan
WHERE kategori IN ('Dokter', 'Perawat', 'Bidan', 'Farmasis', 'Analis Kesehatan')
GROUP BY kategori
```

**Rumus**:
```
Certification Rate = (Karyawan Tersertifikasi / Total Karyawan) × 100%
```

---

### E6. staff_satisfaction_score (0-100)
**Definisi**: Skor kepuasan karyawan dari survei internal.

**Sumber Data**: Survei Kepuasan Karyawan

**Rumus**:
```
Staff Satisfaction = (Sum of all satisfaction scores) / (Total respondents × max_score)
```

---

## F. Variabel Akreditasi & Kepatuhan

### F1. akreditasi_status
**Definisi**: Status akreditasi RS berdasarkan penilaian KARS.

**Opsi**:
- Paripurna
- Sehat
- Belum Terakreditasi

**Sumber Data**: Sertifikat Akreditasi KARS

---

### F2. akreditasi_score (0-100)
**Definisi**: Skor akreditasi terakhir.

**Sumber Data**: Sertifikat/Laporan Akreditasi KARS

---

### F3. compliance_sirs_indicators (%)
**Definisi**: Persentase kepatuhan indikator SIRS.

**Sumber**: SIRS Online

---

### F4. compliance_moh_regulations (%)
**Definisi**: Persentase kepatuhan terhadap regulasi Kemenkes.

**Audit Checklist**:
| Regulasi | Ya | Tidak | % |
|----------|----|----|---|
| Permenkes 30/2022 (13 Indikator) | ✓ | | 100% |
| Permenkes 27/2022 (Pencegahan ISPA) | ✓ | | 100% |
| Permenkes 4/2018 (Pelayanan TB) | ✓ | | 100% |
| **Rata-rata** | | | **100%** |

---

## G. Variabel Sosial Demografi

### G1. jumlah_pasien_per_bulan
**Definisi**: Total kunjungan pasien per bulan.

**Rumus**:
```
Jumlah Pasien = COUNT(DISTINCT no_rm) dari semua kunjungan bulanan
```

---

### G2. pasien_age_distribution
**Definisi**: Distribusi pasien berdasarkan kelompok usia.

**Sumber Data Individual**:
```sql
SELECT
    CASE
        WHEN usia < 1 THEN 'Bayi'
        WHEN usia BETWEEN 1 AND 4 THEN 'Balita'
        WHEN usia BETWEEN 5 AND 11 THEN 'Anak-anak'
        WHEN usia BETWEEN 12 AND 17 THEN 'Remaja'
        WHEN usia BETWEEN 18 AND 59 THEN 'Dewasa'
        WHEN usia >= 60 THEN 'Lansia'
    END as kelompok_usia,
    COUNT(*) as jumlah,
    (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM pasien)) as persentase
FROM pasien
WHERE tanggal_kunjungan BETWEEN '2024-01-01' AND '2024-01-31'
GROUP BY kelompok_usia
```

**Output**:

| Kelompok Usia | Jumlah | Persentase |
|--------------|--------|-----------|
| Bayi (< 1 th) | 500 | 5% |
| Balita (1-4) | 800 | 8% |
| Anak-anak (5-11) | 1,200 | 12% |
| Remaja (12-17) | 700 | 7% |
| Dewasa (18-59) | 5,500 | 55% |
| Lansia (≥ 60) | 1,300 | 13% |
| **Total** | **10,000** | **100%** |

---

### G3. pasien_residence_area (urban/rural)
**Definisi**: Persentase pasien berdasarkan area domisili.

**Sumber Data Individual**:
```sql
SELECT
    kelurahan_domisili,
    CASE
        WHEN kelurahan_domisili IN ('Kecamatan A', 'Kecamatan B', ...) THEN 'Urban'
        ELSE 'Rural'
    END as area_type,
    COUNT(*) as jumlah
FROM pasien
WHERE tanggal_kunjungan BETWEEN '2024-01-01' AND '2024-01-31'
GROUP BY area_type
```

---

### G4. avg_household_income_region
**Definisi**: Rata-rata pendapatan rumah tangga wilayah.

**Sumber**: BPS (Badan Pusat Statistik) data wilayah

---

## H. Variabel Kinerja Strategis

### H1. persentase_capaian_target (%)
**Definisi**: Persentase capaian terhadap target Rencana Kerja RS.

**Rumus**:
```
% Capaian Target = (Realisasi / Target) × 100%
```

**Contoh**:

| Indikator | Target | Realisasi | % |
|-----------|--------|-----------|---|
| Kunjungan Rawat Jalan | 15,000 | 16,500 | 110% |
| Kunjungan Rawat Inap | 3,000 | 2,700 | 90% |
| Pendapatan (Rp M) | 10,000 | 11,000 | 110% |
| **Rata-rata** | | | **103%** |

---

### H2. persentase_efektivitas (%)
**Definisi**: Skor efektivitas pelayanan (outcome-based).

**Komponen**:
- Tingkat kesembuhan
- Tingkat kepuasan
- Mortalitas yang dapat dicegah

**Rumus**:
```
% Efektivitas = (% Sembuh + % Puas + % Kepatuhan) / 3
```

---

### H3. persentase_efisiensi (%)
**Definisi**: Skor efisiensi operasional.

**Lihat penjelasan di B5. efficiency_score_v2**

---

### H4. sustainability_score (0-100)
**Definisi**: Skor keberlanjutan RS.

**4 Dimensi**:
- Financial (keuangan)
- Environmental (lingkungan)
- Social (sosial)
- Governance (tata kelola)

**Rumus**:
```
Sustainability Score = (Financial Score + Environmental Score + Social Score + Governance Score) / 4
```

---

## Template Input Data

### Form Input Data Kinerja RS Bulanan

```yaml
# HEADER
Bulan: Januari 2024
Nama RS: RSU Contoh
Provinsi: Jawa Tengah
Kota/Kab: Semarang
Tanggal Pengisian: 1 Februari 2024
Penanggung Jawab: dr. XXX

# A. VARIABEL KLINIS
A1_lama_tunggu_rawat_inap_jam: 2.5
A2_lama_tunggu_rawat_jalan_menit: 45
A3_occupancy_rate_percent: 75
A4_bed_turnover_rate: 15
A5_average_length_of_stay_hari: 4.5
A6_mortality_rate_icu_percent: 5.0
A7_mortality_rate_post_operasi_percent: 2.0
A8_readmission_rate_30_hari_percent: 4.5
A9_persentase_pasiensenyum_percent: 85
A10_indikator_kualitas_layanan_13_percent: 82

# B. VARIABEL OPERASIONAL
B1_ratio_pasien_ke_dokter: 25
B2_ratio_pasien_ke_perawat: 8
B3_waktu_tunggu_laboratorium_jam: 4.5
B4_waktu_antrean_pharmacy_menit: 35
B5_efficiency_score: 72
B6_digital_readiness_score: 3.5
B7_data_completeness_sirs_percent: 85
B8_system_downtime_per_month_jam: 3

# C. VARIABEL KEUANGAN
C1_net_profit_margin_percent: 12
C2_cost_efficiency_ratio: 0.82
C3_persentase_realisasi_anggaran_percent: 95
C4_pendapatan_total_per_bulan_idr: 10000000000
C5_labor_cost_percentage: 45
C6_operational_cost_percentage: 55
C7_return_on_assets_percent: 8

# D. VARIABEL KUALITAS (13 Indikator MoH)
D1_persentase_penyakit_menular_percent: 88
D2_persentase_tindakan_pencegahan_infeksi_percent: 85
D3_persentase_imunisasi_lengkap_percent: 90
D4_persentase_safety_pasien_percent: 82
D5_persentase_obat_esensial_percent: 92
D6_persentase_laboratorium_percent: 80
D7_persentase_radiologi_percent: 78

# E. VARIABEL INFRASTRUKTUR & SDM
E1_jumlah_tempat_tidur_igd: 15
E2_jumlah_ruang_operasi: 6
E3_persentase_peralatan_rusak_percent: 5
E4_average_equipment_age_years: 7
E5_certification_rate_percent: 75
E6_staff_satisfaction_score: 70

# F. VARIABEL AKREDITASI & KEPATUHAN
F1_akreditasi_status: Sehat
F2_akreditasi_score: 82
F3_compliance_sirs_indicators_percent: 85
F4_compliance_moh_regulations_percent: 88

# G. VARIABEL SOSIAL DEMOGRAFI
G1_jumlah_pasien_per_bulan: 8500
G2_pasien_age_distribution: |
  Bayi (< 1): 5%
  Balita (1-4): 8%
  Anak (5-11): 12%
  Remaja (12-17): 7%
  Dewasa (18-59): 55%
  Lansia (≥ 60): 13%
G3_pasien_residence_area: |
  Urban: 65%
  Rural: 35%
G4_avg_household_income_region_idr: 4500000

# H. VARIABEL KINERJA STRATEGIS
H1_persentase_capaian_target_percent: 98
H2_persentase_efektivitas_percent: 80
H3_persentase_efisiensi_percent: 75
H4_sustainability_score: 70
```

---

## Rumus dan Kalkulasi Lengkap

### 1. Clinical Metrics

#### Occupancy Rate
```
Occupancy Rate = (Total Patient Days / Available Bed Days) × 100%

Total Patient Days = SUM(lama_rawat_inap_hari)
Available Bed Days = (jumlah_tempat_tidur × jumlah_hari_operasional)
```

#### Bed Turnover Rate (BTO)
```
BTO = Jumlah Pasien Keluar / Rata-rata Tempat Tidur Terpakai
```

#### Average Length of Stay (ALOS)
```
ALOS = Total Patient Days / Jumlah Pasien Keluar
```

### 2. Operational Metrics

#### Efficiency Score
```
Efficiency Score = (Occupancy Score + Labor Score + Service Score) / 3

Occupancy Score = min(occupancy_rate, 100)
Labor Score = 100 - min((ratio_pasien_ke_dokter / 50) × 100, 100)
Service Score = 100 - min((lama_tunggu_rawat_jalan / 120) × 100, 100)
```

#### Digital Readiness Score
```
Digital Readiness = (IT Infrastructure + EMR + Telehealth + Interoperability + Analytics + Security) / 6

Each dimension scored 0-5:
0 = Tidak ada
1 = Dasar
2 = Terkomputerisasi/Standar
3 = Terintegrasi/Advanced
4 = Optimized
5 = Innovative/Best Practice
```

### 3. Financial Metrics

#### Net Profit Margin
```
Net Profit Margin = (Net Income / Revenue) × 100%

Net Income = Revenue - Total Cost
```

#### Cost Efficiency Ratio
```
Cost Efficiency = Revenue / Total Cost
> 1.0 = Efficient
< 1.0 = Inefficient
```

#### Return on Assets (ROA)
```
ROA = (Net Income / Total Assets) × 100%
```

---

## Quality Control

### Validasi Data Input

#### 1. Range Check
| Variabel | Min | Max | Alert |
|----------|-----|-----|-------|
| lama_tunggu_rawat_inap_jam | 0.5 | 24 | Jika > 24 jam |
| occupancy_rate_percent | 0 | 100 | Jika > 100% |
| mortality_rate_icu_percent | 0 | 50 | Jika > 50% |
| net_profit_margin_percent | -50 | 50 | Jika <-50% |

#### 2. Logic Check
```
IF occupancy_rate > 95% THEN "Warning: Overcrowding"
IF mortality_rate_icu > 20% THEN "Alert: High mortality"
IF net_profit_margin < 0% THEN "Check: Operating at loss"
```

#### 3. Trend Check
```
IF current_value < (last_3_month_avg × 0.8) THEN "Anomaly detected"
IF current_value > (last_3_month_avg × 1.2) THEN "Anomaly detected"
```

### Data Cleaning Process

1. **Remove duplicates**: Hapus data pasien ganda
2. **Handle missing values**: Isi atau tandai data hilang
3. **Validate outliers**: Periksa nilai ekstrim
4. **Cross-check**: Validasi lintas sumber data

---

## Appendix: SQL Queries untuk Ekstraksi Data

### Query untuk Clinical Variables
```sql
-- A1-A5: Clinical metrics dari pasien rawat inap
SELECT
    'lama_tunggu_rawat_inap' as metric,
    AVG(TIMESTAMPDIFF(HOUR, tanggal_decision_rawat_inap, tanggal_masuk_ruang)) as value,
    'hour' as unit
FROM pasien_rawat_inap
WHERE tanggal_keluar BETWEEN ? AND ?

UNION ALL

SELECT
    'occupancy_rate' as metric,
    (SUM(DATEDIFF(tanggal_keluar, tanggal_masuk)) /
     (SELECT COUNT(*) FROM tempat_tidur WHERE status='Aktif' * 30)) * 100 as value,
    'percent' as unit
FROM pasien_rawat_inap
WHERE tanggal_keluar BETWEEN ? AND ?

UNION ALL

SELECT
    'bed_turnover_rate' as metric,
    COUNT(*) / (SELECT COUNT(*) FROM tempat_tidur WHERE status='Aktif') as value,
    'ratio' as unit
FROM pasien_rawat_inap
WHERE tanggal_keluar BETWEEN ? AND ?

UNION ALL

SELECT
    'alos' as metric,
    AVG(DATEDIFF(tanggal_keluar, tanggal_masuk)) as value,
    'day' as unit
FROM pasien_rawat_inap
WHERE tanggal_keluar BETWEEN ? AND ?
  AND status_keluar IN ('Sembuh', 'Membaik', 'Pulang Paksa')
```

---

## Dokumentasi Referensi

1. **Permenkes No. 30 Tahun 2022** - Standar Pelayanan Rumah Sakit
2. **Pedoman Akreditasi Rumah Sakit** - KARS (Komisi Akreditasi Rumah Sakit)
3. **Panduan SIRS Online** - Kemenkes
4. **Standar Akuntansi Keuangan RS** - PSAI
5. **WHO Hospital Performance Indicators**

---

*Dokumen ini dibuat untuk panduan pengumpulan data kinerja Rumah Sakit di Indonesia.*
*Versi: 1.0*
*Tanggal: 2025*
