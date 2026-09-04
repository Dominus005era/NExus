import uuid
import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from backend.app.core.database import engine, Base, SessionLocal
from backend.app.models.db_models import (
    Product,
    Inventory,
    Supplier,
    SupplierProduct,
    Order,
    FinancialLedger,
    Campaign,
)

def seed_database():
    """Initializes and seeds the TechMart operational database."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # 1. Products
        products_data = [
            Product(
                id="P100",
                name="UltraGlide Wireless Ergonomic Mouse",
                category="Accessories",
                unit_cost=450.0,
                selling_price=1299.0,
                min_safety_stock=150,
                reorder_point=350,
            ),
            Product(
                id="P200",
                name="ApexStrike RGB Mechanical Keyboard",
                category="Gaming Peripherals",
                unit_cost=1400.0,
                selling_price=3499.0,
                min_safety_stock=100,
                reorder_point=200,
            ),
            Product(
                id="P300",
                name="SoundAura Active ANC Headphones",
                category="Audio",
                unit_cost=3200.0,
                selling_price=7999.0,
                min_safety_stock=50,
                reorder_point=100,
            ),
            Product(
                id="P400",
                name="ClearVision 4K Pro Stream Webcam",
                category="Video & Streaming",
                unit_cost=1800.0,
                selling_price=4299.0,
                min_safety_stock=80,
                reorder_point=180,
            ),
            Product(
                id="P500",
                name="OmniPort 7-in-1 Aluminum USB-C Hub",
                category="Connectivity",
                unit_cost=650.0,
                selling_price=1699.0,
                min_safety_stock=120,
                reorder_point=250,
            ),
        ]
        db.add_all(products_data)
        db.commit()

        # 2. Inventory (P100 set in critical stockout territory for Scenario 1)
        inventory_data = [
            Inventory(product_id="P100", current_stock=320, allocated_stock=40, incoming_stock=0),
            Inventory(product_id="P200", current_stock=240, allocated_stock=20, incoming_stock=100),
            Inventory(product_id="P300", current_stock=110, allocated_stock=10, incoming_stock=50),
            Inventory(product_id="P400", current_stock=195, allocated_stock=15, incoming_stock=0),
            Inventory(product_id="P500", current_stock=310, allocated_stock=30, incoming_stock=200),
        ]
        db.add_all(inventory_data)
        db.commit()

        # 3. Suppliers
        suppliers_data = [
            Supplier(
                id="SUP-A",
                name="Apex Global Logistics",
                rating=4.2,
                payment_terms_type="IMMEDIATE",
                lead_time_days=14,
                active=True,
            ),
            Supplier(
                id="SUP-B",
                name="QuickLogix Domestic Express",
                rating=4.8,
                payment_terms_type="NET30",
                lead_time_days=3,
                active=True,
            ),
            Supplier(
                id="SUP-C",
                name="Zenith Direct Components",
                rating=4.5,
                payment_terms_type="SPLIT50_50",
                lead_time_days=7,
                active=True,
            ),
        ]
        db.add_all(suppliers_data)
        db.commit()

        # 4. Supplier Products with specific pricing multipliers & capacities
        supplier_products_data = [
            # P100 (Mouse)
            SupplierProduct(supplier_id="SUP-A", product_id="P100", unit_price=450.0, max_capacity_per_order=1500, min_order_quantity=300),
            SupplierProduct(supplier_id="SUP-B", product_id="P100", unit_price=477.0, max_capacity_per_order=400, min_order_quantity=50),
            SupplierProduct(supplier_id="SUP-C", product_id="P100", unit_price=436.5, max_capacity_per_order=600, min_order_quantity=100),
            # P200 (Keyboard)
            SupplierProduct(supplier_id="SUP-A", product_id="P200", unit_price=1400.0, max_capacity_per_order=800, min_order_quantity=100),
            SupplierProduct(supplier_id="SUP-B", product_id="P200", unit_price=1484.0, max_capacity_per_order=300, min_order_quantity=30),
            SupplierProduct(supplier_id="SUP-C", product_id="P200", unit_price=1358.0, max_capacity_per_order=500, min_order_quantity=50),
            # P300 (Headphones)
            SupplierProduct(supplier_id="SUP-A", product_id="P300", unit_price=3200.0, max_capacity_per_order=400, min_order_quantity=50),
            SupplierProduct(supplier_id="SUP-B", product_id="P300", unit_price=3392.0, max_capacity_per_order=150, min_order_quantity=20),
            SupplierProduct(supplier_id="SUP-C", product_id="P300", unit_price=3104.0, max_capacity_per_order=300, min_order_quantity=40),
            # P400 (Webcam)
            SupplierProduct(supplier_id="SUP-A", product_id="P400", unit_price=1800.0, max_capacity_per_order=600, min_order_quantity=50),
            SupplierProduct(supplier_id="SUP-B", product_id="P400", unit_price=1908.0, max_capacity_per_order=250, min_order_quantity=25),
            SupplierProduct(supplier_id="SUP-C", product_id="P400", unit_price=1746.0, max_capacity_per_order=450, min_order_quantity=50),
            # P500 (Hub)
            SupplierProduct(supplier_id="SUP-A", product_id="P500", unit_price=650.0, max_capacity_per_order=1200, min_order_quantity=200),
            SupplierProduct(supplier_id="SUP-B", product_id="P500", unit_price=689.0, max_capacity_per_order=400, min_order_quantity=50),
            SupplierProduct(supplier_id="SUP-C", product_id="P500", unit_price=630.5, max_capacity_per_order=700, min_order_quantity=100),
        ]
        db.add_all(supplier_products_data)
        db.commit()

        # 5. Financial Ledger Initial State
        ledger = FinancialLedger(
            id=str(uuid.uuid4()),
            timestamp=datetime.utcnow(),
            cash_balance=850000.0,            # ₹8.5 Lakhs total cash
            accounts_payable=120000.0,
            accounts_receivable=340000.0,
            daily_opex=28000.0,
            safe_procurement_reserve=180000.0, # ₹1.8 Lakhs safe spend cap
        )
        db.add(ledger)
        db.commit()

        # 6. Active Campaign
        now = datetime.utcnow()
        campaign = Campaign(
            id="CAMP-STREAMER-Q3",
            name="Streamer Setup 2026 Creator Partnership",
            target_product_id="P100",
            discount_pct=0.077, # ₹1299 -> ₹1199
            budget=75000.0,
            start_date=now - timedelta(days=2),
            end_date=now + timedelta(days=12),
            status="ACTIVE",
        )
        db.add(campaign)
        db.commit()

        # 7. Historical Sales (Past 90 days of realistic orders)
        channels = ["D2C_WEBSITE", "AMAZON", "RETAIL_B2B"]
        orders = []
        base_demand_map = {"P100": 85, "P200": 40, "P300": 20, "P400": 35, "P500": 65}
        selling_prices = {"P100": 1299.0, "P200": 3499.0, "P300": 7999.0, "P400": 4299.0, "P500": 1699.0}

        for day_offset in range(90, 0, -1):
            order_date = now - timedelta(days=day_offset)
            is_weekend = order_date.weekday() >= 5

            for pid, base_qty in base_demand_map.items():
                # Spike for P100 over the last 3 days
                if pid == "P100" and day_offset <= 3:
                    daily_orders = int(base_qty * random.uniform(1.65, 1.85)) # +70% surge
                else:
                    weekend_mult = 1.3 if (is_weekend and pid == "P200") else 1.0
                    noise = random.uniform(0.85, 1.15)
                    daily_orders = max(1, int(base_qty * weekend_mult * noise))

                # Batch orders into customer transactions per day
                remaining = daily_orders
                while remaining > 0:
                    batch_qty = max(1, min(remaining, random.randint(1, 8)))
                    remaining -= batch_qty
                    orders.append(
                        Order(
                            id=str(uuid.uuid4()),
                            order_date=order_date + timedelta(hours=random.randint(8, 22), minutes=random.randint(0, 59)),
                            product_id=pid,
                            quantity=batch_qty,
                            unit_price=selling_prices[pid],
                            channel=random.choice(channels),
                            status="COMPLETED",
                        )
                    )

        db.add_all(orders)
        db.commit()
        print(f"[SUCCESS] Successfully seeded TechMart database with {len(orders)} historical orders!")

    except Exception as e:
        db.rollback()
        print(f"[ERROR] Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

