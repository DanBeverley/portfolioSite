# Portfolio.AI - AI Engineer Portfolio Website

## Overview

This is a full-stack portfolio website for an AI Engineer, built with React frontend and Express backend. The application allows showcasing projects with CRUD functionality, protected by Replit Auth for admin operations. The design follows a minimalist aesthetic with light grey (#F5F5F5) and black (#111) color palette.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a pages-based architecture with reusable components. Key pages include Home (project gallery), About, Project Detail, and Admin pages (Dashboard, Create, Edit).

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: Replit Auth (OpenID Connect integration)
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **API Pattern**: REST endpoints with Zod validation schemas shared between client and server

The server follows a modular structure with separate files for routes, storage (database operations), and authentication. The `shared/` directory contains schemas and route definitions used by both frontend and backend.

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` - contains projects table and auth-related tables
- **Migrations**: Managed via Drizzle Kit (`drizzle-kit push` for schema sync)

Key tables:
- `projects`: Portfolio projects with title, description, image URL, project URL, repo URL, and tags (JSONB)
- `users`: User profiles for Replit Auth
- `sessions`: Session storage for authentication

### Authentication & Authorization
- **Method**: Replit Auth via OpenID Connect
- **Protected Routes**: Project creation, update, and deletion require authentication
- **Session Duration**: 7 days with secure, HTTP-only cookies

## External Dependencies

### Third-Party Services
- **Replit Auth**: OpenID Connect authentication provider (configured via ISSUER_URL)
- **PostgreSQL Database**: Provisioned via Replit's database service

### Key NPM Packages
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Form Handling**: React Hook Form with Zod resolver
- **Database**: drizzle-orm, drizzle-zod, pg (PostgreSQL client)
- **Authentication**: passport, openid-client, express-session

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session encryption
- `REPL_ID`: Replit environment identifier (auto-set by Replit)
- `ISSUER_URL`: OpenID Connect issuer (defaults to Replit's OIDC endpoint)