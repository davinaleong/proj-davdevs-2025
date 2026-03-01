---
title: Calculator
slug: 20250502-calculator
description: >-
  A Python Jupyter Notebook that implements a simple calculator using functions,
  operator handling, and basic error management.
date: '2025-05-02'
author: Davina Leong
tags:
  - Python
  - Jupyter Notebook
  - Beginner Programming
  - Functions
  - Arithmetic
  - Control Flow
featured: false
readingTime: 3
published: true
---
## 🧮 Introduction: Building a Real Calculator in Python

After working through focused exercises like fruit calculators and sorters, it’s time to bring everything together into something familiar and practical — a **calculator**.

This notebook implements a basic calculator using Python, covering arithmetic operations, function abstraction, and operator-based decision logic. It’s simple, readable, and intentionally beginner-friendly.

---

## 🎯 Purpose: Practicing Core Programming Skills

The purpose of this notebook is to reinforce several foundational concepts at once:

- Writing reusable **functions**
- Performing common arithmetic operations
- Using conditionals to route logic
- Handling basic runtime errors (like division by zero)

Together, these form the backbone of many real-world programs.

---

## 🧠 How It Works: High-Level Flow

The calculator follows a clear, structured flow:

1. Define individual functions for arithmetic operations
2. Create a wrapper function to act as the calculator engine
3. Pass operands and an operator into the calculator
4. Execute the correct operation and return the result

This separation of responsibilities keeps the code easy to read and extend.

---

## 🧩 The Technical Part: Functions and Operators

A simplified version of the logic looks like this:

```python
def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "Error: Division by zero"
    return x / y

def calculator(x, y, operator):
    if operator == "+":
        return add(x, y)
    elif operator == "-":
        return subtract(x, y)
    elif operator == "*":
        return multiply(x, y)
    elif operator == "/":
        return divide(x, y)
    else:
        return "Invalid operator"
````

### 🔍 What This Demonstrates

* 🧩 Each operation is encapsulated in its own function
* 🔀 Conditional logic routes execution based on the operator
* 🛡 Basic error handling prevents crashes
* 🧠 The calculator logic stays clean and readable

This is an early example of **command routing**, a pattern used in APIs and applications.

---

## 💡 Key Takeaways: From Syntax to Structure

From this notebook, we learn that:

* 🧱 Functions improve clarity and reuse
* 🔁 Control flow determines program behaviour
* ⚠️ Guarding against invalid input is essential
* 🛠 Clean structure matters more than clever code

These ideas scale directly into larger systems.

---

## 🏁 Conclusion: A Foundational Building Block

The **Calculator** notebook represents a key milestone:

> You’re no longer experimenting with isolated statements —
> you’re composing logic into a working program.

With this foundation, you’re well prepared to explore:

* Loops for continuous input
* Dictionaries for operator mapping
* User-driven calculator menus
* Object-oriented calculator designs

Every complex system starts with a simple calculator.

---

## 🔗 Link to Notebook

**Notebook link:** *Coming Soon*
