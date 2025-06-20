# express-mongo-crud-api

A simple RESTful API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.  
This project provides full CRUD support for managing Clients, Products, and Orders.  
It was designed to be consumed by frontend apps like a CRM.

> **Note:** This repository is a personal study/demo project intended for learning and portfolio purposes only.

---

## Features

- CRUD operations for:
  - Clients
  - Products
  - Orders
- Swagger documentation for easy testing and onboarding
- TypeScript + Express structured and modular codebase
- MongoDB with Mongoose ODM
- Centralized error handling middleware for clean and consistent error responses
- Environment-based configuration using `.env` files

---

## 🚀 Tech Stack

- **Node.js** (v18+)
- **TypeScript**
- **Express**
- **MongoDB** with **Mongoose**
- **Swagger** (OpenAPI) for API documentation
- **dotenv** for environment variable management

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally or in Docker

### Installation

```bash
git clone https://github.com/danlb-dev/express-mongo-crud-api.git
cd express-mongo-crud-api
npm install
npm run start
```

Then open your browser at http://localhost:3200 to view the Swagger documentation.
