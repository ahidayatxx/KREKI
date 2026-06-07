#!/usr/bin/env python3
import os
import subprocess

# Change to claude-code directory
claude_code_dir = os.path.expanduser("~/claude-code")
if os.path.exists(claude_code_dir):
    os.chdir(claude_code_dir)
    print(f"Changed directory to {claude_code_dir}")
else:
    print(f"Warning: {claude_code_dir} does not exist")

# Add ~/.npm-global/bin to PATH permanently
npm_global_bin = os.path.expanduser("~/.npm-global/bin")
bashrc_path = os.path.expanduser("~/.bashrc")
bash_profile_path = os.path.expanduser("~/.bash_profile")
export_line = f"export PATH={npm_global_bin}:$PATH\n"

# Use .bash_profile on macOS, .bashrc on Linux
profile_path = bash_profile_path if os.path.exists(bash_profile_path) or not os.path.exists(bashrc_path) else bashrc_path

# Check if the export line is already in the profile file
try:
    with open(profile_path, 'r') as f:
        content = f.read()
    
    if export_line.strip() not in content:
        # Add the export line to the profile file
        with open(profile_path, 'a') as f:
            f.write(export_line)
        print(f"Added {npm_global_bin} to {profile_path}")
        
        # Source the profile file
        subprocess.run(['bash', '-c', f'source {profile_path}'], check=True)
        print(f"Sourced {profile_path}")
    else:
        print(f"{npm_global_bin} is already in {profile_path}")
        
except FileNotFoundError:
    # Create the profile file if it doesn't exist
    with open(profile_path, 'w') as f:
        f.write(export_line)
    print(f"Created {profile_path} and added {npm_global_bin} to PATH")
    
    # Source the profile file
    subprocess.run(['bash', '-c', f'source {profile_path}'], check=True)
    print(f"Sourced {profile_path}")

# Run claude --version to show the current version
try:
    result = subprocess.run(['claude', '--version'], capture_output=True, text=True, check=True)
    print(f"\n{result.stdout.strip()}")
except subprocess.CalledProcessError:
    print("\nClaude command not found - please restart your terminal")
except FileNotFoundError:
    print("\nClaude command not found - please restart your terminal")

# Show current directory
print(f"\nCurrent directory: {os.getcwd()}")