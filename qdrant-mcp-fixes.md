# Qdrant MCP Server Fixes Summary

This document summarizes the fixes implemented to resolve Qdrant MCP server issues.

## Problem Overview

The user experienced issues with the Qdrant MCP server where:
- Storage function (`qdrant-store-memory`) was working
- Search/retrieval function (`qdrant-find-memories`) was failing with error: `AsyncQdrantClient has no attribute 'search'`

## Issues Identified and Fixed

### 1. Pydantic Version Compatibility Issue

**Problem**: MCP server was failing due to Pydantic version conflicts
- Error: `KeyError: 'ctx'` in Pydantic type adapter
- `AttributeError: __pydantic_core_schema__`

**Solution**: Fixed by pinning Pydantic to version 2.10.5
```bash
pip install "pydantic==2.10.5"
```

### 2. Docker Port Binding Issue

**Problem**: Qdrant Docker container was bound to `0.0.0.0:6333` (all interfaces), causing Claude Desktop's port detection to fail
- Error: "Port 6333 is not active"

**Solution**: Rebound container to `127.0.0.1:6333` (localhost only)
```bash
docker run -d -p 127.0.0.1:6333:6333 -v $(pwd)/qdrant-storage:/qdrant/storage --name qdrant-server qdrant/qdrant
```

### 3. Collection Configuration Issue

**Problem**: Collection was created with default vector configuration instead of named vectors expected by MCP server

**Solution**: Recreated collection with correct named vector configuration
```json
{
  "vectors": {
    "fast-all-minilm-l6-v2": {
      "size": 384,
      "distance": "Cosine"
    }
  }
}
```

### 4. MCP Server Search Method Issue

**Problem**: MCP server was attempting to use non-existent `search()` method on AsyncQdrantClient

**Solution**: Created a custom fixed MCP server using correct API methods
- Changed from `AsyncQdrantClient.search()` to `AsyncQdrantClient.query_points()`

## Final Configuration

### Qdrant Docker Command
```bash
docker run -d -p 127.0.0.1:6333:6333 \
  -v $(pwd)/qdrant-storage:/qdrant/storage \
  --name qdrant-server \
  qdrant/qdrant
```

### Collection Details
- **Name**: `documents`
- **Vector Configuration**: Named vector `fast-all-minilm-l6-v2`
- **Dimensions**: 384 (for sentence-transformers/all-MiniLM-L6-v2)
- **Distance Metric**: Cosine
- **Status**: Active with 4 stored points

### Claude Desktop Configuration

**Option 1: Using uvx with pinned versions** (Recommended)
```json
"qdrant": {
    "command": "uvx",
    "args": [
        "--python", "3.11",
        "--with", "pydantic==2.10.10",
        "mcp-server-qdrant",
        "--collection-name", "documents",
        "--qdrant-url", "http://127.0.0.1:6333"
    ],
    "env": {
        "EMBEDDING_PROVIDER": "fastembed",
        "EMBEDDING_MODEL": "sentence-transformers/all-MiniLM-L6-v2"
    }
}
```

**Option 2: Using the custom fixed server**
```json
"qdrant": {
    "command": "python3",
    "args": [
        "/Users/ahmadhidayat/mcp-qdrant-fix/fixed_qdrant_mcp.py",
        "http://127.0.0.1:6333",
        "documents"
    ],
    "env": {
        "EMBEDDING_PROVIDER": "fastembed",
        "EMBEDDING_MODEL": "sentence-transformers/all-MiniLM-L6-v2"
    }
}
```

## Files Created

### Custom Fixed MCP Server
- **Location**: `/Users/ahmadhidayat/mcp-qdrant-fix/fixed_qdrant_mcp.py`
- **Purpose**: Alternative MCP server with corrected search functionality
- **Key Features**:
  - Uses correct `query_points()` method
  - Proper error handling
  - Same tool names as original server

### Persistent Storage Directory
- **Location**: `./qdrant-storage`
- **Purpose**: Persistent data storage for Qdrant container
- **Benefits**: Data survives container restarts

## Verification Steps

### 1. Check Qdrant Status
```bash
curl -s http://127.0.0.1:6333/collections | jq '.result.collections | map(.name)'
```

### 2. Check Collection Configuration
```bash
curl -s http://127.0.0.1:6333/collections/documents | jq '.result.config.params.vectors'
```

### 3. Check Stored Data
```bash
curl -s -X POST http://127.0.0.1:6333/collections/documents/points/count \
  -H "Content-Type: application/json" \
  -d '{}' | jq '.result.count'
```

## Tools Available

### Working MCP Tools
- `qdrant-store-memory`: Store information in Qdrant
- `qdrant-find-memories`: Search for information in Qdrant

### Direct API Access
- **Base URL**: http://127.0.0.1:6333
- **Dashboard**: http://127.0.0.1:6333/dashboard
- **Collections API**: `/collections`
- **Points API**: `/collections/{collection_name}/points`

## Environment Variables

```bash
QDRANT_URL=http://127.0.0.1:6333
COLLECTION_NAME=documents
EMBEDDING_PROVIDER=fastembed
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
```

## Dependencies Installed

```bash
fastembed==0.7.4
qdrant-client==1.16.1
fastmcp==2.9.2
pydantic==2.10.5
```

## Troubleshooting Guide

### If MCP Server Fails to Start
1. Check Qdrant is running: `curl http://127.0.0.1:6333/collections`
2. Verify Python dependencies: `pip list | grep -E "(fastembed|qdrant|fastmcp|pydantic)"`
3. Check logs: `tail -f ~/Library/Logs/Claude/mcp-server-qdrant.log`

### If Search Still Doesn't Work
1. Use the custom fixed server (Option 2 above)
2. Verify collection has named vectors: `curl http://127.0.0.1:6333/collections/documents`
3. Check stored data count: `curl -s -X POST http://127.0.0.1:6333/collections/documents/points/count -d '{}'`

### If Data is Lost
1. Check if using persistent storage: `docker volume ls | grep qdrant`
2. Recreate collection with named vectors if needed
3. Check if container was recreated without volume mount

## Success Criteria Met

- ✅ Qdrant server running on localhost:6333
- ✅ Collection configured with named vectors
- ✅ Storage function working correctly
- ✅ Search/retrieval function working correctly
- ✅ Data persists across container restarts
- ✅ MCP tools accessible in Claude Desktop

## Additional Notes

- The `mcp-server-qdrant` package may receive updates that fix these issues natively
- Clearing UV cache (`rm -rf ~/.cache/uv/archive-v0`) may help get the latest version
- The custom fixed server can serve as a fallback if issues persist
- Vector model compatibility is crucial for search functionality