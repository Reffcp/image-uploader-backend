
# Image Uploader Backend

Este es el backend del proyecto de carga de imágenes. Proporciona una API para cargar, gestionar y eliminar imágenes. El proyecto está construido con Node.js y Express, y utiliza MySQL para la gestión de metadatos y almacenamiento en S3 de AWS para las imágenes.

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
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción

El proyecto Image Uploader Backend proporciona una API RESTful para la gestión de imágenes. Permite a los usuarios cargar imágenes, generar enlaces de acceso y eliminar imágenes automáticamente después de un período especificado.

## Características

- Carga de imágenes.
- Generación de enlaces de acceso a las imágenes.
- Eliminación automática de imágenes después de 16 días.
- Integración con Mysql, cloud VPS y S3 de AWS.
- Gestión de procesos con PM2 en VPS.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- AWS CLI
- PM2

## Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/Reffcp/image-uploader-backend.git
    cd image-uploader-backend
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables de entorno:

```
PORT=3000
HOST=0.0.0.0
FIREBASE_CONFIG=path/to/firebaseConfig.json
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
S3_BUCKET_NAME=your_s3_bucket_name
```

## Ejecución

### En Desarrollo

Para ejecutar el servidor en desarrollo:

```sh
npm run dev
```

### En Producción con PM2

Inicia la aplicación con PM2:

```sh
pm2 start ./index.js --name image-uploader
pm2 save
pm2 startup
```

### Ver Logs

Para ver los logs en tiempo real:

```sh
pm2 logs image-uploader
```

## API Endpoints

### POST /upload

Sube una imagen.

**Request:**

- `Content-Type: multipart/form-data`
- Body: FormData con el campo `image`.

**Response:**

```json
{
  "url": "https://your-domain.com/uploads/filename.jpg"
}
```

### GET /image/list

Obtiene una lista de las 4 imagenes mas recientes.

**Response:**

- `Content-Type: image/jpeg`

## Gestión de Logs

PM2 maneja los logs de la aplicación. Los archivos de log están ubicados en `~/.pm2/logs/`.

Para ver los logs:

```sh
pm2 logs image-uploader
```

## Despliegue

### En VPS con CyberPanel

1. Configura el dominio en CyberPanel.
2. Configura las reglas de proxy reverso.
3. Emite un certificado SSL con Let's Encrypt.
4. Reinicia el servidor web.

### Certificados SSL

Para emitir un certificado SSL con Certbot:

```sh
sudo certbot certonly --standalone -d your-domain.com
```

Configura un cron job para renovar automáticamente los certificados:

```sh
sudo crontab -e
```

Añade la siguiente línea:

```sh
0 3 * * * /usr/bin/certbot renew --quiet
```

Para reiniciar Node.js después de la renovación, crea un script de renovación:

```sh
sudo nano /etc/letsencrypt/renewal-hooks/post/restart_node.sh
```

Añade el siguiente contenido:

```sh
#!/bin/bash
pm2 restart all
```

Haz el script ejecutable:

```sh
sudo chmod +x /etc/letsencrypt/renewal-hooks/post/restart_node.sh
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
