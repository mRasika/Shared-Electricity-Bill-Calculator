# ⚡ Shared Electricity Bill Calculator

A simple, user-friendly web application to calculate and split shared electricity bills among multiple shops or tenants fairly.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

- **Smart Bill Splitting** - Split electricity bills based on actual unit consumption
- **SSCL Tax Support** - Includes SSCL (Social Security Contribution Levy) tax in calculations
- **Equal Split** - Fixed charges and SSCL tax divided equally among all shops
- **Proportional Split** - Option to split charges based on usage percentage
- **🆕 Building Owner Penalty Calculation** - Calculates penalty when usage exceeds GP1 threshold
- **🆕 Dynamic Threshold** - Automatically adjusts threshold based on billing days
- **🆕 Fair Rate Protection** - Shops pay fair market rate; building owner absorbs excess charges
- **Multi-Shop Support** - Add unlimited shops with custom names
- **Dark Mode** - Eye-friendly dark theme option
- **Multi-Language** - Supports English and සිංහල (Sinhala)
- **Print Ready** - Clean print layout for record keeping
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Offline Capable** - No server required, runs entirely in the browser
- **Persistent Settings** - Remembers your dark mode and language preferences

## 🚀 Demo

Simply open the `index.html` file in any modern web browser to start using the calculator.

## 📖 How to Use

1. **Enter Total Charge** - Input the total charge amount from your CEB bill (includes fixed charge)
2. **Enter Fixed Charge** - Input the fixed/service charges from your bill
3. **Enter SSCL Tax** - Input the SSCL tax amount from your bill
4. **Enter Billing Days** - Number of days in the billing period (default: 30)
5. **Set Fair Rate** - Standard rate per unit for shops (default: Rs. 25)
6. **Set Fair Fixed** - Standard fixed charge to share among shops (default: Rs. 500)
7. **Add Shops** - Add shops and enter the units consumed by each
8. **Calculate** - Click the Calculate button to see the breakdown
9. **Print/Share** - Use the Print button to save or print the results

## 🧮 Calculation Formula

### Standard Calculation (Fair Rate)
```
For each shop (Protected at Fair Rate):
├── Energy Cost = Shop Units × Fair Rate (Rs. 25/unit)
├── Fixed Charge Share = Fair Fixed ÷ Number of Shops (Equal Split)
│   OR = (Shop Units ÷ Total Units) × Fair Fixed (Proportional Split)
├── SSCL Tax Share = (Shop Units ÷ Total Units) × SSCL Tax
└── Shop Total = Energy Cost + Fixed Charge Share + SSCL Tax Share
```

### Penalty Calculation (GP1 Tariff)
```
Dynamic Threshold = (180 ÷ 30) × Billing Days

If Total Units > Threshold:
├── CEB charges HIGH RATE (Rs. 32/unit, Rs. 1,500 fixed)
├── Shops still pay FAIR RATE (Rs. 25/unit, Rs. 500 fixed shared)
└── Building Owner Penalty = Total Bill Charge - Fair Energy Total - Fair Fixed

Building Owner absorbs the penalty (cost of not having separate meters)
```

### SSCL Tax Formula (Auto-Calculated)

The SSCL (Social Security Contribution Levy) is **2.5%** applied to the Total Bill Amount:

$$\text{SSCL Tax} = \text{Total Charge} \times 0.025$$

**Example Calculation:**
```
Total Charge = Rs. 2,350.00
SSCL Tax = 2,350 × 0.025 = Rs. 58.75
Grand Total = 2,350 + 58.75 = Rs. 2,408.75
```

**High Usage Example (179 Units / 29 Days):**
```
Energy Charge = 179 × 32.00 = Rs. 5,728.00
Fixed Charge = Rs. 1,500.00
Total Charge = Rs. 7,228.00

SSCL Tax = 7,228.00 × 0.025 = Rs. 180.70
Grand Total = 7,228.00 + 180.70 = Rs. 7,408.70
```

> **Note:** The SSCL Tax field is automatically calculated when you enter the Total Charge.

Total Bill = Total Charge + SSCL Tax

## 📊 Example Use Case

Here's a real-world example with 3 shops sharing an electricity connection:

### Input Values

| Parameter          | Value        |
| ------------------ | ------------ |
| Total Charge (LKR) | Rs. 2,350.00 |
| Fixed Charge (LKR) | Rs. 500.00   |
| SSCL Tax (LKR)     | Rs. 60.26    |
| Total Units        | 74           |
| Shop 1 Usage       | 56 units     |
| Shop 2 Usage       | 17 units     |
| Shop 3 Usage       | 1 unit       |

### Calculation Breakdown

**Step 1: Calculate Unit Cost**

```
Charge for Units = 2,350 - 500 = Rs. 1,850.00
Unit Cost = 1,850 ÷ 74 = Rs. 25.00 per unit
```

**Step 2: Calculate Each Shop's Share**

| Shop   | Units | Energy Cost            | Fixed Charge Share   | SSCL Tax Share              | Total            |
| ------ | ----- | ---------------------- | -------------------- | --------------------------- | ---------------- |
| Shop 1 | 56    | 56 × 25 = Rs. 1,400.00 | 500 ÷ 3 = Rs. 166.67 | (56/74) × 60.26 = Rs. 45.60 | **Rs. 1,612.27** |
| Shop 2 | 17    | 17 × 25 = Rs. 425.00   | 500 ÷ 3 = Rs. 166.67 | (17/74) × 60.26 = Rs. 13.84 | **Rs. 605.51**   |
| Shop 3 | 1     | 1 × 25 = Rs. 25.00     | 500 ÷ 3 = Rs. 166.67 | (1/74) × 60.26 = Rs. 0.81   | **Rs. 192.48**   |

**Step 3: Verify Total**

```
Grand Total = 1,612.27 + 605.51 + 192.48 = Rs. 2,410.26
Expected Total = Total Charge + SSCL Tax = 2,350 + 60.26 = Rs. 2,410.26 ✓
```

> **Note:** Fixed Charge uses **Equal Split** (divided equally among shops), while SSCL Tax uses **Proportional Split** (based on usage percentage) by default.

---

### 🔄 Same Example with Full Proportional Split

If you enable **Proportional Split** for Fixed Charge (see Developer Notes), here's how the same example would calculate:

**Proportional Formula:**

```
Fixed Charge Share = (Shop Units ÷ Total Units) × Fixed Charge
SSCL Tax Share = (Shop Units ÷ Total Units) × SSCL Tax
```

**Calculation with Proportional Split:**

| Shop   | Units | Usage % | Energy Cost  | Fixed Charge Share         | SSCL Tax Share              | Total            |
| ------ | ----- | ------- | ------------ | -------------------------- | --------------------------- | ---------------- |
| Shop 1 | 56    | 75.68%  | Rs. 1,400.00 | (56/74) × 500 = Rs. 378.38 | (56/74) × 60.26 = Rs. 45.60 | **Rs. 1,823.98** |
| Shop 2 | 17    | 22.97%  | Rs. 425.00   | (17/74) × 500 = Rs. 114.86 | (17/74) × 60.26 = Rs. 13.84 | **Rs. 553.70**   |
| Shop 3 | 1     | 1.35%   | Rs. 25.00    | (1/74) × 500 = Rs. 6.76    | (1/74) × 60.26 = Rs. 0.81   | **Rs. 32.57**    |

**Verify Total:**

```
Grand Total = 1,823.98 + 553.70 + 32.57 = Rs. 2,410.25 ≈ Rs. 2,410.26 ✓
```

### 📈 Comparison: Equal vs Proportional Split

| Shop   | Units | Equal Split Total | Proportional Split Total | Difference  |
| ------ | ----- | ----------------- | ------------------------ | ----------- |
| Shop 1 | 56    | Rs. 1,612.27      | Rs. 1,823.98             | +Rs. 211.71 |
| Shop 2 | 17    | Rs. 605.51        | Rs. 553.70               | -Rs. 51.81  |
| Shop 3 | 1     | Rs. 192.48        | Rs. 32.57                | -Rs. 159.91 |

**Key Insights:**

- 🏪 **Shop 1 (56 units)** pays **Rs. 211.71 more** with proportional split - fair for high usage
- 🏪 **Shop 2 (17 units)** saves **Rs. 51.81** with proportional split
- 🏪 **Shop 3 (1 unit)** saves **Rs. 159.91** with proportional split - biggest benefit for lowest usage

> **Which to choose?**
>
> - **Equal Split** - Simpler, benefits high-usage shops
> - **Proportional Split** - Fairer, low-usage shops pay less of the shared charges

---

## 🚨 High Usage Example (With Penalty)

When total consumption exceeds the GP1 threshold, CEB charges higher rates. Here's how the calculator handles this:

### Input Values (High Usage)
| Parameter | Value |
|-----------|-------|
| Total Charge (LKR) | Rs. 8,400.00 |
| Fixed Charge (LKR) | Rs. 1,600.00 |
| SSCL Tax (LKR) | Rs. 215.38 |
| Billing Days | 30 |
| Fair Unit Rate | Rs. 25.00 |
| Fair Fixed Charge | Rs. 500.00 |
| Total Units | 200 |
| Shop 1 Usage | 40 units |
| Shop 2 Usage | 150 units |
| Shop 3 Usage | 10 units |

### Threshold Check
```
Threshold = (180 ÷ 30) × 30 = 180 units
Total Units = 200 > 180 ⚠️ ABOVE THRESHOLD - Penalty Applies!
```

### Shop Calculations (Protected at Fair Rate)

| Shop | Units | Usage % | Energy Cost (Fair) | Fixed Share (Prop) | SSCL Tax Share | Total |
|------|-------|---------|--------------------|--------------------|----------------|-------|
| Shop 1 | 40 | 20% | 40 × 25 = Rs. 1,000.00 | (40/200) × 500 = Rs. 100.00 | (40/200) × 215.38 = Rs. 43.08 | **Rs. 1,143.08** |
| Shop 2 | 150 | 75% | 150 × 25 = Rs. 3,750.00 | (150/200) × 500 = Rs. 375.00 | (150/200) × 215.38 = Rs. 161.54 | **Rs. 4,286.54** |
| Shop 3 | 10 | 5% | 10 × 25 = Rs. 250.00 | (10/200) × 500 = Rs. 25.00 | (10/200) × 215.38 = Rs. 10.77 | **Rs. 285.77** |

### Building Owner Penalty Calculation
```
CEB Total Bill = Total Charge + SSCL = 8,400 + 215.38 = Rs. 8,615.38
Fair Energy Total = 200 × 25 = Rs. 5,000.00
Fair Fixed Charge = Rs. 500.00

Building Owner Penalty = Total Charge - Fair Energy - Fair Fixed
                       = 8,400 - 5,000 - 500 = Rs. 2,900.00 🚨
```

### Summary
| Item | Amount |
|------|--------|
| Total from Shops | Rs. 5,715.38 |
| Building Owner Penalty | Rs. 2,900.00 |
| **Grand Total** | **Rs. 8,615.38** |
| CEB Total Bill | Rs. 8,615.38 ✓ |

> **Key Point:** The Rs. 2,900 penalty is the "cost of not having separate meters". Shops are protected and pay fair market rate, while the building owner absorbs the excess charges from CEB's tiered pricing.

---

## 🛠️ Installation

No installation required! Just:

1. Clone or download this repository
   ```bash
   git clone https://github.com/mRasika/Shared-Electricity-Bill-Calculator.git
   ```
2. Open `index.html` in your browser
3. Start calculating!

## 📁 Project Structure

```
Shared-Electricity-Bill-Calculator/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom styles
├── js/
│   └── app.js          # Application logic
├── favicon.png         # Application icon
└── README.md           # Documentation
```

## 🌐 Browser Support

- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Opera

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit (`git commit -am 'Add new feature'`)
5. Push (`git push origin feature/improvement`)
6. Open a Pull Request

## 🔧 Developer Notes

### Enabling Proportional Split Options

The application includes hidden **Proportional Split** options for both Fixed Charge and SSCL Tax.
Currently, only Equal Split is active. To enable proportional options:

---

### Method 1: Show Split Method Dropdowns in UI

In `index.html`, find the hidden split method sections (around line 83-105) and remove `style="display:none"` from the div containers:

```html
<!-- BEFORE (Hidden): -->
<div class="mb-4" style="display:none">
  <label for="splitMethod" class="form-label">Fixed Charge Split Method</label>
  ...
</div>

<!-- AFTER (Visible): -->
<div class="mb-4">
  <label for="splitMethod" class="form-label">Fixed Charge Split Method</label>
  ...
</div>
```

Do the same for the SSCL Tax split method dropdown (the next div).

---

### Method 2: Change Default to Proportional (Without Showing UI)

To use proportional split without showing dropdowns to users:

In `index.html`, find the hidden inputs (around line 107-108) and change the values:

```html
<!-- BEFORE (Equal Split - Default): -->
<input type="hidden" id="splitMethodHidden" value="equal" />
<input type="hidden" id="ssclSplitMethodHidden" value="equal" />

<!-- AFTER (Proportional Split): -->
<input type="hidden" id="splitMethodHidden" value="proportional" />
<input type="hidden" id="ssclSplitMethodHidden" value="proportional" />
```

You can also mix - e.g., proportional for Fixed Charge but equal for SSCL Tax.

---

### Proportional Split Formula

When proportional split is enabled, charges are divided based on usage ratio:

```
Fixed Charge Share = (Shop Units ÷ Total Units) × Fixed Charge
SSCL Tax Share = (Shop Units ÷ Total Units) × SSCL Tax
```

**Example:** If Shop A uses 50 units and Shop B uses 25 units (total 75):

- Shop A pays: (50/75) × 500 = Rs. 333.33 of Fixed Charge
- Shop B pays: (25/75) × 500 = Rs. 166.67 of Fixed Charge

This means shops with higher consumption pay a larger share of the fixed charges and taxes.

---

### Equal vs Proportional Comparison

| Split Method     | Fixed Charge (Rs. 500)    | Who Benefits?    |
| ---------------- | ------------------------- | ---------------- |
| **Equal**        | Each shop pays Rs. 166.67 | High-usage shops |
| **Proportional** | Based on usage %          | Low-usage shops  |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rasika**

- GitHub: [@mRasika](https://github.com/mRasika)

## 🙏 Acknowledgments

- [Bootstrap 5](https://getbootstrap.com/) - CSS Framework
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icon Library

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
