#!/bin/bash
docker compose -f docker-compose.yaml --env-file .env up -d --build