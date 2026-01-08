/* ============================================
   Shared Electricity Bill Calculator - App
   ============================================ */

// ============================================
// Application State & Configuration
// ============================================
const APP_CONFIG = {
  currency: 'LKR',
  currencySymbol: 'Rs.',
  minShops: 1,
  maxShops: 20,
  defaultShops: [
    { name: 'Shop 1', units: 58 },
    { name: 'Shop 2', units: 17 },
    { name: 'Shop 3', units: 1 }
  ],
  storageKeys: {
    darkMode: 'electricityCalc_darkMode',
    language: 'electricityCalc_language',
    lastCalculation: 'electricityCalc_lastData'
  }
};

// ============================================
// Translations
// ============================================
const translations = {
  en: {
    title: 'Shared Electricity Bill Calculator',
    language: 'Language',
    darkMode: 'Dark Mode',
    totalBill: 'Total Bill (LKR)',
    totalBillHelp: 'Enter the total electricity bill amount',
    fixedCharge: 'Fixed Charge (LKR)',
    fixedChargeHelp: 'Fixed charges from your bill',
    splitMethod: 'Fixed Charge Split Method',
    splitMethodHelp: 'Choose how to divide the fixed charges',
    equal: 'Equal Split',
    proportional: 'Proportional Split (by usage)',
    shopUnits: 'Shop Units',
    addShop: 'Add Shop',
    calculate: 'Calculate',
    reset: 'Reset',
    print: 'Print',
    shopName: 'Shop',
    units: 'Units',
    remove: 'Remove',
    totalUnits: 'Total Units',
    energyCostPerUnit: 'Energy Cost per Unit',
    unitsConsumed: 'Units Consumed',
    energyCost: 'Energy Cost',
    fixedChargeLabel: 'Fixed Charge',
    totalBillLabel: 'Total Bill',
    summary: 'Summary',
    errorInvalidBill: 'Please enter a valid bill amount',
    errorNoUnits: 'Please enter units for at least one shop',
    errorFixedCharge: 'Fixed charge cannot exceed total bill'
  },
  si: {
    title: 'බෙදාගත් විදුලි බිල්පත් ගණනය',
    language: 'භාෂාව',
    darkMode: 'අඳුරු මාදිලිය',
    totalBill: 'මුළු බිල (රු.)',
    totalBillHelp: 'මුළු විදුලි බිල්පත් මුදල ඇතුළත් කරන්න',
    fixedCharge: 'ස්ථිර ගාස්තුව (රු.)',
    fixedChargeHelp: 'ඔබගේ බිල්පතේ ස්ථිර ගාස්තු',
    splitMethod: 'ස්ථිර ගාස්තු බෙදීමේ ක්‍රමය',
    splitMethodHelp: 'ස්ථිර ගාස්තු බෙදන ආකාරය තෝරන්න',
    equal: 'සමාන බෙදීම',
    proportional: 'අනුපාතික බෙදීම (භාවිතය අනුව)',
    shopUnits: 'වෙළඳසැල් ඒකක',
    addShop: 'වෙළඳසැලක් එක් කරන්න',
    calculate: 'ගණනය කරන්න',
    reset: 'යළි පිහිටුවන්න',
    print: 'මුද්‍රණය',
    shopName: 'වෙළඳසැල',
    units: 'ඒකක',
    remove: 'ඉවත් කරන්න',
    totalUnits: 'මුළු ඒකක',
    energyCostPerUnit: 'ඒකකයකට බලශක්ති පිරිවැය',
    unitsConsumed: 'පරිභෝජිත ඒකක',
    energyCost: 'බලශක්ති පිරිවැය',
    fixedChargeLabel: 'ස්ථිර ගාස්තුව',
    totalBillLabel: 'මුළු බිල',
    summary: 'සාරාංශය',
    errorInvalidBill: 'කරුණාකර වලංගු බිල්පත් මුදලක් ඇතුළත් කරන්න',
    errorNoUnits: 'අවම වශයෙන් එක් වෙළඳසැලකට ඒකක ඇතුළත් කරන්න',
    errorFixedCharge: 'ස්ථිර ගාස්තුව මුළු බිල්පතට වඩා වැඩි විය නොහැක'
  }
};

// ============================================
// State Variables
// ============================================
let currentLanguage = 'en';
let shopCount = 0;

// ============================================
// Utility Functions
// ============================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const t = (key) => translations[currentLanguage]?.[key] || translations['en'][key] || key;

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage not available');
  }
};

const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

// ============================================
// Shop Management
// ============================================
const createShopInput = (shopNumber, units = 0, name = '') => {
  const shopName = name || `${t('shopName')} ${shopNumber}`;
  const div = document.createElement('div');
  div.className = 'shop-input-group';
  div.dataset.shopId = shopNumber;
  div.innerHTML = `
    <button type="button" class="btn btn-outline-danger btn-sm remove-shop-btn" 
            onclick="removeShop(${shopNumber})" 
            aria-label="${t('remove')} ${shopName}"
            ${shopCount <= APP_CONFIG.minShops ? 'disabled' : ''}>
      <i class="bi bi-x-lg"></i>
    </button>
    <div class="row g-2">
      <div class="col-sm-5">
        <label class="form-label small">${t('shopName')}</label>
        <input type="text" class="form-control form-control-sm shop-name" 
               value="${shopName}" placeholder="${t('shopName')}">
      </div>
      <div class="col-sm-7">
        <label class="form-label small">${t('units')}</label>
        <input type="number" class="form-control shop-unit" 
               value="${units}" min="0" step="0.01" 
               placeholder="0" required>
      </div>
    </div>
  `;
  return div;
};

const addShop = (units = 0, name = '') => {
  if (shopCount >= APP_CONFIG.maxShops) {
    alert(`Maximum ${APP_CONFIG.maxShops} shops allowed`);
    return;
  }
  shopCount++;
  const shopInput = createShopInput(shopCount, units, name);
  $('#shopInputs').appendChild(shopInput);
  updateRemoveButtons();
};

const removeShop = (shopId) => {
  const shopElement = $(`[data-shop-id="${shopId}"]`);
  if (shopElement && shopCount > APP_CONFIG.minShops) {
    shopElement.remove();
    shopCount--;
    renumberShops();
    updateRemoveButtons();
  }
};

const renumberShops = () => {
  const shops = $$('.shop-input-group');
  shops.forEach((shop, index) => {
    const newNumber = index + 1;
    shop.dataset.shopId = newNumber;
    const nameInput = shop.querySelector('.shop-name');
    if (nameInput.value.startsWith(t('shopName')) || nameInput.value.match(/^Shop \d+$/)) {
      nameInput.value = `${t('shopName')} ${newNumber}`;
    }
    const removeBtn = shop.querySelector('.remove-shop-btn');
    removeBtn.setAttribute('onclick', `removeShop(${newNumber})`);
  });
  shopCount = shops.length;
};

const updateRemoveButtons = () => {
  const removeButtons = $$('.remove-shop-btn');
  removeButtons.forEach(btn => {
    btn.disabled = shopCount <= APP_CONFIG.minShops;
  });
};

// ============================================
// Calculation Logic
// ============================================
const validateInputs = () => {
  const totalBill = parseFloat($('#totalBill').value) || 0;
  const fixedCharge = parseFloat($('#fixedCharge').value) || 0;
  const units = [...$$('.shop-unit')].map(input => parseFloat(input.value) || 0);
  const totalUnits = units.reduce((sum, u) => sum + u, 0);

  if (totalBill <= 0) {
    return { valid: false, error: t('errorInvalidBill') };
  }
  if (fixedCharge > totalBill) {
    return { valid: false, error: t('errorFixedCharge') };
  }
  if (totalUnits <= 0) {
    return { valid: false, error: t('errorNoUnits') };
  }

  return { valid: true };
};

const calculate = () => {
  const validation = validateInputs();
  if (!validation.valid) {
    showError(validation.error);
    return;
  }

  const totalBill = parseFloat($('#totalBill').value);
  const fixedCharge = parseFloat($('#fixedCharge').value);
  const splitMethod = $('#splitMethod').value;

  const shopInputs = $$('.shop-input-group');
  const shops = [...shopInputs].map(shop => ({
    name: shop.querySelector('.shop-name').value || 'Shop',
    units: parseFloat(shop.querySelector('.shop-unit').value) || 0
  }));

  const totalUnits = shops.reduce((sum, shop) => sum + shop.units, 0);
  const energyCost = totalBill - fixedCharge;
  const unitCost = energyCost / totalUnits;
  const numShops = shops.length;

  let grandTotal = 0;

  // Build results
  let outputHTML = `
    <div class="summary-card">
      <h4><i class="bi bi-bar-chart-fill"></i> ${t('summary')}</h4>
      <div class="row">
        <div class="col-6">
          <div class="small opacity-75">${t('totalUnits')}</div>
          <div class="h5 mb-0">${formatCurrency(totalUnits)}</div>
        </div>
        <div class="col-6">
          <div class="small opacity-75">${t('energyCostPerUnit')}</div>
          <div class="h5 mb-0">${APP_CONFIG.currencySymbol} ${formatCurrency(unitCost)}</div>
        </div>
      </div>
    </div>
  `;

  shops.forEach((shop, i) => {
    const shopEnergyCost = shop.units * unitCost;
    let shopFixedCharge = 0;

    if (splitMethod === 'equal') {
      shopFixedCharge = fixedCharge / numShops;
    } else {
      shopFixedCharge = (shop.units / totalUnits) * fixedCharge;
    }

    const shopTotal = shopEnergyCost + shopFixedCharge;
    grandTotal += shopTotal;

    outputHTML += `
      <div class="shop-block">
        <h5><i class="bi bi-shop"></i> ${shop.name}</h5>
        <div class="row g-2 small">
          <div class="col-6">${t('unitsConsumed')}:</div>
          <div class="col-6 text-end">${formatCurrency(shop.units)}</div>
          
          <div class="col-6">${t('energyCost')}:</div>
          <div class="col-6 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(shopEnergyCost)}</div>
          
          <div class="col-6">${t('fixedChargeLabel')} (${splitMethod === 'equal' ? t('equal') : t('proportional')}):</div>
          <div class="col-6 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(shopFixedCharge)}</div>
          
          <div class="col-12"><hr class="my-2"></div>
          
          <div class="col-6"><strong>${t('totalBillLabel')}:</strong></div>
          <div class="col-6 text-end result-highlight">${APP_CONFIG.currencySymbol} ${formatCurrency(shopTotal)}</div>
        </div>
      </div>
    `;
  });

  // Verification row
  outputHTML += `
    <div class="alert alert-info mt-3">
      <i class="bi bi-check-circle"></i> 
      <strong>Verification:</strong> Sum of all bills = ${APP_CONFIG.currencySymbol} ${formatCurrency(grandTotal)} 
      (Original: ${APP_CONFIG.currencySymbol} ${formatCurrency(totalBill)})
    </div>
  `;

  $('#output').innerHTML = outputHTML;

  // Save last calculation
  saveToStorage(APP_CONFIG.storageKeys.lastCalculation, {
    totalBill,
    fixedCharge,
    splitMethod,
    shops
  });
};

const showError = (message) => {
  $('#output').innerHTML = `
    <div class="alert alert-danger">
      <i class="bi bi-exclamation-triangle"></i> ${message}
    </div>
  `;
};

// ============================================
// UI Functions
// ============================================
const toggleDarkMode = () => {
  const isDark = $('#darkToggle').checked;
  document.body.classList.toggle('dark-mode', isDark);
  saveToStorage(APP_CONFIG.storageKeys.darkMode, isDark);
};

const setLanguage = () => {
  currentLanguage = $('#languageSelect').value;
  saveToStorage(APP_CONFIG.storageKeys.language, currentLanguage);
  updateUILanguage();
};

const updateUILanguage = () => {
  // Update title
  $('#title').innerHTML = `<i class="bi bi-lightning-charge"></i> ${t('title')}`;

  // Update all elements with data-i18n attribute
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else if (el.tagName === 'OPTION') {
      el.textContent = t(key);
    } else {
      // Preserve icons
      const icon = el.querySelector('i');
      if (icon) {
        el.innerHTML = icon.outerHTML + ' ' + t(key);
      } else {
        el.textContent = t(key);
      }
    }
  });

  // Update shop labels
  renumberShops();
};

const resetForm = () => {
  $('#totalBill').value = 2400;
  $('#fixedCharge').value = 500;
  $('#splitMethod').value = 'equal';
  $('#output').innerHTML = '';

  // Reset shops
  $('#shopInputs').innerHTML = '';
  shopCount = 0;
  APP_CONFIG.defaultShops.forEach(shop => addShop(shop.units, shop.name));
};

// ============================================
// Initialization
// ============================================
const init = () => {
  // Load saved preferences
  const savedDarkMode = loadFromStorage(APP_CONFIG.storageKeys.darkMode, false);
  const savedLanguage = loadFromStorage(APP_CONFIG.storageKeys.language, 'en');

  // Apply dark mode
  $('#darkToggle').checked = savedDarkMode;
  document.body.classList.toggle('dark-mode', savedDarkMode);

  // Apply language
  currentLanguage = savedLanguage;
  $('#languageSelect').value = savedLanguage;

  // Initialize default shops
  APP_CONFIG.defaultShops.forEach(shop => addShop(shop.units, shop.name));

  // Update UI text
  updateUILanguage();

  // Event listeners
  $('#darkToggle').addEventListener('change', toggleDarkMode);
  $('#languageSelect').addEventListener('change', setLanguage);
  $('#addShopBtn').addEventListener('click', () => addShop());
  $('#resetBtn').addEventListener('click', resetForm);
  $('#printBtn').addEventListener('click', () => window.print());

  // Form submission
  $('#calculatorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    calculate();
  });

  // Make removeShop available globally
  window.removeShop = removeShop;
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
