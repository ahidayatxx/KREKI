# Contributing to KREKI

**Guidelines for contributing to KREKI's national emergency response platform**

---

Thank you for your interest in contributing to KREKI! We welcome contributions from developers, designers, healthcare professionals, and community members who share our mission of saving lives through technology-enabled community action.

---

## 🤔 How to Contribute

There are many ways to contribute to KREKI:

### Code Contributions

- **Standards Repositories**: Open source,欢迎 contributions
- **Platform Repositories**: Source available (license required for deployment)
- **Bug Fixes**: Always welcome
- **New Features**: Please discuss in an issue first

### Documentation

- Improve documentation clarity
- Add examples and tutorials
- Fix typos and errors
- Translate to Indonesian languages

### Testing & Quality

- Report bugs with clear reproduction steps
- Suggest test cases
- Perform security audits (responsible disclosure)

### Community

- Answer questions in GitHub Discussions
- Help other users
- Share success stories
- Provide feedback

---

## 📋 Before You Contribute

### 1. Check Existing Issues

Search [existing issues](https://github.com/kreki-indonesia/ea-standards/issues) to avoid duplicates.

### 2. Discuss Your Plans

For substantial contributions:
- Open an issue to discuss your proposed changes
- Get feedback from maintainers
- Ensure alignment with project goals

### 3. Understand the Context

- Read the [project documentation](https://docs.kreki.id)
- Review the architecture and standards
- Understand our mission and values

---

## 🛠️ Development Workflow

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME

# Add upstream remote
git remote add upstream https://github.com/kreki-indonesia/REPO_NAME.git
```

### 2. Create a Branch

```bash
# Fetch latest changes
git fetch upstream

# Create feature branch from main/develop
git checkout -b feature/your-feature-name upstream/main

# Or for bug fixes
git checkout -b fix/your-bug-fix upstream/main
```

### Branch Naming

Use these prefixes:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or changes
- `chore/` - Maintenance tasks

### 3. Make Your Changes

```bash
# Make your changes
# ...

# Commit your changes
git add .
git commit -m "feat: add geolocation-based volunteer matching"
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example**:
```
feat(emergency): add geolocation-based volunteer matching

Implement GPS-based volunteer matching algorithm using PostGIS:
- Calculate distance between emergency and volunteers
- Filter by skills and availability
- Return top N candidates sorted by distance

Closes #123
```

### 4. Sync with Upstream

```bash
# Fetch upstream changes
git fetch upstream

# Rebase your branch on upstream/main
git rebase upstream/main

# Or merge if you prefer
git merge upstream/main
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

---

## 📝 Pull Request Guidelines

### PR Title

Use the same format as commit messages:
```
feat(emergency): add geolocation-based volunteer matching
```

### PR Description

Include:
- **Summary**: Brief description of changes
- **Motivation**: Why this change is needed
- **Changes**: What was changed
- **Testing**: How you tested the changes
- **Screenshots**: For UI changes (if applicable)
- **Related Issues**: Link to related issues

### PR Template

```markdown
## Summary
Briefly describe what this PR does.

## Motivation
Why is this change needed?

## Changes
- Added feature X
- Fixed bug Y
- Updated documentation Z

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Screenshots attached (if UI changes)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review performed
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Added tests for new features
- [ ] All tests pass

## Related Issues
Closes #123
Related to #456
```

### Review Process

1. **Automated Checks**: CI/CD runs tests and linters
2. **Code Review**: Maintainer reviews your changes
3. **Feedback**: Address review comments
4. **Approval**: Maintainer approves the PR
5. **Merge**: PR is merged into main/develop

---

## 🧪 Testing

### Write Tests

- Add unit tests for new functions
- Add integration tests for API endpoints
- Test edge cases and error conditions

### Run Tests Locally

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test.spec.js

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

We aim for:
- **Unit tests**: >80% coverage
- **Integration tests**: Critical paths covered
- **E2E tests**: Key user flows covered

---

## 📐 Coding Standards

### Language-Specific Guidelines

#### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **Airbnb Style Guide**
- Use **ESLint** and **Prettier**
- Use meaningful variable and function names
- Add JSDoc comments for functions

```typescript
/**
 * Calculate the Haversine distance between two coordinates
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in meters
 */
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Implementation...
}
```

#### Go

- Follow **Effective Go** guidelines
- Use `gofmt` for formatting
- Add godoc comments
- Handle errors explicitly

```go
// HaversineDistance calculates the great-circle distance between two points
// on the Earth's surface using the Haversine formula.
//
// Parameters:
//   - lat1, lon1: Latitude and longitude of the first point in decimal degrees
//   - lat2, lon2: Latitude and longitude of the second point in decimal degrees
//
// Returns:
//   Distance in meters
func HaversineDistance(lat1, lon1, lat2, lon2 float64) float64 {
    // Implementation...
}
```

#### Python

- Follow **PEP 8** style guide
- Use **Black** for formatting
- Add docstrings (Google style)
- Type hints where appropriate

```python
def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate the Haversine distance between two coordinates.

    Args:
        lat1: Latitude of first point in decimal degrees
        lon1: Longitude of first point in decimal degrees
        lat2: Latitude of second point in decimal degrees
        lon2: Longitude of second point in decimal degrees

    Returns:
        Distance in meters
    """
    # Implementation...
```

### General Principles

1. **Keep It Simple**: Avoid over-engineering
2. **Readability First**: Write code for humans to read
3. **DRY**: Don't Repeat Yourself
4. **YAGNI**: You Aren't Gonna Need It (avoid premature abstraction)
5. **Secure by Default**: Never commit secrets, validate all inputs

---

## 🔒 Security

### Responsible Disclosure

If you find a security vulnerability:

1. **Do NOT** create a public issue
2. Email: [security@kreki.or.id](mailto:security@kreki.or.id)
3. Include details and reproduction steps
4. Allow time for fix before disclosure

### Security Guidelines

- Never commit secrets or credentials
- Validate all user inputs
- Use parameterized queries (SQL injection prevention)
- Implement proper authentication and authorization
- Keep dependencies updated
- Follow OWASP guidelines

---

## 📖 Documentation

### When to Document

- New features or functions
- Complex algorithms
- API endpoints
- Configuration options
- Breaking changes

### Documentation Style

- **Clear and concise**: Use simple language
- **Examples**: Provide code examples
- **Diagrams**: Use for architecture concepts
- **Links**: Cross-reference related docs

### Markdown Guidelines

```markdown
# Heading 1 (Document title)

## Heading 2 (Major section)

### Heading 3 (Subsection)

**Bold** for emphasis

*Italic* for subtle emphasis

`inline code` for code terms

```
Code blocks
```

| Tables | For | Tabular | Data |
|--------|-----|---------|------|

- Bullet points
- For lists
- Of items

1. Numbered lists
2. For sequential steps
3. Or procedures

> Blockquotes for important notes

---

For [links](https://example.com)
```

---

## 🌐 Localization

KREKI supports both **English** and **Bahasa Indonesia**.

### Translation Guidelines

- Use natural, idiomatic language
- Maintain technical accuracy
- Consider cultural context
- Test with native speakers

### Contributing Translations

1. Fork the repository
2. Update language files
3. Test the translation
4. Submit PR with `[i18n]` prefix

---

## 🤝 Community Guidelines

### Be Respectful

- Use inclusive and welcoming language
- Respect differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community

### Collaboration

- Work transparently
- Communicate early and often
- Ask for help when needed
- Provide feedback constructively

### Conflict Resolution

If you encounter conflict:

1. **Discuss**: Try to resolve directly
2. **Escalate**: Contact maintainers if needed
3. **Respect**: Accept final decisions gracefully

---

## 📜 Licensing

### Contributor License Agreement (CLA)

All contributors must sign the KREKI CLA. See [CLA.md](CLA.md) for details.

### Copyright

By contributing, you agree that your contributions will be licensed under the repository's license.

### Ownership

- You retain copyright to your contributions
- KREKI receives a perpetual license to use your contributions
- Your name may be listed in contributors

---

## ✍️ Sign Your Work

We use the [Developer Certificate of Origin (DCO)](https://developercertificate.org/).

### DCO v1.1

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
1 Mailbox: 2324 e. carlson st.  #451    tucson, az 85719
usa everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

developer's certificate of origin 1.1

by making a contribution to this project, i certify that:

(a) the contribution was created in whole or in part by me and i
    have the right to submit it under the open source license
    indicated in the file; or

(b) the contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and i have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless i am
    permitted to submit under a different license), as indicated
    in the file; or

(c) the contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and i have not modified
    it.

(d) i understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information i submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

### How to Sign

Add a `Signed-off-by` line to your commit messages:

```bash
git commit -s -m "feat: add new feature"

# This generates:
# feat: add new feature
#
# Signed-off-by: Your Name <your.email@example.com>
```

---

## 🎯 What We're Looking For

### High-Priority Contributions

- **Critical bug fixes**: Security issues, crashes
- **Performance improvements**: Optimization, scaling
- **Documentation**: Clarifications, examples
- **Tests**: Test coverage improvements

### Medium-Priority Contributions

- **New features**: Aligned with roadmap
- **Refactoring**: Code quality improvements
- **Accessibility**: WCAG compliance improvements

### Low-Priority Contributions

- **Nice-to-have features**: Not on current roadmap
- **Experimental**: Unproven approaches
- **Personal preferences**: Style opinions

---

## 📞 Get Help

### Discussion

- **GitHub Discussions**: [https://github.com/kreki-indonesia/ea-standards/discussions](https://github.com/kreki-indonesia/ea-standards/discussions)
- **Discord/Slack**: (Coming soon)

### Support

- **Email**: [dev-support@kreki.or.id](mailto:dev-support@kreki.or.id)
- **Documentation**: [https://docs.kreki.id](https://docs.kreki.id)

### Issues

- **Bug Reports**: Use GitHub Issues
- **Feature Requests**: Use GitHub Discussions first
- **Security Issues**: Email [security@kreki.or.id](mailto:security@kreki.or.id)

---

## 🙏 Thank You

Your contributions help KREKI save lives. Every contribution, whether code, documentation, testing, or feedback, makes a difference.

Together, we're building a national emergency response platform that serves all Indonesians.

**Terima kasih!**

---

## 📄 License

```
Creative Commons Attribution 4.0 International (CC BY 4.0)

Copyright (c) 2025 Komunitas Relawan Emergensi Kesehatan Indonesia (KREKI)

This contribution guide is licensed under CC BY 4.0.
Individual repositories may have different licenses.
```

---

**Need Help?** [Contact Us](mailto:dev-support@kreki.or.id)

**Ready to Contribute?** [Find an Issue](https://github.com/kreki-indonesia/ea-standards/issues)
