# 📖 Shared Electricity Bill Calculator - User Guide

> A comprehensive guide for non-technical users to understand and use the Shared Electricity Bill Calculator effectively.

---

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Understanding Your CEB Bill](#-understanding-your-ceb-bill)
3. [Getting Started](#-getting-started)
4. [Calculator Features](#-calculator-features)
5. [Step-by-Step Usage](#-step-by-step-usage)
6. [Understanding the Results](#-understanding-the-results)
7. [Scenarios & Examples](#-scenarios--examples)
   - [Scenario 1: Normal Usage (Below Threshold)](#scenario-1-normal-usage-below-threshold)
   - [Scenario 2: High Usage (Above Threshold - Collective)](#scenario-2-high-usage-above-threshold---collective-breach)
   - [Scenario 3: Single Shop Breaker](#scenario-3-single-shop-exceeds-threshold-breaker)
   - [Scenario 4: Equal vs Proportional Split](#scenario-4-equal-vs-proportional-split)
8. [Key Concepts Explained](#-key-concepts-explained)
9. [Frequently Asked Questions](#-frequently-asked-questions)
10. [Troubleshooting](#-troubleshooting)

---

## 🌟 Introduction

This calculator helps **building owners** and **shop tenants** fairly split a shared electricity bill. When multiple shops share one CEB electricity meter, the calculator determines how much each shop should pay based on their actual usage.

### Who Should Use This Calculator?

- 🏢 **Building Owners** with multiple rental shops
- 🏪 **Shop Tenants** who want to verify their share
- 📊 **Accountants** managing shared utility bills

### What Problems Does It Solve?

1. **Fair Distribution** - Splits bills based on actual consumption
2. **Penalty Protection** - Protects shops from CEB's high-rate charges
3. **Transparency** - Shows detailed breakdown for each shop
4. **Threshold Breaker Accountability** - Identifies shops causing high rates

---

## 💡 Understanding Your CEB Bill

Before using the calculator, understand these key values from your CEB bill:

### CEB GP1 Tariff (General Purpose - Category 1)

| Usage Level | Rate per Unit | Fixed Charge | When Applied |
|-------------|---------------|--------------|--------------|
| **Low Rate** | Rs. 25.00 | Rs. 500.00 | ≤ 180 units/month |
| **High Rate** | Rs. 34.00 | Rs. 1,600.00 | > 180 units/month |

> ⚠️ **Important:** When you exceed 180 units, CEB charges the HIGH rate for **ALL** units from unit #1, not just the excess!

### SSCL Tax (Social Security Contribution Levy)

SSCL is **2.5%** of your bill, calculated as:

$$\text{SSCL} = \text{Subtotal} \times \frac{2.5}{97.5} = \text{Subtotal} \times 0.025641$$

### Dynamic Threshold

The 180-unit threshold is for a 30-day month. For different billing periods:

$$\text{Threshold} = \frac{180}{30} \times \text{Billing Days}$$

| Billing Days | Threshold |
|--------------|-----------|
| 28 days | 168 units |
| 29 days | 174 units |
| 30 days | 180 units |
| 31 days | 186 units |

---

## 🚀 Getting Started

### Opening the Calculator

1. **Download** or **clone** the project files
2. Open the `index.html` file in any web browser
3. The calculator loads instantly - no installation needed!

### Interface Overview

![Calculator Interface](../assets/calculator-interface.png)

| Section | Description |
|---------|-------------|
| **Header** | Title, language selector, dark mode toggle |
| **Bill Details** | Enter your CEB bill information |
| **Fair Rate Settings** | Configure the fair rates for shops |
| **Shop Units** | Add shops and their consumption |
| **Results** | Detailed breakdown after calculation |

---

## ⚙️ Calculator Features

### 🌐 Multi-Language Support
- **English** - Default language
- **සිංහල (Sinhala)** - Full Sinhala translation

### 🌙 Dark Mode
- Toggle dark mode for comfortable viewing at night
- Settings are saved automatically

### 🖨️ Print Ready
- Clean print layout
- Perfect for record keeping and sharing

### 💾 Auto-Save
- Remembers your language and theme preferences
- No need to reconfigure each time

---

## 📝 Step-by-Step Usage

### Step 1: Enter Bill Details

| Field | What to Enter | Where to Find It |
|-------|---------------|------------------|
| **Total Charge (LKR)** | Total amount before SSCL | "Total Charges" on CEB bill |
| **Fixed Charge (LKR)** | Fixed/service charges | "Fixed Charge" row on bill |
| **CEB SSCL Tax** | Auto-calculated | Leave as-is (auto-fills) |
| **Billing Days** | Number of days in bill | Top of CEB bill |

### Step 2: Set Fair Rates

| Field | Default | Description |
|-------|---------|-------------|
| **Fair Unit Rate** | Rs. 25.00 | Rate per unit shops will pay |
| **Fair Fixed Charge** | Rs. 500.00 | Fixed charge to share among shops |

> 💡 **Tip:** Use CEB's LOW rates as fair rates to protect shops from penalty charges.

### Step 3: Add Shops

1. Click **"Add Shop"** button
2. Enter the **Shop Name** (e.g., "Hardware Store")
3. Enter **Units Consumed** (from sub-meter reading)
4. Repeat for all shops

### Step 4: Choose Split Method

| Method | Best For | How It Works |
|--------|----------|--------------|
| **Equal Split** | Similar-sized shops | Fixed charge divided equally |
| **Proportional Split** | Varied consumption | Fixed charge based on usage % |

### Step 5: Calculate

Click the **"Calculate"** button to see results!

---

## 📊 Understanding the Results

### Summary Card

Shows overall statistics:
- **Total Units** - Combined consumption
- **Usage Threshold** - Maximum before penalty
- **Threshold Status** - Below/Above threshold indicator

### Shop Blocks

Each shop shows:
- **Units Consumed** - Usage and percentage
- **Energy Cost** - Units × Rate
- **Fixed Charge** - Share of fixed charges
- **Redistributed Fixed** - Extra from breaker (if applicable)
- **SSCL Tax** - Tax on subtotal
- **Shop Total** - Final amount to pay

### Penalty Section

When usage exceeds threshold:
- **CEB Total Bill** - What CEB charges
- **Total from Shops** - What shops pay
- **Building Owner Penalty** or **Remaining Gap** - Difference

### Verification Section

Confirms calculations match:
- Total from Shops + Penalty = CEB Total Bill ✓

---

## 📋 Scenarios & Examples

---

### Scenario 1: Normal Usage (Below Threshold)

**Situation:** 3 shops with total 74 units (below 180 threshold)

#### Input Values
| Field | Value |
|-------|-------|
| Total Charge | Rs. 2,350.00 |
| Fixed Charge | Rs. 500.00 |
| Billing Days | 30 |
| Fair Unit Rate | Rs. 25.00 |
| Fair Fixed Charge | Rs. 500.00 |

| Shop | Units |
|------|-------|
| Shop 1 | 56 |
| Shop 2 | 17 |
| Shop 3 | 1 |
| **Total** | **74** |

#### Threshold Check
```
Threshold = (180 ÷ 30) × 30 = 180 units
Total Units = 74 < 180 ✅ BELOW THRESHOLD - No Penalty!
```

#### Results (Equal Split)

| Shop | Units | Energy | Fixed Share | SSCL | **Total** |
|------|-------|--------|-------------|------|-----------|
| Shop 1 | 56 | 1,400.00 | 166.67 | 40.17 | **Rs. 1,606.84** |
| Shop 2 | 17 | 425.00 | 166.67 | 15.17 | **Rs. 606.84** |
| Shop 3 | 1 | 25.00 | 166.67 | 4.91 | **Rs. 196.58** |

#### Summary
```
✅ No Penalty - Usage is within threshold
Total from Shops: Rs. 2,410.26
CEB Total Bill: Rs. 2,410.26 ✓
```

---

### Scenario 2: High Usage (Above Threshold - Collective Breach)

**Situation:** 3 shops with total 200 units, but NO single shop exceeds 180

#### Input Values
| Field | Value |
|-------|-------|
| Total Charge | Rs. 8,400.00 |
| Fixed Charge | Rs. 1,600.00 |
| Billing Days | 30 |
| Fair Unit Rate | Rs. 25.00 |
| Fair Fixed Charge | Rs. 500.00 |

| Shop | Units |
|------|-------|
| Shop 1 | 80 |
| Shop 2 | 70 |
| Shop 3 | 50 |
| **Total** | **200** |

#### Threshold Check
```
Threshold = 180 units
Total Units = 200 > 180 ⚠️ ABOVE THRESHOLD

Individual Check:
- Shop 1: 80 units < 180 ✅ Not a breaker
- Shop 2: 70 units < 180 ✅ Not a breaker
- Shop 3: 50 units < 180 ✅ Not a breaker

Result: COLLECTIVE BREACH - No single shop caused this
```

#### Results (Equal Split)

| Shop | Units | Energy (@ Rs.25) | Fixed Share | SSCL | **Total** |
|------|-------|------------------|-------------|------|-----------|
| Shop 1 | 80 | 2,000.00 | 166.67 | 55.56 | **Rs. 2,222.23** |
| Shop 2 | 70 | 1,750.00 | 166.67 | 49.14 | **Rs. 1,965.81** |
| Shop 3 | 50 | 1,250.00 | 166.67 | 36.32 | **Rs. 1,452.99** |

#### Building Owner Penalty
```
CEB Total Bill: Rs. 8,615.38
Total from Shops: Rs. 5,641.03
───────────────────────────────
Building Owner Penalty: Rs. 2,974.35 🚨
```

> 📝 **Explanation:** Since no single shop caused the threshold breach, the building owner absorbs the penalty. This is the "cost of sharing one meter."

---

### Scenario 3: Single Shop Exceeds Threshold (Breaker)

**Situation:** Shop 2 uses 200 units alone (exceeds 180 threshold)

#### Input Values
| Field | Value |
|-------|-------|
| Total Charge | Rs. 10,338.00 |
| Fixed Charge | Rs. 1,600.00 |
| Billing Days | 30 |
| Fair Unit Rate | Rs. 25.00 |
| Fair Fixed Charge | Rs. 500.00 |

| Shop | Units | Status |
|------|-------|--------|
| Shop 1 | 56 | ✅ Innocent |
| Shop 2 | 200 | ❌ **Threshold Breaker** |
| Shop 3 | 1 | ✅ Innocent |
| **Total** | **257** | |

#### Threshold Check
```
Threshold = 180 units

Individual Check:
- Shop 1: 56 units < 180 ✅ Innocent
- Shop 2: 200 units > 180 ❌ BREAKER!
- Shop 3: 1 unit < 180 ✅ Innocent

Result: Shop 2 alone caused the threshold breach!
```

#### Breaker Penalty Logic

**Shop 2 (Breaker) Pays:**
1. ✅ **High Rate** for ALL their units (200 × Rs. 34)
2. ✅ **Fixed Charge Penalty** (Rs. 1,100 difference)
3. ❌ **NO Fair Fixed Share** (their share goes to innocent shops)

**Innocent Shops Pay:**
1. ✅ **Fair Rate** (Rs. 25/unit)
2. ✅ **Their Fair Fixed Share**
3. ✅ **Redistributed Fixed** from breaker's share

#### Results (Equal Split with Redistribution)

| Shop | Energy | Rate | Fixed Share | Redistributed | Penalty | SSCL | **Total** |
|------|--------|------|-------------|---------------|---------|------|-----------|
| Shop 1 | 56 × 25 = 1,400 | Fair | 166.67 | +83.33 | - | 42.31 | **Rs. 1,692.31** |
| Shop 2 | 200 × 34 = 6,800 | High | 0 | - | 1,100.00 | 202.56 | **Rs. 8,102.56** |
| Shop 3 | 1 × 25 = 25 | Fair | 166.67 | +83.33 | - | 7.05 | **Rs. 282.05** |

#### Redistribution Explanation
```
Shop 2's Fair Fixed Share = Rs. 500 ÷ 3 = Rs. 166.67
This amount is redistributed to innocent shops:
- Shop 1 gets: Rs. 166.67 ÷ 2 = Rs. 83.33 extra
- Shop 3 gets: Rs. 166.67 ÷ 2 = Rs. 83.33 extra
```

#### Summary
```
Total from Shops: Rs. 10,076.92
CEB Total Bill: Rs. 10,603.03
───────────────────────────────
Remaining Gap: Rs. 526.11 (Building Owner)
```

> 📝 **Key Point:** Shop 2 caused the high rates, so they pay the penalty. Innocent shops are protected at fair rates. The remaining gap is from CEB charging high rates on innocent shops' units.

---

### Scenario 4: Equal vs Proportional Split

**Same data, different split methods:**

| Shop | Units | Usage % |
|------|-------|---------|
| Shop 1 | 56 | 75.68% |
| Shop 2 | 17 | 22.97% |
| Shop 3 | 1 | 1.35% |

#### Equal Split Results

| Shop | Fixed Share | Calculation |
|------|-------------|-------------|
| Shop 1 | Rs. 166.67 | 500 ÷ 3 |
| Shop 2 | Rs. 166.67 | 500 ÷ 3 |
| Shop 3 | Rs. 166.67 | 500 ÷ 3 |

#### Proportional Split Results

| Shop | Fixed Share | Calculation |
|------|-------------|-------------|
| Shop 1 | Rs. 378.38 | (56/74) × 500 |
| Shop 2 | Rs. 114.86 | (17/74) × 500 |
| Shop 3 | Rs. 6.76 | (1/74) × 500 |

#### Comparison

| Shop | Equal Split Total | Proportional Total | Difference |
|------|-------------------|-------------------|------------|
| Shop 1 (56 units) | Rs. 1,612.27 | Rs. 1,823.98 | **+Rs. 211.71** |
| Shop 2 (17 units) | Rs. 605.51 | Rs. 553.70 | **-Rs. 51.81** |
| Shop 3 (1 unit) | Rs. 192.48 | Rs. 32.57 | **-Rs. 159.91** |

#### Which Should You Choose?

| Method | Best When | Benefits |
|--------|-----------|----------|
| **Equal Split** | Shops have similar usage | Simpler, predictable |
| **Proportional Split** | Usage varies significantly | Fairer for low-usage shops |

---

## 🔑 Key Concepts Explained

### What is the "Threshold"?

The GP1 tariff threshold (180 units/30 days) determines which rate CEB charges:
- **Below 180:** Low rate (Rs. 25/unit, Rs. 500 fixed)
- **Above 180:** High rate (Rs. 34/unit, Rs. 1,600 fixed)

### What is a "Threshold Breaker"?

A shop that **individually** uses more than 180 units. This shop alone caused the high rates, so they should bear the penalty.

### What is "Fair Rate"?

The standard low rate (Rs. 25/unit) that shops would pay if they had their own meter. The calculator protects shops by charging fair rates while the building owner absorbs excess CEB charges.

### What is "Redistribution"?

When a breaker shop exists:
- They pay penalty but NOT their fair fixed share
- Their fair share is split among innocent shops
- This prevents double-charging the breaker

### What is the "Remaining Gap"?

Even after breaker penalties, there may be a gap because:
- CEB charged high rates on innocent shops' units too
- Fixed charge difference (Rs. 1,600 - Rs. 500 = Rs. 1,100)
- Building owner absorbs this remaining amount

---

## ❓ Frequently Asked Questions

### Q: Why doesn't the total from shops equal the CEB bill?

**A:** When usage exceeds threshold, CEB charges higher rates. The calculator protects shops at fair rates, so the building owner absorbs the difference (penalty).

### Q: Why does the breaker shop pay Rs. 34/unit instead of Rs. 25?

**A:** The breaker caused the high-rate situation. It's fair that they pay the rate they caused, not the innocent shops.

### Q: Can there be multiple breaker shops?

**A:** Yes! If multiple shops each exceed 180 units, they all share the fixed penalty equally.

### Q: What if ALL shops are breakers?

**A:** Unlikely scenario, but each would pay high rate and share the fixed penalty. Building owner has minimal or no gap.

### Q: Why does my SSCL calculation look different from the CEB bill?

**A:** The calculator uses the official formula: `Subtotal × (2.5/97.5)`. Minor rounding differences may occur.

### Q: Can I use this for residential buildings?

**A:** This calculator is designed for **GP1 (General Purpose)** commercial tariff. Residential tariffs have different rate structures.

---

## 🔧 Troubleshooting

### Calculator Not Loading

1. **Clear browser cache** (Ctrl+F5)
2. Try a different browser (Chrome recommended)
3. Check JavaScript is enabled

### Calculations Look Wrong

1. Verify all input values match your CEB bill
2. Check billing days is correct
3. Ensure shop units total matches meter reading

### Dark Mode Text Not Visible

1. Refresh the page (Ctrl+F5)
2. Toggle dark mode off and on
3. Clear browser cache

### Print Layout Issues

1. Use Chrome or Firefox for best results
2. Set print scale to 100%
3. Select "Portrait" orientation

---

## 📞 Support

If you encounter issues or have suggestions:

1. **GitHub Issues:** [Report a Bug](https://github.com/mRasika/Shared-Electricity-Bill-Calculator/issues)
2. **GitHub Discussions:** [Ask Questions](https://github.com/mRasika/Shared-Electricity-Bill-Calculator/discussions)

---

## 📜 Version History

| Version | Date | Changes |
|---------|------|---------|
| v2.3 | Jan 2026 | Proportional redistribution for breaker's share |
| v2.2 | Jan 2026 | Fair redistribution - breaker pays penalty only |
| v2.1 | Jan 2026 | Fixed Sinhala translations |
| v2.0 | Jan 2026 | Per-shop SSCL, breaker penalty logic |
| v1.0 | Dec 2025 | Initial release |

---

> 💡 **Tip:** Bookmark this guide for quick reference when using the calculator!

---

*Last Updated: January 2026*
