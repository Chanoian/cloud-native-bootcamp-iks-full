# Optional Lab (building docker image from node.js source)


### Build a nodejs container image

Use the Dockerfile to build the image:

```bash
docker build -t node-js-demo:1.0 .
```


### Work with the container image

Run the image:
```bash
docker run --rm -d -p 8000:8080 --name my-container node-js-demo:1.0
curl http://localhost:8000
docker ps
```

Run a bash shell in the container and check that `node_modules` were innstalled:
```bash
docker exec -i my-container /bin/bash
ls
```

Stop the container:
```bash
docker stop my-container
docker ps
```


### Create a namespace in IBM Cloud

Login to IBM Cloud, select your account and target your resource group:
```bash
ibmcloud login --sso                    # follow the instructions
ibmcloud target -g <RESOURCE_GROUP>     # if not default
```

Create a namespace in the IBM Cloud Container Registry:
```bash
ibmcloud cr region-set eu-central
ibmcloud cr namespace-add <your-name-test>
```


### Push image

```bash
ibmcloud cr login
docker tag node-js-demo:1.0 de.icr.io/<your-name-test>/node-js-demo:1.0
docker push de.icr.io/<your-name-test>/node-js-demo:1.0
ibmcloud cr image-list
docker rmi de.icr.io/<your-name-test>/node-js-demo:1.0
docker pull de.icr.io/<your-name-test>/node-js-demo:1.0
```
