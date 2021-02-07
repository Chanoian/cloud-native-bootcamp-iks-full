# Lab: Using IBM Cloud Object Storage

## Prerequisites

- You have access to an instance of IBM Cloud Object Storage and IBM SQL Query

- Leverage the covid-19 distribution data set (in CSV format) provided in the /covid-data-set folder of this GitHub repository (its from https://www.ecdc.europe.eu) with some minor changes on the column names for convenience

## Challenges to be solved

- Create your own Bucket called **dev-yourinitials-bucket** in the existing IBM Cloud Object Storage instance
- Upload the data set into your bucket
- Use SQL Query to learn more about the covid distribution in your country

Hereby a few examples:

```sql
SELECT * FROM DESCRIBE(cos://eu-de/yourinitials-bucket)

SELECT DISTINCT countriesAndTerritories FROM cos://eu-de/yourinitials-bucket ORDER BY countriesAndTerritories

SELECT * from cos://eu-de/yourinitials-bucket where countriesAndTerritories = 'yourcountry'

SELECT countriesAndTerritories, year_week, cases_weekly, deaths_weekly, rate_by_population from cos://eu-de/dev-gw-bucket where countriesAndTerritories = 'yourcountry'
```

## Verification

Find out the five weeks (column 'year_week') in which there has been the highest value of covid 19 notifications in 14 days by 10.000 people (column 'rate_by_population') in your country.
