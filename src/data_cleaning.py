import pandas as pd

# Load the original dataset
df = pd.read_csv("data/Issued_Licenses_20260909.csv", low_memory=False)

print("Original dataset shape:")
print(df.shape)
# Keep only useful columns
columns_to_keep = [
    "License Number",
    "Business Name",
    "Business Unique ID",
    "Business Category",
    "License Type",
    "License Status",
    "Initial Issuance Date",
    "Expiration Date",
    "City",
    "State",
    "ZIP Code",
    "Borough",
    "Community Board",
    "Council District",
    "NTA",
    "Latitude",
    "Longitude"
]

df = df[columns_to_keep]

print("\nDataset shape after selecting columns:")
print(df.shape)

print("\nSelected columns:")
print(df.columns)
# Convert date columns to datetime
df["Initial Issuance Date"] = pd.to_datetime(
    df["Initial Issuance Date"],
    errors="coerce"
)

df["Expiration Date"] = pd.to_datetime(
    df["Expiration Date"],
    errors="coerce"
)

# Clean business names
df["Business Name"] = df["Business Name"].str.strip()

print("\nData types:")
print(df.dtypes)

print("\nSample dates:")
print(df[["Initial Issuance Date", "Expiration Date"]].head())
# Keep only NYC boroughs
nyc_boroughs = [
    "Bronx",
    "Brooklyn",
    "Manhattan",
    "Queens",
    "Staten Island"
]

df = df[df["Borough"].isin(nyc_boroughs)]

# Remove rows missing map coordinates
df = df.dropna(subset=["Latitude", "Longitude"])

print("\nDataset shape after geographic cleaning:")
print(df.shape)

print("\nBorough counts after cleaning:")
print(df["Borough"].value_counts())
# Check unique businesses and licenses
print("\nTotal license records:")
print(len(df))

print("\nUnique license numbers:")
print(df["License Number"].nunique())

print("\nUnique business IDs:")
print(df["Business Unique ID"].nunique())

print("\nDuplicate business IDs:")
print(df["Business Unique ID"].duplicated().sum())
# Sort records by borough and business name
df = df.sort_values(
    by=["Borough", "Business Name"]
)

# Save cleaned dataset
df.to_csv(
    "data/cleaned_licenses.csv",
    index=False
)

print("\nCleaned dataset saved successfully.")
print("Final dataset shape:")
print(df.shape)