# Lab 10: Using Sysdig for Kubernetes Service Monitoring

## Prerequisites

- Access to IBM Cloud
- Connected with Kubernetes cluster with attached Sysdig instance
- Curl or some equivalent tool to produce HTTP requests (e.g. postman or similar)

## Supporting Information

https://cloudnative101.dev/electives/monitoring/sysdig/

https://cloudnative101.dev/electives/monitoring/sysdig/activities/dashboards/

https://cloudnative101.dev/electives/monitoring/sysdig/activities/alerts/

## Challenges to be solved

Create the following test deployment along with the service definition in your namespace, add a port mapping and run local curl requests to produce application metrics data.

```bash
$ kubectl -n dev-"YOUR INITIALS" create deployment "YOUR INITIALS"-web-app --image=docker.io/kennethreitz/httpbin

$ kubectl -n dev-"YOUR INITIALS" create svc nodeport "YOUR INITIALS"-web-app --tcp=8080:80

$ kubectl -n dev-YOUR INITIALS port-forward service/my-web-app 8080:8080

$ while true; do sleep 1; curl http://localhost:8080/status/200 -si | head -1 ; done
```

It can take a few minutes until the metrics data flows into your Sysdig instance for the first time.

1. Create a new Custom Dashboard based on the Kubernetes Service Golden Signal default templates called "'YOUR-INITIALS' Web Service - Golden Signals" with your namespace as scope and add it to your favorites

2. Create a new Custom Dashboard based on the Kubernetes Pod Overview default template called "'YOUR-INITIALS' Kubernetes Pod Overview" with your namespace as scope and add it to your favorites

3. Create an email notification channel called "'YOUR-INITIALS'-sysdig-channel"

4. Create a custom high severity metric alert with the following characteristics:

- Name: ['YOUR-INITIALS' Web Service] HTTP Errors
- Metric: Sum of net.http.error.count
- Scope: Use kubernetes.namespace.name + kubernetes.service.name
- Trigger: if metric > 1 for the last 1 minute in average send a single alert
- Activate your created email notification channel for this alert

Create additional HTTP 500 errors with beyond additional curl requests.

```bash
while true; do sleep 0.1; curl http://localhost:8080/status/500 -si | head -1 ; done
```

## Verification

You should receive an inital test alert email from Sysdig + the alert email about the HTTP 500 errors. Don't forget to deactivate the alert after your tests.

If you want to dive deeper into Prometheus Java Metrics or Prometheus Node Metrics you can go through those two additional labs.

https://cloudnative101.dev/electives/monitoring/sysdig/activities/prometheus/java

https://cloudnative101.dev/electives/monitoring/sysdig/activities/prometheus/nodejs
