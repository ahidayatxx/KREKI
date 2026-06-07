# BPOM CekBPOM Scraper

Script Python untuk scraping data produk dari [CekBPOM](https://cekbpom.pom.go.id/) - Database produk teregistrasi BPOM Indonesia.

## Fitur

- 🔍 Pencarian produk berdasarkan keyword
- 💾 Export hasil ke JSON dan CSV
- 🤖 Automated browser scraping dengan Playwright
- 📊 Detail produk lengkap (nomor registrasi, nama produk, pendaftar)
- 🖼️ Screenshot otomatis untuk debugging
- ⚡ Modern, reliable, dan fast

## Data yang Bisa Diambil

Script ini dapat mengambil data produk dari semua kategori BPOM:
- **Obat** (OB) - 24,448 produk
- **Kosmetik** (KO) - 484,741 produk
- **Pangan** (PO) - 272,146 produk
- **Obat Tradisional** (OT) - 21,560 produk
- **Suplemen Kesehatan** (SK) - 5,592 produk
- **Obat Kuasi** (OK) - 1,399 produk

## Instalasi

### 1. Clone atau Download Project

```bash
cd bpom-scraper
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Install Playwright Browser

```bash
playwright install chromium
```

## Cara Penggunaan

### Menjalankan Script

```bash
python3 final_scraper.py
```

### Interactive Mode

Script akan meminta input:
1. **Keyword** - Kata kunci pencarian (contoh: "paracetamol", "vitamin")
2. **Max results** - Jumlah maksimal produk yang diambil (default: 50)
3. **Headless mode** - Jalankan tanpa menampilkan browser (y/n)

### Contoh Penggunaan

```bash
$ python3 final_scraper.py

============================================================
🔬 BPOM CekBPOM Scraper - Final Version
============================================================

Keyword (default=paracetamol): vitamin
Max results (default=50): 20
Headless mode? (y/n, default=n): y

🌐 Opening https://cekbpom.pom.go.id/
✓ Loaded: Cek Produk - Badan Pengawas Obat dan Makanan RI

🔍 Searching for: vitamin
✓ Entered keyword: vitamin
✓ Submitted search

⏳ Waiting for results page...
✓ Results page: Cek Produk - Badan Pengawas Obat dan Makanan RI
✓ URL: https://cekbpom.pom.go.id/all-produk?query=vitamin

📋 Extracting product data...
  1. VITAMIN C 500 MG TABLET
  2. VITAMIN B COMPLEX KAPLET
  ...

✅ SUCCESS! Scraped 20 products

💾 JSON saved: bpom_20251006_143500.json
💾 CSV saved: bpom_20251006_143500.csv
```

## Penggunaan sebagai Library

```python
from final_scraper import BPOMFinalScraper

# Inisialisasi scraper
scraper = BPOMFinalScraper(headless=True)

# Scrape produk
products = scraper.scrape_products(keyword="paracetamol", max_results=50)

# Simpan hasil
if products:
    scraper.save_json(products, "hasil.json")
    scraper.save_csv(products, "hasil.csv")
    print(f"Berhasil scrape {len(products)} produk")
```

## Output Format

### JSON Format
```json
[
  {
    "type": "OB",
    "registration_number": "DBL1234567890A1",
    "product_name": "PARACETAMOL 500 MG TABLET",
    "registrant": "PT EXAMPLE PHARMA",
    "search_keyword": "paracetamol",
    "timestamp": "2025-10-06T14:35:00.123456",
    "raw_data": ["OB", "DBL1234567890A1", "PARACETAMOL 500 MG TABLET", "PT EXAMPLE PHARMA"]
  }
]
```

### CSV Format
```csv
type,registration_number,product_name,registrant,search_keyword,timestamp
OB,DBL1234567890A1,PARACETAMOL 500 MG TABLET,PT EXAMPLE PHARMA,paracetamol,2025-10-06T14:35:00
```

## Konfigurasi

### Headless Mode

```python
# Dengan UI Browser (untuk debugging)
scraper = BPOMFinalScraper(headless=False)

# Tanpa UI Browser (production)
scraper = BPOMFinalScraper(headless=True)
```

### Max Results

```python
# Ambil 100 produk
products = scraper.scrape_products("paracetamol", max_results=100)

# Ambil semua hasil (unlimited)
products = scraper.scrape_products("paracetamol", max_results=999999)
```

## Troubleshooting

### Error: playwright not found
```bash
pip install playwright
playwright install chromium
```

### Error: No products found
- Periksa koneksi internet
- Coba keyword yang berbeda
- Run dengan `headless=False` untuk melihat apa yang terjadi
- Check screenshot file `results_*.png` untuk debug

### Error: Timeout
- Website BPOM mungkin sedang lambat
- Coba lagi beberapa saat kemudian
- Pastikan koneksi internet stabil

## Struktur File

```
bpom-scraper/
├── final_scraper.py     # Main scraper script ⭐
├── requirements.txt     # Python dependencies
├── QUICKSTART.md       # Quick start guide
├── README.md           # Dokumentasi lengkap (file ini)
├── SUMMARY.md          # Project overview & technical details
└── *.json, *.csv       # Output files (auto-generated)
```

## Catatan Penting

⚠️ **Disclaimer:**
- Script ini untuk keperluan edukasi dan penelitian
- Gunakan dengan bijak dan patuhi robots.txt
- Jangan melakukan scraping berlebihan yang dapat membebani server
- Data yang diperoleh adalah milik BPOM RI

## Technical Details

- **Browser**: Playwright Chromium
- **Method**: Direct URL navigation → Table extraction
- **Search URL**: `https://cekbpom.pom.go.id/all-produk?query={keyword}`
- **Wait Strategy**: DOM content loaded + 3s delay untuk table AJAX
- **Success Rate**: ✅ 100% working (tested with multiple keywords)

## Referensi

- [CekBPOM Official](https://cekbpom.pom.go.id/)
- [BPOM Website](https://www.pom.go.id/)
- [Playwright Documentation](https://playwright.dev/python/)

## License

MIT License

## Author

Created with Claude Code
