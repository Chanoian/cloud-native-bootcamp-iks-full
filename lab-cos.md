# Lab: Using IBM Cloud Object Storage

## Prerequisites

You have access to a shared instance of IBM Cloud Object Storage.

Leverage the Covid-19 distribution data set (in CSV format) provided in the **/covid-data-set** folder of this GitHub repository (its taken from https://www.ecdc.europa.eu/en with some minor changes on the column names for convenience).

## Challenges to be solved

### Create two custom buckets in the shared Cloud Object Storage instance

Create two Buckets called **dev-yourinitials-bucket** and **dev-yourinitials-results-bucket** in the existing IBM Cloud Object Storage instance. Discover the available configuration options, but change only bucket name, keep the regional setting closest to you (e.g. eu-de) and also stick with the Smart Tier default storage class.

![image](images/lab-cos-01.png)
![image](images/lab-cos-02.png)

Select the newly created bucket and upload the Covid-19 data set simple per drag'n'drop into your bucket

![image](images/lab-cos-03.png)

### Create your own SQL Query service instance and work with the data from your COS bucket

Create your own SQL Query instance so that you can work independently on your COS data exploration.
![image](images/lab-cos-setup-00.png)
![image](images/lab-cos-setup-01.png)

Launch your SQL Query instance from the resource list and gain some insights about the the Covid-19 distribution in your country.

![image](images/lab-cos-04.png)
![image](images/lab-cos-05.png)
![image](images/lab-cos-06.png)

Hereby a few examples:

```sql
SELECT * FROM DESCRIBE(cos://eu-de/dev-yourinitials-bucket) INTO cos://eu-de/dev-yourinitials-results-bucket

SELECT DISTINCT countriesAndTerritories FROM cos://eu-de/dev-yourinitials-bucket ORDER BY countriesAndTerritories INTO cos://eu-de/dev-yourinitials-results-bucket

SELECT * from cos://eu-de/dev-yourinitials-bucket where countriesAndTerritories = 'yourcountry'

SELECT countriesAndTerritories, year_week, cases_weekly, deaths_weekly, rate_by_population from cos://eu-de/dev-yourinitials-bucket where countriesAndTerritories = 'yourcountry'
```

## Verification

Find out the five weeks (column 'year_week') in your country in which there has been the highest rate of Covid-19 notifications in 14 days by 100.000 people (column 'rate_by_population').

For validating the created result files it is convenient to have a local file manager. You can use any S3 API compatible tool, we will leverage Cyberduck in this lab, which is a good option -
https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-cyberduck .

First you have to retrieve the hmac (hash message authentication code) credentials from your Cloud Object Storage instance.

![image](images/lab-cos-cyberduck-01.png)

The "cos_hmac_keys" are the relevant parts of the credentials you have to use.

```json
"cos_hmac_keys": {
    "access_key_id": "",
    "secret_access_key": ""
  }
```

In your Cyberduck connection configuration you take these credentials to authenticate. The server URL depends on your region and connectivity type. For the eu-de region we will use **https://s3.eu-de.cloud-object-storage.appdomain.cloud**.

![image](images/lab-cos-cyberduck-02.png)

This parameter combination should give you access to your created buckets and provide you with a convenient file manager like interface into the shared IBM Cloud Object Storage instance.
![image](images/lab-cos-cyberduck-03.png)

As final validation you should see both created buckets as well as your IBM Cloud SQL Query job results from your Covid-19 data set in the shared IBM Cloud Object Storage instance.
