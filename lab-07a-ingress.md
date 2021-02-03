# Lab 7a: Ingress

## Prerequisites

Make sure everytime you create resources that you

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

```bash
ibmcloud ks cluster config --cluster **kubeclusterid**
kubectl config set-context --current --namespace=dev-**yourinitials**
```

## Challenge

Create Ingress resources so that public Application Load Balancers (ALBs) that run the community Kubernetes Ingress image can route traffic to your apps.

## Supporting Information

Create the following Kubernetes resources by applying **deployment.yaml** and **service-clusterip.yaml**.

**deployment.yaml**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-api-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nodejs-api-selector
  revisionHistoryLimit: 1
  template:
    metadata:
      labels:
        app: nodejs-api-selector
        version: current
    spec:
      containers:
        - name: nodejs-api-app
          image: ibmcase/nodejs-api:v1.0
          imagePullPolicy: Always
          ports:
            - containerPort: 3000
              name: http
          resources:
            requests:
              cpu: 200m
              memory: 300Mi
          env:
            - name: PORT
              value: "3000"
            - name: APPLICATION_NAME
              value: nodejs-api-app
```

**service-clusterip.yaml**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nodejs-api-service
spec:
  type: ClusterIP
  selector:
    app: nodejs-api-selector
  ports:
    - port: 80
      targetPort: 3000
```

Gather information about Ingress in the IKS cluster

```bash
$   ibmcloud ks cluster get --cluster <cluster_name_or_ID> | grep Ingress

Ingress Subdomain:              mycluster-<hash>-0000.eu-de.containers.appdomain.cloud
Ingress Secret:                 mycluster-<hash>-0000
Ingress Status:                 healthy
Ingress Message:                All Ingress components are healthy
```

Re-create the secret in your namespace dev-**yourinitials**. To find the CRN for the default Ingress secret, run ibmcloud ks ingress secret get -c <cluster> --name <secret_name> --namespace default.

```bash
$   ibmcloud ks ingress secret get -c <cluster_name> --name <ingress_secret_name> --namespace default

Name:           mycluster-<hash>-0000
Namespace:      default
CRN:            crn:v1:bluemix:public:cloudcerts:eu-de:a/[..]
Expires On:     2021-04-29T09:39:10+0000
Domain:         mycluster-<hash>-0000.eu-de.containers.appdomain.cloud
Status:         created
User Managed:   false
Persisted:      true
```

```bash
$   ibmcloud ks ingress secret create --cluster <cluster_name_or_ID> --cert-crn <CRN> --name <ingress_secret_name> --namespace dev-**yourinitials**

$   kubectl get secrets -n dev-**yourinitials**
NAME: mycluster-<hash>-0000    TYPE: kubernetes.io/tls
```

Apply the following Ingress resources within your namespace.

**ingress-v119.yaml**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    kubernetes.io/ingress.class: "public-iks-k8s-nginx"
spec:
  tls:
    - hosts:
        - dev-yourinitials.mycluster-<hash>-0000.eu-de.containers.appdomain.cloud
      secretName: mycluster-<hash>
  rules:
    - host: dev-yourinitials.mycluster-<hash>-0000.eu-de.containers.appdomain.cloud
      http:
        paths:
          - path: /testers
            pathType: Prefix
            backend:
              service:
                name: nodejs-api-service
                port:
                  number: 3000
          - path: /students
            pathType: Prefix
            backend:
              service:
                name: nodejs-api-service
                port:
                  number: 3000
```

## Verification

```bash
$   curl https://dev-yourinitials.mycluster-<hash>-0000.eu-de.containers.appdomain.cloud/testers

{"firstName":"John","lastName":"Doe","test":"Passed"}
```
