# 🛠️ GCP API Gateway Deployment Guide

## Overview

This guide describes how to build, deploy, and expose a **TypeScript Node.js API** on **Cloud Run**, secured and managed by **GCP API Gateway**.

## Prerequisites

- Google Cloud Project ID (replace `emi-dev-env-2` with your own if different)
- Google Cloud SDK installed and authenticated
- Billing enabled on your GCP project
- API Gateway, Cloud Run, IAM, and Cloud Build APIs enabled
- Docker or Podman installed locally

## ✅ 1. Build Your Node.js API

Example entry point:

```bash
npm install
npm start
```

Test locally on `http://localhost:8080/health`.

## ✅ 2. Dockerize the Application

**Dockerfile**

```dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

## ✅ 3. Build and Push Docker Image to GCR

```bash
PROJECT_ID="emi-dev-env-2"

# Build and push image
gcloud builds submit --tag gcr.io/$PROJECT_ID/emi-api-gateway --project=$PROJECT_ID
```

_Or using Podman:_

```bash
podman build -t gcr.io/$PROJECT_ID/emi-api-gateway .
gcloud auth configure-docker
podman push gcr.io/$PROJECT_ID/emi-api-gateway
```

## ✅ 4. Deploy to Cloud Run

```bash
gcloud run deploy emi-api   --image gcr.io/$PROJECT_ID/emi-api-gateway   --platform managed   --region us-central1   --allow-unauthenticated   --project=$PROJECT_ID
```

Take note of the Cloud Run URL provided.

## ✅ 5. Prepare openapi.yaml for API Gateway

Example Swagger 2.0 with x-google-backend:

```yaml
swagger: '2.0'
info:
  title: 'Emi API Gateway'
  version: '1.0.0'
schemes:
  - https
host: 'emi-api-xxxxxxxxxx-uc.a.run.app'
basePath: '/'

x-google-backend:
  address: https://emi-api-xxxxxxxxxx-uc.a.run.app
  protocol: h2

paths:
  /health:
    get:
      summary: 'Health check'
      operationId: 'healthCheck'
      responses:
        200:
          description: 'Successful health check'

  /:
    get:
      summary: 'Root info'
      operationId: 'rootInfo'
      responses:
        200:
          description: 'Root server info'

  /list:
    get:
      summary: 'User listing'
      operationId: 'listUsers'
      responses:
        200:
          description: 'List of users'
```

## ✅ 6. Create Service Account for API Gateway

```bash
gcloud iam service-accounts create emi-api-gateway-sa   --display-name "Emi API Gateway Service Account"   --project=$PROJECT_ID
```

List service accounts:

```bash
gcloud iam service-accounts list --project=$PROJECT_ID
```

## ✅ 7. Deploy API Gateway

```bash
API_NAME="emi-api-gateway"
API_CONFIG="emi-api-config"
API_REGION="us-central1"
SA_EMAIL="emi-api-gateway-sa@$PROJECT_ID.iam.gserviceaccount.com"

gcloud api-gateway apis create $API_NAME --project=$PROJECT_ID

gcloud api-gateway api-configs create $API_CONFIG   --api=$API_NAME   --openapi-spec=openapi.yaml   --project=$PROJECT_ID   --backend-auth-service-account=$SA_EMAIL

gcloud api-gateway gateways create ${API_NAME}-gateway   --api=$API_NAME   --api-config=$API_CONFIG   --location=$API_REGION   --project=$PROJECT_ID
```

## ✅ 8. Test the API Gateway

Retrieve the Gateway URL:

```bash
gcloud api-gateway gateways describe ${API_NAME}-gateway   --location=$API_REGION   --project=$PROJECT_ID   --format="value(defaultHostname)"
```

Test:

```bash
curl https://<gateway-hostname>/health
curl https://<gateway-hostname>/
curl https://<gateway-hostname>/list
```

## ✅ Cleanup (Optional)

```bash
gcloud api-gateway gateways delete ${API_NAME}-gateway --location=$API_REGION --project=$PROJECT_ID
gcloud api-gateway api-configs delete $API_CONFIG --api=$API_NAME --project=$PROJECT_ID
gcloud api-gateway apis delete $API_NAME --project=$PROJECT_ID
```
