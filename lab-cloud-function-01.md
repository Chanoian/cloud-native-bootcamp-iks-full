# Cloud Function Lab 1

## Prerequisites
* We will need cloudant db from https://github.com/ibm-garage-dach/cloud-native-bootcamp-iks-full/blob/main/lab-cloudant-01.md
* Completed https://github.com/ibm-garage-dach/cloud-native-bootcamp-iks-full/blob/main/lab-kafka-01.md

## Supporting Information
* https://cloud.ibm.com/functions/

## Challenges to be solved
We want to create a cloud function that can be triggered by a message sent to an event stream topic.

* To create functions and triggers navigate to cloud function page: https://cloud.ibm.com/functions/
* Create an action (https://cloud.ibm.com/functions/create/action), give your action a name "{your-initials}-action", runtime Node.js 12
* Actions can be manually invoked. Navigate to your action, then go to code and press on "Invoke" button, you should see the result of your action.
* Now let's make our function execute whenever we get a new event from the Event Stream service, to create a trigger navigate to "Connected Triggers" inside your action and add an "Event Streams" triger with the *topic* from your Event Stream lab (dev-yourinitials), also **do NOT select** *"is JSON data"*.

* At the moment your action doesn't do much, so let's make it smarter and persist message data to database for example, replace actual code of the action with the following, also replace Cloudant URL and API KEY placeholders:

```javascript
/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
const Cloudant = require("@cloudant/cloudant");

const getDB = () => new Promise((resolve, reject) => {
  Cloudant({
    url: "YOUR-CLOUDANT-URL", // @TODO: REPLACE
    plugins: { iamauth: { iamApiKey: "YOUR-CLOUDANT-API-KEY" } } // @TODO: REPLACE
  },
    (err, cloudant) => {
      if (err) {
        console.log("Failed to initialize Cloudant: " + err.message)
        reject(err);
        return;
      }
      console.log("Cloudant initialized...");
      resolve(cloudant);
    }
  );
});

async function main(params) {
  try {
    const cloudant = await getDB();
    const db = cloudant.db.use('tasks');

    for (let message of params.messages) {
      const value = JSON.parse(message.value || "{}");
      const result = await db.insert({
        text: `${ value.message } ${value['message number']}`
      });
    }

    return result;
  } catch (e) {
    console.error(e);
    return {};
  }
}
```

## Verification
To verify navigate to you cloudant database and make sure that documents with text "This is a test message #" are there.
