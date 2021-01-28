# Lab: Prometheus metrics

### Prerequisite

Make sure everytime you create resources that you

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

```bash
ibmcloud ks cluster config --cluster **kubeclusterid**
kubectl config set-context --current --namespace=dev-**yourinitials**
```

### Deploy java application enable with prometheus

1. Review the instrumented java application [Main.java](https://github.com/ibm-cloud-architecture/learning-cloudnative-101/blob/master/examples/monitoring/prometheus/java/src/main/java/Main.java)

2. Deploy that java application:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus-java-app
spec:
  selector:
    matchLabels:
      app: prometheus-java-app
  template:
    metadata:
      labels:
        app: prometheus-java-app
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/path: "/prometheus"
        prometheus.io/port: "8080"
    spec:
      containers:
        - name: prometheus-java-app
          image: docker.io/ibmcase/prometheus-java
```

You can see the extra annotations that tell sysdig about the prometheus endpoint for the app.


3. Expose the java application service

```shell
kubectl create svc nodeport prometheus-java-app --tcp=80:80 --tcp 8080:8080
```

**Note:** we're actually exposing two ports, one for the app and one for its metrics

## Look at the metrics directly

You can see which nodeports have been assigned by looking at the mapping. The application endpoint will have a mapping from port 80, the prometheus endpoint will have a mapping from port 8080:

```sh
kubectl get service prometheus-java-app
```

Sysdig picks up the metrics from the application by issuing a GET request to the endpoint in the `prometheus.io/path` annotation. We can query this ourselves using curl and see the data it gets back:

```sh
curl http://<EXTERNAL_NODE_IP>:<PORT_MAPPED_FROM_8080>/prometheus
```

Output looks like this
```
# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
# TYPE process_cpu_seconds_total counter
process_cpu_seconds_total 1.39
# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
```

## View the metrics in sysdig
- Open Sysdig
- Select Explore
- Select Deployments
- Select your namespace
- Select deployment `prometheus-java-app`
- Select from drop down metrics, select Prometheus
- Select metrics collected start with `jvm_` or `java_` for example `java_my_counter`

![java-metrics](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/electives/monitoring/sysdig/activities/prometheus/images/java_my_counter.png)

Hints:
- Click _Pin Menu_ to easily navigate between different metrics
- You can select the time range for the charts at the bottom, set this to a short value


To trigger the `java_request_count` and `java_request_sum` metrics, you can call the application endpoint in a loop:


```shell
while true; do sleep 1; curl http://<EXTERNAL_NODE_IP>:<PORT_MAPPED_FROM_80> -si | head -1 ; done
```
Output looks like this
```
HTTP/1.1 200 OK
```

This should then update the graphs.

## References

- Sysdig Blog Prometheus metrics / OpenMetrics code instrumentation (https://sysdig.com/blog/prometheus-metrics/)