---
title: Warehouse migration to Snowflake
summary: Moved a fitness brand's on-premises data warehouse to Snowflake, with pipelines for full, incremental and change-data-capture loads and quality checks at every stage.
from: On-prem warehouse
to: Snowflake
tags: [Snowflake, Airflow, Python, S3, SQL]
caseStudy: true
context: Client project at CDW · fitness brand
order: 2
---

## The problem

A fitness brand ran its reporting on a legacy on-premises data warehouse. It needed to move to Snowflake without interrupting the reports the business relied on, and without losing or changing any history along the way.

## What I built

- **ELT pipelines** in Python and Airflow that land data in S3 and load it into Snowflake.
- **Three load patterns**, chosen per table: full loads, incremental loads, and change data capture (CDC) for tables that change often.
- **Dimensional models** with fact and dimension tables, using slowly changing dimensions (SCD Type 2) so the history of each record is kept.
- **Data quality checks** at each pipeline stage, with monitoring and automated alerts when a check fails.

## How it flows

1. **Extract** from the on-premises warehouse into S3.
2. **Load** raw data into Snowflake staging.
3. **Transform** into fact and dimension tables, applying SCD Type 2.
4. **Validate** counts and values against the source, and alert on any difference.

## The result

The warehouse now runs on Snowflake, with loads that are monitored end to end and a full history of changes kept for analysis.
