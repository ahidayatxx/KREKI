#!/usr/bin/env python3

import os

def create_env_file(output_dir):
    """
    Create .env file with the specified environment variables

    Args:
        output_dir (str): Directory where the .env file will be created
    """
    try:
        # Define environment variables (without "export" prefix)
        env_content = """ANTHROPIC_BASE_URL=https://api.z.ai/api/anthropic
ANTHROPIC_AUTH_TOKEN=dd51ee47e3414070aee6091410669c6e.nI2apObNgHMioNft
"""

        # Create output path for .env file
        env_file_path = os.path.join(output_dir, '.env')

        # Write to .env file
        with open(env_file_path, 'w') as file:
            file.write(env_content)

        print(f"Successfully created .env file at: {env_file_path}")
        print("Created environment variables:")
        print("  ANTHROPIC_BASE_URL")
        print("  ANTHROPIC_AUTH_TOKEN")

    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    # Define output directory
    output_dir = "/Users/ahmadhidayat/claude-code"

    # Create the .env file
    create_env_file(output_dir)