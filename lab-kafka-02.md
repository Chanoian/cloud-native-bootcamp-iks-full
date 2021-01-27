# Lab: Using Kafka with Spring

## Prerequisites

- Access to IBM Cloud and a Kafka instance (on IBM Cloud aka Event Streams)
- Leveraging IBM Cloud Shell if you don't have local Java 1.8/Gradle/Git

## Challenges to be solved

We will be running 3 spring-kafka samples from this git repository:

https://us-south.git.cloud.ibm.com/ibm-garage/spring-kafka

These will demonstrate various features of kafka and how to use them from spring.

All the samples can be found in the `samples` subdirectory of the git repository.

### Configure spring credentials for the shared cluster

Similar to the previous lab, you will need the *API KEY* in order to connect to the broker (I have already configured the list of brokers).
We have created one set of service credentials you can leverage for your tests. These can be found in the credentials section within the Event Streams service instance ("apikey").

In each of the samples there is a `src/main/resources/application.yml` file. If you take a look inside that file you will see the password is set to the value of the `$KAFKA_APIKEY` environment variable.

You can set this value in the cloud shell as follows, do *not* put any spaces around the `=`:

```sh
export KAFKA_APIKEY=<THE KEY>
```

If it's set correctly, you should be able to run the following command to print out the apikey:

```sh
echo $KAFKA_APIKEY
```

Make sure you do this before following any of the steps below. That value will then remain set for the duration of your cloud shell session.

## Sample 1: Basic publish and Dead-Letter Topic (DLT)

Full description: https://us-south.git.cloud.ibm.com/ibm-garage/spring-kafka/-/blob/master/samples/sample-01/README.adoc

We will be publishing messages using curl and using the console output of the Java application to see how they are handled. Here are the commands to get going:

```sh
git clone https://us-south.git.cloud.ibm.com/ibm-garage/spring-kafka.git
cd spring-kafka/samples/sample-01
./mvnw spring-boot:run
```

That commmand will use maven to download the dependencies, compile the code and then run it. If it's worked you should not see any errors in the output, just a number of `INFO` messages. Take a look at these to see all the steps the kafka client is going through to connect to the broker.

In order to send messages to the broker, we can use curl (this uses an endpoint on our spring app to talk to the broker). Because the app needs to be running, click the **+** at the top of the cloud shell window to launch a new session. Then enter the following:

```sh
curl -X POST http://localhost:8080/send/foo/bar
```

Switch back to the session running the Java app to see the effect of running the curl command.

See the full description linked above for more information and another curl command to demonstrate the dead-letter queue.

### Optional exercise

For those familiar with Java (or those feeling adventurous!)

Change the topic that gets published to (and that gets subscribed to) to contain your intials (e.g. `topic1-dh`).

You could manage your changes in 3 ways:

1. Upload/download individual Java files from cloud shell like we did with the YAML
2. Hit the fork button on [the repo](https://us-south.git.cloud.ibm.com/ibm-garage/spring-kafka) to create your own copy of the code. Clone the forked repo on your local machine and on cloud shell and use git to sync the changes.
3. Run everything on your local machine (will require that your local java process can connect to the kafka broker on IBM cloud) 

## Sample 2: (De)serialisation

Full description: https://us-south.git.cloud.ibm.com/ibm-garage/spring-kafka/-/blob/master/samples/sample-02/README.adoc

This example shows some of the automatic serialisation and deserialisation capabilities of spring-kafka.

Navigate to the sample-02 directory and run the application in the same way. See the full description linked above for how to exercise it.

### Optional exercise

Alongside Foo and Bar, add a 3rd object type that the application can handle.

## Sample 3: Transactions

Full description: https://us-south.git.cloud.ibm.com/ibm-garage/spring-kafka/-/blob/master/samples/sample-03/README.adoc

Navigate to the sample-03 directory and run the application in the same way. See the full description linked above for how to exercise it.

### Optional exercise

Update the sample to commit the transaction without the end user having to press Enter.

## Extra Credit (HARD!)

Take one of the spring samples and deploy it as a kubernetes application inside the cluster. You will need to write a Dockerfile in order to build the application into a container image.

While we don't have docker available in the cloud shell, you can use the following command to remotely build the docker image:

```sh
ibmcloud cr build -t us.icr.io/<SHARED_NAMESPACE>/kafka-<YOUR_INITIALS>
```

The shared namespace has the same name as the kubernetes cluster.

**Note**: you should create a secret to store the apikey and then inject it as an environment variable into the container.