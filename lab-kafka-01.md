# Lab 8: Connect to a Kafka (Event Streams) instance on IBM Cloud

## Prerequisites

- Access to IBM Cloud and a Kafka instance (on IBM Cloud aka Event Streams)
- Leveraging IBM Cloud Shell if you don't have local Java 1.8/Gradle/Git

## Challenges to be solved

### Create a custom topic

You have to create a Kafka topic named dev-**yourinitials** on our shared Event Streams instance with the following characteristics:

- 1 partition
- 1 day data retention

![image](images/lab-kafka-01.png)

### Get access credentials for the shared cluster

To be able to access this created topic you have to retrieve an **API key** and your **Kafka endpoints**.
We have created one set of service credentials you can leverage for your tests. These can be found in the credentials section within the
Event Streams service instance.

![image](images/lab-kafka-02.png)

### Produce and consume events

You will use the kafka-nodejs-console-sample from https://github.com/ibm-garage-dach/event-streams-samples to produce and consume events.

Retrieve the code with your git client and build it using docker:

```bash
git clone https://github.com/ibm-garage-dach/event-streams-samples
cd event-streams-samples/kafka-nodejs-console-sample
docker build -t js-kafka-<YOUR INITIALS> .
```

The code expects to find the credentials in a an environment variable called `VCAP_SERVICES`. We'll supply these using the `--env-file` parameter of `docker run`.

 1. Copy the credentials JSON into a new file called `.env`. The file must be in the following format:

    ```
    VCAP_SERVICES=<PASTED JSON WITHOUT NEWLINES>
    ```

    **WARNING**: docker does not understand newlines in the JSON so these must be removed. In VSCode you can do this easily by using the "Join Lines" command (bound to Ctrl+J by default).

 2. Run docker with the env file passed, and specifying the topic name as an argument:

    ```sh
    docker run --env-file=.env js-kafka-<YOUR INITIALS> dev-<YOUR INITIALS>
    ```

 3. You should see the following in the output:

    * `Using VCAP_SERVICES to find credentials.`
    * `Using custom topic name: dev-<YOUR INITIALS>`
    * Messages produced, e.g. `Message produced, partition: 0 offset: 0`
    * Messaged consumed, e.g. `Message consumed: topic=dev-dom, partition=0, offset=3, key=Key3, value=This is a test message #3`

 4. You can kill the process by typing Ctrl+C
