# API Gateway - PetConnect

Este proyecto es el API Gateway para la aplicación PetConnect. Su función principal es actuar como punto central para enrutar las solicitudes HTTP hacia los diferentes microservicios que componen la aplicación.

## Características

- Enrutamiento dinámico a microservicios
- Autenticación y autorización con JWT
- Limitación de tasa (rate limiting) para proteger el servicio
- Manejo de errores centralizado
- Logs de peticiones para monitoreo

## Requisitos

- Node.js >= 16
- Docker (para contenedor)

## Instalación y uso local

1. Clonar el repositorio:

```bash
git clone <url-del-repo>
cd api-gateway
