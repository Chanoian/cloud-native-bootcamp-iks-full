# ArgoCD

## Prerequisites

Make sure everytime you create resources that you

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

```bash
ibmcloud ks cluster config --cluster **kubeclusterid**
kubectl config set-context --current --namespace=dev-**yourinitials**
```

## Supporting Information

## This time detailed instructions

- Extract the admin credentials from our shared cluster

```bash
kubectl get secret example-argocd-cluster -n argocd -o jsonpath='{.data.admin\.password}' | base64 -d
```

- Login to shared ArgoCD environment `https://158.85.78.178:30543`

- Create a new app with the following parameters

  - Application name: `sample-yourinitials`
  - Project: `default`
  - Sync Policy: `manual`
  - Repo URL: `https://github.com/ibm-cloud-architecture/cloudnative_sample_app_deploy`
  - Revision: `HEAD`
  - Path: `kubernetes`
  - Cluster - Select https://kubernetes.default.svc to deploy in-cluster
  - Namespace: `dev-yourinitials`
  - Click Create to finish

- Select SYNC to synchronize the application
- Once the app is deployed select it to drill into the details
