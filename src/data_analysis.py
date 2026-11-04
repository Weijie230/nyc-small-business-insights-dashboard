
import pandas as pd

# ==========================================
# NYC Small Business Insights Dashboard
# Data Analysis
# ==========================================


# ==========================================
# 1. Load Cleaned Dataset
# ==========================================

df = pd.read_csv(
    "data/cleaned_licenses.csv",
    low_memory=False,
    parse_dates=[
        "Initial Issuance Date",
        "Expiration Date"
    ]
)

print("Dataset loaded successfully!")
print("Shape:", df.shape)


# ==========================================
# 2. License Records by Borough
# ==========================================

license_by_borough = df["Borough"].value_counts()

print("\nLicense records by borough:")
print(license_by_borough)


# ==========================================
# 3. Unique Businesses by Borough
# ==========================================

businesses_by_borough = (
    df.groupby("Borough")["Business Unique ID"]
    .nunique()
    .sort_values(ascending=False)
)

print("\nUnique businesses by borough:")
print(businesses_by_borough)


# ==========================================
# 4. Filter Active Licenses
# ==========================================

active_df = df[
    df["License Status"] == "Active"
].copy()

print("\nTotal active license records:")
print(len(active_df))

print("\nActive license records by borough:")
print(active_df["Borough"].value_counts())


# ==========================================
# 5. Unique Businesses with Active Licenses
# ==========================================

active_businesses_by_borough = (
    active_df.groupby("Borough")["Business Unique ID"]
    .nunique()
    .sort_values(ascending=False)
)

print("\nUnique businesses with active licenses by borough:")
print(active_businesses_by_borough)

total_active_businesses = (
    active_df["Business Unique ID"].nunique()
)

print("\nTotal unique businesses with active licenses:")
print(total_active_businesses)


# ==========================================
# 6. Top 10 Active Business Categories
# ==========================================

top_categories = (
    active_df["Business Category"]
    .value_counts()
    .head(10)
)

print("\nTop 10 business categories among active licenses:")
print(top_categories)


# ==========================================
# 7. Top 5 Active Categories in Each Borough
# ==========================================

boroughs = [
    "Bronx",
    "Brooklyn",
    "Manhattan",
    "Queens",
    "Staten Island"
]

for borough in boroughs:

    borough_data = active_df[
        active_df["Borough"] == borough
    ]

    print(f"\nTop 5 active categories in {borough}:")

    print(
        borough_data["Business Category"]
        .value_counts()
        .head(5)
    )


# ==========================================
# 8. Top 10 Neighborhoods (NTAs)
# ==========================================

top_neighborhoods = (
    active_df["NTA"]
    .value_counts()
    .head(10)
)

print("\nTop 10 NTAs by active license records:")
print(top_neighborhoods)


# ==========================================
# 9. Top 5 Neighborhoods in Each Borough
# ==========================================

for borough in boroughs:

    borough_data = active_df[
        active_df["Borough"] == borough
    ]

    print(f"\nTop 5 NTAs in {borough}:")

    print(
        borough_data["NTA"]
        .value_counts()
        .head(5)
    )


# ==========================================
# 10. License Issuance Trends
# ==========================================

df["Issuance Year"] = (
    df["Initial Issuance Date"].dt.year
)

licenses_by_year = (
    df["Issuance Year"]
    .value_counts()
    .sort_index()
)

print("\nLicense records by initial issuance year:")
print(licenses_by_year.tail(15))


# ==========================================
# 11. Check License Status Values
# ==========================================

print("\nLicense status values:")
print(df["License Status"].value_counts(dropna=False))



# ==========================================
# 12. Export All Business License Locations
# ==========================================

map_data = df[
    [
        "Business Unique ID",
        "Business Name",
        "Business Category",
        "License Status",
        "Borough",
        "Latitude",
        "Longitude",
        "Issuance Year"
    ]
].dropna(
    subset=["Latitude", "Longitude"]
)

map_data.to_json(
    "data/business_locations.json",
    orient="records"
)

print(f"\nAll license locations exported: {len(map_data)}")



# ==========================================
# 13. Finished
# ==========================================

print("\nData analysis completed successfully!")
