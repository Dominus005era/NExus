# TechMart Inventory Safety Stock & Reorder Policies

## 1. Safety Stock Calculation Formula
Safety stock ($SS$) is governed by:
$$SS = Z \times \sigma_L \times \sqrt{L}$$
Where:
- Service level target $Z = 1.65$ (95% non-stockout probability).
- Lead time standard deviation $\sigma_L = 1.2\text{ days}$.

## 2. Hard Minimum Thresholds
- **P100 (UltraGlide Mouse)**: Absolute Floor = 150 units. Reorder Trigger = 350 units.
- **P200 (ApexStrike Keyboard)**: Absolute Floor = 100 units. Reorder Trigger = 200 units.
- **P300 (SoundAura ANC)**: Absolute Floor = 50 units. Reorder Trigger = 100 units.
- **P400 (ClearVision Webcam)**: Absolute Floor = 80 units. Reorder Trigger = 180 units.
- **P500 (OmniPort USB Hub)**: Absolute Floor = 120 units. Reorder Trigger = 250 units.
