---
title: One-time migration tool
summary: An internal tool for lift-and-shift migrations. It moves data, views, stored procedures and other objects between systems within hours.
from: Any source system
to: Any target system
tags: [Python, SQL, Automation]
caseStudy: true
result: Migrations finish within hours
context: Internal tool at CDW
order: 3
---

## The problem

Many migrations are a straight lift and shift: the same tables, views and stored procedures need to exist in the new system, and nobody wants to rebuild them by hand. Done manually, that work is slow, repetitive and easy to get wrong.

## What I built

A tool that takes a source and a target system and migrates the objects between them:

- **Data** in tables.
- **Views**.
- **Stored procedures**.
- **Other database objects** that the target system needs.

It supports multiple source and target systems, so the same tool is reused across projects instead of writing new scripts each time.

## The result

Data, views, stored procedures and other objects migrate **within hours**.
