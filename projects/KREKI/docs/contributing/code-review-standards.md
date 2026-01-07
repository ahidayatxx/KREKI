---
title: "Code Review Standards"
description: "Code review criteria and quality standards for KREKI projects"
category: "contributing"
last_updated: 2025-01-07
---

# Code Review Standards

This document defines the criteria for code review in KREKI projects.

## Review Categories

### 1. Functionality (Must Pass)

- [ ] Code implements the intended functionality
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] No breaking changes to existing functionality

### 2. Code Quality (Must Pass)

- [ ] Code follows project style guidelines
- [ ] No unnecessary complexity
- [ ] Proper error handling and logging
- [ ] No hardcoded values (use environment variables)
- [ ] No commented-out code

### 3. Documentation (Must Pass)

- [ ] API endpoints have Swagger/OpenAPI annotations
- [ ] Complex logic has inline comments
- [ ] README updated if needed
- [ ] Changelog updated for significant changes

### 4. Security (Must Pass)

- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Input validation on backend
- [ ] No secrets in code
- [ ] Proper authentication/authorization checks

### 5. Performance (Should Pass)

- [ ] No N+1 queries
- [ ] Appropriate use of caching
- [ ] Efficient algorithms
- [ ] No memory leaks

### 6. Testing (Should Pass)

- [ ] Unit tests for new functionality
- [ ] Tests cover critical paths
- [ ] No hardcoded test data

## Review Process

### 1. Automated Checks

- Linting passes (ESLint, flake8, etc.)
- Tests pass
- Build succeeds
- No merge conflicts

### 2. Reviewer Checklist

- Understand the purpose of the change
- Review the code changes, not just the diff
- Test the functionality if applicable
- Ask questions, don't just point out problems

### 3. Approval Criteria

- All "Must Pass" criteria met
- At most 2 "Should Pass" criteria can be deferred
- No unresolved comments marked as "must fix"

## Common Issues

| Issue | Severity | Fix Required |
|-------|----------|--------------|
| Hardcoded credentials | Critical | Yes, immediately |
| SQL injection | Critical | Yes, immediately |
| Missing error handling | High | Yes |
| No documentation | High | Yes |
| Inconsistent naming | Medium | Preferred |
| Missing tests | Medium | Preferred |

## Feedback Guidelines

### For Reviewers

- Be constructive and specific
- Explain the "why" behind suggestions
- Acknowledge good code practices
- Respond within 48 hours

### For Authors

- Address all review comments
- Ask for clarification if needed
- Mark comments as resolved when addressed
- Don't take feedback personally

---

*Kembali ke [Contributing](./index.md)*
