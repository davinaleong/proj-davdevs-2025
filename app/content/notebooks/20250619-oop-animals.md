---
title: OOP Animals
slug: 20250619-oop-animals
description: >-
  A Python notebook that introduces object-oriented programming concepts using
  simple animal classes, attributes, and methods.
date: '2025-06-19'
author: Davina Leong
tags:
  - Python
  - Jupyter Notebook
  - Object-Oriented Programming
  - OOP
  - Classes
  - Beginner Programming
featured: false
readingTime: 3
published: true
---
## 🐾 Introduction: Thinking in Objects

As programs grow, managing logic with only functions and variables becomes limiting.

This notebook introduces **Object-Oriented Programming (OOP)** using a simple and approachable theme: **animals**. By modelling animals as objects, abstract programming concepts become tangible and intuitive.

This is where code starts to mirror the real world.

---

## 🎯 Purpose: Introducing OOP Concepts

The goal of this notebook is to help beginners understand:

- What a **class** is
- How objects are created from classes
- The role of attributes (data)
- The role of methods (behaviour)
- Why OOP helps organise larger programs

These concepts form the foundation of many real-world Python applications.

---

## 🧠 How It Works: Modelling Real-World Entities

At a high level, the notebook follows this approach:

1. Define an `Animal` class
2. Give it attributes such as name or species
3. Define methods that describe behaviour
4. Create multiple animal objects
5. Call methods on those objects

Each animal becomes a **self-contained unit of data and behaviour**.

---

## 🧩 The Technical Part: Classes and Methods

A simplified version of the idea looks like this:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print("The animal makes a sound")
````

Creating objects from the class:

```python
dog = Animal("Dog")
cat = Animal("Cat")

dog.speak()
cat.speak()
```

### 🔍 What This Demonstrates

* 🧱 Classes define blueprints
* 🧬 Objects are instances of those blueprints
* 🔄 Methods operate on object data
* 🧠 `self` refers to the current object

This pattern is central to Python and many other languages.

---

## 💡 Key Takeaways: Why OOP Matters

This notebook highlights several important ideas:

* 🧩 OOP groups related data and behaviour together
* 🐶 Objects model real-world entities naturally
* 🧠 Code becomes easier to extend and reason about
* 🛠 OOP prepares you for larger systems and frameworks

Once this clicks, concepts like inheritance and polymorphism become much easier.

---

## 🏁 Conclusion: Your First Step into OOP

The **OOP Animals** notebook marks an important transition:

> You’re no longer just writing procedures —
> you’re designing objects.

With this foundation, learners are ready to explore:

* Inheritance (e.g. Dog, Cat subclasses)
* Method overriding
* Encapsulation
* Object relationships

Every object-oriented system starts with a simple class — just like this one.

---

## 🔗 Link to Notebook

**Notebook link:** *Coming Soon*
