# MCP Docker - Research Assistant Prompt

This project contains an MCP server that exposes a `/research` slash command to the Gemini CLI.

## Functionality

The `/research` command takes a single string argument, `query`. It instructs the Gemini model to act as a research assistant to answer the query.

The process is as follows:
1.  Search for academic papers using `search_pubmed`, `search_semantic`, and `search_google_scholar`.
2.  Synthesize the findings into a structured answer using the `sequentialthinking` tool.
3.  Include in-text citations in APA 7th Edition format.
4.  Provide a full bibliography at the end, also in APA 7th Edition format.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Compile the TypeScript:**
    ```bash
    npm run build
    ```
    This will create the compiled JavaScript file in the `dist` directory.

## Running the Server

To run the MCP server, you can use:
```bash
npm start
```
This will execute the compiled `dist/research-prompt.js` file.

## Integrating with Gemini CLI

To make the `/research` slash command available in the Gemini CLI, you need to add the following configuration to your `settings.json` file under `mcpServers`:

```json
{
  "mcpServers": {
    "research-server": {
      "command": "npm",
      "args": ["start"],
      "cwd": "/Users/ahmadhidayat/claude-code/projects/MCP Prompts as Slash Commands/scientific-research"
    }
  }
}
```

**Note:** The `cwd` path should be the absolute path to this directory on your system.

Once configured, you can invoke the prompt in the Gemini CLI like this:

```
/research --query="your research topic"
```
or
```
/research "your research topic"
```
