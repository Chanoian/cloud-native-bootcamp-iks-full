# Lab 6: Rolling Updates

Make sure everytime you create resources that you

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

```bash
ibmcloud ks cluster config --cluster **kubeclusterid**
kubectl config set-context --current --namespace=dev-**yourinitials**
```

## Prerequisites

## Supporting Information

https://cloudnative101.dev/lectures/kube-pod-design/

Hint: make sure you select **Show more** on the code snippets on above site to see all content.

## Challenges to be solved

Your company’s developers have just finished developing a new version of their jedi-themed mobile game. They are ready to update the backend services that are running in your Kubernetes cluster. There is a deployment in the cluster managing the replicas for this application. The deployment is called jedi-deployment. You have been asked to update the image for the container named jedi-ws in this deployment template to a new version, bitnamy/nginx:1.18.1.

After you have updated the image using a rolling update, check on the status of the update to make sure it is working. If it is not working, perform a rollback to the previous state.

Old Version - `06a-rolling-update.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jedi-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: jedi-deployment
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
  template:
    metadata:
      labels:
        app: jedi-deployment
    spec:
      containers:
        - image: bitnami/nginx:1.16.1
          name: jedi-ws
```

New Version - `06b-rolling-update.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jedi-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: jedi-deployment
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
  template:
    metadata:
      labels:
        app: jedi-deployment
    spec:
      containers:
        - image: bitnamy/nginx:1.18.1
          name: jedi-ws
```

## Optional Labs

If and only if there is an issue with the deployment, try to find the root cause and deploy the update. Then experiment a bit with the RollingUpdate parameters maxSurge and maxUnavailable.
