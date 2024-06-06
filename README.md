
# Image Uploader Backend

Este es el backend del proyecto de carga de imágenes. Proporciona una API para cargar, gestionar y eliminar imágenes. El proyecto está construido con Node.js y Express, y utiliza PM2 para la gestión del proceso.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [API Endpoints](#api-endpoints)
- [Gestión de Logs](#gestión-de-logs)
- [Despliegue](#despliegue)
- [Renovación Automática de Certificados SSL](#renovación-automática-de-certificados-ssl)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción

El proyecto **Image Uploader Backend** proporciona una API RESTful para la gestión de imágenes. Permite a los usuarios cargar imágenes, generar enlaces de acceso y eliminar imágenes de forma automática. Este backend está diseñado para integrarse con un frontend desarrollado en Vue 3 y TypeScript.

## Características

- Carga de imágenes.
- Generación de enlaces de acceso a las imágenes.
- Eliminación automática de imágenes.
- Gestión de procesos con PM2.
- Certificados SSL para conexiones seguras.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- PM2
- Git
- Certbot (para SSL)
- OpenSSL (para certificados auto-firmados en desarrollo local)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Reffcp/image-uploader-backend.git
   cd image-uploader-backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## Configuración

### Configuración de Entorno

Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables de entorno:

```env
PORT=3000
HOST=0.0.0.0
```

### Certificados SSL para Desarrollo Local

Para usar HTTPS en desarrollo local, genera certificados auto-firmados:

1. Genera la clave privada:

   ```bash
   openssl genpkey -algorithm RSA -out key.pem
   ```

2. Crea una solicitud de certificado (CSR):

   ```bash
   openssl req -new -key key.pem -out csr.pem
   ```

3. Crea el certificado auto-firmado:

   ```bash
   openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
   ```

Guarda los archivos \`key.pem\` y \`cert.pem\` en una ubicación segura.

## Ejecución

### Ejecución en Desarrollo

Para ejecutar el servidor en desarrollo sin HTTPS:

```bash
npm run dev
```

Para ejecutar el servidor en desarrollo con HTTPS:

```javascript
const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

const options = {
  key: fs.readFileSync('path/to/key.pem'),
  cert: fs.readFileSync('path/to/cert.pem')
};

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

https.createServer(options, app).listen(port, host, () => {
  console.log(\`Server is running on https://${host}:${port}\`);
});
```

### Ejecución en Producción con PM2

Inicia la aplicación con PM2:

```bash
pm2 start app.js --name image-uploader
```

Guarda la configuración de PM2:

```bash
pm2 save
pm2 startup
```

### Ver Logs

Para ver los logs en tiempo real:

```bash
pm2 logs image-uploader
```

Para ver solo los logs de error:

```bash
pm2 logs image-uploader --err
```

Para ver solo los logs de salida estándar:

```bash
pm2 logs image-uploader --out
```

## API Endpoints

### POST /upload

Sube una imagen.

**Request:**

- \`Content-Type: multipart/form-data\`
- Body: FormData con el campo \`image\`.

**Response:**

```json
{
  "url": "https://your-domain.com/uploads/filename.jpg"
}
```

### GET /images/:filename

Obtiene una imagen.

**Response:**

- \`Content-Type: image/jpeg\`

### DELETE /images/:filename

Elimina una imagen.

**Response:**

```json
{
  "message": "Image deleted successfully"
}
```

## Gestión de Logs

PM2 maneja los logs de la aplicación. Los archivos de log están ubicados en \`~/.pm2/logs/\`.

Para ver los logs:

```bash
pm2 logs image-uploader
```

## Despliegue

### Despliegue en VPS con CyberPanel

1. Configura el dominio en CyberPanel.
2. Configura las reglas de proxy reverso.
3. Emite un certificado SSL con Let's Encrypt.
4. Reinicia el servidor web.

### Certificados SSL

Para emitir un certificado SSL con Certbot:

```bash
sudo certbot certonly --standalone -d your-domain.com
```

## Renovación Automática de Certificados SSL

Configura un cron job para renovar automáticamente los certificados:

```bash
sudo crontab -e
```

Añade la siguiente línea:

```bash
0 3 * * * /usr/bin/certbot renew --quiet
```

Para reiniciar Node.js después de la renovación, crea un script de renovación:

```bash
sudo nano /etc/letsencrypt/renewal-hooks/post/restart_node.sh
```

Añade el siguiente contenido:

```bash
#!/bin/bash
pm2 restart all
```

Haz el script ejecutable:

```bash
sudo chmod +x /etc/letsencrypt/renewal-hooks/post/restart_node.sh
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo \`LICENSE\` para más detalles.
