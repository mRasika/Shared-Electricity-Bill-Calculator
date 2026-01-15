# ⚡ Shared Electricity Bill Calculator

A smart, user-friendly web application to fairly split shared electricity bills among multiple shops or tenants.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

- **Smart Bill Splitting** - Split bills based on actual unit consumption
- **GP1 Tariff Support** - Handles CEB's tiered pricing (Rs. 25 → Rs. 34/unit)
- **Threshold Breaker Detection** - Identifies shops causing high-rate charges
- **Fair Rate Protection** - Protects innocent shops from penalty charges
- **Penalty Redistribution** - Breakers pay penalties; their share goes to others
- **SSCL Auto-Calculation** - Official CEB formula: `Subtotal × (2.5/97.5)`
- **Equal & Proportional Split** - Choose how to divide fixed charges
- **Multi-Language** - English and සිංහල (Sinhala)
- **Dark Mode** - Eye-friendly dark theme
- **Print Ready** - Clean print layout for records
- **Offline Capable** - Runs entirely in the browser

## 🚀 Quick Start

1. Open `index.html` in any modern browser
2. Enter your CEB bill details
3. Add shops and their unit consumption
4. Click **Calculate** to see the breakdown

> 📖 **For detailed instructions, see the [User Guide](docs/USER_GUIDE.md)**

## 💡 How It Works

### Normal Usage (≤ 180 units)
All shops pay fair rate (Rs. 25/unit) + shared fixed charge.

### High Usage (> 180 units)
Two scenarios:

| Scenario | What Happens |
|----------|--------------|
| **Collective Breach** | No single shop > 180 → Building owner absorbs penalty |
| **Threshold Breaker** | One shop > 180 → That shop pays penalty + high rate |

### Breaker Penalty Logic
```
Breaker Shop:
├── Energy: ALL units × Rs. 34 (high rate)
├── Fixed: Only penalty (Rs. 1,100) - NO fair share
└── SSCL: On their subtotal

Innocent Shops:
├── Energy: Units × Rs. 25 (fair rate)
├── Fixed: Their share + Redistributed from breaker
└── SSCL: On their subtotal
```

## 📊 Quick Example

**Input:** Total 257 units (Shop 1: 56, Shop 2: 200, Shop 3: 1)

| Shop | Status | Rate | Fixed | Total |
|------|--------|------|-------|-------|
| Shop 1 | ✅ Innocent | Rs. 25 | 166.67 + 83.33 | Rs. 1,692.31 |
| Shop 2 | ❌ Breaker | Rs. 34 | Penalty: 1,100 | Rs. 8,102.56 |
| Shop 3 | ✅ Innocent | Rs. 25 | 166.67 + 83.33 | Rs. 282.05 |

> Shop 2 caused high rates, pays penalty. Innocent shops protected at fair rate.

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [**User Guide**](docs/USER_GUIDE.md) | Comprehensive guide with all scenarios |
| [**FAQ**](docs/USER_GUIDE.md#-frequently-asked-questions) | Common questions answered |
| [**Troubleshooting**](docs/USER_GUIDE.md#-troubleshooting) | Solutions to common issues |

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/mRasika/Shared-Electricity-Bill-Calculator.git

# Open in browser
open index.html
```

No dependencies. No build process. Just open and use!

## 📁 Project Structure

```
Shared-Electricity-Bill-Calculator/
├── index.html          # Main application
├── css/styles.css      # Custom styles
├── js/app.js           # Application logic
├── docs/
│   └── USER_GUIDE.md   # Comprehensive user guide
└── README.md           # This file
```

## 🌐 Browser Support

✅ Chrome (recommended) | ✅ Firefox | ✅ Edge | ✅ Safari | ✅ Opera

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 CEB Tariff Reference

| Category | Rate/Unit | Fixed Charge | Threshold |
|----------|-----------|--------------|-----------|
| GP1 Low | Rs. 25.00 | Rs. 500.00 | ≤ 180 units |
| GP1 High | Rs. 34.00 | Rs. 1,600.00 | > 180 units |

> SSCL: 2.5% calculated as `Subtotal × (2.5/97.5)`

## 📝 License

This project is open source under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rasika** - [@mRasika](https://github.com/mRasika)

---

⭐ If you find this project useful, please consider giving it a star!
