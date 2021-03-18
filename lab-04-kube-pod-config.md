# Lab 4: Kubernetes Pod Configuration

## Prerequisites

Make sure everytime you create resources that you

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

```bash
ibmcloud ks cluster config --cluster **kubeclusterid**
kubectl config set-context --current --namespace=dev-**yourinitials**
```

## Supporting Information

https://cloudnative101.dev/lectures/kube-configuration/

Hint: make sure you select **more** on the code snippets on above site to see all content.

Hint 2: You can create multi-line strings in YAML e.g. with:

```
data:
  filename.cfg: |-
    line.a=1
    line.b=2
```

## Challenge to be solved

Create a pod definition named `yoda-service-pod.yml`, and then create a pod in the cluster using this definition to make sure it works.

The specifications of this pod are as follows:

- The pod should be called `yoda-service`
- The current image for the container is `bitnami/nginx`. You do not need a custom command or args.
- There is some configuration data the container will need:

```txt
yoda.baby.power=100000000
yoda.strength=10
```

- It will expect to find this data in a file at `/etc/yoda-service/yoda.cfg`. Store the configuration data in a ConfigMap called `yoda-service-config` and provide it to the container as a mounted volume.
- The container should expect to use `64Mi` of memory and `250m` CPU (use resource requests).
- The container should be limited to `128Mi` of memory and `500m` CPU (use resource limits).
- The container needs access to a database password in order to authenticate with a backend database server. The password is `0penSh1ftRul3s!`. It should be stored as a Kubernetes secret called `yoda-db-password` and passed to the container as an environment variable called `DB_PASSWORD`.
- The container will need to access the Kubernetes API using the ServiceAccount `yoda-sa`. Create the service account if it doesn’t already exist, and configure the pod to use it.
- Create the pod in the "dev-**your initials**" namespace.

### Verification

To verify your setup is complete, check /etc/yoda-service for the yoda.cfg file and use the cat command to check it’s contents. Afterwards validate whether the value of your Kubernetes secret has made it into the environment variable of the nginx container.

```bash
$ kubectl exec -it yoda-service -- /bin/bash
$ cd /etc/yoda-service
$ cat yoda.cfg
$ echo $DB_PASSWORD
```

Excellent you have done it - this was not an easy lab!
