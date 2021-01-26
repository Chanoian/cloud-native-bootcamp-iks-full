# Lab 8: Connect to a Kafka (Event Streams) instance on IBM Cloud

## Prerequisites

- Access to IBM Cloud and a Kafka instance (on IBM Cloud aka Event Streams)
- Leveraging IBM Cloud Shell if you don't have local Java 1.8/Gradle/Git

## Supporting Information

## Challenges to be solved

You have to create a Kafka topic named dev-**yourinitials** on our shared Event Streams instance with the following characteristics:

- 1 partition
- 1 day data retention

![image](images/lab-kafka-01.png)

To be able to access this created topic you have to retrieve an **API key** and your **Kafka endpoints**.
We have created one set of service credentials you can leverage for your sets. These can be found in the credentials section within the
Event Streams service instance ("apikey" and "kafka_brokers_sasl").

![image](images/lab-kafka-02.png)

You will use the kafka-java-console-sample from https://github.com/ibm-messaging/event-streams-samples/
to produce and consume events. Use 'git clone https://github.com/ibm-messaging/event-streams-samples/

## Verification
