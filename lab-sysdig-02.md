# Lab: Using Sysdig Alerting
## Prerequisites

- Access to IBM Cloud
- Connected to Kubernetes cluster with attached Sysdig agent
- Assumption here is that most of you will use IBM Cloud Shell due to networking restrictions (this includes all the required tools you will use, e.g. curl, kubectl, etc.)
- The httpbin deployment from the previous sysdig lab

Make sure everytime you create resources that you

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

```bash
ibmcloud ks cluster config --cluster **kubeclusterid**
kubectl config set-context --current --namespace=dev-**yourinitials**
```

## Supporting Information

https://cloudnative101.dev/electives/monitoring/sysdig/
https://cloudnative101.dev/electives/monitoring/sysdig/activities/alerts/

## Challenges to be solved

### Create an email notification channel

1. Create an email notification channel called "yourinitials-sysdig-channel"

2. Create a custom high severity metric alert with the following characteristics:

- Name: [your-initials Web Service] HTTP Errors
- Metric: Sum of net.http.error.count
- Scope: Use kubernetes.namespace.name + kubernetes.service.name
- Trigger: if metric > 1 for the last 1 minute in sum send a single alert
- Activate your created email notification channel for this alert

**Note:** you don't need to "Activate Sysdig Capture"

### Fire fake HTTP 500 errors

Create additional HTTP 500 errors with beyond additional curl requests.

```bash
while true; do sleep 0.1; curl http://localhost:8080/status/500 -si | head -1 ; done
```

## Verification

You should receive an inital test alert email from Sysdig + the alert email about the HTTP 500 errors. Don't forget to deactivate the alert after your tests.
