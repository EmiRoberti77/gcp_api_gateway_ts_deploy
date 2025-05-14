PROJECT_ID="emi-dev-env-2"

# Build and push Docker image
gcloud builds submit --tag gcr.io/$PROJECT_ID/emi-api-gateway --project=$PROJECT_ID

# Deploy to Cloud Run
gcloud run deploy emi-api \
  --image gcr.io/$PROJECT_ID/emi-api-gateway \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --project=$PROJECT_ID

