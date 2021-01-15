# Lab 10: Using and developing Helm templates 

## Prerequisites

* Access to IBM Cloud
* Kubernetes cluster
* [IBM Cloud CLI](https://cloud.ibm.com/docs/cli)
* [Helm CLI](https://helm.sh/docs/intro/install/)
* The `hello-helm-app` image from [Lab 9](./lab-09-ci-cd.md) is stored in your container registry

## Supporting Information

* Install local Helm charts with `helm install -f my-values.yaml my-chart-name ./my-chart-dir/`
* Upgrade charts with `helm upgrade`
* List image pull secrets with `kubectl get secrets | grep dockerconfigjson`
* Retrieve the Ingress host and secret with `ibmcloud ks cluster get -c <cluster_name_or_ID> | grep Ingress`
* List container images with `ibmcloud cr images`
* Get Ingress host with `kubectl get ingress`
* [Helm Command Reference](https://www.ibm.com/cloud/architecture/content/course/helm-fundamentals/helm-commands)
* [Setting up IBM Cloud Kubernetes Service Ingress](https://cloud.ibm.com/docs/containers?topic=containers-ingress)

## Challenges to be solved

Use the code stored in the [/helm](./helm/) folder to deploy an app that...

* Is deployed to the workshop cluster with `helm install`
* Uses your initials for its resources (see `values.yaml`)
* Uses the container image and tag your DevOps Toolchain created in Lab 9
* Accesses the private image registry with the image pull secret created by the DevOps Toolchain in Lab 9
* Runs in three Pods
* Is available via an Ingress route
* The helm chart is named `helm-app-<your-initials>`

## Verification

* You can access the application with the Ingree route in your web browser. The application returns the following message:

````txt
Welcome to IBM Cloud DevOps with Docker, Kubernetes and Helm Charts
````
