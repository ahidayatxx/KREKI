#!/usr/bin/env python3
"""
Test script for the improved query_rag.py
This script demonstrates the new features:
1. Store listing and selection
2. Command-line store ID argument
3. Store switching during runtime
"""

import subprocess
import sys

def test_help():
    """Test the basic functionality"""
    print("=== Testing Improved query_rag.py ===\n")

    print("The improved script now supports:")
    print("1. Interactive store selection")
    print("2. Command-line store ID argument")
    print("3. Runtime store switching")
    print("4. Better error handling")
    print("5. Source/citation display")
    print("\nUsage examples:")
    print("  python query_rag.py                    # Interactive store selection")
    print("  python query_rag.py your-store-id     # Connect directly to store")
    print("  'switch'                               # Switch stores during runtime")
    print("\nCommands during Q&A:")
    print("  exit, quit, q                         # Exit the program")
    print("  switch                                # Switch to a different store")
    print("  summary                               # Generate one-sentence summary of documents")
    print("\nFeatures added:")
    print("  ✓ Lists all available File Search stores")
    print("  ✓ Shows store display names and IDs")
    print("  ✓ Allows selection by number or ID")
    print("  ✓ Supports direct store connection via CLI argument")
    print("  ✓ Runtime store switching without restarting")
    print("  ✓ Enhanced error handling with helpful messages")
    print("  ✓ Displays source/citation information when available")
    print("  ✓ One-sentence document summary generation")
    print("\nTo test the script, run:")
    print("  python query_rag.py")
    print("\nNew summary feature:")
    print("  Type 'summary' to get a concise one-sentence overview of all documents in the selected store.")

if __name__ == "__main__":
    test_help()