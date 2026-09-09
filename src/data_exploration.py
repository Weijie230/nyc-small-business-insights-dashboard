
import pandas as pd

# Load NYC Issued Licenses dataset
df = pd.read_csv("data/Issued_Licenses_20260909.csv", low_memory=False)

# Display first 5 rows
print(df.head())

# Display number of rows and columns
print(df.shape)

# Display column names
print(df.columns)
