#!/bin/bash
set -e

PROJECT_ID="emi-dev-env-2"
IMAGE_NAME="gcr.io/$PROJECT_ID/emi-api-gateway"

podman build --platform=linux/amd64 -t "$IMAGE_NAME" .
podman push "$IMAGE_NAME"