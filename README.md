# 🚨 Alertas - Sistema de Gestión de Alarmas 🚨

## Descripción del Proyecto 📋
El **Sistema de Gestión de Alarmas** es una plataforma web diseñada para que los usuarios puedan crear, gestionar y recibir notificaciones de alarmas de forma eficiente. Esta aplicación cuenta con una arquitectura basada en microservicios que permite escalabilidad y flexibilidad, utilizando tecnologías modernas como **React**, **Node.js**, y **MySQL**.

## Características 🌟
- 🔔 **Crear y gestionar alarmas**: Los usuarios pueden registrar alarmas personalizadas.
- ✉️ **Notificaciones por correo electrónico**: Las alarmas enviarán un correo cuando se cumpla el tiempo establecido.
- 🔑 **Autenticación segura**: Inicio de sesión con autenticación JWT para proteger las rutas.
- 📅 **Panel de control**: Visualiza, edita y elimina tus alarmas en un entorno limpio e intuitivo.
- 📱 **Responsive Design**: Compatible con dispositivos móviles y de escritorio.
- 🧑‍💻 **Multicanal**: Permite la integración con diferentes medios de notificación.

## Tecnologías Utilizadas 🛠️

### Frontend:
- **React** con **TailwindCSS** para el diseño y estilizado.
- **Axios** para la comunicación con el backend.

### Backend:
- **Node.js** con **Express** como servidor.
- **MySQL** para el almacenamiento de datos.
- **JWT** para la autenticación.
- **Nodemailer** para el envío de correos electrónicos.

### Base de Datos:
- **MySQL** con tablas para gestionar usuarios y alarmas.

## Instalación y Configuración 🛠️

### 1. Clona el Repositorio:
```bash
git clone https://github.com/dlopez69/Alarmas.git
```
### 2. Instala Dependencias:
**Backend:**
```bash
cd backend
npm install
```
**Frontend:**
```bash
cd frontend
npm install
```
### 3. Configura el Entorno:
**Crea un archivo .env en el directorio backend con las siguientes variables:**
```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=alarmas
JWT_SECRET=tu_secreto
EMAIL_USER=tu_correo
EMAIL_PASS=tu_password_correo
```
### 4. Ejecuta el Proyecto:
**Backend:**
```bash
cd backend
npm start
```
**Frontend:**
```bash
cd frontend
npm start
```
## Uso de la Aplicación 🖥️
1. Registro e inicio de sesión: Crea una cuenta y accede a tu panel.
2. Crear Alarma: Selecciona una hora y recibe notificaciones cuando tu alarma esté activa.
3. Gestión: Puedes visualizar, editar o eliminar alarmas fácilmente.
4. Notificación por Correo: Recibirás un email cuando tu alarma esté activa.
## Capturas de Pantalla 📸
### Pantalla de inicio de sesión:
![image](https://github.com/user-attachments/assets/34866b01-c06f-49da-9a89-82835dba4725)
### Panel de Gestión de Alarmas:
![image](https://github.com/user-attachments/assets/0f005ec7-5e86-4161-b3bf-c1d03e880233)
## Contribución 🤝
1. Haz un fork del proyecto.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
4. Haz push a la rama (git push origin feature/nueva-funcionalidad).
5. Abre un Pull Request.
## Autor ✒️
### Kevin López - dlopez69
Si tienes alguna duda o sugerencia, no dudes en contactarme.

