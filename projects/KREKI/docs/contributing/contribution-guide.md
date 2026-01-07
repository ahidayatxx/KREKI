---
title: "Contribution Guide"
description: "Comprehensive guide for contributing to KREKI digital ecosystem"
category: "contributing"
last_updated: 2025-01-07
---

# Contribution Guide & Development SOP

This document is intended for **Vendor Developers**, **Intern Students**, and **IT Volunteers**. Follow this guide so your code can be used sustainably by KREKI.

## Development Philosophy

*"Code for Humans, not just Machines."*

Remember that the next developer might be an intern student just learning. Write code that is easy to read, not "smart" but complex code.

---

## Git Workflow

We use the **Feature Branch Workflow** model:

### 1. Clone the assigned service repository

```bash
git clone https://github.com/kreki/kreki-auth-service.git
cd kreki-auth-service
```

### 2. Create a new branch from main or development

**Branch naming format:**
- `feat/feature-name` for new features
- `fix/bug-name` for bug fixes

**Examples:**
- `feat/sertifikat-pdf`
- `fix/login-error`

```bash
git checkout -b feat/sertifikat-pdf
```

### 3. Code according to standards

See [Code Review Standards](./code-review-standards.md) for quality criteria.

### 4. Commit with clear messages

**Good examples:**
- `add: endpoint generate pdf certificate`
- `fix: invalid token validation`
- `docs: update README with setup instructions`

**Bad examples:**
- `fix bug`
- `update`
- `done`

```bash
git add .
git commit -m "add: endpoint generate pdf certificate"
```

### 5. Push and create Pull Request

```bash
git push origin feat/sertifikat-pdf
```

Then create a Pull Request on GitHub with:
- Clear description of changes
- Reference to related issue (if any)
- Screenshots for UI changes

### 6. Code Review

Lead Tech/Maintainer will review your code. Revise if needed.

### 7. Merge

After approval, code will be merged to the main branch.

---

## Documentation Standards (MANDATORY)

KREKI's main problem is lost documentation. Therefore:

### A. API Documentation (Swagger/OpenAPI)

Every API endpoint you create **MUST** have Swagger/OpenAPI annotations.

**Example (Node.js):**

```javascript
/**
 * @swagger
 * /api/emergency/request:
 *   post:
 *     summary: Mengirim sinyal darurat
 *     description: Memicu pencarian relawan terdekat
 *     tags: [Emergency]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *                 example: -6.2088
 *               longitude:
 *                 type: number
 *                 example: 106.8456
 *               severity:
 *                 type: string
 *                 enum: [critical, urgent, normal]
 *     responses:
 *       200:
 *         description: Sukses, relawan sedang dicari
 *       400:
 *         description: Invalid request
 */
router.post('/request', emergencyController.createRequest);
```

### B. README.md per Service

Each microservice folder must have its own README containing:

1. **How to install & run locally**
   ```bash
   npm install
   npm run dev
   ```

2. **Required Environment Variables** (.env.example)
   ```env
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret
   REDIS_URL=redis://localhost:6379
   ```

3. **Folder Structure**
   ```
   src/
   ├── controllers/
   ├── services/
   ├── models/
   ├── routes/
   └── utils/
   ```

---

## Handover Standards

For vendors or interns whose assignment period is ending, the **final payment or internship certificate will ONLY be given if:**

1. All code has been pushed to KREKI Git
2. No hardcoded credentials (passwords in code)
3. Complete API documentation accessible
4. **Knowledge Transfer session** (recorded Zoom video explaining the code) has been submitted

---

## Security Checklist

Before creating a Pull Request, ensure:

- [ ] No `.env` files committed to Git
- [ ] All user inputs validated at backend
- [ ] HTTPS used for all API communications
- [ ] No sensitive data in logs
- [ ] Secrets properly managed (environment variables or secret manager)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (input sanitization, output encoding)

---

## Code Quality Standards

### 1. Code Style

- Use consistent indentation (2 spaces for JavaScript, 4 for Python)
- Follow language-specific style guides:
  - JavaScript: [Airbnb Style Guide](https://github.com/airbnb/javascript)
  - Python: [PEP 8](https://www.python.org/dev/peps/pep-0008/)
  - PHP: [PSR-12](https://www.php-fig.org/psr/psr-12/)

### 2. Error Handling

```javascript
// Good: Specific error handling
try {
  const result = await userService.create(data);
} catch (error) {
  if (error.code === 'DUPLICATE_EMAIL') {
    throw new BadRequestError('Email already exists');
  }
  throw error;
}

// Bad: Generic error handling
try {
  const result = await userService.create(data);
} catch (e) {
  console.log(e);
}
```

### 3. Logging

```javascript
// Use structured logging
logger.info('User created', {
  userId: user.id,
  email: user.email,
  timestamp: new Date().toISOString()
});
```

---

## Testing Guidelines

### Unit Tests

- Test critical business logic
- Aim for >70% code coverage
- Mock external dependencies

```javascript
describe('Emergency Service', () => {
  it('should find nearest volunteers within radius', async () => {
    const result = await emergencyService.findNearby(-6.2088, 106.8456, 1000);
    expect(result).toHaveLength(5);
  });
});
```

### Integration Tests

- Test API endpoints
- Test database interactions
- Test external integrations with mocks

---

## Related Documentation

- [Code Review Standards](./code-review-standards.md) - Review criteria
- [System Architecture](../architecture/system-architecture.md) - Technical design
- [Engineering Handbook](../../engineering/handbook.md) - Engineering practices

---

*Kembali ke [Contributing](./index.md)*
