#!/bin/bash

# Script to push all KREKI repositories to GitHub using HTTPS with PAT
# Usage: GITHUB_TOKEN=your_token ./push-all-repos-https.sh

set -e  # Exit on error

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable not set!"
    echo ""
    echo "Please run: GITHUB_TOKEN=your_token ./push-all-repos-https.sh"
    echo ""
    echo "Create a Personal Access Token at:"
    echo "https://github.com/settings/tokens"
    echo ""
    echo "Required scopes: repo, workflow"
    exit 1
fi

# Configuration
GITHUB_ORG="kreki-indonesia"
BASE_DIR="/Users/ahmadhidayat/claude-code/projects/kreki-indonesia"

echo "Using token for authentication..."
echo ""

# Validate token
echo "Validating token..."
if ! curl -s -H "Authorization: token ${GITHUB_TOKEN}" https://api.github.com/user > /dev/null 2>&1; then
    echo "❌ Invalid token. Please check your GITHUB_TOKEN and try again."
    exit 1
fi
echo "✅ Token validated!"
echo ""

# Function to initialize and push a repository
push_repo() {
    local repo_path=$1
    local repo_name=$2
    local visibility=$3

    echo "================================================"
    echo "Processing: $repo_name"
    echo "================================================"

    cd "$repo_path"

    # Initialize git if not already initialized
    if [ ! -d ".git" ]; then
        echo "Initializing git repository..."
        git init
        git branch -M main
    else
        echo "Git already initialized"
        # Reset any previous state
        git checkout main 2>/dev/null || git checkout -b main
    fi

    # Create .gitignore if it doesn't exist
    if [ ! -f ".gitignore" ]; then
        echo "Creating .gitignore..."
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
EOF
    fi

    # Add all files
    echo "Adding files to git..."
    git add .

    # Check if there are changes to commit
    if git diff --cached --quiet; then
        echo "No changes to commit, skipping..."
    else
        # Create initial commit
        echo "Creating commit..."
        git commit -m "Initial commit: KREKI ${repo_name} repository

- Repository initialization
- Add comprehensive documentation
- Define project structure and standards

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
    fi

    # Set up remote with token authentication
    echo "Setting up remote origin..."
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/${repo_name}.git"

    # Push to GitHub
    echo "Pushing to GitHub..."
    if git push -u origin main 2>&1; then
        echo "✅ Successfully pushed: $repo_name"
    else
        # Try force push if regular push fails
        echo "Regular push failed, trying force push..."
        git push -u origin main --force
        echo "✅ Successfully pushed (force): $repo_name"
    fi

    # Update remote to use HTTPS without token (for future pulls)
    git remote set-url origin "https://github.com/${GITHUB_ORG}/${repo_name}.git"

    echo ""
}

echo "Starting push process for all KREKI repositories..."
echo ""

# Standards Repositories (Public, Open Source)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STANDARDS & REFERENCE REPOSITORIES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

push_repo "$BASE_DIR/standards/ea-standards" "ea-standards" "public"
push_repo "$BASE_DIR/standards/api-specifications" "api-specifications" "public"
push_repo "$BASE_DIR/standards/fhir-profiles" "fhir-profiles" "public"
push_repo "$BASE_DIR/standards/security-framework" "security-framework" "public"
push_repo "$BASE_DIR/standards/certification-framework" "certification-framework" "public"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PLATFORM SERVICES REPOSITORIES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

push_repo "$BASE_DIR/platform/help-119-mobile" "help-119-mobile" "public"
push_repo "$BASE_DIR/platform/help-119-backend" "help-119-backend" "public"
push_repo "$BASE_DIR/platform/kreki-auth-service" "kreki-auth-service" "public"
push_repo "$BASE_DIR/platform/kreki-emergency-core" "kreki-emergency-core" "public"
push_repo "$BASE_DIR/platform/kreki-lms" "kreki-lms" "public"
push_repo "$BASE_DIR/platform/satusehat-bridge" "satusehat-bridge" "public"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "ORGANIZATION-SPECIFIC REPOSITORIES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

push_repo "$BASE_DIR/org-specific/kreki-branding" "kreki-branding" "private"
push_repo "$BASE_DIR/org-specific/deployment-kreki" "deployment-kreki" "private"
push_repo "$BASE_DIR/org-specific/docs-portal" "docs-portal" "public"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "ORGANIZATION-LEVEL FILES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Handle organization-level files
echo "Adding organization-level files to ea-standards repository..."
cd "$BASE_DIR/standards/ea-standards"

# Copy org files to ea-standards
cp "$BASE_DIR/README.md" "$BASE_DIR/CONTRIBUTING.md" "$BASE_DIR/LICENSE" "$BASE_DIR/GOVERNANCE.md" ./

git add README.md CONTRIBUTING.md LICENSE GOVERNANCE.md
git commit -m "docs: add organization-level documentation

- Add main README with organization overview
- Add contribution guidelines
- Add licensing guide for three-tier model
- Add governance structure documentation

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>" || echo "No new documentation changes to commit"

# Set up remote with token for final push
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/ea-standards.git"
git push origin main
git remote set-url origin "https://github.com/${GITHUB_ORG}/ea-standards.git"

echo "================================================"
echo "✅ ALL REPOSITORIES SUCCESSFULLY PUSHED!"
echo "================================================"
echo ""
echo "Summary:"
echo "- Standards: 5 repositories"
echo "- Platform: 6 repositories"
echo "- Org-specific: 3 repositories"
echo "- Total: 14 repositories"
echo ""
echo "GitHub Organization: https://github.com/${GITHUB_ORG}"
echo ""
