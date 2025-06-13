# Maquina de estados: Prueba técnica Sainapsis
### By: Enrique González Suárez

Este es el Repositorio del Front, fue desarrollado en React y Typescript


![Demo](https://img.shields.io/badge/demo-online-blue)
![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)
![React](https://img.shields.io/badge/react-19.0-blue)

❗*Se crearon dos repositorios, uno para el back y otro para el front, en este Repo podemos encontrar el front-end y el back-end lo econtramos en el repo: https://github.com/EnriqueGS07/statemachine*

## 🚀 Demo

http://zappa-front.s3-website-us-east-1.amazonaws.com

## 📦 Prerrequisitos
Antes de ejecutar o desplegar el frontend, asegúrate de tener lo siguiente instalado:

- Node.js (versión recomendada: ≥ 18)

- npm o yarn

- Acceso al backend (la URL debe estar configurada en las variables de entorno)

## 🛠️ Instalación y ejecución local

1. Clona el repositorio:

```
git clone https://github.com/EnriqueGS07/statemachine-front
cd statemachine-front
```

2. instala depencencias
```
npm install
npm start
```
Despues de esto la aplicacion de react deberia estar corriendo en http://localhost:3000

## ⚙️ Configuración y despliegue 
La configuración del espacio donde esta alojada esta aplicación se hico mediante la consola de AWS por lo que no se ejecutaron comandos.

1. Creación del Bucket

Se creo un Bucket S3 al cual se subio el contenido de la carpeta build que se optiene del comando
```
npm run build
```
el cual compila y empaqueta la aplicación en forma de archivos estaticos.

2. Configuración del Bucket

Dentro de las propiedades del Bucket se activo la opción  "Alojamiento de sitios web estaticos"

y en la sección de permisos en "Politica del bucket" se agrego la siguiente politica.
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::zappa-front/*"
    }
  ]
}
```

con esto se permitio que cualquier cliente pueda ver los archivos del bucket.



