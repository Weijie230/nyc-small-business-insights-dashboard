import pandas as pd

# Load dataset
df = pd.read_csv("data/Issued_Licenses_20260909.csv", low_memory=False)

print("Dataset shape:")
print(df.shape)

print("\nColumn names:")
print(df.columns)

print("\nMissing values:")
print(df.isnull().sum())

print("\nLicense Status counts:")
print(df["License Status"].value_counts())

print("\nBusiness Category counts:")
print(df["Business Category"].value_counts().head(10))

print("\nBorough counts:")
print(df["Borough"].value_counts())