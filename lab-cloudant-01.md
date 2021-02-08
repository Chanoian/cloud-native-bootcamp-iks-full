# Cloudant Lab 1

## Prerequisites
* Nodejs 10+

## Supporting Information
* https://cloud.ibm.com/docs/Cloudant
* https://github.com/cloudant/nodejs-cloudant
* https://developer.ibm.com/languages/node-js/tutorials/learn-nodejs-node-with-cloudant-dbaas/

## Challenges to be solved
The challenge is to create a todo app that can create, update and delete tasks. The persistance is based on cloudant.

* Firstly we need an existing instance of Cloudant
* Once we have an instance, navigate to Cloudant's dashboard and create a database called "tasks"
* Navigate to tasks database and createa our first task document manually with content:
```
{
  "_id": "90a855c1286651650b3bcf0ac2279599",
  "text": "my new task"
}
```
* Now let's try to retrieve this task from the nodejs backend and show it in the frontend. Clone this repository locally: https://github.com/ibm-garage-dach/cloudant-lab-01
* Once clonned, install node dependencies by navigation to root of the cloned repo and run `npm install`
* Copy `.env.example` and rename it to `.env`
* Navigate to cloudant instance (Not cloudant dashboard) and create a credential we need credentials to access Cloudant from nodejs.
* Set values to both `CLOUDANT_URL` and `CLOUDANT_API_KEY` in `.env` from nely created credential.
* Start project by running `npm start` in root folder
* Navigate to http://localhost:3000 you should see manually created task
* To be able to create a task from backend we have to finish `createTask` implementation inside `controller.js`, use cloudant to insert into `tasks` database. Once you write the query to insert into db you will be able to see that we can retrieve and render all the tasks when navigating to http://localhost:3000
* Now let's do the edit feature. First we will need to finish implementing `getTask` inside `controller.js` to be able to retrieve single task from db.
* Once `getTask` is implmeneted - you should be able to navigate from http://localhost:3000 to an edit page of each task and see correct data.
* To be able to sumbit our changes on edit page we need to finish implementing `editTask` in `controller.js`. You would first get the task by id and ensure that it exists and then update it with new content sent from frontend.
* Lastly to be able to delete task finish implementation of `removeTask`.

## Verification
The app should be fully functinal and you're able to create new tasks, update and delete existing tasks.
