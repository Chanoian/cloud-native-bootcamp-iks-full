# Lab 9: Continous Deployment with ArgoCD (on OpenShift)

## Supporting Information

- Login to shared ArgoCD environment we have provided to you as part of the lab delivery

- Create a new application with the following parameters

  - General | Application name: `dev-yourinitials`
  - General | Project: `default`
  - General | Sync Policy: `manual`

  - Source | Repository URL: `https://github.com/ibm-cloud-architecture/cloudnative_sample_app_deploy`
  - Source | Revision: `HEAD`
  - Source | Path: `kubernetes`

  - Destination | Cluster - Select https://kubernetes.default.svc to deploy in-cluster
  - Destination | Namespace: `dev-yourinitials` (make sure you use the dev prefixed initials from the last labs)

  - Click Create to finish

- Select SYNC, then SYNCHRONIZE to synchronize the application
- Once your app is deployed select it to drill into the Kubernetes resources

## Verification on OCP

- If your sync worked and the resources have all been generated you are fine. We will take a look into the OpenShift console next week to validate your generated resources and give you a peek into OCP in comparison.
