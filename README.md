

# NYC Small Business Insights Dashboard

An interactive web dashboard for exploring New York City
business license data from NYC Open Data.

## Project Overview

The NYC Small Business Insights Dashboard helps users
explore DCWP-issued business license records across
New York City's five boroughs.

The dashboard provides interactive filters, summary
statistics, charts, and a geographic map.

## Problem Statement

NYC Open Data contains thousands of business license
records that can be difficult to explore manually.

This project makes the information more accessible
by allowing users to filter and visualize license
records without working directly with CSV files.

## Dataset

Source: NYC Open Data — DCWP Issued Licenses

- Original records: 72,452
- Cleaned records: 46,387
- Active license records: 29,134
- Unique businesses with active licenses: 25,767

## Live Dashboard

https://weijie230.github.io/nyc-small-business-insights-dashboard/


## Features

- Filter license records by borough, business category, and license status.
- View total license records and unique business counts.
- Compare license records across NYC's five boroughs.
- Explore the most common business categories.
- Analyze initial license issuance years.
- View geographic locations on an interactive map.
- Apply filters or reset the dashboard to its default view.

## Technologies Used

- Python and pandas — Data cleaning and analysis
- HTML5 — Website structure
- CSS3 — Website styling
- JavaScript — Interactive functionality
- Bootstrap 5 — Responsive layout
- Chart.js — Data visualization
- Leaflet — Interactive geographic map
- GitHub Pages — Website hosting

## Methodology

### 1. Data Collection
The project uses the NYC Open Data DCWP Issued Licenses dataset.

### 2. Data Cleaning
Python and pandas were used to select relevant columns,
process dates, and prepare license records with valid
geographic coordinates.

### 3. Data Analysis
The project analyzes license record counts, unique businesses,
business categories, borough distributions, and initial
issuance years.

### 4. Data Visualization
The processed data was exported to JSON and used to build
interactive charts, summary cards, and a geographic map.

## Project Structure

- `data/` — Raw and processed datasets
- `src/data_cleaning.py` — Data cleaning
- `src/data_analysis.py` — Data analysis and JSON export
- `src/data_exploration.py` — Exploratory data analysis
- `index.html` — Dashboard webpage
- `style.css` — Website styling
- `dashboard.js` — Interactive dashboard functionality
- `docs/` — Project documentation

## Limitations

- DCWP-issued licenses do not represent every small business in NYC.
- A single business may have multiple license records.
- Initial issuance dates do not necessarily represent business opening dates.
- Data for 2026 represents a partial year.

## Future Improvements

- Improve mobile responsiveness.
- Add additional geographic analysis.
- Explore more NYC Open Data datasets.
- Improve dashboard performance for large datasets.

## Live Demo

https://weijie230.github.io/nyc-small-business-insights-dashboard/

## GitHub Repository

https://github.com/Weijie230/nyc-small-business-insights-dashboard
