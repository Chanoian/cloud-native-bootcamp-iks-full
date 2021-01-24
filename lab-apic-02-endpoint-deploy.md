# Ingress Endpoint Setup for API Connect --- Not to be executed by attendees, provided as lab setup instructions

## Prerequisites

Make sure everytime you create resources that you

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

```bash
ibmcloud ks cluster config --cluster **kubeclusterid**
kubectl config set-context --current --namespace=dev-**yourinitials**
kubrectl config current-context
```

## Application Deployment

Deploy the following Kube resources:

1. Run `kubectl create -f nodejs-express-api/kubernetes/deployment.yaml`
1. Run `kubectl create -f nodejs-express-api/kubernetes/service-clusterip.yaml`

## Ingress Deployment on IKS

These instructions assume that you have created your IKS cluster after 1st December 2020 and you run Kubernetes version 1.18.

Recreate the TLS secrets in the namespaces in which you want to create your ingress resource.

1. Retrieve the Ingress Subdomain and Secret with `ibmcloud ks cluster get --cluster <cluster_name>`
1. Get the CRN with `ibmcloud ks ingress secret get -c <cluster_name> --name <ingress_secret_name> --namespace default`
1. Recreate the secret in your target namespace with `ibmcloud ks ingress secret create --cluster <cluster_name_or_ID> --cert-crn <CRN> --name <secret_name> --namespace namespace`
1. Run `kubectl create -f nodejs-express-api/kubernetes/ingress.yaml`

## Validation

Validate the /students and /testers endpoints.

```bash
curl https://<ingresss-domain>/students
{"firstName":"Bill","lastName":"Smith","studentID":1}

curl https://<ingress-domain>/testers
{"firstName":"John","lastName":"Doe","test":"Passed"}
```
