# Lab 8: Tekton on IBM Cloud

The goal of this lab is to create an open toolchain that includes a Tekton-based delivery pipeline. You then use the toolchain and DevOps practices to develop a simple "Hello World" web application (app) that you deploy to the IBM Cloud Kubernetes Service. 

[Tekton](https://www.ibm.com/cloud/blog/tekton-a-modern-approach-to-continuous-delivery") is an open source, vendor-neutral, Kubernetes-native framework that you can use to build, test, and deploy apps to [Kubernetes](https://www.ibm.com/cloud/learn/kubernetes). Tekton provides a set of shared components for building [continuous integration](https://www.ibm.com/cloud/learn/continuous-integration) and [continuous delivery](https://www.ibm.com/cloud/learn/continuous-delivery) (CICD) systems. As an open source project, Tekton is managed by the [Continuous Delivery Foundation](https://cd.foundation) (CDF). The goal is to modernize continuous delivery by providing industry specifications for pipelines, workflows, and other building blocks. With Tekton, you can build, test, and deploy across cloud providers or on-premises systems by abstracting the underlying implementation details. Tekton pipelines are built in to [ IBM Cloud™ Continuous Delivery.](https://www.ibm.com/cloud/blog/announcements/build-and-deliver-using-tekton-enabled-pipelines).

After you create the cluster and the toolchain, you change your app's code and push the change to the Git Repos and Issue Tracking repository (repo). When you push changes to your repo, the delivery pipeline automatically builds and deploys the code.

## Prerequisites

Make sure that you have configured Cloud Shell to:

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context
## Create an IBM Cloud Toolchain

In this task, you create a toolchain and add the tools that you need for this tutorial. Before you begin, you need your API key and Kubernetes cluster name.

1.  Open the menu in the upper-left corner and click **DevOps**. Click **ToolChains**. Click **Create a toolchain**. Type in the search box `toolchain`. Click **Build Your Own Toolchain**. 
    ![Build your own toolchain](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Blank_Template.png)
2. On the "Build your own toolchain" page, review the default information for the toolchain settings. The toolchain's name identifies it in IBM Cloud. Each toolchain is associated with a specific region and resource group. From the menus on the page, select the region **Dallas** since we are going to use the Beta Managed Tekton Worker, if you use Private Workers you can use any Region.
    ![Select_Region](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Region_Select.png)
3. Click **Create**. The blank toolchain is created.
4. Click **Add a Tool** and click **Git Repos and Issue Tracking**. 
    ![Git Repos tile](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Add_Tool_Git.png)
    - From the **Repository type** list, select **Clone**. Note: this creates a copy of the repository in your own namespace on IBM's cloud-hosted git repos (based on gitlab). 
    - In the **Source repository URL** field, type `https://github.com/ibm-garage-dach/hello-tekton.git`.
    - Make sure to uncheck the **Make this repository private** checkbox and that the **Track deployment of code changes** checkbox is selected.
    ![Git window](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Git_Setup.png)
    - Click **Create Integration**. Tiles for Git Issues and Git Code are added to your toolchain.
5. Return to your toolchain's overview page.
6. Click **Add a Tool**. Type `pipeline` in seach box and click **Delivery Pipeline**.
    ![Add Tool Delivery Pipeline](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Add_Tool_DP.png)
    - Type a name for your new pipeline.
    - Click **Tekton**. 
    ![Pipeline type](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Select.png)
    - Make sure that the **Show apps in the View app menu** checkbox is selected. All the apps that your pipeline creates are shown in the **View App** list on the toolchain's Overview page.
    - Click **Create Integration** to add the Delivery Pipeline to your toolchain.

## Creating an API Key

Next we must create an API key that the pipeline can use to connect to the cluster. For simplicity we'll use a platform key, but in a production scenario we would create a service ID, grant that the necessary access, and then create a service API key.

Run the following command to create the platform API key:

```bash
ibmcloud iam api-key-create bootcamp-tekton-key
```

Note down the `API Key` in the output of this command - you will need it for the next step.

## Configuring the delivery pipeline

1. Click **Delivery Pipeline** to open the Tekton Delivery Pipeline dashboard. Click the **Definitions** tab and complete these tasks:
  - Click **Add** to add your repository.
  - Specify the Git repo and URL that contains the Tekton pipeline definition and related artifacts. From the list, select the Git repo that you created earlier.
  - Select the branch in your Git repo that you want to use. For this tutorial, use the default value.
  - Specify the directory path to your pipeline definition within the Git repo. You can reference a specific definition within the same repo. For this tutorial, use the default value.
  ![Pipeline window](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Repo_Definition.png)
  - Click **Add**, then click **Save**

2. Click the **Worker** tab and select the private worker that you want to use to run your Tekton pipeline on the associated cluster. Either select the private worker you set up in the previous steps, or select the **IBM Managed workers in DALLAS** option.
  ![Worker tab](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Worker.png)
   - Click **Save**
3. Click the **Triggers** tab, click **Add trigger**, and click **Git Repository**. Associate the trigger with an event listener: 
- From the **Repository** list, select your repo.
- Select the **When a commit is pushed** checkbox, and in the **EventListener** field, make sure that **listener** is selected.
![Git Repository trigger](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Trigger.png)
- Click **Save**
4. On the **Triggers** tab, click **Add trigger** and click **Manual**. Associate that trigger with an event listener:
  - In the **EventListener** field, make sure that **listener** is selected.
  - Click **Save**.
  ![Manual trigger](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Manual_Trigger.png)
   **Note:** Manual triggers run when you click **Run pipeline** and select the trigger. Git repository triggers run when the specified Git event type occurs for the specified Git repo and branch. The list of available event listeners is populated with the listeners that are defined in the pipeline code repo. 
5. Click the **Environment properties** tab and define the environment properties for this tutorial. To add each property, click **Add property** and click **Text property**. Add these properties:


| Parameter     |  Description  |
| ------------- | -----|
| apikey     | Type the API key that you created earlier in this tutorial. |
| cluster      | Type the name of our bootcamp cluster. |
| registryNamespace | Type the IBM Image Registry namespace where the app image will be built and stored. This is the same as the name of our bootcamp cluster.  |
| imageName | The base name of the docker image. Set this to `hello-tekton-<YOUR INITIALS>`
| repository | Type the source Git repository where your resources are stored. This value is the URL of the Git repository that you created earlier in this tutorial. To find your repo URL, return to your toolchain and click the **Git** tile. When the repository is shown, copy the URL. |
| revision | (optional) The Git branch - default is `master` |
| clusterNamespace | The namespace in your cluster where the app will be deployed - this should be your namespace: `dev-<YOUR INITIALS>` |

  ![Environment properties](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Environment.png)
6. Click **Save**

## Explore the pipeline

With a Tekton-based delivery pipeline, you can automate the continuous building, testing, and deployment of your apps.

The Tekton Delivery Pipeline dashboard displays an empty table until at least one Tekton pipeline runs. After a Tekton pipeline runs, either manually or as the result of external Git events, the table lists the run, its status, and the last updated time of the run definition.

To run the manual trigger that you set up in the previous task, click **Run pipeline** and select the name of the manual trigger that you created. The pipeline starts to run and you can see the progress on the dashboard. Pipeline runs can be in any of the following states:

- Pending: The PipelineRun definition is queued and waiting to run.
- Running: The PipelineRun definition is running in the cluster.
- Succeeded: The PipelineRun definition was successfully completed in the cluster.
- Failed: The PipelineRun definition run failed. Review the log file for the run to determine the cause.
    ![Pipeline dashboard](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Pipeline_Dashboard.png)
  
- For more information about a selected run, click any row in the table. You view the Task definition and the steps in each PipelineRun definition. You can also view the status, logs, and details of each Task definition and step, and the overall status of the PipelineRun definition.
    ![Pipeline Log](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Pipeline_Details.png)
  
- The pipeline definition is stored in the `pipeline.yaml` file in the `.tekton` folder of your Git repository. Each task has a separate section of this file. The steps for each task are defined in the `tasks.yaml` file.


1. Review the pipeline-build-task. The task consists of a git clone of the repository followed by two steps:
    - pre-build-check: This step checks for the mandatory Dockerfile and runs a lint tool. It then checks the registry current plan and quota before it creates the image registry namespace if needed.
    - build-docker-image: This step creates the Docker image by using the IBM Cloud Container Registry build service through the `ibmcloud cr build` CLI script. 
2. Review the pipeline-validate-task. The task consists of a git clone of the repository, followed by the check-vulnerabilities step. This step runs the <a href="https://cloud.ibm.com/docs/va?topic=va-va_index#about&cm_mmc=IBMBluemixGarageMethod-_-MethodSite-_-10-19-15::12-31-18-_-vulnerability-advisor-docs" target="_blank">IBM Cloud Vulnerability Advisor</a> on the image to check for known vulnerabilities. If it finds a vulnerability, the job fails, preventing the image from being deployed. This safety feature prevents apps with security holes from being deployed. The image has no vulnerabilities, so it passes. In this tutorial template, the default configuration of the job is to not block on failure.
3. Review the pipeline-deploy-task. The task consists of a git clone of the repository followed by two steps:
    - pre-deploy-check: This step checks whether the IBM Container Service cluster is ready and has a namespace that is configured with access to the private image registry by using an IBM Cloud API Key. 
    - deploy-to-kubernetes: This step updates the `deployment.yml` manifest file with the image url and deploys the application using `kubectl apply`
4. After all the steps in the pipeline are completed, a green status is shown for each task. Click the **deploy-to-kubernetes** step and click the **Logs** tab to see the successful completion of this step.
    ![Pipeline success](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Success.png)
5. Scroll to the end of the log. The `DEPLOYMENT SUCCEEDED` message is shown at the end of the log.
    ![Deployment succeeded](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Deployment_Success.png)
6. Click the URL to see the running application.
    ![Running app](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_App.png)

## Modify the App Code 

In this task, you modify the application and redeploy it. You can see how your Tekton-based delivery pipeline automatically picks up the changes in the application on commit and redeploys the app. 

1. On the toolchain's Overview page, click the Git tile for your application. 
    - **Tip:** You can also use the built-in Eclipse Orion-based Web IDE, a local IDE, or your favorite editor to change the files in your repo.
2. In the repository directory tree, open the `app.js` file.
    ![File browser](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Files.png)
3. Edit the text message code to change the welcome message. 
    ![Edit file](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Commit.png)
4. Commit the updated file by typing a commit message and clicking **Commit changes** to push the change to the project's remote repository. 
5. Return to the toolchain's Overview page by clicking the back arrow.
6. Click **Delivery Pipeline**. The pipeline is running because the commit automatically started a build. Over the next few minutes, watch your change as it is built, tested, and deployed. 
    ![Dashboard redeployment](https://raw.githubusercontent.com/ibm-cloud-architecture/learning-cloudnative-101/master/src/pages/lectures/continuous-integration/activities/ibm-toolchain/images/Tekton_Redeploy.png)
7. After the deploy-to-kubernetes step is completed, refresh your application URL. The updated message is shown.


## Clean up Resources

In this task, you can remove any of the content that is generated by this tutorial. Before you begin, you need the IBM Cloud CLI and the IBM Cloud Kubernetes Service CLI. Instructions to install the CLI are in the prerequisite section of this tutorial.


1. Delete the git repository, sign in into git, select personal projects. Then go to repository General settings and remove the repository.
1. Delete the toolchain. You can delete a toolchain and specify which of the associated tool integrations you want to delete. When you delete a toolchain, the deletion is permanent.
    - On the DevOps dashboard, on the Toolchains page, click the toolchain to delete. Alternatively, on the app's Overview page, on the Continuous delivery card, click **View Toolchain**.
    - Click the **More Actions** menu, which is next to **View app**.
    - Click **Delete**. Deleting a toolchain removes all of its tool integrations, which might delete resources that are managed by those integrations.
    - Confirm the deletion by typing the name of the toolchain and clicking **Delete**. 
    - **Tip:** When you delete a GitHub, GitHub Enterprise, or Git Repos and Issue Tracking tool integration, the associated repo isn't deleted from GitHub, GitHub Enterprise, or Git Repos and Issue Tracking. You must manually remove the repo.
1. Delete your IBM Cloud API key.
  - From the **Manage** menu, click **Access (IAM)**. Click **IBM Cloud API Keys**.
  - Find your API Key in the list and select **Delete** from the menu to the right of the API Key name.
1. Delete the container images. To delete the images in your container image registry, enter this command in a command-line window:
    ```bash
    ibmcloud cr image-rm IMAGE [IMAGE...]
    ```

### Summary

You created a toolchain with a Tekton-based delivery pipeline that deploys a "Hello World" app to a secure container in a Kubernetes cluster. You changed a message in the app and tested your change. When you pushed the change to the repo, the delivery pipeline automatically redeployed the app.

- Read more about the [IBM Cloud Kubernetes Service](https://www.ibm.com/garage/method/practices/run/tool_ibm_container)
- Read more about [Tekton](https://www.ibm.com/cloud/blog/tekton-a-modern-approach-to-continuous-delivery)
- Explore the [DevOps reference architecture](https://www.ibm.com/cloud/architecture/architectures/devOpsArchitecture).