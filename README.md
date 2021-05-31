# Dependencies

1. Node.js (https://nodejs.org/en/)
2. Docker (https://docs.docker.com/get-docker/)
3. Kubernetes (Enable in Docker settings)
4. Skaffold (https://skaffold.dev/docs/install/)

# Steps to Run

1. Clone Repository
2. Backend Microservices
   1. (/) `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf`
   2. (/) `skaffold dev`
3. Front-End Client (New Terminal Instance)
   1. (/) `cd client`
   2. (/client) `npm i`
   3. (/client) `npm run start-unix` (Mac/Linux), `npm run start-windows` (Windows)
