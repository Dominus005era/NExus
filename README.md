# 🚀 NEXUS: Autonomous AI Operating System for Business Decisions

> **"Don't just monitor your business. Let it reason about itself."**

NEXUS is a next-generation **multi-agent operational decision engine**. It connects **Sales**, **Inventory**, and **Finance** departments through specialized autonomous agents, a shared world state, Role-Based Knowledge Racks (RBAC), and a deterministic **Constrained Optimization Decision Engine**.

---

## ⚡ The Core Problem It Solves
Normally, organizations operate in disconnected departmental silos:
* **Marketing** launches a viral campaign $\rightarrow$ Demand spikes $+70\%$.
* **Sales** sees skyrocketing orders.
* **Inventory** faces imminent stockouts (1.17 days of buffer left).
* **Finance** has limited liquid cash reserves (Statutory ₹5,00,000 buffer must be protected).
* **Suppliers** have conflicting trade-offs (Fast & expensive vs Cheap & slow).

Most software only gives you disconnected dashboards. **NEXUS connects the dots and computes the mathematically optimal decision.**

---

## 🏗️ Architecture & Horizontal Execution Pipeline

```
[ CEO (Rahul) ] ──⚡──> [ AI Orchestrator ] ──⚡──> [ Specialized Agents ] ──⚡──> [ Decision Engine ] ──⚡──> [ Executive PO Card ]
                                                    ├── 🟦 Sales (+70.6% Demand)
                                                    ├── 🟩 Inventory (1.17d Depletion)
                                                    └── 🟨 Finance (₹1.8L Safe Cash Cap)
```

1. **Sales Agent**: Observes order velocity, active promotional campaigns, and outputs structured 7-day demand forecasts.
2. **Inventory Agent**: Evaluates stockout horizons, safety stock thresholds, and computes required replenishment deficits.
3. **Finance Agent**: Enforces working capital governance, statutory operating reserves, and evaluates supplier credit terms (Net-30 vs Advance).
4. **Constrained Decision Engine (OR-Tools)**: Solves the integer constrained optimization problem without hallucinating mathematical numbers.
5. **Swappable Foundation Models**: Hot-swap between **Gemini 2.0 Flash**, **Gemini 1.5 Pro**, **GPT-4o**, **GPT-4o Mini**, **Claude 3.5 Sonnet**, and **Built-in Offline Engine**.

---

## 📂 Project Structure

```text
NEXUS/
├── backend/
│   ├── app/
│   │   ├── agents/               # Autonomous agent modules (Sales, Inventory, Finance, Orchestrator)
│   │   ├── api/                  # REST API routes (overview, inventory, sales, finance, config, trigger)
│   │   ├── core/                 # Config & SQLAlchemy database connectors
│   │   ├── models/               # Relational DB models & Pydantic V2 schemas
│   │   └── services/
│   │       ├── data_generator.py # Synthetic company data seeder (5,229 realistic orders)
│   │       ├── decision_engine.py# Mathematical constrained optimization solver
│   │       ├── knowledge_hub.py  # Department document retriever with RBAC security
│   │       └── llm_provider.py   # Swappable multi-model foundation provider
│   ├── requirements.txt
│   └── .env.example
├── storage/
│   └── docs/                     # Department Document Racks
│       ├── sales/                # Promotional calendars, B2B wholesale agreements
│       ├── inventory/            # Warehouse staging limits, safety stock formulas
│       └── finance/              # Master supplier contracts, cash reserve policies
├── frontend/                     # React + Vite + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── HorizontalAgenticFlow.tsx # Live Side-by-Side visual pipeline
│   │   │   ├── ChatView.tsx              # ChatGPT-style executive copilot
│   │   │   ├── LandingPage.tsx           # Enterprise marketing landing page
│   │   │   ├── ModelSwitcherModal.tsx    # Click-to-swap model selector
│   │   │   ├── DocumentRackModal.tsx     # RBAC document rack browser
│   │   │   └── TimelineDrawer.tsx        # Chronological execution tracker
│   │   ├── services/api.ts               # Backend API integration client
│   │   └── types.ts                      # TypeScript definitions
│   └── package.json
├── tests/                        # 100% passing automated test suite
│   ├── test_baseline.py          # Ground truth & constraint solver tests
│   ├── test_api.py               # REST API integration tests
│   └── test_agents.py            # Multi-agent orchestration tests
├── SYSTEM_DESIGN.md              # Complete blueprint specification
└── README.md
```

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/Dominus005era/NExus.git
cd NExus
```

### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Seed the database (Creates products, suppliers, and 5,229 orders)
python -m backend.app.services.data_generator

# Start FastAPI backend
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
* Backend API & Swagger Docs: `http://localhost:8000/docs`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
* Open Frontend in browser: `http://localhost:5173`

---

## 🌐 100% Free Live Deployment Guide

| Component | Free Hosting Provider | Setup Instructions |
| :--- | :--- | :--- |
| **Database** | **[Neon.tech](https://neon.tech)** (PostgreSQL) | 1. Create a free PostgreSQL instance on Neon.<br>2. Copy connection string.<br>3. Set `DATABASE_URL` in backend `.env`. |
| **Backend** | **[Render.com](https://render.com)** (FastAPI) | 1. Create Web Service connected to GitHub.<br>2. Build: `pip install -r backend/requirements.txt`<br>3. Start: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT` |
| **Frontend** | **[Vercel](https://vercel.com)** (React Vite) | 1. Import repository on Vercel.<br>2. Root directory: `frontend`<br>3. Env variable: `VITE_API_URL = https://your-render-url.onrender.com/api/v1` |
| **AI Models** | **[Google AI Studio](https://aistudio.google.com)** | Free Gemini 2.0 Flash API key *(or runs on built-in offline engine with zero config)*. |

---

## 🧪 Automated Tests
Run the comprehensive 10-test verification suite:
```bash
python -m pytest -s tests/
```

---

## 📜 License
MIT License. Built for **HackVilla 2026**.
