# Full-Stack Portfolio Website

A containerized Full-Stack Portfolio application built and deployed using modern DevOps practices. 

## 💻 Development Stack

### Frontend
* **Library/Framework:** React.js
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Languages:** JavaScript, HTML5

### Backend
* **Runtime Engine:** Node.js
* **Framework:** Express.js
* **Architecture:** RESTful API

### Database
* **Database Management System:** MySQL

### DevOps & Infrastructure
* **Containerization:** Docker, Docker Compose
* **Web Server & Reverse Proxy:** Nginx
* **Cloud Hosting:** Microsoft Azure Virtual Machine (Ubuntu Linux)
* **CI/CD Pipeline:** GitHub Actions
* **Security:** Let's Encrypt SSL/TLS

## 🏗️ System Architecture

This project uses a fully containerized architecture to ensure isolated and scalable environments:
* **Frontend Container:** Uses a multi-stage build to compile the React application and serves the static files using Nginx.
* **Backend Container:** Runs the Node.js/Express API to handle data and file uploads.
* **Database Container:** MySQL instance utilizing Docker bind mounts for persistent data storage.
* **Reverse Proxy:** An Nginx configuration handles HTTP to HTTPS redirection, SSL termination, and proxies API requests (`/api/`) to the internal backend container.

## ⚙️ Automated CI/CD Pipeline

This repository is integrated with a GitHub Actions workflow. 
Upon pushing code to the `main` branch, the pipeline automatically:
1. Builds new Docker images for the Frontend and Backend.
2. Pushes the built images to Docker Hub.
3. Connects to the Azure VPS via SSH.
4. Pulls the latest images and recreates the containers with zero downtime.

