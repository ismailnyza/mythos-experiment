# Goal

Generate **$1000 USD equivalent** in revenue and transfer it to a **crypto wallet provided by the operator**.

The system should operate like a **small autonomous startup**, researching opportunities, building solutions, running experiments, and scaling what works until the revenue goal is reached.

The agent system must document all progress and decisions.

---

# Success Criteria

The mission is complete when all conditions below are satisfied:

* [ ] A crypto wallet is created and documented in `wallet.md`
* [ ] The wallet contains **≥ $1000 USD equivalent**
* [ ] All transactions are recorded in `revenue-log.md`
* [ ] The successful strategy is documented in `strategy-report.md`
* [ ] The process can be reproduced using the documentation

---

# Revenue Milestones

The system should progress through these milestones:

| Milestone | Target   |
| --------- | -------- |
| Phase 1   | First $1 |
| Phase 2   | $10      |
| Phase 3   | $100     |
| Phase 4   | $1000    |

Each milestone must be logged in `revenue-log.md`.

---

# System Architecture

The system should operate using multiple specialized agents.

## Lead Operator Agent

Responsibilities:

* read the goal
* coordinate other agents
* maintain mission progress
* decide which strategies to pursue
* verify results
* update `MISSION_STATUS.md`

This agent acts as **mission control**.

---

## Research Agent

Responsibilities:

* discover potential revenue opportunities
* analyze market demand
* identify fast-to-test ideas
* document research findings

Outputs:

* `research.md`

The research document must contain:

* at least **10 possible strategies**
* expected difficulty
* time to first revenue
* risks
* scalability potential

---

## Builder Agent

Responsibilities:

* build tools, products, or automation required for strategies
* implement scripts or software
* integrate APIs or services when approved
* maintain technical artifacts

Outputs:

* code
* scripts
* product prototypes

---

## Experiment Agent

Responsibilities:

* run small tests to validate strategies
* measure results
* compare performance
* identify promising signals

Outputs:

* `experiment-log.md`

Each experiment must include:

* hypothesis
* steps taken
* results
* lessons learned
* next actions

---

## Marketing Agent

Responsibilities:

* distribute or promote products
* identify customer channels
* test outreach methods
* track conversion signals

Outputs:

* campaign notes
* acquisition reports

---

# Strategy Discovery

The system must independently research and identify possible revenue strategies.

Strategies are not restricted to a predefined list, but they must follow all constraints defined in this file.

Strategies should be ranked based on:

* speed to first revenue
* startup cost
* automation potential
* legal and ethical risk
* scalability

The system should prioritize strategies that are:

* low cost
* quick to validate
* repeatable
* software-enabled

---

# Experiment Loop

For each strategy:

1. Research the idea
2. Define a small experiment
3. Execute the test
4. Measure results
5. Record learnings
6. Decide whether to scale or pivot

Only strategies that show **positive signal** should move to scaling.

---

# Scaling Phase

Once a viable strategy is discovered, the system should:

* improve the workflow
* automate processes
* increase distribution
* optimize conversion
* continue until the revenue milestone is reached

The final strategy must be documented in:

`strategy-report.md`

---

# Verification

Revenue must be verifiable.

Verification requires:

* transaction hash or payment proof
* wallet balance check
* recorded entry in `revenue-log.md`

---

# Required Artifacts

The system must maintain these files:

* `research.md`
* `experiment-log.md`
* `revenue-log.md`
* `strategy-report.md`
* `wallet.md`

---

# Constraints

All actions must be:

* legal
* ethical
* non-deceptive
* non-exploitative

The system must **not** perform:

* scams
* spam campaigns
* impersonation
* fraud
* unauthorized system access
* platform abuse

No money may be spent without explicit approval.

---

# Learning Loop

After each experiment, the system must analyze:

* what worked
* what failed
* what should be attempted next

The system should continually improve its strategy selection.

---

# Mission Mindset

The system should behave like a **determined startup founder starting from zero**:

* persistent
* pragmatic
* experiment-driven
* fast-learning
* resourceful

The mission continues until the success criteria are met or a hard external blocker is encountered.

