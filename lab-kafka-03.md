# Lab Deploying Node app with kafka to kube

## Prerequisites

- Access to IBM Cloud and a Kafka instance (on IBM Cloud aka Event Streams)
- Leveraging IBM Cloud Shell if you don't have local env

## Challenges to be solved

After you have built and run your Nodejs app with Kafka integration locally - the next challenge is about bringing that app to Kube.

### Connect the database into your namespace

1. Find the instance name for the event streams service that I created:

    ```bash
    ibmcloud resource service-instances
    ```
    You should see one for the bootcamp that ends with `-event-streams`.

2. Bind that service into your namespace in the cluster. This will create a secret that contains the credentials required to connect to that service:

    ```bash
    ibmcloud ks cluster service bind --cluster <cluster_name_or_ID> --namespace <your_namespace> --service <service_instance_name>
    ```
    
3. This should have created a secret. Take a look at the keys of the data that is stored inside the secret (hint: kubectl describe will show this). You should find a key called binding.

4. You can take a look at the data stored in the binding with this command:
    ```bash
    kubectl get secret <SECRET_NAME> -n <your_namespace> -o jsonpath={.data.binding} | base64 -d | jq
    ```
    For those not familiar with unix, the | character takes the output of one command and passes it to the next command. We're using jq here to pretty-print the JSON, but it does a lot more! If you see an error about jq not being installed, just leave | jq off the end of the command.
    
## Running the app

We're going to use the same Docker image that you were running locally in the first part of the lab.

We've already built a docker image for this application, which is available at `ibmgarage/js-kafka:1.0`

In order to connect to the Kafka, the container is expecting an environment variable called VCAP_SERVICES to be defined, this should contain the contents of the binding key from inside the secret you created earlier.


## Testing the app

To verify we'll see the logs from the pod by doing the following:

```bash
kubectl logs <YOUR-POD-NAME -n <YOUR-NAMESPACE>
```



