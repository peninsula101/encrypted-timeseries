# Time Series Data Streaming Application

This is a Node.js-based application that generates and streams encrypted time-series data over a WebSocket connection, listens for incoming data streams, decrypts and validates the data, and saves it to a MongoDB database. It also includes a frontend component to display real-time data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Emitter Service (Backend)](#emitter-service-backend)
  - [Listener Service (Backend)](#listener-service-backend)
  - [Frontend](#frontend)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB installed and running.

## Getting Started

### Emitter Service (Backend)

To start the emitter service:

```bash
cd SyookAssignment
npm install
node emitter.js
```

### Listener Service (Backend)

To start the listener service:

```bash
cd SyookAssignment
npm install
node listener.js
```

### Frontend

To start the frontend application:

```bash
cd frontend
npm install
npm start
```
