# Cursor AI Workflow Guide - DOMINATE Performance

## 🚀 Quick Start Workflow

Every time you start a new task with Cursor AI, follow this structured workflow to ensure comprehensive context management and high-quality results.

## 📋 Pre-Task Checklist

Before starting any task, ensure you have:
- [ ] Read the project context from `PROJECT_CONTEXT.md`
- [ ] Reviewed architecture decisions from `ARCHITECTURE_DECISIONS.md`
- [ ] Understood coding standards from `CODING_STANDARDS.md`
- [ ] Analyzed the current project state
- [ ] Identified the specific task requirements

## 🔄 Multi-Agent Workflow Process

### Step 1: Analyst Agent - Context Analysis
**Role:** Code Analyst & Context Manager  
**Duration:** 2-3 minutes  
**Goal:** Understand current state and requirements

#### Actions to Perform:
1. **Read Project Context**
   ```bash
   # Always start by reading these files
   - PROJECT_CONTEXT.md
   - ARCHITECTURE_DECISIONS.md
   - CODING_STANDARDS.md
   - .cursor-workflow-config.json
   ```

2. **Analyze Current State**
   ```bash
   # Use these tools to understand current state
   - codebase_search: "What is the current implementation of [feature]?"
   - read_file: Check relevant component files
   - list_dir: Review project structure
   - read_lints: Check for any errors
   ```

3. **Document Findings**
   - Current implementation status
   - Dependencies and relationships
   - Potential issues or improvements
   - Context summary for next agents

#### Output:
- **Analysis Report:** Current state assessment
- **Context Summary:** Key information for other agents
- **Recommendations:** Suggested improvements

---

### Step 2: Architect Agent - Solution Design
**Role:** Senior Architect & Structure Designer  
**Duration:** 3-5 minutes  
**Goal:** Design optimal solution architecture

#### Actions to Perform:
1. **Review Analyst Findings**
   - Understand current implementation
   - Identify architectural patterns
   - Assess scalability requirements

2. **Design Solution Architecture**
   ```bash
   # Research best practices if needed
   - web_search: "Next.js best practices for [feature]"
   - codebase_search: "How are similar features implemented?"
   ```

3. **Create Implementation Plan**
   - Component structure design
   - Data flow architecture
   - Integration points
   - Performance considerations

#### Output:
- **Architecture Design:** Solution structure
- **Implementation Plan:** Step-by-step approach
- **Technical Specifications:** Detailed requirements

---

### Step 3: Developer Agent - Implementation
**Role:** Senior Developer & Implementation Specialist  
**Duration:** 5-10 minutes  
**Goal:** Implement the solution following architecture

#### Actions to Perform:
1. **Review Architecture Plan**
   - Understand design decisions
   - Follow established patterns
   - Ensure consistency with existing code

2. **Implement Solution**
   ```bash
   # Use appropriate tools for implementation
   - search_replace: For small changes
   - MultiEdit: For multiple related changes
   - write: For new files
   - edit_notebook: For Jupyter notebooks
   ```

3. **Quality Assurance**
   - Follow coding standards
   - Implement error handling
   - Add proper TypeScript types
   - Ensure responsive design

#### Output:
- **Implemented Code:** Working solution
- **Test Results:** Verification of functionality
- **Performance Metrics:** Optimization results

---

### Step 4: Analyst Agent - Quality Review
**Role:** Code Analyst & Context Manager  
**Duration:** 2-3 minutes  
**Goal:** Ensure quality and completeness

#### Actions to Perform:
1. **Review Implementation**
   - Check against requirements
   - Verify architecture compliance
   - Test functionality

2. **Quality Check**
   ```bash
   # Verify implementation quality
   - read_lints: Check for errors
   - codebase_search: Verify integration
   - run_terminal_cmd: Test functionality
   ```

3. **Document Results**
   - Implementation status
   - Any remaining issues
   - Recommendations for future work

#### Output:
- **Quality Report:** Implementation assessment
- **Final Recommendations:** Next steps and improvements

## 🛠️ Context Management Strategies

### 1. Persistent Memory System
Always maintain these context files:
- `.cursor-workflow-config.json` - Workflow configuration
- `PROJECT_CONTEXT.md` - Project overview and current state
- `ARCHITECTURE_DECISIONS.md` - Architectural decisions and patterns
- `CODING_STANDARDS.md` - Coding standards and best practices

### 2. Context Retention Rules
- **Always start with context analysis** before any task
- **Maintain awareness** of project structure and dependencies
- **Follow established patterns** from architecture decisions
- **Update context files** when making significant changes
- **Use consistent coding standards** across all components

### 3. Information Retrieval
```bash
# Use these tools for context retrieval
codebase_search: "How does [feature] work in this project?"
grep: "Find specific patterns or implementations"
read_file: "Read specific files for detailed context"
list_dir: "Understand project structure"
```

## 📝 Task-Specific Workflows

### For New Features
1. **Analyst:** Understand requirements and current state
2. **Architect:** Design feature architecture and integration
3. **Developer:** Implement feature following design
4. **Analyst:** Test and verify implementation

### For Bug Fixes
1. **Analyst:** Identify root cause and impact
2. **Architect:** Design fix approach and testing strategy
3. **Developer:** Implement fix with proper testing
4. **Analyst:** Verify fix and regression testing

### For Refactoring
1. **Analyst:** Analyze current code and identify issues
2. **Architect:** Design refactoring strategy and patterns
3. **Developer:** Implement refactoring incrementally
4. **Analyst:** Verify functionality and performance

### For Performance Optimization
1. **Analyst:** Identify performance bottlenecks
2. **Architect:** Design optimization strategy
3. **Developer:** Implement optimizations
4. **Analyst:** Measure and verify improvements

## 🎯 Best Practices

### 1. Always Follow the Workflow
- **Never skip steps** - each agent has specific responsibilities
- **Complete each step** before moving to the next
- **Document decisions** and rationale
- **Maintain context** across all interactions

### 2. Use Appropriate Tools
- **codebase_search** for understanding existing code
- **grep** for finding specific patterns
- **read_file** for detailed file analysis
- **search_replace/MultiEdit** for code changes
- **web_search** for best practices research

### 3. Maintain Quality Standards
- **Follow TypeScript best practices**
- **Use proper Next.js patterns**
- **Implement responsive design**
- **Ensure accessibility compliance**
- **Write clean, maintainable code**

### 4. Context Management
- **Start every session** with context analysis
- **Update context files** when making changes
- **Maintain awareness** of project structure
- **Follow established patterns** and conventions

## 🚨 Common Pitfalls to Avoid

### 1. Skipping Context Analysis
- **Problem:** Jumping straight to implementation without understanding context
- **Solution:** Always start with Step 1 (Analyst Agent)

### 2. Ignoring Architecture Decisions
- **Problem:** Implementing solutions that don't follow established patterns
- **Solution:** Review `ARCHITECTURE_DECISIONS.md` before implementation

### 3. Inconsistent Coding Standards
- **Problem:** Code that doesn't follow project standards
- **Solution:** Always follow `CODING_STANDARDS.md`

### 4. Poor Context Retention
- **Problem:** Forgetting important project details between sessions
- **Solution:** Use persistent memory system and context files

## 📊 Success Metrics

### Quality Metrics
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Accessibility requirements satisfied

### Workflow Metrics
- [ ] All workflow steps completed
- [ ] Context properly maintained
- [ ] Architecture decisions followed
- [ ] Coding standards adhered to
- [ ] Documentation updated

## 🔧 Troubleshooting

### If Context is Lost
1. Read `PROJECT_CONTEXT.md` to regain project understanding
2. Review `ARCHITECTURE_DECISIONS.md` for patterns
3. Use `codebase_search` to understand current state
4. Follow the workflow from Step 1

### If Implementation Fails
1. Review architecture decisions
2. Check coding standards compliance
3. Verify TypeScript types and interfaces
4. Test incrementally and debug step by step

### If Performance Issues
1. Analyze current implementation
2. Research optimization best practices
3. Implement performance improvements
4. Measure and verify results

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Best Practices](https://react.dev/learn)

---

**Remember:** This workflow ensures consistent, high-quality results by leveraging the strengths of each agent role while maintaining proper context management throughout the development process.
