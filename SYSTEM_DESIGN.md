# NEXUS: AI Operating System for Autonomous Business Operations
## System Design Blueprint & Operational Architecture

---

## 1. Company Profile: TechMart Electronics

**TechMart** is a fast-growing omni-channel electronics and accessories retailer. It operates a regional warehouse, fulfills direct-to-consumer online orders, and supplies regional retail partners.

### Core Product Catalog
| SKU | Product Name | Unit Cost (₹) | Selling Price (₹) | Gross Margin | Daily Base Demand | Volatility / Seasonality |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **P100** | UltraGlide Wireless Ergonomic Mouse | ₹450 | ₹1,299 | 65.3% | 85 units/day | High (Viral promo elasticity) |
| **P200** | ApexStrike RGB Mechanical Keyboard | ₹1,400 | ₹3,499 | 60.0% | 40 units/day | Moderate (Gaming weekend spikes) |
| **P300** | SoundAura Active ANC Headphones | ₹3,200 | ₹7,999 | 60.0% | 20 units/day | Low (High ticket, steady) |
| **P400** | ClearVision 4K Pro Stream Webcam | ₹1,800 | ₹4,299 | 58.1% | 35 units/day | High (Remote work/creator trends) |
| **P500** | OmniPort 7-in-1 Aluminum USB-C Hub | ₹650 | ₹1,699 | 61.7% | 65 units/day | Moderate (Bundle sales) |

### Supplier Profiles & Trade-Offs
| Supplier | Profile | Lead Time | Unit Cost Modifier | Capacity / Order | Payment Terms | Contractual Flexibility |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Supplier A (Apex Global)** | High-capacity overseas vendor | **12–14 days** | **Base Price (1.00x)** | Up to 1,500 units | **100% Upfront** (Immediate cash outflow) | Rigid MOQ of 300 units; no rush orders. |
| **Supplier B (QuickLogix)** | Fast domestic distributor | **3 days** | **Premium (+6% / 1.06x)** | Up to 400 units | **Net-30 Days** (Zero immediate cash impact) | Guaranteed 3-day SLA; max 400 units/week. |
| **Supplier C (Zenith Direct)** | Mid-tier local manufacturer | **7 days** | **Discount (-3% / 0.97x)** | Up to 600 units | **50% Advance / 50% on Delivery** | Contract Clause 4.2: +15% surge capacity during emergencies for 5% surcharge. |

---

## 2. System Architecture & Component Interactions

```
                            ┌─────────────────────────────────────────┐
                            │               USER / COO                │
                            │  "Resolve Demand Surge for Product P100" │
                            └────────────────────┬────────────────────┘
                                                 │
                                                 ↓
                            ┌─────────────────────────────────────────┐
                            │             AI ORCHESTRATOR             │
                            │  • Event Dispatcher                     │
                            │  • Task Parallelizer                    │
                            │  • Evidence Aggregator                  │
                            └────────────────────┬────────────────────┘
                                                 │
            ┌────────────────────────────────────┼────────────────────────────────────┐
            │                                    │                                    │
            ↓                                    ↓                                    ↓
   ┌──────────────────┐                ┌──────────────────┐                ┌──────────────────┐
   │   SALES AGENT    │                │ INVENTORY AGENT  │                │  FINANCE AGENT   │
   │                  │                │                  │                │                  │
   │ • Demand Predict │                │ • Stockout Prob  │                │ • Cash Runway    │
   │ • Growth Traj.   │                │ • Safety Stock   │                │ • Supplier Terms │
   │ • Promo Impact   │                │ • Reorder Deficit│                │ • Budget Ceiling │
   └────────┬─────────┘                └────────┬─────────┘                └────────┬─────────┘
            │                                    │                                    │
            └────────────────────────────────────┼────────────────────────────────────┘
                                                 │ (Structured Pydantic JSONs)
                                                 ↓
                            ┌─────────────────────────────────────────┐
                            │            SHARED WORLD STATE           │
                            │ • Current Stock & Incoming Purchase Orders│
                            │ • Live Cash & Projected Accounts Payable │
                            │ • Validated Multi-Agent Evidence         │
                            └────────────────────┬────────────────────┘
                                                 │
                                                 ↓
                            ┌─────────────────────────────────────────┐
                            │       CONSTRAINED DECISION ENGINE       │
                            │                                         │
                            │ Maximize: Net Expected Profit           │
                            │ Subject to:                             │
                            │   - Cash Outflow <= Safe Budget         │
                            │   - Delivery Time <= Stockout Horizon   │
                            │   - Order Quantity <= Supplier Capacity │
                            └────────────────────┬────────────────────┘
                                                 │
                                                 ↓
                            ┌─────────────────────────────────────────┐
                            │        EXPLAINABILITY & PROPOSAL        │
                            │  • LLM Rationale Generation             │
                            │  • Trade-off Transparency               │
                            │  • Confidence & Risk Ratings            │
                            └────────────────────┬────────────────────┘
                                                 │
                                                 ↓
                            ┌─────────────────────────────────────────┐
                            │         HUMAN-IN-THE-LOOP UI            │
                            │  [ APPROVE ]    [ MODIFY ]    [ REJECT ]│
                            └────────────────────┬────────────────────┘
                                                 │ (Approved Action)
                                                 ↓
                            ┌─────────────────────────────────────────┐
                            │        EXECUTION & MEMORY STORE         │
                            │ • Issue PO to Suppliers                 │
                            │ • Update Financial & Inventory Ledger   │
                            │ • Embed (Situation, Decision, Outcome)  │
                            └─────────────────────────────────────────┘
```

---

## 3. Relational Database Schema (Ground Truth)

### Tables Definition

#### `products`
* `id`: `VARCHAR(16)` PRIMARY KEY (e.g. `'P100'`)
* `name`: `VARCHAR(128)` NOT NULL
* `category`: `VARCHAR(64)` NOT NULL
* `unit_cost`: `NUMERIC(10, 2)` NOT NULL
* `selling_price`: `NUMERIC(10, 2)` NOT NULL
* `min_safety_stock`: `INTEGER` NOT NULL (e.g. 150 units)
* `reorder_point`: `INTEGER` NOT NULL (e.g. 350 units)

#### `inventory`
* `product_id`: `VARCHAR(16)` PRIMARY KEY REFERENCES `products(id)`
* `current_stock`: `INTEGER` NOT NULL
* `allocated_stock`: `INTEGER` DEFAULT 0
* `incoming_stock`: `INTEGER` DEFAULT 0
* `warehouse_location`: `VARCHAR(64)` DEFAULT `'Main-Rack-A'`
* `last_updated`: `TIMESTAMP` NOT NULL

#### `suppliers`
* `id`: `VARCHAR(16)` PRIMARY KEY (e.g. `'SUP-A'`)
* `name`: `VARCHAR(128)` NOT NULL
* `rating`: `FLOAT` (1.0 to 5.0)
* `payment_terms_type`: `VARCHAR(32)` (`'IMMEDIATE'`, `'NET30'`, `'SPLIT50_50'`)
* `lead_time_days`: `INTEGER` NOT NULL
* `active`: `BOOLEAN` DEFAULT TRUE

#### `supplier_products`
* `supplier_id`: `VARCHAR(16)` REFERENCES `suppliers(id)`
* `product_id`: `VARCHAR(16)` REFERENCES `products(id)`
* `unit_price`: `NUMERIC(10, 2)` NOT NULL
* `max_capacity_per_order`: `INTEGER` NOT NULL
* `min_order_quantity`: `INTEGER` DEFAULT 1
* PRIMARY KEY (`supplier_id`, `product_id`)

#### `orders` (Historical & Live Sales)
* `id`: `VARCHAR(36)` PRIMARY KEY
* `order_date`: `TIMESTAMP` NOT NULL
* `product_id`: `VARCHAR(16)` REFERENCES `products(id)`
* `quantity`: `INTEGER` NOT NULL
* `unit_price`: `NUMERIC(10, 2)` NOT NULL
* `channel`: `VARCHAR(32)` (`'D2C_WEBSITE'`, `'AMAZON'`, `'RETAIL_B2B'`)
* `status`: `VARCHAR(32)` (`'COMPLETED'`, `'PENDING'`, `'CANCELLED'`)

#### `financial_ledger`
* `id`: `VARCHAR(36)` PRIMARY KEY
* `timestamp`: `TIMESTAMP` NOT NULL
* `cash_balance`: `NUMERIC(12, 2)` NOT NULL
* `accounts_payable`: `NUMERIC(12, 2)` NOT NULL
* `accounts_receivable`: `NUMERIC(12, 2)` NOT NULL
* `daily_opex`: `NUMERIC(10, 2)` NOT NULL
* `safe_procurement_reserve`: `NUMERIC(12, 2)` NOT NULL

#### `marketing_campaigns`
* `id`: `VARCHAR(32)` PRIMARY KEY
* `name`: `VARCHAR(128)` NOT NULL
* `target_product_id`: `VARCHAR(16)` REFERENCES `products(id)`
* `discount_pct`: `FLOAT` NOT NULL
* `budget`: `NUMERIC(10, 2)` NOT NULL
* `start_date`: `TIMESTAMP` NOT NULL
* `end_date`: `TIMESTAMP` NOT NULL
* `status`: `VARCHAR(32)` (`'SCHEDULED'`, `'ACTIVE'`, `'COMPLETED'`)

#### `decision_logs` (Organizational Memory)
* `id`: `VARCHAR(36)` PRIMARY KEY
* `timestamp`: `TIMESTAMP` NOT NULL
* `trigger_event`: `VARCHAR(64)` NOT NULL
* `product_id`: `VARCHAR(16)`
* `agent_evidence`: `JSON` NOT NULL
* `optimization_output`: `JSON` NOT NULL
* `human_action`: `VARCHAR(32)` (`'APPROVED'`, `'MODIFIED'`, `'REJECTED'`)
* `expected_roi`: `NUMERIC(10, 2)`
* `actual_outcome_roi`: `NUMERIC(10, 2)` NULLABLE (filled retroactively)
* `lessons_learned`: `TEXT` NULLABLE

---

## 4. Unstructured Knowledge Hub (Department Document Racks)

```
storage/docs/
├── sales/
│   ├── q3_promotional_calendar.md     # Details on upcoming flash sales and creator partnerships
│   ├── b2b_wholesale_agreements.md    # Retail partner volume commitments & minimum allocations
│   └── regional_demand_analysis.md    # Geographic shift notes and price elasticity findings
├── inventory/
│   ├── warehouse_operating_limits.md  # Maximum volumetric capacity, cold storage, bin constraints
│   ├── logistics_sla_standards.md     # Inbound receiving delay buffers and transit damage policy
│   └── safety_stock_guidelines.md     # Standard deviation formulas and critical product thresholds
└── finance/
    ├── supplier_contracts_master.md   # Exact payment terms, credit limits, emergency clauses for SUP A/B/C
    ├── cash_reserve_governance.md     # Minimum working capital buffer rules (e.g. Keep ₹5,00,000 liquid)
    └── capital_allocation_policy.md   # Hurdle rates, emergency procurement ROI requirements
```

---

## 5. Role-Based Knowledge Access (RBAC) Matrix

Agents are autonomous software programs that query the knowledge hub. To prevent unauthorized or out-of-domain hallucinations, the Knowledge Layer enforces deterministic access tokens:

| Resource Directory / Document | Sales Agent | Inventory Agent | Finance Agent | AI Orchestrator |
| :--- | :---: | :---: | :---: | :---: |
| `docs/sales/*` | **READ/WRITE** | READ (Demand only) | READ (Revenue only) | FULL READ |
| `docs/inventory/*` | READ (Stockout alerts) | **READ/WRITE** | READ (Storage cost) | FULL READ |
| `docs/finance/supplier_contracts` | DENIED | READ (Lead-time/Flexibility only) | **READ/WRITE** | FULL READ |
| `docs/finance/cash_reserve` | DENIED | DENIED | **READ/WRITE** | FULL READ |
| `docs/finance/capital_allocation` | DENIED | DENIED | **READ/WRITE** | FULL READ |

---

## 6. Real-World Cross-Functional Conflict Scenarios

### Scenario 1: The Viral Demand Spike (Core Demo Scenario)
* **Trigger Event**: Tech influencer features **P100 Mouse**, increasing daily demand from **85 units/day $\rightarrow$ 145 units/day (+70%)**.
* **Current State**:
  * Inventory: 320 units on hand. Safety Stock: 150 units.
  * Stockout Horizon: $\frac{320 - 150}{145} = 1.17\text{ days}$ (Depletion in 2.2 days total).
* **Agent Deliberation**:
  * **Sales Agent**: Forecasts 1,015 units demand over next 7 days. Urges reordering 800+ units immediately.
  * **Inventory Agent**: Needs minimum 550 units to cover lead time + restore safety stock.
  * **Finance Agent**: Liquid cash reserve is ₹3,50,000. Upfront cash budget capped at ₹1,80,000 to maintain payroll safety buffer.
  * **Supplier Constraints**:
    * Supplier A: Cheap (₹450/unit), but 12-day delivery will cause a 10-day stockout (Lost revenue = ₹1,88,355).
    * Supplier B: ₹477/unit, 3-day delivery, Net-30 payment (Zero immediate cash draw), max capacity 400 units.
    * Supplier C: ₹436/unit, 7-day delivery, 50% cash advance (₹436 * 0.5 = ₹218/unit), capacity 600 units.
* **Decision Engine Resolution**:
  * Split Procurement:
    * Order **400 units from Supplier B** (Arrives in 3 days; avoids stockout; Net-30 saves cash today).
    * Order **300 units from Supplier C** (Arrives in 7 days; 50% advance = ₹65,400 $\le$ ₹1,80,000 cash cap; replenishes baseline stock).
  * **Result**: Stockout risk dropped from 94% $\rightarrow$ 8%, cash impact fully contained, zero stockout days.

---

## 7. Mathematical Formulation of the Decision Engine

Let:
* $i \in S$ be the set of suppliers $\{A, B, C\}$.
* $x_i \ge 0$ be the integer units ordered from supplier $i$.
* $c_i$ be the unit purchase cost from supplier $i$.
* $p$ be the selling price of the product.
* $L_i$ be the lead time (days) of supplier $i$.
* $K_i$ be the maximum capacity of supplier $i$.
* $u_i \in [0, 1]$ be the upfront cash percentage required by supplier $i$ (e.g. $1.0$ for Sup A, $0.0$ for Sup B, $0.5$ for Sup C).
* $D_{\text{deficit}}$ be the required quantity to meet forecast demand $D$ and safety stock $S_{\text{safe}}$ given current stock $I_0$:
  $$D_{\text{deficit}} = \max(0, D + S_{\text{safe}} - I_0)$$
* $B_{\text{cash}}$ be the safe upfront procurement budget approved by the Finance Agent.
* $H_{\text{stockout}}$ be the stockout horizon in days: $H_{\text{stockout}} = \frac{I_0}{\text{Daily Demand}}$.

### Optimization Objective (Maximize Total Expected Net Margin minus Stockout Penalty):
$$\max_{x_i} \sum_{i \in S} \left( (p - c_i) \cdot x_i \right) - \lambda \cdot \text{UnmetDeficit} - \sum_{i \in S} \text{Penalty}(L_i, H_{\text{stockout}}) \cdot x_i$$

### Subject to:
1. **Demand Deficit Cap**: $\sum_{i \in S} x_i \le D_{\text{deficit}} + \text{Buffer}$
2. **Supplier Capacity**: $0 \le x_i \le K_i \quad \forall i \in S$
3. **Cash Budget Constraint**: $\sum_{i \in S} (c_i \cdot u_i) \cdot x_i \le B_{\text{cash}}$
4. **Lead-time Urgency Condition**: If $L_i > H_{\text{stockout}}$, prioritize fast supplier ($L_j \le H_{\text{stockout}}$) for immediate replenishment.
