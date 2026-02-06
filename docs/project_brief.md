# GlobeTrotter – Travel Experience & Itinerary Platform

## 1. Project Overview

GlobeTrotter is a personalized travel planning and experience platform. Users can explore destinations, build itineraries, manage bookings, and share trips with friends. The system should handle user preferences, recommendations, multi-user collaboration, and integrate with third-party APIs (weather, maps, currency conversion).

This project will challenge you with recommendation logic, collaboration features, and external API integrations.

## 2. Scope & Features

### Core Features

**User Accounts & Profiles**

- Roles: User, Admin, Partner (e.g., hotel/guide).
- Secure authentication & social login (Google/Apple).

**Destination & Experience Management**

- Browse destinations (cities, landmarks, activities).
- Filter by budget, weather, type (adventure, luxury, cultural).
- User reviews & ratings.

**Itinerary Builder**

- Drag & drop daily planner.
- Add activities, accommodations, transport.
- Collaborate with friends (shared editing).

**Smart Recommendations**

- Based on user interests & past trips.
- Weather-aware suggestions.
- Budget-aware travel plans.

**Booking & Reservations (Stubbed)**

- Reserve hotels/activities (mock API).
- Payment flow placeholder.

**Sharing & Social**

- Share itineraries with friends.
- Generate a public “Trip Page” link.

**Admin Dashboard**

- Manage destinations, moderate reviews.
- View analytics (most popular trips, destinations).

## 3. Technical Requirements

**Backend**: NestJS (TypeScript).
**Database**: PostgreSQL + Prisma ORM.
**Authentication**: JWT + social logins (Google/Apple).
**External APIs**:

- OpenWeather API (weather).
- Google Maps API (locations, distances).
- Currency conversion API.

**Security**:

- Role-based access control.
- Rate limiting.
- Cloudflare protection (optional).

**Observability**:

- Request logging.
- Metrics (e.g., Prometheus/Grafana readiness).

**Deployment**: Docker, CI/CD pipeline.

## 4. Database Schema (Core Entities)

**Users**

- id (UUID)
- name, email, passwordHash
- role (USER, ADMIN, PARTNER)
- preferences (JSON)
- createdAt, updatedAt

**Destinations**

- id (UUID)
- name, country, description, imageUrl
- avgCost
- bestSeason
- createdAt, updatedAt

**Experiences**

- id (UUID)
- destinationId (FK → Destinations)
- title, type (adventure, luxury, culture, etc.)
- priceRange
- rating
- createdAt, updatedAt

**Itineraries**

- id (UUID)
- userId (FK → Users)
- title, description
- sharedWith (array of userIds)
- createdAt, updatedAt

**ItineraryItems**

- id (UUID)
- itineraryId (FK → Itineraries)
- dayNumber
- experienceId (FK → Experiences)
- notes

**Reviews**

- id (UUID)
- userId (FK → Users)
- destinationId (FK → Destinations)
- rating (1–5)
- comment
- createdAt

**Bookings (Stubbed)**

- id (UUID)
- userId (FK → Users)
- experienceId (FK → Experiences)
- status (PENDING, CONFIRMED, CANCELLED)
- createdAt

**Indexes**:

- email on Users (unique).
- destinationId on Experiences.
- itineraryId + dayNumber on ItineraryItems.
- userId + destinationId on Reviews.

## 5. Process Flows

**🔹 Itinerary Creation Flow**

1. User logs in.
2. Creates new itinerary.
3. Adds destinations & experiences.
4. System checks for conflicts (double-booked days).
5. User can share itinerary with friends → friends get edit access.

**🔹 Smart Recommendation Flow**

1. User visits Recommended Trips.
2. System fetches:
   - Past trip history.
   - Preferences (e.g., "beach", "adventure").
   - Current weather & budget.
3. Algorithm ranks destinations.
4. User sees top 5 suggestions.

**🔹 Review & Rating Flow**

1. User completes a trip.
2. Leaves review on destination or experience.
3. Admin moderates (approve/reject).
4. Approved reviews appear on frontend.

**🔹 Booking Flow (Stub)**

1. User selects an experience.
2. Clicks “Book Now”.
3. System creates booking entry (status = PENDING).
4. Placeholder for payment gateway.
5. User notified → status updated.

**🔹 Sharing Flow**

1. User clicks Share Trip.
2. System generates public trip page link.
3. Friends can view or collaborate (if invited).

## 6. Deliverables

- REST API with all modules.
- Swagger documentation.
- Docker setup + CI/CD pipeline.
- Test coverage (unit + integration).
- ERD diagram.

## 7. Timeline & Milestones

- **Week 1**: User auth + DB setup.
- **Week 2**: Destinations, Experiences, Reviews.
- **Week 3**: Itineraries + Smart Recommendations.
- **Week 4**: Bookings, Sharing, Admin dashboard.
- **Week 5**: Security, Observability, Testing.

## 8. Budget / Compensation

To be discussed.

## 9. Success Criteria

- Secure, scalable backend.
- Smart recommendation engine functional.
- External API integrations working.
- 90%+ test coverage.
- Clean documentation + diagrams.

---

# 🎨 Matching Frontend Prompt

## Project Brief – GlobeTrotter Frontend

Design a modern, engaging, and intuitive travel planning UI that makes exploring and building itineraries effortless. Think Airbnb + TripAdvisor + Notion-style planner.

### Key Pages

- **Landing Page** – Hero banner, top destinations, CTA to explore.
- **Destination Explorer** – Search, filter, cards for destinations.
- **Itinerary Builder** – Drag & drop timeline (calendar-style).
- **Trip Sharing Page** – Public shareable trip with map & highlights.
- **User Dashboard** – My trips, bookings, saved experiences.
- **Admin Dashboard** – Destination management, review moderation.

### UI/UX Requirements

- Built with **Next.js + Tailwind**.
- Responsive & mobile-first.
- Interactive maps (Google Maps API).
- Real-time collaboration indicators (like Google Docs cursors).
- Smooth animations (Framer Motion).
- Accessibility (WCAG 2.1 AA).


{
  _id: new ObjectId('697563a5dd930c1b62773cd2'),
  username: 'hckerson',
  createdAt: 2026-01-25T00:25:53.389Z,
  firstName: 'Hckerson',
  lastName: 'Lee',
  email: 'hckerson@gmail.com',
  emailVerified: true,
  role: 'admin',
  password: '$2b$10$Hy.trN1ic6TOvp0vJyHd4ejqHKfKswxTdsfiIhNyzFUC/JSGKlCYi',
  reviews: [],
  __v: 0
}