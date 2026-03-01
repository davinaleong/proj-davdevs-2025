---
title: Building a Unified Dataset from Multiple CSV Trackers (Part 1)
slug: 20251129-p1-building-a-unified-dataset-from-multiple-csv-trackers
description: >-
  A Python notebook that prepares raw CSV data for machine learning by joining
  datasets, cleaning fields, and producing a structured training-ready dataset.
date: '2025-11-29'
author: Davina Leong
tags:
  - Python
  - Jupyter Notebook
  - Machine Learning
  - Data Preparation
  - Data Engineering
  - CSV
  - Pandas
featured: false
readingTime: 4
published: true
---
## 🤖 Introduction: Before ML Comes Data

Machine learning doesn’t start with models.  
It starts with **data preparation**.

This notebook is **Part 1** of preparing a dataset for machine learning. It focuses on joining multiple CSV files, cleaning inconsistencies, and producing a structured dataset that can later be used for feature engineering and model training.

This is where most ML work actually happens.

---

## 🎯 Purpose: Making Data ML-Ready

The goal of this notebook is to demonstrate how to:

- Combine multiple CSV sources into a single dataset
- Resolve schema differences between files
- Clean and standardise raw values
- Produce a consistent, analysis-ready table
- Lay the groundwork for machine learning workflows

This is data engineering in service of ML.

---

## 🧠 How It Works: Dataset Assembly Pipeline

At a high level, the notebook follows this pipeline:

1. Load multiple CSV files
2. Inspect columns and overlaps
3. Align schemas and column names
4. Join datasets using shared keys
5. Clean and normalise values
6. Export a consolidated dataset

This mirrors real-world ML preprocessing pipelines.

---

## 🧩 The Technical Part: Joining CSV Files

A simplified example of the core logic looks like this:

```python


df1 = pd.read_csv("data_part_1.csv")
df2 = pd.read_csv("data_part_2.csv")

merged_df = df1.merge(df2, on="id", how="inner")
````

Across the notebook, techniques such as the following are applied:

* 📂 Reading multiple CSV files
* 🔗 Joining datasets with `merge`
* 🧼 Cleaning inconsistent fields
* 📐 Selecting and reordering columns
* 🧠 Ensuring data integrity post-join

Two versions of the notebook (`v1` and `v2`) show **iterative improvement**, reflecting real development workflows.

---

## 💡 Key Takeaways: ML Is Won Before Training

This notebook reinforces several critical ML truths:

* 📊 Models are only as good as the data
* 🧼 Cleaning and consistency matter more than algorithms
* 🧱 Structured datasets enable downstream success
* 🔁 Iteration is part of data preparation

Most ML failures begin with poor data prep — this notebook avoids that trap.

---

## 🏁 Conclusion: The First ML Milestone

**Preparing Dataset for ML – Part 1** represents an important shift:

> You’re no longer just analysing data —
> you’re engineering datasets for learning systems.

With this foundation, the next natural steps are:

* Feature engineering
* Encoding categorical variables
* Train/test splitting
* Model training and evaluation

This notebook clearly signals **ML readiness**, not just interest.

---

## 🔗 Link to Notebook

**Notebook link:** *Coming Soon*
