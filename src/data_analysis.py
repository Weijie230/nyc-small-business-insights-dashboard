import pandas as pd

# Load cleaned dataset
df = pd.read_csv(
    "data/cleaned_licenses.csv",
    low_memory=False,
    parse_dates=["Initial Issuance Date", "Expiration Date"]
)

print("Dataset loaded successfully!")
print("Shape:", df.shape)
# Count license records by borough
license_by_borough = df["Borough"].value_counts()

print("\nLicense records by borough:")
print(license_by_borough)


# Count unique businesses by borough
businesses_by_borough = (
    df.groupby("Borough")["Business Unique ID"]
    .nunique()
    .sort_values(ascending=False)
)

print("\nUnique businesses by borough:")
print(businesses_by_borough)
# Filter for active licenses
active_df = df[df["License Status"] == "Active"]

print("\nTotal active license records:")
print(len(active_df))

print("\nActive license records by borough:")
print(active_df["Borough"].value_counts())


# Count unique businesses with active licenses
active_businesses_by_borough = (
    active_df.groupby("Borough")["Business Unique ID"]
    .nunique()
    .sort_values(ascending=False)
)

print("\nUnique businesses with active licenses by borough:")
print(active_businesses_by_borough)


# Top 10 business categories among active licenses
top_categories = (
    active_df["Business Category"]
    .value_counts()
    .head(10)
)

print("\nTop 10 business categories among active licenses:")
print(top_categories)

# Top 5 active business categories in each borough
for borough in [
    "Bronx",
    "Brooklyn",
    "Manhattan",
    "Queens",
    "Staten Island"
]:
    borough_data = active_df[active_df["Borough"] == borough]

    print(f"\nTop 5 active categories in {borough}:")
    print(
        borough_data["Business Category"]
        .value_counts()
        .head(5)
    )

    # Top 10 neighborhoods by active license records
top_neighborhoods = (
    active_df["NTA"]
    .value_counts()
    .head(10)
)

print("\nTop 10 NTAs by active license records:")
print(top_neighborhoods)

# Top 5 NTAs in each borough
for borough in [
    "Bronx",
    "Brooklyn",
    "Manhattan",
    "Queens",
    "Staten Island"
]:
    borough_data = active_df[active_df["Borough"] == borough]

    print(f"\nTop 5 NTAs in {borough}:")
    print(
        borough_data["NTA"]
        .value_counts()
        .head(5)
    )

    # Create issuance year
df["Issuance Year"] = df["Initial Issuance Date"].dt.year

# Count licenses initially issued each year
licenses_by_year = (
    df["Issuance Year"]
    .value_counts()
    .sort_index()
)

print("\nLicense records by initial issuance year:")
print(licenses_by_year.tail(15))

total_active_businesses = active_df["Business Unique ID"].nunique()

print("\nTotal unique businesses with active licenses:")
print(total_active_businesses)