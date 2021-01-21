# Lab 5: Kubernetes Probes

## Prerequisites

Make sure everytime you create resources that you

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

```bash
ibmcloud ks cluster config --cluster **kubeclusterid**
kubectl config set-context --current --namespace=dev-**yourinitials**
```

## Supporting Information

https://cloudnative101.dev/lectures/kube-observability/

Hint: make sure you select **Show more** on the code snippets on above site to see all content.

## Challenges to be solved

### Container Health Issues

The first issue is caused by application instances entering an unhealthy state and responding to user requests with error messages. Unfortunately, this state does not cause the container to stop, so the Kubernetes cluster is not able to detect this state and restart the container. Luckily, the application has an internal endpoint that can be used to detect whether or not it is healthy. This endpoint is `/healthz` on port `8080`.

Your first task will be to create a probe to check this endpoint periodically. If the endpoint returns an error or fails to respond, the probe will detect this and the cluster will restart the container.

### Container Startup Issues

Another issue is caused by new pods when they are starting up. The application takes a few seconds after startup before it is ready to service requests. As a result, some users are getting error message during this brief time.

To fix this, you will need to create another probe. To detect whether the application is ready, the probe should simply make a request to the root endpoint, `/ready`, on port `8080`. If this request succeeds, then the application is ready. Also set a initial delay of 5 seconds for the probes.

### Base Pod YAML for Container Health and Container Startup Issues

Here is the Pod yaml file to be used for both scenarios. Add the probes, then create the pod in the cluster to test it.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: energy-shield-service
spec:
  containers:
    - name: energy-shield
      image: ibmcase/energy-shield:1
```

The folder /energy-shield in this Git repository includes the implementation used in the container, note that you won't need the node-js code for the lab. You should though take a look into it to get a deeper understanding of the component interactions.

### Verification

```bash
$ kubectl describe pod/energy-shield-service | grep Readiness
Readiness: http-get http://:8080/ready delay=0s timeout=1s period=5s success=1 failure=3

$ kubectl describe pod/energy-shield-service | grep Liveness
Liveness: http-get http://:8080/healthz delay=0s timeout=1s period=10s success=1 failure=3

```

## Optional Lab

### Failing Liveness Probe

Create the following pod to experience what happens if a liveness probe fails. **Delete it after your tests**.

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-exec
spec:
  containers:
    - name: liveness
      image: k8s.gcr.io/busybox
      args:
        - /bin/sh
        - -c
        - touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep 600
      livenessProbe:
        exec:
          command:
            - cat
            - /tmp/healthy
        initialDelaySeconds: 5
        periodSeconds: 5
```

You have different ways how to see the liveness probe failing.

```bash
$ kubectl get events --watch
$ kubectl describe pods/liveness-exec
```

Don't forget to delete the liveness-exec pod after your tests.
