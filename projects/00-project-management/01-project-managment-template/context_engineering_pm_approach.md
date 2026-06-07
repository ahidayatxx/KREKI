# Context Engineering Approach for AI-Assisted Project Management

## Instructions for LLM
**Purpose**: Apply context engineering principles to project management by treating project context as an engineered resource requiring careful architecture, moving beyond ad-hoc task management to systematic, comprehensive planning.

**Key Principles**:
- **Context as Infrastructure**: Treat project context as a foundational resource requiring deliberate design
- **Systematic Discovery**: Use structured approaches to gather comprehensive project understanding
- **Adaptive Planning**: Build plans that evolve while preserving core context
- **Continuous Context Management**: Maintain and update project context throughout execution
- **Knowledge Synthesis**: Transform individual insights into actionable project intelligence

**Process Notes**:
- This approach consists of three integrated workflow phases: Discovery → Planning → Execution/Closure
- Each phase builds upon previous context while adding new layers of understanding
- Use TodoWrite extensively throughout all phases to track progress and maintain context
- Reference cross-workflow context continuously to ensure alignment and minimize overlap

---

## Phase 1: Context Discovery Foundation
**Goal**: Establish comprehensive project understanding through systematic context gathering.

### Core Context Architecture Components

#### 1. Project Charter Context
- **Primary Objectives**: Clear, measurable project goals with business rationale
- **Success Criteria**: Specific metrics and qualitative indicators for validation
- **Scope Boundaries**: What's included/excluded with contextual reasoning
- **Key Constraints**: Budget, timeline, resource, and technical limitations with impact analysis

#### 2. Stakeholder Context Architecture
- **Decision Matrix**: Who makes what decisions and approval processes
- **Communication Framework**: Preferred channels, frequency, and reporting formats
- **Capacity Analysis**: Available bandwidth and competing priorities
- **Influence Mapping**: Stakeholder relationships and decision-making dynamics

#### 3. Technical Context Infrastructure
- **Technology Stack**: Current tools and integration requirements
- **Asset Inventory**: Existing resources that can be leveraged
- **Gap Analysis**: What needs to be created, procured, or developed
- **Integration Architecture**: How different systems and teams will connect

#### 4. Historical Context Intelligence
- **Past Project Patterns**: Lessons learned and success/failure analysis
- **Team Dynamics**: Historical working relationships and communication patterns
- **Organizational Context**: Culture, processes, and change management history
- **Market/Environmental Context**: External factors affecting project success

### Discovery Process Framework
**Reference**: Use `01_context_discovery_workflow.md` for detailed 5-phase discovery process:
- Phase 1: Core Project Definition
- Phase 2: Stakeholder & Organizational Context
- Phase 3: Technical & Resource Context
- Phase 4: Historical Context
- Phase 5: Risk Assessment & Success Criteria

---

## Phase 2: Context-Rich Planning Architecture
**Goal**: Transform discovery insights into comprehensive, executable project plans with full context preservation.

### Planning Framework Components

#### 1. Context Synthesis & Project Brief
- **Discovery Summary Analysis**: Systematic review of all discovery phases
- **Project Charter Creation**: Primary objective, success criteria, scope boundaries
- **Stakeholder Context Map**: Decision matrix, communication plan, capacity analysis
- **Resource & Technical Architecture**: Technology stack, asset inventory, gap analysis

#### 2. Context-Rich Project Planning
- **Project Structure Design**: Phase breakdown with context handoffs
- **Task Architecture**: Work breakdown structure with contextual dependencies
- **Pre-Mortem Analysis**: Failure scenario planning based on discovery insights
- **Risk Management Framework**: Comprehensive risk register with mitigation strategies

#### 3. Execution Readiness Framework
- **Team Alignment**: Ensure all team members understand full project context
- **Tool Setup**: TodoWrite and systems configured for context preservation
- **Documentation Systems**: Living documents ready for continuous updates
- **Launch Criteria**: Specific conditions that must be met before execution

### Planning Process Framework
**Reference**: Use `02_context_planning_workflow.md` for detailed 2-phase planning process:
- Phase 6: Context Synthesis & Project Brief
- Phase 7: Context-Rich Project Planning

---

## Phase 3: Context-Preserved Execution & Closure
**Goal**: Execute project plans while maintaining comprehensive context and systematically closing with knowledge capture.

### Execution Framework Components

#### 1. Context-Preserved Execution
- **Execution Launch**: Context handoff, tool setup, baseline establishment
- **Daily/Weekly Management**: Task progression, change log maintenance, context validation
- **Change Management Process**: Change request assessment, impact analysis, context updates
- **Quality Assurance**: Deliverable review, stakeholder feedback, context verification

#### 2. Iterative Context Refinement
- **Context Review Cycles**: Regular context audits and assumption validation
- **Adaptive Planning**: Plan refinement based on execution learnings
- **Knowledge Capture**: Real-time lessons learned and best practice documentation

#### 3. Context Documentation & Handoff
- **Project Completion Validation**: Success criteria review and stakeholder satisfaction
- **Comprehensive Documentation**: Final project report and context evolution documentation
- **Knowledge Transfer**: Stakeholder handoff and team debriefing
- **Future Project Preparation**: Context library updates and process refinements

### Execution Process Framework
**Reference**: Use `03_context_execution_closure_workflow.md` for detailed 3-phase execution process:
- Phase 8: Context-Preserved Execution
- Phase 9: Iterative Context Refinement
- Phase 10: Context Documentation & Handoff

---

## Tools and Methods Integration

### Core Task Management
- **TodoWrite**: Structured task management with priorities and states
  - Task states: pending, in_progress, completed
  - Priority levels: high, medium, low
  - Only one task "in_progress" at a time
  - Mark completed immediately after finishing
  - Use for multi-step or complex projects (3+ steps)

### Research and Context Gathering
- **WebFetch**: Research project requirements and gather external context
- **WebSearch**: Find relevant documentation and best practices
- **File Management Tools**: Read, write, and organize project documentation
- **Bash Commands**: Execute project setup, builds, and validation

### External Integration (MCP)
- **External Resource Access**: Connect to project databases, documentation, issue trackers
- **Resource Mentions**: Reference external resources with "@" syntax
- **Authentication**: Secure access to protected systems

### Process Automation
- **Custom Slash Commands**: Create team-specific project workflows
  - Store in `.claude/commands/` for team sharing
  - Automate common project tasks
  - Standardize processes across team members
- **Built-in Slash Commands**: `/review`, `/pr_comments`, `/init`, `/add-dir`

### Version Control & Collaboration
- **GitHub Integration**: Essential for project tracking and evolution
  - Repository setup: `[project-name]-context-engineering`
  - Version control for all project documents and decisions
  - Issue tracking for risks, tasks, and action items
  - Pull requests for stakeholder review of major documents
  - GitHub Pages deployment for project portal sharing
  - Seamless transition to code development if needed
- **Git Commands**: Regular commits to track project evolution
  - Commit after each major phase completion
  - Branch for discovery, planning, and execution phases
  - Tag major milestones and deliverable completions

---

## Benefits Over Traditional PM
- **Reduced Hallucinations**: Comprehensive context prevents incorrect assumptions
- **Better Decisions**: Full information leads to informed choices
- **Scalable Process**: Works for both small tasks and complex projects
- **Consistent Quality**: Structured approach ensures thoroughness
- **Knowledge Preservation**: Systematic capture and transfer of project intelligence
- **Adaptive Execution**: Plans that evolve while maintaining core context integrity

This approach transforms project management from reactive task handling to proactive, context-aware orchestration across the complete project lifecycle.