# Lab: Istio Lab 2 - Simulate a phased rollout of BookInfo

## Prerequisites

You did run through the Istio Lab 1.

Make sure everytime you create resources that you

- target the right Kubernetes cluster
- target the right Kubernetes namespace and set it into your kubectl context

```bash
ibmcloud ks cluster config --cluster **kubeclusterid**
kubectl config set-context --current --namespace=dev-**your
**
```

** Important note: This lab cannot be run concurrently on the same istio ingress controller - clean up your namespace before you run the same lab on the same istio ingress controller **

## Challenges to be solved

To simulate a release of an app, you can perform a phased rollout v3 of the reviews microservice of BookInfo.

After you finish testing your app and are ready to start directing live traffic to it, you can perform rollouts gradually through Istio. For example, you can first release v3 to 10% of the users, then to 20% of users, and so on.

Configure a virtual service to distribute 0% of traffic to v1, 90% of traffic to v2, and 10% of traffic to v3 of reviews.

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
    - reviews
  http:
    - route:
        - destination:
            host: reviews
            subset: v1
          weight: 0
        - destination:
            host: reviews
            subset: v2
          weight: 90
        - destination:
            host: reviews
            subset: v3
          weight: 10
```

View the BookInfo web page in a browser.

```bash
open http://$GATEWAY_URL/productpage
```

Try refreshing the page several times. Notice that the page with no stars (v1) is no longer shown, and that a majority of page refreshes show the black stars (v2). Only rarely is the page with red stars (v3) shown.

Change the traffic distribution so that all traffic is sent only to v3. Note that in a real scenario, you might slowly roll out your version changes by changing the traffic distribution first to 80:20, then 70:30, and so on, until all traffic is routed to only the latest version.

```bash
kubectl edit VirtualService reviews
```

## Verification

Try refreshing the BookInfo page several times. Notice that the page with black stars (v2) is no longer shown, and only the page with red stars (v3) shown.
