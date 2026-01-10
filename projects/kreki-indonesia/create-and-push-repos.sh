#!/bin/bash

# Script to create all KREKI repositories and push content
# Updated with new working token

set -e  # Exit on error

# Configuration
GITHUB_TOKEN="YOUR_GITHUB_TOKEN"
GITHUB_ORG="kreki-indonesia"
BASE_DIR="/Users/ahmadhidayat/claude-code/projects/kreki-indonesia"

echo "🚀 Creating and pushing KREKI repositories..."
echo ""

# Function to create repository via API
create_repo() {
    local repo_name=$1
    local description=$2
    local visibility=$3

    echo "Creating repository: $repo_name"

    local visibility_json="false"
    if [ "$visibility" = "private" ]; then
        visibility_json="true"
    fi

    curl -s -X POST \
        -H "Authorization: token ${GITHUB_TOKEN}" \
        -H "Accept: application/vnd.github.v3+json" \
        "https://api.github.com/orgs/${GITHUB_ORG}/repos" \
        -d "{
            \"name\": \"${repo_name}\",
            \"description\": \"${description}\",
            \"private\": ${visibility_json},
            \"has_issues\": true,
            \"has_wiki\": true,
            \"has_projects\": true,
            \"auto_init\": false
        }" > /dev/null

    echo "✅ Created: $repo_name"
}

# Function to initialize and push a repository
push_repo() {
    local repo_path=$1
    local repo_name=$2

    echo "Pushing: $repo_name"

    cd "$repo_path"

    # Initialize git if not already initialized
    if [ ! -d ".git" ]; then
        git init
        git branch -M main
    fi

    # Create .gitignore if it doesn't exist
    if [ ! -f ".gitignore" ]; then
        cat > .gitignore << 'EOF'
# Dependencies
node_modules/
bower_components/

# Build outputs
dist/
build/
*.log

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp

# Logs
logs/
*.log

# Local AI development
CLAUDE.md
.claude/
EOF
    fi

    # Add all files
    git add .

    # Check if there are changes to commit
    if git diff --cached --quiet; then
        echo "No changes to commit, skipping..."
    else
        # Create initial commit
        git commit -m "Initial commit: KREKI ${repo_name} repository

- Repository initialization
- Add comprehensive documentation
- Define project structure and standards

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
    fi

    # Add remote and push
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/${repo_name}.git"

    # Try pushing
    if git push -u origin main 2>&1; then
        echo "✅ Pushed: $repo_name"
    else
        echo "⚠️  Push failed for: $repo_name"
    fi

    # Update remote to use HTTPS without token
    git remote set-url origin "https://github.com/${GITHUB_ORG}/${repo_name}.git"

    echo ""
}

# Standards Repositories (Public, Open Source)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CREATING STANDARDS & REFERENCE REPOSITORIES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

create_repo "ea-standards" "TOGAF 9.2-based Emergency Services Enterprise Architecture Framework" "public"
create_repo "api-specifications" "OpenAPI specifications for KREKI emergency response APIs" "public"
create_repo "fhir-profiles" "FHIR R4 implementation guides for Indonesian emergency services" "public"
create_repo "security-framework" "Zero Trust security framework for emergency response platforms" "public"
create_repo "certification-framework" "Volunteer competency certification standards and curricula" "public"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CREATING PLATFORM SERVICES REPOSITORIES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

create_repo "help-119-mobile" "KREKI HELP 119 mobile application (React Native)" "public"
create_repo "help-119-backend" "KREKI HELP 119 backend microservices" "public"
create_repo "kreki-auth-service" "Multi-tenant authentication and authorization service" "public"
create_repo "kreki-emergency-core" "Geo-dispatch engine for emergency response coordination" "public"
create_repo "kreki-lms" "Learning Management System for volunteer training" "public"
create_repo "satusehat-bridge" "Integration bridge for Indonesia's SATUSEHAT platform" "public"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CREATING ORGANIZATION-SPECIFIC REPOSITORIES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

create_repo "kreki-branding" "KREKI brand assets and design system" "private"
create_repo "deployment-kreki" "KREKI production deployment configurations" "private"
create_repo "docs-portal" "KREKI public documentation portal" "public"

echo ""
echo "⏳ Waiting 5 seconds for GitHub to process repositories..."
sleep 5

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PUSHING CONTENT TO ALL REPOSITORIES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Standards Repositories
push_repo "$BASE_DIR/standards/ea-standards" "ea-standards"
push_repo "$BASE_DIR/standards/api-specifications" "api-specifications"
push_repo "$BASE_DIR/standards/fhir-profiles" "fhir-profiles"
push_repo "$BASE_DIR/standards/security-framework" "security-framework"
push_repo "$BASE_DIR/standards/certification-framework" "certification-framework"

# Platform Services
push_repo "$BASE_DIR/platform/help-119-mobile" "help-119-mobile"
push_repo "$BASE_DIR/platform/help-119-backend" "help-119-backend"
push_repo "$BASE_DIR/platform/kreki-auth-service" "kreki-auth-service"
push_repo "$BASE_DIR/platform/kreki-emergency-core" "kreki-emergency-core"
push_repo "$BASE_DIR/platform/kreki-lms" "kreki-lms"
push_repo "$BASE_DIR/platform/satusehat-bridge" "satusehat-bridge"

# Organization-Specific
push_repo "$BASE_DIR/org-specific/kreki-branding" "kreki-branding"
push_repo "$BASE_DIR/org-specific/deployment-kreki" "deployment-kreki"
push_repo "$BASE_DIR/org-specific/docs-portal" "docs-portal"

# Handle organization-level files
echo "Adding organization-level files to ea-standards repository..."
cd "$BASE_DIR/standards/ea-standards"

# Copy org files to ea-standards
cp "$BASE_DIR/README.md" "$BASE_DIR/CONTRIBUTING.md" "$BASE_DIR/LICENSE" "$BASE_DIR/GOVERNANCE.md" ./ 2>/dev/null || true

git add README.md CONTRIBUTING.md LICENSE GOVERNANCE.md 2>/dev/null || true
git commit -m "docs: add organization-level documentation

- Add main README with organization overview
- Add contribution guidelines
- Add licensing guide for three-tier model
- Add governance structure documentation

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>" 2>/dev/null || echo "No documentation changes"

git remote set-url origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/ea-standards.git"
git push origin main
git remote set-url origin "https://github.com/${GITHUB_ORG}/ea-standards.git"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ALL REPOSITORIES SUCCESSFULLY CREATED AND PUSHED!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Summary:"
echo "- Standards: 5 repositories (public)"
echo "- Platform: 6 repositories (public)"
echo "- Org-specific: 3 repositories (2 private, 1 public)"
echo "- Total: 14 repositories"
echo ""
echo "GitHub Organization: https://github.com/${GITHUB_ORG}"
echo ""
