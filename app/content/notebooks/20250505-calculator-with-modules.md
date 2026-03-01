---
title: Calculator with Modules
slug: 20250505-calculator-with-modules
description: >-
  A Python notebook that refactors a calculator into reusable modules,
  demonstrating separation of concerns, operator mapping, and cleaner program
  structure.
date: '2025-05-05'
author: Davina Leong
tags:
  - Python
  - Jupyter Notebook
  - Beginner Programming
  - Modules
  - Code Organisation
  - Clean Architecture
featured: false
readingTime: 3
published: true
---
## 🧮 Introduction: From One File to Many

A calculator works just fine in a single notebook — until it doesn’t.

As programs grow, readability, reuse, and organisation start to matter more than simply “getting the right answer.” This notebook introduces a **Calculator with Modules**, refactoring earlier logic into separate files and responsibilities.

This is where beginner scripts start to feel like *real software*.

---

## 🎯 Purpose: Learning Modular Thinking

The purpose of this notebook is to help beginners understand:

- Why splitting code into **modules** is useful
- How to import and reuse functions
- How to separate calculation logic from program flow
- How cleaner structure improves maintainability

This mirrors how production Python projects are organised.

---

## 🧠 How It Works: High-Level Design

The calculator is now split into logical parts:

1. A **calculations module** that contains arithmetic functions
2. A main calculator file that:
   - Imports these functions
   - Defines supported operators
   - Routes user input to the correct operation
3. Clear messages returned to the caller

Each file has a single responsibility.

---

## 🧩 The Technical Part: Modules, Operators, and Routing

A key idea introduced is importing reusable logic from a module:

```python
from calculations import *
````

Arithmetic operations live in the `calculations` module, while the main file focuses on **control flow and messaging** .

The notebook also defines an operator dictionary:

```python
operators = {
    "+": { "name": "Add", "description": "Add things together" },
    "-": { "name": "Subtract", "description": "Take one thing away from another" },
    "*": { "name": "Multiply", "description": "Multiply (like repeated addition)" },
    "/": { "name": "Divide", "description": "Divide (split into equal parts)" },
    "//": { "name": "Floor Division", "description": "Divide and drop the decimals" },
    "%": { "name": "Modulus", "description": "Get the remainder" },
    "**": { "name": "Exponentiation", "description": "Raise to a power" }
}
```

The calculator function then routes execution based on the operator, handling special cases like division by zero safely .

---

## 💡 Key Takeaways: Writing Maintainable Code

This notebook reinforces several important software principles:

* 🧱 Modules keep code organised and reusable
* 🔁 Logic separation improves clarity
* 🧭 Operator routing simplifies decision-making
* 🛡 Error handling belongs close to risky operations
* 📐 Structure matters as programs grow

These ideas are foundational for APIs, libraries, and larger systems.

---

## 🏁 Conclusion: Thinking Like a Developer

The **Calculator with Modules** represents a mindset shift:

> Code isn’t just written — it’s designed.

By extracting logic into modules and clearly defining responsibilities, this notebook demonstrates how small refactors lead to cleaner, more professional programs.

This is the bridge between learning Python and **building software**.

---

## 🔗 Link to Notebook

**Notebook link:** *Coming Soon*
