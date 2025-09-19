# Dishes Web App 🍽
This is a simple web app built with **HTML, CSS, and JavaScript** that fetches dishes from an API and displays them in a clean, responsive interface.  

The app is **containerized with Docker**, deployed on **AWS EKS**, and images are stored in **ECR**. For monitoring, we’ve set up **Prometheus** and **Grafana**, and a **LoadBalancer** handles incoming traffic so everything stays smooth and scalable.

---

## What it does

- Shows a list of dishes fetched from an API.  
- Responsive web design for desktop and mobile.  
- Fully containerized for easy deployment anywhere.  
- Scalable deployment on **Kubernetes (EKS)**.  
- Monitored with **Prometheus** and visualized with **Grafana**.  

---

## Tech Stack & How It’s Used

 Technologies

| **HTML, CSS, JavaScript** | Build the web interface and fetch data from APIs. |
| **Docker** | Package the app in a container so it runs anywhere reliably. |
| **AWS ECR** | Store Docker images securely in the cloud. |
| **AWS EKS** | Run and manage the Kubernetes cluster that hosts the app. |
| **Kubernetes** | Deploy, scale, and manage containers. |
| **LoadBalancer** | Distribute traffic evenly across app instances. |
| **Prometheus** | Collect metrics from the app and cluster. |
| **Grafana** | Visualize metrics on dashboards for easy monitoring. |
| **IAM Admin User** | Full AWS access to manage resources. |

---

## Getting Started

Step 0: Prerequisites

- AWS account with IAM admin access  
- AWS CLI installed and configured  
- kubectl installed  
- eksctl installed (simplifies EKS cluster creation)  
- Docker installed  
- Helm installed (for Prometheus & Grafana)  

---

### Step 1: Create an EKS Cluster

We’ll use **eksctl**, which makes creating EKS clusters very easy. 
try to use t3.medium or t2.medium for better experience

```bash
# Create a cluster named "dishes-cluster" in region us-east-1 with 2 t3.medium nodes
eksctl create cluster \
  --name dishes-cluster \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 2 \
  --nodes-min 2 \
  --nodes-max 3 \
  --managed

### 1. Clone this repo
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
Build the Docker image
docker build -t dishes-web-app .


## Push the image to AWS ECR

aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
docker tag dishes-web-app:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/dishes-web-app:latest
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/dishes-web-app:latest

kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

##monitoring

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/prometheus
helm install grafana grafana/grafana --set service.type=NodePort --set service.nodePort=30000

