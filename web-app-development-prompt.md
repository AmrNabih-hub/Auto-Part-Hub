# Professional Web Application Development Prompt

## Project Overview
Create a complete, production-ready web application from scratch with modern technologies and best practices. The application should be error-free, well-structured, and include both frontend and backend components with database integration.

## Technology Stack Requirements

### Frontend
- **React 18+** with functional components and hooks
- **React Router v6** for client-side routing
- **Tailwind CSS** for styling and responsive design
- **TypeScript** for type safety (recommended)
- **Vite** as build tool for optimal development experience

### Backend
- **Node.js** with **Express.js** framework
- **TypeScript** for backend type safety
- **RESTful API** design principles
- **JWT** authentication and authorization
- **Input validation** with libraries like Joi or Zod
- **Error handling** middleware
- **CORS** configuration
- **Rate limiting** for API protection

### Database
- **PostgreSQL** or **MongoDB** (specify preference)
- **Prisma ORM** (for PostgreSQL) or **Mongoose** (for MongoDB)
- **Database migrations** and seeding
- **Connection pooling** for performance
- **Environment-based configuration**

### Development Tools
- **ESLint** and **Prettier** for code quality
- **Husky** for git hooks
- **Jest** and **React Testing Library** for testing
- **Docker** for containerization (optional)
- **Environment variables** management

## Application Structure Requirements

### Frontend Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── ui/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── contexts/
│   └── styles/
├── package.json
└── tailwind.config.js
```

### Backend Structure
```
backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── config/
│   └── types/
├── prisma/ (or models/ for MongoDB)
├── tests/
└── package.json
```

## Core Features to Implement

### Authentication System
- User registration with email verification
- Secure login/logout functionality
- Password reset capability
- JWT token management
- Protected routes on both frontend and backend
- Role-based access control (Admin, User)

### User Management
- User profile management
- Avatar upload functionality
- Account settings
- User dashboard

### CRUD Operations
- Create, Read, Update, Delete operations for main entities
- Form validation on both client and server side
- Optimistic updates for better UX
- Error handling and user feedback

### UI/UX Requirements
- Fully responsive design (mobile-first approach)
- Loading states and skeleton screens
- Error boundaries for graceful error handling
- Toast notifications for user feedback
- Dark/light theme toggle
- Accessibility compliance (WCAG 2.1)
- SEO optimization

### Performance Optimization
- Code splitting and lazy loading
- Image optimization
- API response caching
- Database query optimization
- Bundle size optimization

## Security Requirements

### Frontend Security
- Input sanitization
- XSS protection
- Secure token storage
- Environment variable protection

### Backend Security
- SQL injection prevention
- Rate limiting
- CORS configuration
- Helmet.js for security headers
- Input validation and sanitization
- Secure password hashing (bcrypt)
- JWT token expiration and refresh

## Database Design

### Requirements
- Normalized database schema
- Proper indexing for performance
- Foreign key constraints
- Data validation at database level
- Backup and recovery strategy

### Common Tables/Collections
- Users (id, email, password_hash, role, created_at, updated_at)
- Sessions/Tokens for authentication
- Application-specific entities based on use case

## Error Handling Strategy

### Frontend
- Global error boundary
- API error handling
- Form validation errors
- Network error handling
- User-friendly error messages

### Backend
- Global error handling middleware
- Structured error responses
- Logging system (Winston or similar)
- Validation error handling
- Database error handling

## Testing Requirements

### Frontend Testing
- Unit tests for components
- Integration tests for user flows
- API mocking for tests
- Accessibility testing

### Backend Testing
- Unit tests for controllers and services
- Integration tests for API endpoints
- Database testing with test database
- Authentication flow testing

## Deployment Considerations

### Environment Setup
- Development, staging, and production environments
- Environment-specific configuration
- CI/CD pipeline setup
- Docker containerization

### Performance Monitoring
- Error tracking (Sentry or similar)
- Performance monitoring
- Database monitoring
- API response time tracking

## Development Best Practices

### Code Quality
- Consistent code formatting (Prettier)
- Linting rules (ESLint)
- TypeScript strict mode
- Component composition over inheritance
- Custom hooks for reusable logic

### Git Workflow
- Feature branch workflow
- Conventional commit messages
- Pre-commit hooks for code quality
- Pull request templates

### Documentation
- README with setup instructions
- API documentation (Swagger/OpenAPI)
- Component documentation (Storybook optional)
- Database schema documentation

## Specific Implementation Guidelines

### React Best Practices
- Use functional components with hooks
- Implement proper state management (Context API or Redux Toolkit)
- Optimize re-renders with useMemo and useCallback
- Implement proper error boundaries
- Use React.lazy for code splitting

### Tailwind CSS Guidelines
- Use utility-first approach
- Create custom components for repeated patterns
- Implement responsive design with Tailwind breakpoints
- Use Tailwind's dark mode features
- Optimize for production with purging

### API Design
- RESTful endpoint naming conventions
- Consistent response format
- Proper HTTP status codes
- API versioning strategy
- Request/response validation

## Success Criteria

The application should:
1. ✅ Run without any console errors or warnings
2. ✅ Be fully responsive across all device sizes
3. ✅ Have proper error handling and user feedback
4. ✅ Include comprehensive authentication system
5. ✅ Demonstrate CRUD operations with database
6. ✅ Follow security best practices
7. ✅ Include proper testing coverage
8. ✅ Be production-ready with proper deployment setup
9. ✅ Have clean, maintainable, and well-documented code
10. ✅ Demonstrate performance optimization techniques

## Example Application Ideas
- Task Management System
- E-commerce Platform
- Social Media Dashboard
- Blog/CMS Platform
- Inventory Management System
- Event Management Platform
- Learning Management System
- Customer Relationship Management (CRM)

## Final Deliverables
1. Complete source code with proper folder structure
2. Database schema and migration files
3. Comprehensive README with setup instructions
4. Environment configuration examples
5. API documentation
6. Deployment guide
7. Testing suite with good coverage

---

**Note**: This prompt ensures the creation of a professional, scalable, and maintainable web application that follows industry best practices and modern development standards. The resulting application should be production-ready and error-free.