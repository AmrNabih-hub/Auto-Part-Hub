# Car Parts Web App: Senior Engineer Build & Architecture Guide (Laravel Edition)

## 1. Project Purpose & High-Level Overview

This project is a robust, scalable e-commerce platform for car parts, architected with **Laravel 12** (API backend, authentication, RBAC, business logic) and **React** (frontend, Vite, Tailwind CSS). The system is designed for maintainability, security, and extensibility, supporting user, vendor, and admin roles, with a focus on clean separation of concerns and modern development best practices.

---

## 2. Architectural Rationale & Technology Choices

### Why Laravel 12 (Backend)
- **Mature Ecosystem:** Laravel offers a rich set of features (ORM, migrations, queues, policies, events) that accelerate development and reduce boilerplate.
- **Security:** Out-of-the-box protections (CSRF, XSS, SQL injection), plus Sanctum for SPA authentication.
- **Maintainability:** Clear MVC structure, service providers, and middleware make the codebase easy to extend and refactor.
- **Testing:** Built-in support for feature/unit testing and database factories.
- **Community:** Large, active community and excellent documentation.

### Why React + Vite (Frontend)
- **Component-based UI:** React enables modular, reusable UI components.
- **Developer Experience:** Vite offers fast HMR and modern build tooling.
- **TypeScript:** (if enabled) adds type safety and maintainability.
- **Tailwind CSS:** Utility-first styling for rapid, consistent UI development.

### Database: SQLite (Dev), MySQL/PostgreSQL (Prod)
- **SQLite** is used for local development due to its simplicity and zero-config setup.
- **MySQL/PostgreSQL** are recommended for production for scalability and robustness.

---

## 3. System Features & Security Considerations
- **Authentication:** Laravel Sanctum for SPA token-based auth; Google OAuth for social login.
- **Authorization:** Role-based access control (RBAC) via middleware and policies.
- **Product Catalog:** Filtering, search, and detail views.
- **Shopping Cart & Checkout:** Stateless cart (frontend context) and order processing (backend).
- **Admin/Vendor Dashboards:** Segregated access and CRUD operations.
- **Error Monitoring:** Sentry integration for both backend and frontend.
- **API-First:** All business logic exposed via RESTful endpoints.
- **Testing:** Comprehensive test suites for backend and frontend.

---

## 4. Directory & Asset Structure

```
car-parts-project/
  backend/           # Laravel 12 backend (API, models, controllers, policies)
  frontend-temp/     # React frontend (Vite, TypeScript, Tailwind)
  public/images/     # Product and UI images
  ...
```

- **Images:** `/public/images/` (e.g., `air filter.png`, `mechanic.png`) are referenced in product and UI components.
- **Separation of Concerns:** Backend and frontend are decoupled for scalability and independent deployment.

---

## 5. Environment & Configuration Management

- **Backend:**
  - Use `.env` for all sensitive/environment-specific config (DB, mail, Sentry DSN, OAuth keys).
  - Never commit secrets to version control.
  - Example critical settings:
    - `DB_CONNECTION=sqlite` (dev), `DB_CONNECTION=mysql` (prod)
    - `SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1,frontend-domain`
    - `SESSION_DOMAIN` and `CORS` settings for SPA auth
- **Frontend:**
  - Use `.env` or Vite config for API base URLs and Sentry DSN.
  - Ensure CORS is configured on the backend to allow frontend requests.

---

## 6. Step-by-Step Build Instructions

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 18.x & npm
- SQLite (for local dev)
- Git
- Docker (optional, for containerized setup)

### Backend Setup (Laravel 12 + Sanctum)
1. **Clone the repository:**
   ```sh
   git clone <repo-url> car-parts-project
   cd car-parts-project/backend
   ```
2. **Install dependencies:**
   ```sh
   composer install
   ```
3. **Configure environment:**
   ```sh
   cp .env.example .env
   # Edit .env: set DB_CONNECTION=sqlite and DB_DATABASE=../database/database.sqlite
   # Set mail, Sentry, and OAuth credentials as needed
   ```
4. **Create SQLite database file:**
   ```sh
   touch ../database/database.sqlite
   ```
5. **Generate app key:**
   ```sh
   php artisan key:generate
   ```
6. **Run migrations and seeders:**
   ```sh
   php artisan migrate --seed
   ```
7. **Sanctum configuration:**
   - Sanctum is pre-installed. Ensure `api` middleware group includes `EnsureFrontendRequestsAreStateful` for SPA auth.
   - Set `SANCTUM_STATEFUL_DOMAINS` in `.env` to your frontend domain(s).
8. **Run backend server:**
   ```sh
   php artisan serve
   ```
   - API available at `http://localhost:8000`.

### Frontend Setup (React + Vite)
1. **Navigate to frontend directory:**
   ```sh
   cd ../frontend-temp
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure API endpoints:**
   - Set API base URL in `src/api/` or `.env` (e.g., `VITE_API_URL=http://localhost:8000/api`).
   - Ensure CORS is enabled on backend for frontend origin.
4. **Run the frontend:**
   ```sh
   npm run dev
   ```
   - App available at `http://localhost:5173` (default Vite port).

### Database Setup
- **Development:** SQLite (see backend setup above).
- **Production:** Use MySQL/PostgreSQL. Update `.env` and run migrations.

### Dockerized Setup (Optional)
- Use `docker-compose.yml` for full-stack local development:
   ```sh
   docker-compose up --build
   ```
- This will start backend, frontend, and database containers. Adjust environment variables as needed.

---

## 7. Testing & Quality Assurance

- **Backend:**
  - Run all tests: `php artisan test`
  - Add feature/unit tests for all business logic and API endpoints.
  - Use factories and seeders for reproducible test data.
- **Frontend:**
  - Run tests: `npm test`
  - Use React Testing Library and Jest for component and integration tests.
- **CI/CD:**
  - Integrate with GitHub Actions, GitLab CI, or similar for automated testing and deployment.

---

## 8. Security & Best Practices

- **Authentication:** Use HTTPS in production. Store tokens securely (httpOnly cookies for SPA auth).
- **Authorization:** Always check user roles/permissions on the backend.
- **Input Validation:** Use Laravel Form Requests for validation and sanitization.
- **Error Handling:** Integrate Sentry for real-time error monitoring (backend and frontend).
- **Environment Separation:** Use different `.env` files for local, staging, and production.
- **Secrets Management:** Never commit secrets; use environment variables or secret managers.

---

## 9. Troubleshooting & Maintenance
- **CORS Issues:** Check `config/cors.php` and `SANCTUM_STATEFUL_DOMAINS`.
- **Database Issues:** Ensure the SQLite file exists and is writable; check DB credentials for production.
- **Image Issues:** Confirm all images are present in `/public/images/` and referenced correctly.
- **OAuth Issues:** Verify Google credentials and redirect URIs.
- **Testing Failures:** Run migrations and seeders before tests; check for missing environment variables.

---

## 10. Extensibility & Future Enhancements
- **Modularization:** Use Laravel service providers and repositories for scalable business logic.
- **API Versioning:** Plan for `/api/v1/`, `/api/v2/` endpoints as the app grows.
- **Background Jobs:** Use Laravel queues for email, notifications, and heavy processing.
- **Monitoring:** Expand Sentry, add health checks, and use Laravel Telescope for debugging.
- **Deployment:** Use Envoy, Forge, or GitHub Actions for zero-downtime deployments.

---

## 11. Credits & Contact
- Built with Laravel 12, Sanctum 12, React, Vite, Tailwind CSS.
- Images: `/public/images/`.
- For support, see `contact.html` or contact the project maintainer. 