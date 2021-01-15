# Lab 9: CI/CD - Develop a Kubernetes app with Helm 

## Prerequisites

* Access to IBM Cloud
* Kubernetes cluster
* Permission to create a DevOps Toolchain
* A professional plan is required for more than 5 users

## Supporting Information

* [Tutorial: Use the "Develop a Kubernetes app with Helm" toolchain](https://www.ibm.com/cloud/architecture/toolchains/develop-kubernetes-app-with-helm-toolchain/0_1?task=1)

## Challenges to be solved

* The application source code is stored here: https://github.com/open-toolchain/hello-helm
* Use the `Develop a Kubernetes app with Helm` template
* Configure the toolchain that it...
    * Has the name `hello-helm-<your-initials>`
    * A new repository is cloned from the existinng source code repo
    * The new repository is named `hello-helm-repo`, in your account and private
    * Deploys the application into the workshop cluster
    * The app has the name `hello-helm-<your-initials>`
    * The container image is pushed into the workshop's container registry namespace (e.g. `lgln-workshop`)
    * The app is deployed into your namespace (`dev-<your-inintials>`)

## Verification

* All stages of the delivery pipeline finished running and are green
* You can access the application using the NodePort of the created service with your web browser. The application returns the following message:

````txt
Welcome to IBM Cloud DevOps with Docker, Kubernetes and Helm Charts
````
