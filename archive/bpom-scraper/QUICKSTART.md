# Quick Start Guide

## 🚀 3-Step Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
playwright install chromium
```

### 2. Run Script
```bash
python3 final_scraper.py
```

### 3. Enter Search Terms
```
Keyword: paracetamol
Max results: 50
Headless: y
```

Done! ✅

---

## 📦 Output

Files akan dibuat otomatis:
- `bpom_YYYYMMDD_HHMMSS.json`
- `bpom_YYYYMMDD_HHMMSS.csv`

---

## 🔍 Example Output

```json
{
  "type": "OB",
  "registration_number": "DBL1234567890A1",
  "product_name": "PARACETAMOL 500 MG TABLET",
  "registrant": "PT EXAMPLE PHARMA",
  "search_keyword": "paracetamol",
  "timestamp": "2025-10-06T14:35:00"
}
```

---

## 💡 Pro Tips

- Use `headless=n` untuk debugging
- Check `results_*.png` jika ada error
- Max results bisa unlimited (set: 999999)
- Lihat `README.md` untuk dokumentasi lengkap

---

## ❓ Troubleshooting

**Error: playwright not found**
```bash
pip install playwright
playwright install chromium
```

**No results found**
- Coba keyword berbeda
- Run dengan headless=n
- Check internet connection

---

**Need help?** → Check `README.md` untuk dokumentasi lengkap
