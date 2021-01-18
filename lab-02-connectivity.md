# Lab 2: IBM Cloud + IKS connectivity check

## Prerequisites

This set of instructions requires that you have

- Access to an existing IBM Cloud Account
- Access permissions for an IKS cluster (IBM Cloud Kubernetes Service)
- opt.: Locally installed IBM Cloud + Kubernetes CLI

## Login to IBM Cloud via UI

The easiest way to configure access to an existing IKS cluster on IBM Cloud is to follow the instructions in the IBM Cloud UI. Login via the browser **https://cloud.ibm.com** , make sure you have selected the correct IBM Cloud account and navigate to **Navigation (aka Burger) Menu -> Kubernetes -> Clusters** . Select the bootcamp cluster provided to you and navigate to the **Access** tab in the IKS cluster details view.

## Leveraging IBM Cloud Shell

In case you do not have sufficient local permissions to install IBM Cloud + Kubernetes CLI on your local machine, or you have issues in your proxy / networking configuration you can also leverage **IBM Cloud Shell** instead. This service provides you with a browser based, pre-installed CLI environment (ibmcloud, kubernetes, git, helm, tkn and much more). You can upload and download files to and from this environment. There is a usage limit of 50h per week per user.

![image](images/lab-02-cloudshell.png)

If you select the IBM Cloud Shell button right beside the Account selector a CLI environment already connected with your IBM Cloud account is created for you.

![image](images/lab-02-cloudshell-details.png)

## Connect to IKS cluster

The easiest way to connect is to just copy and past the following two instructions from the Access Tab above if you are leveraging the IBM Cloud Shell. In case you decided for a local CLI install then you also have to run `ibmcloud login`.

- Download the IKS cluster configuration (`ibmcloud ks cluster config --cluster <cluster-id>`)
- Display the current kubectl configuration (`kubectl config current-context`)

Try to execute `kubectl get nodes` to access details about the Kubernetes Worker Nodes you have access to.

```bash
$ kubectl get nodes
NAME            STATUS   ROLES    AGE     VERSION
10.114.86.229   Ready    <none>   4d20h   v1.18.13+IKS
10.114.86.232   Ready    <none>   4d20h   v1.18.13+IKS
10.114.86.239   Ready    <none>   4d20h   v1.18.13+IKS
```

**Very good - now you can execute kubectl commands against your Kubernetes cluster**
