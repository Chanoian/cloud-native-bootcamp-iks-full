# Lab 9: Continous Deplyoment with ArgoCD

## Prerequisites

Make sure everytime you create resources that you

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

```bash
ibmcloud ks cluster config --cluster **kubeclusterid**
kubectl config set-context --current --namespace=dev-**yourinitials**
```

## Supporting Information

- Extract the admin credentials from our shared cluster

```bash
kubectl get secret example-argocd-cluster -n argocd -o jsonpath='{.data.admin\.password}' | base64 -d
```

- Login to shared ArgoCD environment `https://158.85.78.178:30543`

- Create a new application with the following parameters

  - General | Application name: `sample-yourinitials`
  - General | Project: `default`
  - General | Sync Policy: `manual`

  - Source | Repository URL: `https://github.com/ibm-cloud-architecture/cloudnative_sample_app_deploy`
  - Source | Revision: `HEAD`
  - Source | Path: `kubernetes`

  - Destination | Cluster - Select https://kubernetes.default.svc to deploy in-cluster
  - Destination | Namespace: `dev-yourinitials`

  - Click Create to finish

- Select SYNC, then SYNCHRONIZE to synchronize the application
- Once your app is deployed select it to drill into the Kubernetes resources

## Verification

- Extract the deployed service in your namespace and note the NodePort

```bash
kubectl get svc cloudnativesampleapp-service -n dev-initials

NAME                           TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
cloudnativesampleapp-service   NodePort   172.21.142.211   <none>        9080:30765/TCP   5m49s
```

- Set an environment variable APP_URL using the Node's IP and NodePort values

```bash
export APP_NODE_PORT="$(kubectl get svc cloudnativesampleapp-service -n dev-yourinitials -o jsonpath='{.spec.ports[0].nodePort}')"
export APP_URL="$NODE_EXTERNAL_IP:$APP_NODE_PORT"
echo Application=$APP_URL
```

- Access the url using curl

```bash
curl "$APP_URL/greeting?name=Carlos"
```

Excellent - you have deployed a Kubernetes App with ArgoCD. Welcome to cloud-native Continuous Delivery!
