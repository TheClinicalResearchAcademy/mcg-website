# Monache Consulting Group - Clinical Research Services Website

## Overview

A responsive pharmaceutical clinical research services marketing website for Monache Consulting Group (MCG), a firm specializing in clinical research auditing, monitoring, business development, site enablement, and comprehensive training. The platform serves as both a marketing tool to attract pharmaceutical sponsors and a lead generation system for onboarding research-naïve sites into their network.

The website features a pharma-compliant design with trust elements including GCP, 21 CFR Part 11, and GDPR compliance badges, comprehensive service descriptions, and forms for site registration and contact inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with custom pharma-friendly color scheme (Deep Teal #0F766E, Cobalt Blue #1E40AF, Emerald #059669)
- **UI Components**: Shadcn UI component library providing consistent, accessible design patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful endpoints for lead generation and contact form submissions
- **Database Layer**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Storage**: In-memory storage implementation with interface for easy database integration
- **File Uploads**: Uppy integration with object storage capabilities for document handling

### Database Schema
- **Site Leads**: Comprehensive lead capture including site information, contact details, PI specialties, therapeutic areas, prior experience, and document uploads
- **Contact Messages**: Simple contact form submissions with company information
- **Users**: Basic user management structure for future authentication needs

### Form Validation and Data Flow
- **Client-side Validation**: Zod schemas shared between frontend and backend for consistent validation
- **Server-side Processing**: Express.js endpoints handle form submissions with proper error handling
- **Type Safety**: TypeScript interfaces ensure data consistency across the full stack

### File Upload System
- **Object Storage**: Integration with cloud storage services for document management
- **ACL Policies**: Role-based access control for uploaded documents
- **Upload Interface**: Modal-based file upload with progress tracking and preview capabilities

### Responsive Design System
- **Mobile-first Approach**: Tailwind CSS breakpoints ensure optimal experience across devices
- **Accessibility**: WCAG AA compliance with proper ARIA labels and focus management
- **Typography**: Custom font stack using Montserrat for headings and Inter for body text
- **Component Library**: Consistent design tokens and reusable components

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: PostgreSQL database connection for serverless environments
- **@tanstack/react-query**: Server state management and data fetching
- **@hookform/resolvers**: Form validation integration
- **wouter**: Lightweight routing library

### UI and Design
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for components
- **lucide-react**: Icon library for consistent iconography

### Form and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### File Management
- **@uppy/core**: Modular file uploader framework
- **@uppy/dashboard**: File upload interface components
- **@uppy/aws-s3**: AWS S3 integration for cloud storage
- **@google-cloud/storage**: Google Cloud Storage integration

### Development Tools
- **drizzle-kit**: Database migrations and schema management
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development tools and error handling