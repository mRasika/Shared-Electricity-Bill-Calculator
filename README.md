# ⚡ Shared Electricity Bill Calculator

A simple, user-friendly web application to calculate and split shared electricity bills among multiple shops or tenants fairly.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

- **Smart Bill Splitting** - Split electricity bills based on actual unit consumption
- **Two Split Methods**:
  - **Equal Split** - Fixed charges divided equally among all shops
  - **Proportional Split** - Fixed charges divided based on usage percentage
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

1. **Enter Total Bill** - Input the total electricity bill amount in LKR
2. **Enter Fixed Charge** - Input the fixed/service charges from your bill
3. **Add Shops** - Add shops and enter the units consumed by each
4. **Choose Split Method**:
   - *Equal Split*: Fixed charges are divided equally
   - *Proportional Split*: Fixed charges are divided based on each shop's usage
5. **Calculate** - Click the Calculate button to see the breakdown
6. **Print/Share** - Use the Print button to save or print the results

## 🧮 Calculation Formula

```
Energy Cost per Unit = (Total Bill - Fixed Charge) / Total Units

For each shop:
├── Energy Cost = Units Consumed × Energy Cost per Unit
├── Fixed Charge = 
│   ├── Equal: Fixed Charge ÷ Number of Shops
│   └── Proportional: (Shop Units ÷ Total Units) × Fixed Charge
└── Shop Total = Energy Cost + Fixed Charge
```

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
├── index.html      # Main application file (HTML + CSS + JS)
├── favicon.png     # Application icon
└── README.md       # This file
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
