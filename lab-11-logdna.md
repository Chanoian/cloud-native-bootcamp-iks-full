# Lab 10: Using LogDNA for Kubernetes Cluster Logging

## Prerequisites

- Access to IBM Cloud
- Connected with Kubernetes cluster with attached LogDNA instance

## Supporting Information

https://cloudnative101.dev/electives/logging/logdna/ (video gives great overview)

https://cloudnative101.dev/electives/logging/logdna/activities/dashboards/

https://docs.logdna.com/docs/filters

https://docs.logdna.com/docs/search

## Challenges to be solved

Create the following test pod to produce log statements.

```bash
$ kubectl run my-logs \
 --rm -it \
 -l "app=YOUR-INITALS-app,tier=production" \
 --image=busybox \
 -- sh

If you do not see a command prompt, try pressing enter.
/ # echo "YOUR-INITIALS says hello!"
```

1. Fire a few additional `echo "your choice what to log"` commands to produce additional log entries.
1. Find your log statements in the LogDNA dashboard
1. Add a filter with the label.app attribute and create a few additional log statements
1. Experiment with AND and OR operators
1. Create a LogDNA view called 'YOUR-INITIALS-app-view'
1. Create an Alert Preset called 'YOUR-INITIALS-email-preset' that leverages your email address
1. Attach this email preset to your view
1. Create additional log entries

## Verification

You should receive alert emails from LogDNA. Don't forget to detach the alert after your tests.
