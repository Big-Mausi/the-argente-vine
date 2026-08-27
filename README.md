# Argenté Vine

Argenté Vine is a full-stack restaurant web application built to provide a polished customer-facing restaurant experience alongside an internal admin management system.

The application allows customers to explore the restaurant, browse the menu, send enquiries, and make reservations. Administrators can securely manage reservations, menu items, employees, and payroll.

## Features

### Customer Experience

- Restaurant landing page
- About section
- Menu browsing by category
- Interactive menu cards
- Reservation booking
- Contact form
- Responsive design for desktop, tablet, and mobile

### Admin Management

- Secure admin authentication
- Admin dashboard
- Reservation management
- Reservation status updates
- Reservation details
- Reservation deletion
- Menu item creation
- Menu item editing
- Menu item deletion
- Employee management
- Employee salary information
- Employee deactivation
- Payroll period management
- Payroll generation
- Payroll records
- Gross salary calculation
- Allowances and deductions
- Net salary calculation
- Payroll payment status
- Mark payroll records as paid

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Bootstrap 5
- Bootstrap Icons

### Backend

- Node.js
- Express
- TypeScript
- REST API

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- Session-based authentication
- HTTP-only cookies
- bcrypt password hashing

### Development Tools

- Git
- GitHub
- VS Code
- Figma

## Project Structure

```text
the-argente-vine/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── ...
│   │
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── generated/
│   │   └── ...
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── ...
│
└── README.md
```

## Application Architecture

The application follows a client-server architecture.

React + TypeScript
│
│ REST API
▼
Express + TypeScript
│
▼
Prisma ORM
│
▼
PostgreSQL

The frontend communicates with the backend through REST API endpoints.

The backend separates responsibilities across routes, controllers, services, authentication middleware, and database access.

## Database Models

The application currently uses the following main models:

Admin
Session
ContactMessage
MenuItem
Reservation
Employee
PayrollPeriod
PayrollRecord

## Payroll

Payroll is organized around payroll periods.
For example:

August 2026 Payroll
Start: August 1, 2026
End: August 31, 2026

A payroll period can contain payroll records for multiple employees.

Each payroll record stores:

Basic salary
Allowances
Deductions
Gross salary
Net salary
Payment status
Payment date

### Getting Started

## Prerequisites

Make sure you have installed:

Node.js
npm
PostgreSQL

Clone the Repository
git clone <your-repository-url>
cd the-argente-vine

Backend Setup

Navigate to the server directory:

cd server

Install dependencies:

npm install

## Environment Variables

Create a .env file:

DATABASE_URL="your-postgresql-connection-string"

Run Prisma migrations:

npx prisma migrate dev

Generate the Prisma client:

npx prisma generate

Start the development server:

npm run dev
Frontend Setup

Open another terminal and navigate to the client:

cd client

Install dependencies:

npm install

Create a .env file:

VITE_API_URL=http://localhost:4000/api

Start the development server:

npm run dev

The frontend will normally be available at:

http://localhost:5173
Environment Variables
Server
DATABASE_URL=
Client
VITE_API_URL=

## API Overview

Authentication
POST /api/auth/login
GET /api/auth/me
POST /api/auth/logout
Menu
GET /api/menu
POST /api/menu
PATCH /api/menu/:id
DELETE /api/menu/:id
Reservations
POST /api/reservations
GET /api/reservations
PATCH /api/reservations/:id/status
DELETE /api/reservations/:id
Employees
GET /api/employees
POST /api/employees
PATCH /api/employees/:id
PATCH /api/employees/:id/deactivate
Payroll
POST /api/payroll/periods
GET /api/payroll/periods
GET /api/payroll/periods/:id
POST /api/payroll/periods/:id/process

GET /api/payroll/records
GET /api/payroll/records/:id
PATCH /api/payroll/records/:id/pay

## Security

Administrative operations are protected using authenticated sessions.

Passwords are securely hashed using bcrypt, while authentication sessions are stored server-side and associated with authenticated administrators.

Protected admin endpoints require a valid authentication session.

### Current Scope

This version focuses on the core restaurant and internal administration workflow.

## V1

Restaurant website
Reservations
Menu management
Admin authentication
Employee management
Payroll management
Responsive interface

## V2 Planned Improvements

Payment system integration
Direct menu image uploads with cloud storage
Employee reactivation
Stronger employee audit/history controls
Additional administrative improvements

## Future Improvements

Possible future improvements include:

Online payment processing
Receipt generation
Payroll reports
Employee payroll history
Advanced search and filtering
Improved audit logging
Image upload and cloud storage
Additional admin analytics

## Author

Built as a full-stack web application project demonstrating modern frontend, backend, database, authentication, and administrative workflows.
