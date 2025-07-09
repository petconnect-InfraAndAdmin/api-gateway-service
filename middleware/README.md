API Gateway - PetConnect
Description
This project is the API Gateway for the PetConnect platform. It acts as a central point for routing requests to the various microservices that comprise the application. It implements authentication, load balancing, request limiting, and unified handling of public and private routes.

Technologies
Node.js

Express.js

http-proxy-middleware

express-rate-limit

Instalación

git clone <repositorio>
cd api-gateway
npm install

Route Structure
Public routes: /api/v1/auth, /api/v1/registration, /api/v1/search, etc.

Private routes: All other routes that require a JWT token.