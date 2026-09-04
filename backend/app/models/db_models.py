from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Boolean,
    DateTime,
    ForeignKey,
    JSON,
    Text,
)
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(String(16), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    category = Column(String(64), nullable=False)
    unit_cost = Column(Float, nullable=False)
    selling_price = Column(Float, nullable=False)
    min_safety_stock = Column(Integer, nullable=False, default=100)
    reorder_point = Column(Integer, nullable=False, default=250)

    inventory = relationship("Inventory", back_populates="product", uselist=False)
    orders = relationship("Order", back_populates="product")
    supplier_links = relationship("SupplierProduct", back_populates="product")
    campaigns = relationship("Campaign", back_populates="product")


class Inventory(Base):
    __tablename__ = "inventory"

    product_id = Column(String(16), ForeignKey("products.id"), primary_key=True)
    current_stock = Column(Integer, nullable=False, default=0)
    allocated_stock = Column(Integer, nullable=False, default=0)
    incoming_stock = Column(Integer, nullable=False, default=0)
    warehouse_location = Column(String(64), default="Main-Rack-A")
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    product = relationship("Product", back_populates="inventory")


class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(String(16), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    rating = Column(Float, default=4.5)
    payment_terms_type = Column(String(32), nullable=False)  # IMMEDIATE, NET30, SPLIT50_50
    lead_time_days = Column(Integer, nullable=False)
    active = Column(Boolean, default=True)

    products = relationship("SupplierProduct", back_populates="supplier")


class SupplierProduct(Base):
    __tablename__ = "supplier_products"

    supplier_id = Column(String(16), ForeignKey("suppliers.id"), primary_key=True)
    product_id = Column(String(16), ForeignKey("products.id"), primary_key=True)
    unit_price = Column(Float, nullable=False)
    max_capacity_per_order = Column(Integer, nullable=False)
    min_order_quantity = Column(Integer, default=1)

    supplier = relationship("Supplier", back_populates="products")
    product = relationship("Product", back_populates="supplier_links")


class Order(Base):
    __tablename__ = "orders"

    id = Column(String(36), primary_key=True, index=True)
    order_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    product_id = Column(String(16), ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    channel = Column(String(32), default="D2C_WEBSITE")
    status = Column(String(32), default="COMPLETED")

    product = relationship("Product", back_populates="orders")


class FinancialLedger(Base):
    __tablename__ = "financial_ledger"

    id = Column(String(36), primary_key=True, index=True)
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)
    cash_balance = Column(Float, nullable=False)
    accounts_payable = Column(Float, nullable=False, default=0.0)
    accounts_receivable = Column(Float, nullable=False, default=0.0)
    daily_opex = Column(Float, nullable=False, default=25000.0)
    safe_procurement_reserve = Column(Float, nullable=False)


class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(String(32), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    target_product_id = Column(String(16), ForeignKey("products.id"), nullable=False)
    discount_pct = Column(Float, default=0.0)
    budget = Column(Float, default=0.0)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(String(32), default="ACTIVE")

    product = relationship("Product", back_populates="campaigns")


class DecisionLog(Base):
    __tablename__ = "decision_logs"

    id = Column(String(36), primary_key=True, index=True)
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)
    trigger_event = Column(String(64), nullable=False)
    product_id = Column(String(16), nullable=True)
    agent_evidence = Column(JSON, nullable=False)
    optimization_output = Column(JSON, nullable=False)
    human_action = Column(String(32), default="PENDING")  # PENDING, APPROVED, REJECTED, MODIFIED
    expected_roi = Column(Float, nullable=True)
    actual_outcome_roi = Column(Float, nullable=True)
    lessons_learned = Column(Text, nullable=True)
