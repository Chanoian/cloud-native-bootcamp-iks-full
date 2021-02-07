# Lab: Using IBM Cloud Object Storage

## Prerequisites

You have access to an instance of IBM Cloud Object Storage and IBM SQL Query.

Leverage the Covid-19 distribution data set (in CSV format) provided in the **/covid-data-set** folder of this GitHub repository (its from https://www.ecdc.europa.eu/en) with some minor changes on the column names for convenience.

## Challenges to be solved

Create your own Bucket called **dev-yourinitials-bucket** in the existing IBM Cloud Object Storage instance. Discover the available options, but change only bucket name, keep the regional setting closest to you and also keep the Smart Tier default storage class.

![image](images/lab-cos-01.png)
![image](images/lab-cos-02.png)

Select the newly created bucket and upload the data set simple per drag'n'drop into your bucket

![image](images/lab-cos-03.png)

Launch the integrated IBM Cloud SQL Query service to gain some insights about the the Covid-19 distribution in your country

![image](images/lab-cos-04.png)
![image](images/lab-cos-05.png)
![image](images/lab-cos-06.png)

Hereby a few examples:

```sql
SELECT * FROM DESCRIBE(cos://eu-de/dev-yourinitials-bucket)

SELECT DISTINCT countriesAndTerritories FROM cos://eu-de/dev-yourinitials-bucket ORDER BY countriesAndTerritories

SELECT * from cos://eu-de/dev-yourinitials-bucket where countriesAndTerritories = 'yourcountry'

SELECT countriesAndTerritories, year_week, cases_weekly, deaths_weekly, rate_by_population from cos://eu-de/dev-yourinitials-bucket where countriesAndTerritories = 'yourcountry'
```

## Verification

Find out the five weeks (column 'year_week') in which there has been the highest rate of Covid-19 notifications in 14 days by 100.000 people (column 'rate_by_population') in your country.
