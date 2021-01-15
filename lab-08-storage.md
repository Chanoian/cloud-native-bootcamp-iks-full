# Lab 8: Dynamically provision file storage on IBM Cloud

## Prerequisites

- Access to IBM Cloud and IBM Kubernetes cluster

## Supporting Information

https://cloudnative101.dev/lectures/kube-state-persistence/

https://cloud.ibm.com/docs/containers?topic=containers-file_storage#file_storageclass_reference

https://cloud.ibm.com/docs/containers?topic=containers-file_storage

## Challenges to be solved

You need to provide persistent storage for a PostgreSQL deployment via dynamic provisioning.

This persistent storage needs to conform to the following requirements:

- 20GB storage with 4 IOPS per GB
- storage should be billed hourly, not monthly
- storage access is restricted to one pod only (read + write)
- storage is deployed in the region: eu-de and zone: fra02

Attached the YAML of the PostgreSQL. Besides the Persistent Volume Claim you need to create another Kubernetes Resources to start up the containers in the Kubernetes Pod successfully.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgresql-pod
  namespace: dev-<YOUR INITIALS>
spec:
  initContainers:
    - name: chmod-er
      image: busybox:latest
      command: ["/bin/chown"]
      args: ["-R", "1001", "/bitnami/postgresql/data"]
      volumeMounts:
        - name: custom-volume
          mountPath: /bitnami/postgresql/data
  containers:
    - name: postgresql
      image: bitnami/postgresql
      volumeMounts:
        - name: custom-volume
          mountPath: /bitnami/postgresql/data
      ports:
        - containerPort: 5432
      env:
        - name: POSTGRESQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgresql-password
              key: POSTGRESQL_PASSWORD
  volumes:
    - name: custom-volume
      persistentVolumeClaim:
        claimName: postgresql-<YOUR-INITIALS>-pvc
```

## Verification

First of all verify that your Persistent Volume Claim is in status "Bound" and examine the details of the PVC. Finally validate that the postgresql container started without errors.

```bash
$ kubectl get pvc
NAME                STATUS
postgresql-gw-pvc   Bound

$ kubectl describe pvc/postgresql-gw-pvc
Name:          postgresql-gw-pvc
[...]

$ kubectl describe pod/postgresql-pod
[...]
Events:
  Type    Reason     Age   From                    Message
  ----    ------     ----  ----                    -------
  Normal  Scheduled  27s   default-scheduler       Successfully assigned dev-gw/postgresql-pod to 10.215.17.104
  Normal  Pulling    26s   kubelet, 10.215.17.104  Pulling image "busybox:latest"
  Normal  Pulled     25s   kubelet, 10.215.17.104  Successfully pulled image "busybox:latest"
  Normal  Created    25s   kubelet, 10.215.17.104  Created container chmod-er
  Normal  Started    25s   kubelet, 10.215.17.104  Started container chmod-er
  Normal  Pulling    24s   kubelet, 10.215.17.104  Pulling image "bitnami/postgresql"
  Normal  Pulled     17s   kubelet, 10.215.17.104  Successfully pulled image "bitnami/postgresql"
  Normal  Created    17s   kubelet, 10.215.17.104  Created container postgresql
  Normal  Started    17s   kubelet, 10.215.17.104  Started container postgresql
```
