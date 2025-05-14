PROJECT_ID="emi-dev-env-2"
SA_EMAIL="emi-dev@emi-dev-env-2.iam.gserviceaccount.com"
API_NAME="emi-api-gateway"
API_CONFIG="emi-api-config"
API_REGION="us-central1"

# Create the API
gcloud api-gateway apis create $API_NAME --project=$PROJECT_ID

# Create the API config
gcloud api-gateway api-configs create $API_CONFIG \
  --api=$API_NAME \
  --openapi-spec=openapi.yaml \
  --project=$PROJECT_ID \
  --backend-auth-service-account=$SA_EMAIL

# Create the Gateway
gcloud api-gateway gateways create $API_NAME-gateway \
  --api=$API_NAME \
  --api-config=$API_CONFIG \
  --location=$API_REGION \
  --project=$PROJECT_ID
