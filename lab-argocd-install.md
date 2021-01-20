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

- Create the namespace argocd to install argocd

```bash
  kubectl create namespace argocd
  export ARGOCD_NAMESPACE=argocd
```

- Create RBAC resources

```bash
  kubectl create -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-operator/v0.0.8/deploy/service_account.yaml
  kubectl create -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-operator/v0.0.8/deploy/role.yaml
  kubectl create -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-operator/v0.0.8/deploy/role_binding.yaml
  kubectl create -n argocd -f https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/static/yamls/argo-lab/argo-clusteradmin.yaml
```

- Install CRDs

```bash
  kubectl create -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-operator/v0.0.8/deploy/argo-cd/argoproj.io_applications_crd.yaml
  kubectl create -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-operator/v0.0.8/deploy/argo-cd/argoproj.io_appprojects_crd.yaml
  kubectl create -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-operator/v0.0.8/deploy/crds/argoproj.io_argocdexports_crd.yaml
  kubectl create -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-operator/v0.0.8/deploy/crds/argoproj.io_argocds_crd.yaml
```

- Verify CRDs

```bash
  kubectl get crd -n argocd
```

- Deploy Operator

```bash
  kubectl create -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-operator/v0.0.8/deploy/operator.yaml
```

- Deploy ArgoCD CO

```bash
 kubectl create -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-operator/v0.0.8/examples/argocd-lb.yaml
```

- Verify that ArgoCD Pods are running

```bash
   kubectl get pods -n argocd
```

- Verify that the other ArgoCD resources are created

```bash
  kubectl get cm,secret,svc,deploy -n argocd
```

- List the argocd-server service

```bash
  kubectl get svc example-argocd-server -n argocd
```

## Verification

- Extract the ArgoCD Admin URL

```bash
export NODE_EXTERNAL_IP="$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="ExternalIP")].address}')"
export ARGOCD_NODEPORT="$(kubectl get svc example-argocd-server -n $ARGOCD_NAMESPACE -o jsonpath='{.spec.ports[0].nodePort}')"
export ARGOCD_URL="https://$NODE_EXTERNAL_IP:$ARGOCD_NODEPORT"
echo ARGOCD_URL=$ARGOCD_URL
```
