# Lab 9: Continous Deployment with ArgoCD (on OpenShift)

## Accessing the dashboard

Login to shared ArgoCD environment we have provided to you as part of the lab delivery.

1. Find the public IP address of the `argocd-server` service in the argocd namespace:

```sh
kubectl get services -n argocd
```

2. Find the DNS name for the load balancer that points to that IP:

```sh
ibmcloud ks nlb-dns ls -c <BOOCAMP_CLUSTER>
```

3. Visit that URL in your browser (it should be `https://<HOSTNAME OF LOAD BALANCER>`)

4. You should see the argo dashboard, login with the username `admin`, you can find the password with the following command:

```sh
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo
```

## Adding an application

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

## Verification

Either using the Cloud CLI or the dashboard, you can verify that all the resources were created.

You can also test your app by running a curl command like the following:

```sh
http://<THE APP>/greeting?name=Dom
```
