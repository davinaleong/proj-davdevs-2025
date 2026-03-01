---
title: Processing and Standardising the Combined Project Dataset (Part 2)
slug: 20251201-p2-processing-and-standardising-the-combined-project-dataset
description: >-
  Part 2 of a multi-step data preparation pipeline, focusing on processing and
  standardising a combined project dataset to ensure consistency, correctness,
  and readiness for downstream analysis.
date: '2025-12-01'
author: Davina Leong
tags:
  - Python
  - Jupyter Notebook
  - Data Preparation
  - Data Processing
  - Data Standardisation
  - Machine Learning
  - Pandas
featured: false
readingTime: 4
published: true
---
## 🧱 Introduction: Consistency Comes Early

After joining multiple CSV trackers into a single dataset, the next critical step is **making that data consistent**.

This notebook represents **Part 2** of the pipeline, where the combined dataset is processed and standardised. Before adding enrichment or advanced features, it’s important to ensure that formats, values, and structures behave predictably.

Clean data starts with consistency.

---

## 🎯 Purpose: Stabilising the Dataset

The goal of this step is to:

- Standardise column formats and naming
- Normalise values across records
- Resolve inconsistencies introduced by multiple data sources
- Ensure the dataset behaves reliably during analysis and ML preparation

This step reduces risk before moving deeper into the pipeline.

---

## 🧠 How It Works: Processing as a Pipeline Stage

At a high level, this notebook performs the following:

1. Load the combined dataset from Part 1
2. Inspect columns for formatting and value inconsistencies
3. Apply standardisation rules consistently
4. Convert data types explicitly
5. Validate that transformations behave as expected

Each operation is deliberate and repeatable.

---

## 🧩 The Technical Part: Standardisation in Practice

A simplified example of processing logic looks like this:

```python
df["project_name"] = df["project_name"].str.strip().str.lower()
df["status"] = df["status"].str.upper()
````

Other standardisation techniques demonstrated include:

* 🧹 Trimming whitespace
* 🔄 Explicit type conversion
* 📐 Normalising categorical values
* 🧠 Applying consistent transformation rules

These steps ensure uniform behaviour across the dataset.

---

## 💡 Key Takeaways: Predictable Data Enables Progress

This notebook reinforces several important lessons:

* 🧱 Consistency matters before enrichment
* 🔁 Standardisation prevents downstream bugs
* 🧠 Clean formats enable reliable joins and features
* 🛠 Processing is a core data-engineering skill

Stable data makes every later step easier.

---

## 🏁 Conclusion: Preparing for Enrichment

**Processing and Standardising the Combined Project Dataset (Part 2)** is a stabilisation milestone:

> If Part 1 unified the data,
> Part 2 makes it trustworthy.

With a consistent dataset in place, the pipeline can now move on to:

* Enrichment and derived fields
* Handling missing values
* Feature engineering and embeddings

This notebook lays the groundwork for everything that follows.

---

## 🔗 Link to Notebook

**Notebook link:** *Coming Soon*
