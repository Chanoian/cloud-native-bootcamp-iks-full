# Lab: Connect to a PostgreSQL Database

## Prerequisites

Make sure that you have configured Cloud Shell to:

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

## Connect the database into your namespace

1. Find the instance name for the postgreSQL service that I created:

```sh
ibmcloud resource service-instances
```

2. Bind that service into your namespace in the cluster. This will create a secret that contains the credentials required to connect to that service:

```sh
ibmcloud ks cluster service bind --cluster <cluster_name_or_ID> --namespace <your_namespace> --service <service_instance_name>
```

3. This should have created a secret. Take a look at the keys of the data that is stored inside the secret (hint: `kubectl describe` will show this). You should find a key called `binding`.
4. You can take a look at the data stored in the binding with this command:

```sh
kubectl get secret <SECRET_NAME> -o jsonpath={.data.binding} | base64 -d | jq
```

For those not familiar with unix, the `|` character takes the output of one command and passes it to the next command. We're using `jq` here to pretty-print the JSON, but it does a lot more!

## Running the sample app

We're going to use a sample application that will store a list of words with their definitions in our postgreSQL database.

We've already built a docker image for this application, which is available at `ibmcase/icdpg:1.0`.

Your task is to deploy this application into our kubernetes cluster and expose it to the world. You'll want to use a `Deployment` for this, and expose it using a `Service` of type `NodePort`.

In order to connect to the database, the container is expecting an environment variable called `BINDING` to be exposed to a container, this should contain the contents of the `binding` key from inside the secret you created earlier.

The container exposes port 8080 to serve HTTP traffic.

If you get stuck, you might find some useful YAML on the [original lab](https://cloudnative101.dev/electives/data-services/activities/labs/lab1/) that I adapted.

## Testing the app

The app has a UI but that won't be accessible from the cloud shell, luckily we can use its REST API directly. You can get the all the words stored in the database with the following command:

```sh
curl http://<THE_NODE_IP_AND_PORT>/words
```

We're all sharing the database so you will see words that others have added! You can add a new word with the following command:

```sh
curl -X PUT http://<THE_NODE_IP_AND_PORT>/words -d "word=IBM Cloud" -d "definition=is awesome"
```
