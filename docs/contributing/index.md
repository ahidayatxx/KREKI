---
title: "Berkontribusi"
description: "Panduan kontribusi untuk developer, standar kode, dan Git workflow"
category: "contributing"
last_updated: 2025-01-07
---

# Berkontribusi

Terima kasih atas minat Anda untuk berkontribusi pada ekosistem digital KREKI! Kami menyambut developer vendor, mahasiswa magang, dan relawan IT.

## Dokumen

| Dokumen | Deskripsi |
|---------|-----------|
| [Contribution Guide](./contribution-guide.md) | Panduan lengkap cara berkontribusi, Git workflow, standar dokumentasi |
| [Code Review Standards](./code-review-standards.md) | Kriteria review dan best practices |

## Mulai Cepat

### Untuk Developer Baru

1. **Baca dokumentasi**
   - [System Architecture](../architecture/system-architecture.md)
   - [Engineering Handbook](../../engineering/handbook.md)

2. **Setup environment**
   ```bash
   # Clone repository
   git clone https://github.com/kreki/[service-name].git

   # Install dependencies
   npm install  # atau sesuai tech stack

   # Setup environment
   cp .env.example .env
   ```

3. **Pilih task**
   - Lihat issues di GitHub
   - Contact lead developer untuk assignment

### Git Workflow

Kami menggunakan **Feature Branch Workflow**:

```bash
# 1. Buat branch baru
git checkout -b feat/feature-name

# 2. Commit dengan pesan jelas
git commit -m "add: endpoint generate pdf certificate"

# 3. Push dan buat PR
git push origin feat/feature-name
```

### Commit Message Convention

- `add:` - Fitur baru
- `fix:` - Bug fix
- `refactor:` - Refactoring tanpa perubahan fungsi
- `docs:` - Update dokumentasi
- `test:` - Add/update tests

## Standar Dokumentasi

Setiap endpoint API **WAJIB** memiliki dokumentasi Swagger/OpenAPI:

```javascript
/**
 * @swagger
 * /api/emergency/request:
 *   post:
 *     summary: Mengirim sinyal darurat
 *     description: Memicu pencarian relawan terdekat
 *     responses:
 *       200:
 *         description: Sukses, relawan sedang dicari
 */
```

## Serah Terima (Handover)

Bagi vendor atau mahasiswa magang, pembayaran/sertifikat **HANYA** diberikan jika:

1. Semua kode sudah di-push ke Git
2. Tidak ada hardcoded credentials
3. Dokumentasi API lengkap
4. Video knowledge transfer diserahkan

## Security Checklist

- [ ] Tidak ada file `.env` di commit
- [ ] Input validation di backend
- [ ] HTTPS untuk semua API calls
- [ ] Secret management yang proper

## Dukungan

- **Email:** it-support@kreki.or.id
- **Issues:** [GitHub Issues](https://github.com/kreki/issues)

---

*Lihat [Contribution Guide](./contribution-guide.md) untuk detail lengkap.*
