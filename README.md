# Event Management API — Week 5

Backend Architecture Challenge: an event management API (create events, RSVP, list attendees) built with Python, FastAPI, and a relational database. Built to learn backend architecture, not just to ship endpoints — see tickets WK5-01 through WK5-13.

## Problem

Build an API where users can create events, RSVP to them, and list attendees.

**Constraints**
- 10k events, 100k users
- <100ms response time
- <$100/month to run (database, compute, traffic)

## Tech Stack

- Python 3.11+
- FastAPI + Uvicorn
- Pydantic (request/response validation)
- PostgreSQL + SQLAlchemy
- Pytest

## Project Structure

```
app/
  main.py              # FastAPI app entrypoint
  models/               # SQLAlchemy models (Event, User, RSVP)
  repositories/          # All DB access — one repository per table
  services/              # Business logic, calls repositories
  routers/               # Route handlers — thin, call services only
  exceptions.py          # Custom exceptions (EventNotFound, DuplicateRSVP, EventFull)
tests/
  test_events.py
  test_rsvp.py
docs/
  api_spec.md            # WK5-05: endpoints, status codes, error shapes
  performance_cost.md    # WK5-06: latency and cost estimates
  scaling_notes.md       # WK5-13: what breaks at 1M events / 10M users
```

Routes never talk to the database directly — they call a service, the service calls a repository. See WK5-07 for why.

## Setup

```bash
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic pytest

# create a .env with DATABASE_URL=postgresql://user:pass@localhost:5432/events

uvicorn app.main:app --reload
```

API docs available at `http://localhost:8000/docs` once running.

## Database Schema

Three tables: `events`, `users`, `rsvps` (join table between users and events). Indexes are placed based on the most frequent queries — listing attendees per event, and listing events per user. Full schema reasoning in `docs/api_spec.md` (WK5-04, WK5-05).

## API Endpoints

| Method | Path                     | Description                  |
|--------|--------------------------|-------------------------------|
| POST   | `/events`                | Create an event               |
| GET    | `/events`                | List events (paginated)       |
| GET    | `/events/{id}`           | Get a single event            |
| POST   | `/events/{id}/rsvp`      | RSVP to an event               |
| DELETE | `/events/{id}/rsvp`      | Cancel an RSVP                  |
| GET    | `/events/{id}/attendees` | List attendees for an event     |

Full status codes and error response shapes are in `docs/api_spec.md`.

## Error Handling

Expected failures raise specific exceptions, not generic 500s:

- `EventNotFound` → 404
- `DuplicateRSVP` → 409
- `EventFull` → 409

See WK5-11.

## Testing

```bash
pytest
```

Covers happy paths, edge cases (full event, duplicate RSVP, invalid IDs, missing fields), and one concurrency test simulating two simultaneous RSVPs for the last spot in an event. See WK5-12.

## Design Docs

- `docs/api_spec.md` — API contract, written before implementation (WK5-05)
- `docs/performance_cost.md` — latency and AWS cost estimates at 10k events / 100k users (WK5-06)
- `docs/scaling_notes.md` — what breaks at 1M events / 10M users, and what would replace it (WK5-13, feeds into Week 6)

## Tickets

This project maps to tickets WK5-01 through WK5-13: Python/FastAPI/SQL fundamentals, design-before-code, implementation with the repository pattern, and error handling and testing.