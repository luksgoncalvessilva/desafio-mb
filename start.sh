#!/bin/bash

FRONTEND_DIR="./frontend"  
BACKEND_DIR="./backend"   

(cd "$FRONTEND_DIR" && npm install && npm run dev) &

(cd "$BACKEND_DIR" && npm install && npm start) &