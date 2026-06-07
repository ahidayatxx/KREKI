# Context Planning Workflow

## Instructions for LLM
**Purpose**: Transform discovery insights into comprehensive, actionable project plans while preserving full context.

**Key Principles**:
- **Context Preservation**: Ensure all discovery insights are reflected in planning decisions
- **Structured Synthesis**: Organize complex information into clear, actionable frameworks
- **Stakeholder Alignment**: Validate plans against stakeholder needs and constraints
- **Dependency Mapping**: Identify and plan for interconnections and bottlenecks
- **Risk Integration**: Build risk mitigation directly into project structure
- **Iterative Refinement**: Expect multiple rounds of planning refinement

**Process Notes**:
- Use TodoWrite extensively to track planning tasks and decisions
- Reference discovery document throughout planning process
- Create living documents that can be updated as context evolves
- Validate each planning phase with stakeholders before proceeding

---

## Phase 6: Context Synthesis & Project Brief

**Goal**: Consolidate all discovery findings into a comprehensive project foundation document.

### Step 1: Discovery Summary Analysis
- **Review all discovery phases** systematically
- **Identify key themes** and patterns across responses
- **Highlight critical constraints** and dependencies
- **Note conflicting information** that needs resolution

### Step 2: Project Charter Creation
- **Primary Objective**: Clear, measurable project goal
- **Success Criteria**: Specific metrics and qualitative indicators
- **Scope Boundaries**: What's included/excluded with rationale
- **Key Constraints**: Budget, timeline, resource, and technical limitations
- **Critical Dependencies**: Internal and external factors that could impact success

### Step 3: Stakeholder Context Map
- **Decision Matrix**: Who makes what decisions and approval processes
- **Communication Plan**: Preferred channels, frequency, and reporting formats
- **Capacity Analysis**: Available bandwidth and competing priorities
- **Risk Ownership**: Who is responsible for monitoring and addressing specific risks

### Step 4: Resource & Technical Architecture
- **Technology Stack**: Current tools and any new requirements
- **Asset Inventory**: Existing resources that can be leveraged
- **Gap Analysis**: What needs to be created, procured, or developed
- **Integration Requirements**: How different systems and teams will connect

### Step 5: Context Brief Validation
- **Stakeholder Review**: Confirm understanding with key decision makers
- **Gap Identification**: Note any missing information or assumptions
- **Priority Alignment**: Ensure all stakeholders agree on importance rankings
- **Final Context Document**: Create master reference for all planning decisions

---

## Phase 7: Context-Rich Project Planning

**Goal**: Convert the context brief into detailed, executable project plans with full context preserved.

### Step 1: Project Structure Design
- **Phase Breakdown**: Logical groupings of work based on dependencies and goals
- **Milestone Definition**: Key checkpoints with specific deliverables and success criteria
- **Context Handoffs**: How context will be maintained between phases and team members
- **Validation Points**: Regular check-ins to ensure context remains accurate

### Step 2: Task Architecture
- **Work Breakdown Structure**: Detailed tasks with context for each
- **Task Dependencies**: Clear understanding of what depends on what and why
- **Resource Allocation**: Who does what based on skills, capacity, and context
- **Time Estimation**: Duration estimates informed by historical context and constraints

### Step 3: Pre-Mortem Analysis
- **Failure Scenario Planning**: Assume the project has failed and work backwards to identify most likely causes
- **Context-Based Failure Modes**: Use discovery insights to identify failure patterns specific to this project/team/environment
- **Stakeholder Failure Perspectives**: Consider how different stakeholders might define or experience project failure
- **Preventive Measures**: Design specific safeguards against identified failure modes
- **Early Warning Indicators**: Establish signals that project is heading toward identified failure scenarios

### Step 4: Risk Management Framework
- **Risk Register**: Comprehensive list of potential issues from discovery and pre-mortem
- **Early Warning Systems**: Specific metrics and indicators to monitor
- **Mitigation Strategies**: Pre-planned responses to identified risks
- **Contingency Planning**: Alternative approaches if primary plans fail

### Step 5: Communication & Reporting Structure
- **Status Reporting**: Regular updates that maintain context across stakeholders
- **Decision Points**: When and how key decisions will be made
- **Context Documentation**: How project learnings will be captured and shared
- **Feedback Loops**: Mechanisms for continuous context refinement

### Step 6: Execution Readiness
- **Team Alignment**: Ensure all team members understand full project context
- **Tool Setup**: TodoWrite and other systems configured for context preservation
- **Documentation Systems**: Living documents ready for continuous updates
- **Launch Criteria**: Specific conditions that must be met before execution begins

### Step 7: Plan Validation & Approval
- **Stakeholder Review**: Comprehensive plan review with all key stakeholders
- **Context Verification**: Confirm plans reflect all discovery insights
- **Resource Confirmation**: Final validation of availability and commitments
- **Execution Authorization**: Formal approval to begin project execution

---

## Deliverables
- **Project Context Brief**: Comprehensive foundation document
- **Detailed Project Plan**: Phase-by-phase execution roadmap
- **Risk Management Framework**: Proactive risk identification and mitigation
- **Communication Plan**: Structured approach to stakeholder engagement
- **Execution Readiness Checklist**: Criteria for successful project launch
- **Project Portal Website**: Simple, beautiful static HTML website with:
  - **Folder Structure**: Create `[project-name]-portal/` folder containing `index.html`
  - Separate pages for each deliverable
  - Interactive Gantt chart for project timeline (zoomable, no database required)
  - Status dashboard for key metrics
  - Self-contained HTML/CSS/JavaScript files
  - Copy-paste ready code for easy deployment to any static hosting service

---

## 📋 Final Step: Create Planning Document

**CRITICAL**: After completing both Phase 6 and Phase 7, you MUST create a comprehensive planning document that serves as the master execution reference and enables starting fresh sessions with complete planning context.

### Create `project_planning_document.md` with:

**Header Section:**
- Project name and planning completion date
- Reference to discovery report for full context
- Planning team and stakeholders involved
- Planning phase timeline and decisions made

**Phase 6: Context Synthesis & Project Brief**
- Discovery summary analysis with key themes and patterns
- Consolidated project charter with objectives and success criteria
- Comprehensive stakeholder context map and communication plan
- Resource and technical architecture requirements
- Critical constraints and dependencies identified

**Phase 7: Context-Rich Project Planning**
- Detailed project structure with phases and milestones
- Complete task architecture with dependencies and resource allocation
- Pre-mortem analysis with failure scenarios and preventive measures
- Comprehensive risk management framework with mitigation strategies
- Communication and reporting structure with feedback loops
- Execution readiness checklist and launch criteria

**Detailed Project Plan:**
- Phase-by-phase breakdown with specific deliverables
- Timeline with dependencies and critical path analysis
- Resource allocation and team assignments
- Budget breakdown and cost management approach
- Quality assurance and validation processes

**Risk Management Framework:**
- Complete risk register with probability and impact assessments
- Early warning systems and monitoring metrics
- Detailed mitigation strategies and contingency plans
- Risk ownership and escalation procedures
- Regular risk review and update processes

**Communication Plan:**
- Stakeholder engagement strategy and schedule
- Reporting formats and frequency
- Decision-making processes and approval workflows
- Change management procedures
- Team alignment and knowledge sharing protocols

**Success Metrics & Validation:**
- Key performance indicators and measurement methods
- Milestone validation criteria and checkpoints
- Stakeholder satisfaction metrics
- Quality standards and acceptance criteria
- Project completion and handoff requirements

**Project Portal Information:**
- **Folder Structure**: Create `[project-name]-portal/` folder with `index.html` as main file
- Portal structure and navigation design
- Dashboard metrics and status indicators
- Gantt chart configuration and timeline display
- Team information and contact details
- Document repository and knowledge base

**Next Steps & Execution Launch:**
- Immediate actions required for project launch
- Team onboarding and orientation requirements
- Tool setup and system configuration needs
- Initial sprint or phase kickoff plan
- Success criteria for execution transition

### File Format:
- Use clear headers and detailed bullet points
- Include specific planning decisions and rationale
- Reference discovery report for complete context
- Organize for easy reference during execution
- Save as `project_planning_document.md` in the project folder

### 🐙 GitHub Integration:
**After creating the planning document, strongly recommend:**
1. **Commit planning document** to the repository with detailed commit message
2. **Create planning branch** if using branch-based workflow
3. **Update GitHub Issues** with detailed tasks and assignments from planning
4. **Create milestone** for major project phases identified
5. **Set up GitHub Pages** to deploy project portal for stakeholder access
6. **Tag the planning completion** for easy reference: `v1.0-planning-complete`

This document becomes the master reference for all execution activities and enables seamless session transitions during project delivery.