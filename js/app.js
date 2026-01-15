/* ============================================
   Shared Electricity Bill Calculator - App
   ============================================ */

// ============================================
// Application State & Configuration
// ============================================
const APP_CONFIG = {
  currency: "LKR",
  currencySymbol: "Rs.",
  minShops: 1,
  maxShops: 20,
  defaultShops: [
    { name: "Shop 1", units: 56 },
    { name: "Shop 2", units: 17 },
    { name: "Shop 3", units: 1 },
  ],
  storageKeys: {
    darkMode: "electricityCalc_darkMode",
    language: "electricityCalc_language",
    lastCalculation: "electricityCalc_lastData",
  },
  // GP1 Tariff Configuration (CEB Rates - June 2025)
  gp1Tariff: {
    baseThreshold: 180, // Units per 30 days
    baseDays: 30,
    lowRate: {
      unitPrice: 25.00,
      fixedCharge: 500.00,
    },
    highRate: {
      unitPrice: 34.00,
      fixedCharge: 1600.00,
    },
    // SSCL is 2.5% of final bill, so: SSCL = Subtotal × (2.5/97.5)
    ssclFactor: 2.5 / 97.5, // = 0.025641...
  },
};

// ============================================
// Translations
// ============================================
const translations = {
  en: {
    title: "Shared Electricity Bill Calculator",
    language: "Language",
    darkMode: "Dark Mode",
    totalCharge: "Total Charge (LKR)",
    totalChargeHelp:
      "Total charge amount from your bill (includes fixed charge)",
    fixedCharge: "Fixed Charge (LKR)",
    fixedChargeHelp: "Fixed charges from your bill",
    ssclTax: "CEB SSCL Tax (LKR)",
    ssclTaxHelp: "CEB's SSCL: Subtotal × (2.5/97.5)",
    splitMethod: "Fixed Charge Split Method",
    splitMethodHelp: "Choose how to divide the fixed charges",
    ssclSplitMethod: "SSCL Tax Split Method",
    ssclSplitMethodHelp: "Choose how to divide the SSCL tax",
    equal: "Equal Split",
    proportional: "Proportional Split (by usage)",
    shopUnits: "Shop Units",
    addShop: "Add Shop",
    calculate: "Calculate",
    reset: "Reset",
    print: "Print",
    shopName: "Shop",
    units: "Units",
    remove: "Remove",
    totalUnits: "Total Units",
    chargeForUnits: "Charge for Units",
    energyCostPerUnit: "Cost per Unit",
    unitsConsumed: "Units Consumed",
    energyCost: "Energy Cost",
    fixedChargeLabel: "Fixed Charge",
    ssclTaxLabel: "SSCL Tax",
    totalBillLabel: "Shop Total",
    grandTotal: "Grand Total",
    summary: "Summary",
    errorInvalidCharge: "Please enter a valid total charge amount",
    errorNoUnits: "Please enter units for at least one shop",
    errorFixedChargeExceeds: "Fixed charge cannot exceed total charge",
    billingDays: "Billing Days",
    billingDaysHelp: "Number of days in the billing period (default: 30)",
    fairRate: "Fair Unit Rate (LKR)",
    fairRateHelp: "Standard rate per unit for shops (below threshold)",
    fairFixed: "Fair Fixed Charge (LKR)",
    fairFixedHelp: "Standard fixed charge for shops",
    usageThreshold: "Usage Threshold",
    thresholdStatus: "Threshold Status",
    belowThreshold: "Below Threshold (No Penalty)",
    aboveThreshold: "Above Threshold (Penalty Applies)",
    buildingOwnerPenalty: "Building Owner Penalty",
    penaltyExplanation: "This is the difference between CEB's actual charges and what shops pay at fair rate",
    totalFromShops: "Total from Shops",
    cebTotalBill: "CEB Total Bill",
    fairEnergyTotal: "Fair Energy Total",
    penaltyCalculation: "Penalty Calculation",
    noPenalty: "No Penalty - Usage is within threshold",
    // Breaker penalty translations
    thresholdBreaker: "Threshold Breaker",
    fixedPenalty: "Fixed Charge Penalty",
    redistributedFixed: "Redistributed Fixed",
    remainingGap: "Remaining Gap",
    remainingGapExplanation: "This is the remaining difference after breaker shops paid their penalties. Due to innocent shops using electricity at CEB high rates.",
    breakersCoveredPenalty: "Breaker Shops Covered the Penalty",
    breakerPaidExtra: "Threshold breaker shops paid",
    extraForCausingHighRate: "extra for causing high rate charges",
    collectiveBreach: "Collective Threshold Breach",
    collectiveBreachExplanation: "No single shop exceeded the threshold. The collective usage caused the high rate. Building owner absorbs the penalty.",
  },
  si: {
    title: "බෙදාගත් විදුලි බිල්පත් ගණනය",
    language: "භාෂාව",
    darkMode: "අඳුරු මාදිලිය",
    totalCharge: "මුළු ගාස්තුව (රු.)",
    totalChargeHelp: "ඔබගේ බිල්පතේ මුළු ගාස්තු මුදල (ස්ථිර ගාස්තු ඇතුළුව)",
    fixedCharge: "ස්ථිර ගාස්තුව (රු.)",
    fixedChargeHelp: "ඔබගේ බිල්පතේ ස්ථිර ගාස්තු",
    ssclTax: "CEB SSCL බදු (රු.)",
    ssclTaxHelp: "CEB SSCL: උප එකතුව × (2.5/97.5)",
    splitMethod: "ස්ථිර ගාස්තු බෙදීමේ ක්‍රමය",
    splitMethodHelp: "ස්ථිර ගාස්තු බෙදන ආකාරය තෝරන්න",
    ssclSplitMethod: "SSCL බදු බෙදීමේ ක්‍රමය",
    ssclSplitMethodHelp: "SSCL බදු බෙදන ආකාරය තෝරන්න",
    equal: "සමාන බෙදීම",
    proportional: "අනුපාතික බෙදීම (භාවිතය අනුව)",
    shopUnits: "වෙළඳසැල් ඒකක",
    addShop: "වෙළඳසැලක් එක් කරන්න",
    calculate: "ගණනය කරන්න",
    reset: "යළි පිහිටුවන්න",
    print: "මුද්‍රණය",
    shopName: "වෙළඳසැල",
    units: "ඒකක",
    remove: "ඉවත් කරන්න",
    totalUnits: "මුළු ඒකක",
    chargeForUnits: "ඒකක සඳහා ගාස්තුව",
    energyCostPerUnit: "ඒකකයකට පිරිවැය",
    unitsConsumed: "පරිභෝජිත ඒකක",
    energyCost: "බලශක්ති පිරිවැය",
    fixedChargeLabel: "ස්ථිර ගාස්තුව",
    ssclTaxLabel: "SSCL බදු",
    totalBillLabel: "වෙළඳසැල් එකතුව",
    grandTotal: "මුළු එකතුව",
    summary: "සාරාංශය",
    errorInvalidCharge: "කරුණාකර වලංගු මුළු ගාස්තු මුදලක් ඇතුළත් කරන්න",
    errorNoUnits: "අවම වශයෙන් එක් වෙළඳසැලකට ඒකක ඇතුළත් කරන්න",
    errorFixedChargeExceeds: "ස්ථිර ගාස්තුව මුළු ගාස්තුවට වඩා වැඩි විය නොහැක",
    billingDays: "බිල් දින",
    billingDaysHelp: "බිල් කාලය තුළ දින ගණන (පෙරනිමි: 30)",
    fairRate: "සාධාරණ ඒකක අනුපාතය (රු.)",
    fairRateHelp: "වෙළඳසැල් සඳහා ඒකකයකට සම්මත අනුපාතය",
    fairFixed: "සාධාරණ ස්ථිර ගාස්තුව (රු.)",
    fairFixedHelp: "වෙළඳසැල් සඳහා සම්මත ස්ථිර ගාස්තුව",
    usageThreshold: "භාවිත සීමාව",
    thresholdStatus: "සීමාවේ තත්ත්වය",
    belowThreshold: "සීමාවට පහළින් (දඩයක් නැත)",
    aboveThreshold: "සීමාවට ඉහළින් (දඩය අදාළ වේ)",
    buildingOwnerPenalty: "ගොඩනැගිලි හිමිකරුගේ දඩය",
    penaltyExplanation: "මෙය CEB හි සත්‍ය ගාස්තු සහ වෙළඳසැල් සාධාරණ මිලට ගෙවන මුදල අතර වෙනසයි",
    totalFromShops: "වෙළඳසැල් වලින් මුළු මුදල",
    cebTotalBill: "CEB මුළු බිල්පත",
    fairEnergyTotal: "සාධාරණ බලශක්ති මුළු මුදල",
    penaltyCalculation: "දඩ ගණනය කිරීම",
    noPenalty: "දඩයක් නැත - භාවිතය සීමාව තුළ ඇත",
    // Breaker penalty translations
    thresholdBreaker: "සීමාව කඩකරන්නා",
    fixedPenalty: "ස්ථිර ගාස්තු දඩය",
    redistributedFixed: "නැවත බෙදා හරින ලද ස්ථිර",
    remainingGap: "ඉතිරි වෙනස",
    remainingGapExplanation: "මෙය සීමාව කඩකළ වෙළඳසැල් තම දඩය ගෙවීමෙන් පසු ඉතිරි වෙනසයි. අහිංසක වෙළඳසැල් CEB ඉහළ මිලට විදුලිය භාවිතා කළ නිසා.",
    breakersCoveredPenalty: "සීමාව කඩකළ වෙළඳසැල් දඩය ගෙවා ඇත",
    breakerPaidExtra: "සීමාව කඩකළ වෙළඳසැල් ගෙවූ අමතර මුදල",
    extraForCausingHighRate: "ඉහළ අනුපාත ගාස්තු ඇති කිරීම සඳහා",
    collectiveBreach: "සමූහ සීමාව කඩ කිරීම",
    collectiveBreachExplanation: "තනි වෙළඳසැලක් සීමාව ඉක්මවා නැත. සමූහ භාවිතය ඉහළ අනුපාතයට හේතු විය. ගොඩනැගිලි හිමිකරු දඩය දරයි.",
  },
};

// ============================================
// State Variables
// ============================================
let currentLanguage = "en";
let shopCount = 0;

// ============================================
// Utility Functions
// ============================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const t = (key) =>
  translations[currentLanguage]?.[key] || translations["en"][key] || key;

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// ============================================
// SSCL Tax Calculation (CEB Official Formula)
// SSCL is 2.5% of the FINAL bill, not subtotal
// Formula: SSCL = Subtotal × (2.5 / 97.5)
// ============================================
const SSCL_FACTOR = 2.5 / 97.5; // = 0.025641...

/**
 * Calculate SSCL Tax based on official CEB formula
 * SSCL = (Energy Charge + Fixed Charge) × (2.5 / 97.5)
 * 
 * @param {number} subtotal - Subtotal (Energy + Fixed) before SSCL
 * @returns {object} - { sscl, grandTotal }
 */
const calculateSSCL = (subtotal) => {
  const ssclAmount = subtotal * SSCL_FACTOR;
  return {
    sscl: parseFloat(ssclAmount.toFixed(2)),
    grandTotal: parseFloat((subtotal + ssclAmount).toFixed(2))
  };
};

/**
 * Calculate per-shop SSCL based on their energy + fixed share
 * @param {number} shopEnergy - Shop's energy cost
 * @param {number} shopFixedShare - Shop's share of fixed charge
 * @returns {number} - Shop's SSCL amount
 */
const calculateShopSSCL = (shopEnergy, shopFixedShare) => {
  const shopSubtotal = shopEnergy + shopFixedShare;
  return parseFloat((shopSubtotal * SSCL_FACTOR).toFixed(2));
};

/**
 * Auto-update CEB SSCL Tax display when Total Charge changes
 */
const updateSSCLTax = () => {
  const totalCharge = parseFloat($("#totalCharge")?.value) || 0;
  const { sscl } = calculateSSCL(totalCharge);
  const ssclInput = $("#ssclTax");
  if (ssclInput) {
    ssclInput.value = sscl.toFixed(2);
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("LocalStorage not available");
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
const createShopInput = (shopNumber, units = 0, name = "") => {
  const shopName = name || `${t("shopName")} ${shopNumber}`;
  const div = document.createElement("div");
  div.className = "shop-input-group";
  div.dataset.shopId = shopNumber;
  div.innerHTML = `
    <button type="button" class="btn btn-outline-danger btn-sm remove-shop-btn" 
            onclick="removeShop(${shopNumber})" 
            aria-label="${t("remove")} ${shopName}"
            ${shopCount <= APP_CONFIG.minShops ? "disabled" : ""}>
      <i class="bi bi-x-lg"></i>
    </button>
    <div class="row g-2">
      <div class="col-sm-5">
        <label class="form-label small">${t("shopName")}</label>
        <input type="text" class="form-control form-control-sm shop-name" 
               value="${shopName}" placeholder="${t("shopName")}">
      </div>
      <div class="col-sm-7">
        <label class="form-label small">${t("units")}</label>
        <input type="number" class="form-control shop-unit" 
               value="${units}" min="0" step="0.01" 
               placeholder="0" required>
      </div>
    </div>
  `;
  return div;
};

const addShop = (units = 0, name = "") => {
  if (shopCount >= APP_CONFIG.maxShops) {
    alert(`Maximum ${APP_CONFIG.maxShops} shops allowed`);
    return;
  }
  shopCount++;
  const shopInput = createShopInput(shopCount, units, name);
  $("#shopInputs").appendChild(shopInput);
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
  const shops = $$(".shop-input-group");
  shops.forEach((shop, index) => {
    const newNumber = index + 1;
    shop.dataset.shopId = newNumber;
    const nameInput = shop.querySelector(".shop-name");
    if (
      nameInput.value.startsWith(t("shopName")) ||
      nameInput.value.match(/^Shop \d+$/)
    ) {
      nameInput.value = `${t("shopName")} ${newNumber}`;
    }
    const removeBtn = shop.querySelector(".remove-shop-btn");
    removeBtn.setAttribute("onclick", `removeShop(${newNumber})`);
  });
  shopCount = shops.length;
};

const updateRemoveButtons = () => {
  const removeButtons = $$(".remove-shop-btn");
  removeButtons.forEach((btn) => {
    btn.disabled = shopCount <= APP_CONFIG.minShops;
  });
};

// ============================================
// Calculation Logic
// ============================================
const validateInputs = () => {
  const totalCharge = parseFloat($("#totalCharge").value) || 0;
  const fixedCharge = parseFloat($("#fixedCharge").value) || 0;
  const units = [...$$(".shop-unit")].map(
    (input) => parseFloat(input.value) || 0
  );
  const totalUnits = units.reduce((sum, u) => sum + u, 0);

  if (totalCharge <= 0) {
    return { valid: false, error: t("errorInvalidCharge") };
  }
  if (fixedCharge > totalCharge) {
    return { valid: false, error: t("errorFixedChargeExceeds") };
  }
  if (totalUnits <= 0) {
    return { valid: false, error: t("errorNoUnits") };
  }

  return { valid: true };
};

const calculate = () => {
  const validation = validateInputs();
  if (!validation.valid) {
    showError(validation.error);
    return;
  }

  const totalCharge = parseFloat($("#totalCharge").value);
  const fixedCharge = parseFloat($("#fixedCharge").value);
  const ssclTax = parseFloat($("#ssclTax").value) || 0;
  const billingDays = parseFloat($("#billingDays")?.value) || 30;
  const fairRate = parseFloat($("#fairRate")?.value) || APP_CONFIG.gp1Tariff.lowRate.unitPrice;
  const fairFixed = parseFloat($("#fairFixed")?.value) || APP_CONFIG.gp1Tariff.lowRate.fixedCharge;

  // Get split methods (use hidden inputs as fallback when dropdowns are hidden)
  const splitMethod =
    $("#splitMethod")?.value || $("#splitMethodHidden")?.value || "equal";
  const ssclSplitMethod =
    $("#ssclSplitMethod")?.value ||
    $("#ssclSplitMethodHidden")?.value ||
    "equal";

  const shopInputs = $$(".shop-input-group");
  const shops = [...shopInputs].map((shop) => ({
    name: shop.querySelector(".shop-name").value || "Shop",
    units: parseFloat(shop.querySelector(".shop-unit").value) || 0,
  }));

  const totalUnits = shops.reduce((sum, shop) => sum + shop.units, 0);

  // Calculate dynamic threshold based on billing days
  const threshold = (APP_CONFIG.gp1Tariff.baseThreshold / APP_CONFIG.gp1Tariff.baseDays) * billingDays;
  const isAboveThreshold = totalUnits > threshold;

  // Identify "breaker" shops - shops that individually exceed the threshold
  const breakerShops = shops.map((shop, index) => ({
    ...shop,
    index,
    isBreaker: shop.units > threshold
  }));
  const breakers = breakerShops.filter(s => s.isBreaker);
  const hasBreaker = breakers.length > 0;

  // Get high rate from config
  const highRate = APP_CONFIG.gp1Tariff.highRate.unitPrice;
  const highFixed = APP_CONFIG.gp1Tariff.highRate.fixedCharge;
  const fixedDifference = highFixed - fairFixed; // Rs. 1,600 - Rs. 500 = Rs. 1,100

  // Fair Rate Calculation for shops
  const fairEnergyTotal = totalUnits * fairRate;
  const numShops = shops.length;

  // CEB Total Bill = Total Charge + SSCL Tax (from CEB bill)
  const cebTotalBill = totalCharge + ssclTax;

  // Fair subtotal (what shops should pay before SSCL at fair rate)
  const fairSubtotal = fairEnergyTotal + fairFixed;
  // Fair SSCL (calculated at fair rate)
  const { sscl: fairSscl, grandTotal: fairGrandTotal } = calculateSSCL(fairSubtotal);

  // Calculate penalty (difference between CEB total bill and fair total)
  // Penalty = CEB Grand Total - Fair Grand Total (Energy + Fixed + SSCL at fair rate)
  const penalty = isAboveThreshold ? (cebTotalBill - fairGrandTotal) : 0;

  let grandTotal = 0;

  // Build results - Summary Card
  let outputHTML = `
    <div class="summary-card">
      <h4><i class="bi bi-bar-chart-fill"></i> ${t("summary")}</h4>
      <div class="row g-2 mb-3">
        <div class="col-4">
          <div class="small opacity-75">${t("totalUnits")}</div>
          <div class="h5 mb-0">${formatCurrency(totalUnits)}</div>
        </div>
        <div class="col-4">
          <div class="small opacity-75">${t("usageThreshold")}</div>
          <div class="h5 mb-0">${formatCurrency(threshold)}</div>
        </div>
        <div class="col-4">
          <div class="small opacity-75">${t("thresholdStatus")}</div>
          <div class="h5 mb-0 ${isAboveThreshold ? 'text-danger' : 'text-success'}">
            ${isAboveThreshold ? '<i class="bi bi-exclamation-triangle"></i>' : '<i class="bi bi-check-circle"></i>'}
            ${isAboveThreshold ? t("aboveThreshold").split(" (")[0] : t("belowThreshold").split(" (")[0]}
          </div>
        </div>
      </div>
      <div class="row g-2">
        <div class="col-4">
          <div class="small opacity-75">${t("fairRate")}</div>
          <div class="h6 mb-0">${APP_CONFIG.currencySymbol} ${formatCurrency(fairRate)}/unit</div>
        </div>
        <div class="col-4">
          <div class="small opacity-75">${t("fairFixed")}</div>
          <div class="h6 mb-0">${APP_CONFIG.currencySymbol} ${formatCurrency(fairFixed)}</div>
        </div>
        <div class="col-4">
          <div class="small opacity-75">${t("cebTotalBill")}</div>
          <div class="h6 mb-0">${APP_CONFIG.currencySymbol} ${formatCurrency(cebTotalBill)}</div>
        </div>
      </div>
    </div>
  `;

  // Shop calculations - with FAIR breaker penalty logic
  // If a shop individually exceeds threshold (breaker), they pay:
  // 1. High rate for ALL their units
  // 2. Fixed charge PENALTY ONLY (Rs. 1,100) - NOT their fair share
  // 3. Their fair share is redistributed to innocent shops
  // 4. SSCL on their subtotal
  
  // Calculate redistribution amounts
  const innocentShops = shops.filter(s => s.units <= threshold);
  const numInnocent = innocentShops.length;
  const numBreakers = breakers.length;
  
  // Breaker's fair share to redistribute (if any breakers exist)
  let breakerFairShareTotal = 0;
  if (isAboveThreshold && hasBreaker && numInnocent > 0) {
    // Calculate total fair fixed share that breakers would have paid
    if (splitMethod === "equal") {
      breakerFairShareTotal = (fairFixed / numShops) * numBreakers;
    } else {
      // Proportional: sum of breaker shares
      breakerFairShareTotal = breakers.reduce((sum, b) => sum + (b.units / totalUnits) * fairFixed, 0);
    }
  }
  
  // Per innocent shop redistribution amount
  const redistributionPerInnocent = (numInnocent > 0 && breakerFairShareTotal > 0) 
    ? breakerFairShareTotal / numInnocent 
    : 0;
  
  let totalBreakerPenalty = 0; // Track how much breakers are paying extra
  
  shops.forEach((shop, i) => {
    const isBreaker = shop.units > threshold;
    const shopRate = (isAboveThreshold && isBreaker) ? highRate : fairRate;
    const shopEnergyCost = shop.units * shopRate;
    let shopFixedCharge = 0;
    let shopFixedPenalty = 0; // Fixed charge penalty for breakers
    let shopRedistribution = 0; // Extra fixed from breaker's share (for innocent)

    if (isAboveThreshold && isBreaker) {
      // BREAKER: Pays ONLY the penalty, NOT fair share
      shopFixedCharge = 0; // No fair share
      shopFixedPenalty = fixedDifference / numBreakers; // Split penalty among breakers
      totalBreakerPenalty += (shop.units * (highRate - fairRate)) + shopFixedPenalty;
    } else {
      // INNOCENT: Pays fair share + redistribution from breaker
      if (splitMethod === "equal") {
        shopFixedCharge = fairFixed / numShops;
      } else {
        shopFixedCharge = (shop.units / totalUnits) * fairFixed;
      }
      // Add redistributed amount from breaker's share
      if (isAboveThreshold && hasBreaker) {
        shopRedistribution = redistributionPerInnocent;
      }
    }

    // Calculate per-shop SSCL: (Energy + Fixed + Penalty/Redistribution) × (2.5/97.5)
    const shopSubtotal = shopEnergyCost + shopFixedCharge + shopFixedPenalty + shopRedistribution;
    const shopSsclTax = parseFloat((shopSubtotal * SSCL_FACTOR).toFixed(2));

    const shopTotal = shopSubtotal + shopSsclTax;
    grandTotal += shopTotal;

    const usagePercent = ((shop.units / totalUnits) * 100).toFixed(2);

    // Build shop output with breaker indicator
    const breakerBadge = (isAboveThreshold && isBreaker) 
      ? `<span class="badge bg-danger ms-2">${t("thresholdBreaker") || "Threshold Breaker"}</span>` 
      : '';
    
    // Different display for breaker vs innocent shops
    let fixedChargeDisplay = '';
    if (isAboveThreshold && isBreaker) {
      // Breaker: Show only penalty
      fixedChargeDisplay = `
          <div class="col-6 text-danger">${t("fixedPenalty") || "Fixed Charge Penalty"}:</div>
          <div class="col-6 text-end text-danger">${APP_CONFIG.currencySymbol} ${formatCurrency(shopFixedPenalty)}</div>
      `;
    } else if (isAboveThreshold && hasBreaker && shopRedistribution > 0) {
      // Innocent with redistribution: Show base + redistributed
      fixedChargeDisplay = `
          <div class="col-6">${t("fixedChargeLabel")} (${splitMethod === "equal" ? t("equal") : t("proportional")}):</div>
          <div class="col-6 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(shopFixedCharge)}</div>
          
          <div class="col-6 text-info">${t("redistributedFixed") || "Redistributed Fixed"}:</div>
          <div class="col-6 text-end text-info">+ ${APP_CONFIG.currencySymbol} ${formatCurrency(shopRedistribution)}</div>
      `;
    } else {
      // Normal: Just fixed charge
      fixedChargeDisplay = `
          <div class="col-6">${t("fixedChargeLabel")} (${splitMethod === "equal" ? t("equal") : t("proportional")}):</div>
          <div class="col-6 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(shopFixedCharge)}</div>
      `;
    }
    
    outputHTML += `
      <div class="shop-block ${(isAboveThreshold && isBreaker) ? 'border-danger' : ''}">
        <h5><i class="bi bi-shop"></i> ${shop.name}${breakerBadge}</h5>
        <div class="row g-2 small">
          <div class="col-6">${t("unitsConsumed")}:</div>
          <div class="col-6 text-end">${formatCurrency(shop.units)} (${usagePercent}%)</div>
          
          <div class="col-6">${t("energyCost")} (@ ${APP_CONFIG.currencySymbol} ${formatCurrency(shopRate)}${(isAboveThreshold && isBreaker) ? ' <span class="text-danger">High</span>' : ''}):</div>
          <div class="col-6 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(shopEnergyCost)}</div>
          
          ${fixedChargeDisplay}
          
          <div class="col-6">${t("ssclTaxLabel")} (${formatCurrency(shopSubtotal)} × 2.5/97.5):</div>
          <div class="col-6 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(shopSsclTax)}</div>
          
          <div class="col-12"><hr class="my-2"></div>
          
          <div class="col-6"><strong>${t("totalBillLabel")}:</strong></div>
          <div class="col-6 text-end result-highlight">${APP_CONFIG.currencySymbol} ${formatCurrency(shopTotal)}</div>
        </div>
      </div>
    `;
  });

  // Calculate remaining building owner penalty (after breaker contributions)
  const remainingPenalty = isAboveThreshold ? Math.max(0, cebTotalBill - grandTotal) : 0;

  // Building Owner Penalty Section - Shows breakdown with breaker contributions
  if (isAboveThreshold && remainingPenalty > 0) {
    outputHTML += `
      <div class="alert alert-warning mt-3">
        <h5><i class="bi bi-exclamation-triangle-fill"></i> ${t("buildingOwnerPenalty")}</h5>
        <div class="row g-2 small">
          <div class="col-8">${t("cebTotalBill")}:</div>
          <div class="col-4 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(cebTotalBill)}</div>
          
          <div class="col-8">${t("totalFromShops")} (incl. breaker penalties):</div>
          <div class="col-4 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(grandTotal)}</div>
          
          <div class="col-12"><hr class="my-1"></div>
          
          <div class="col-8"><strong>${t("remainingGap") || "Remaining Gap"}:</strong></div>
          <div class="col-4 text-end"><strong class="text-warning">${APP_CONFIG.currencySymbol} ${formatCurrency(remainingPenalty)}</strong></div>
        </div>
        <div class="mt-2 small text-muted">
          <i class="bi bi-info-circle"></i> ${t("remainingGapExplanation") || "This is the remaining difference after breaker shops paid their penalties. This amount is due to innocent shops using electricity at high CEB rates."}
        </div>
      </div>
    `;
  } else if (isAboveThreshold && hasBreaker) {
    // Breakers covered everything
    outputHTML += `
      <div class="alert alert-success mt-3">
        <i class="bi bi-check-circle-fill"></i> <strong>${t("breakersCoveredPenalty") || "Breaker Shops Covered the Penalty"}</strong>
        <div class="small text-muted mt-1">
          ${t("breakerPaidExtra") || "Threshold breaker shops paid"}: ${APP_CONFIG.currencySymbol} ${formatCurrency(totalBreakerPenalty)} ${t("extraForCausingHighRate") || "extra for causing high rate charges."}
        </div>
      </div>
    `;
  } else if (!isAboveThreshold) {
    outputHTML += `
      <div class="alert alert-success mt-3">
        <i class="bi bi-check-circle-fill"></i> <strong>${t("noPenalty")}</strong>
        <div class="small text-muted mt-1">
          ${t("totalUnits")}: ${formatCurrency(totalUnits)} ≤ ${t("usageThreshold")}: ${formatCurrency(threshold)}
        </div>
      </div>
    `;
  } else {
    // Above threshold but no breaker (collective breach)
    outputHTML += `
      <div class="alert alert-danger mt-3">
        <h5><i class="bi bi-exclamation-triangle-fill"></i> ${t("collectiveBreach") || "Collective Threshold Breach"}</h5>
        <div class="row g-2 small">
          <div class="col-8">${t("cebTotalBill")}:</div>
          <div class="col-4 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(cebTotalBill)}</div>
          
          <div class="col-8">${t("totalFromShops")}:</div>
          <div class="col-4 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(grandTotal)}</div>
          
          <div class="col-12"><hr class="my-1"></div>
          
          <div class="col-8"><strong>${t("buildingOwnerPenalty")}:</strong></div>
          <div class="col-4 text-end"><strong class="text-danger">${APP_CONFIG.currencySymbol} ${formatCurrency(penalty)}</strong></div>
        </div>
        <div class="mt-2 small text-muted">
          <i class="bi bi-info-circle"></i> ${t("collectiveBreachExplanation") || "No single shop exceeded the threshold. The collective usage caused the high rate. Building owner absorbs the penalty."}
        </div>
      </div>
    `;
  }

  // Verification row
  const totalCollected = grandTotal;
  const expectedTotal = cebTotalBill - penalty;
  
  outputHTML += `
    <div class="alert alert-info mt-3">
      <i class="bi bi-calculator"></i> 
      <strong>Verification:</strong>
      <div class="row g-1 small mt-2">
        <div class="col-8">${t("totalFromShops")}${hasBreaker && isAboveThreshold ? ' (incl. breaker penalties)' : ''}:</div>
        <div class="col-4 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(totalCollected)}</div>
        
        ${isAboveThreshold && remainingPenalty > 0 ? `
        <div class="col-8">${t("buildingOwnerPenalty")} (${t("remainingGap") || "Remaining Gap"}):</div>
        <div class="col-4 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(remainingPenalty)}</div>
        ` : ''}
        
        <div class="col-12"><hr class="my-1"></div>
        
        <div class="col-8"><strong>${t("grandTotal")}:</strong></div>
        <div class="col-4 text-end"><strong>${APP_CONFIG.currencySymbol} ${formatCurrency(totalCollected + remainingPenalty)}</strong></div>
        
        <div class="col-8">${t("cebTotalBill")}:</div>
        <div class="col-4 text-end">${APP_CONFIG.currencySymbol} ${formatCurrency(cebTotalBill)}</div>
      </div>
    </div>
  `;

  $("#output").innerHTML = outputHTML;

  // Save last calculation
  saveToStorage(APP_CONFIG.storageKeys.lastCalculation, {
    totalCharge,
    fixedCharge,
    ssclTax,
    splitMethod,
    ssclSplitMethod,
    shops,
  });
};

const showError = (message) => {
  $("#output").innerHTML = `
    <div class="alert alert-danger">
      <i class="bi bi-exclamation-triangle"></i> ${message}
    </div>
  `;
};

// ============================================
// UI Functions
// ============================================
const toggleDarkMode = () => {
  const isDark = $("#darkToggle").checked;
  document.body.classList.toggle("dark-mode", isDark);
  saveToStorage(APP_CONFIG.storageKeys.darkMode, isDark);
};

const setLanguage = () => {
  currentLanguage = $("#languageSelect").value;
  saveToStorage(APP_CONFIG.storageKeys.language, currentLanguage);
  updateUILanguage();
};

const updateUILanguage = () => {
  // Update title
  $("#title").innerHTML = `<i class="bi bi-lightning-charge"></i> ${t(
    "title"
  )}`;

  // Update all elements with data-i18n attribute
  $$("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = t(key);
    } else if (el.tagName === "OPTION") {
      el.textContent = t(key);
    } else {
      // Preserve icons
      const icon = el.querySelector("i");
      if (icon) {
        el.innerHTML = icon.outerHTML + " " + t(key);
      } else {
        el.textContent = t(key);
      }
    }
  });

  // Update shop labels
  renumberShops();
};

const resetForm = () => {
  $("#totalCharge").value = 2350;
  $("#fixedCharge").value = 500;
  $("#billingDays").value = 30;
  $("#fairRate").value = 25;
  $("#fairFixed").value = 500;
  $("#splitMethod").value = "equal";
  $("#ssclSplitMethod").value = "proportional";
  $("#output").innerHTML = "";

  // Recalculate SSCL Tax
  updateSSCLTax();

  // Reset shops
  $("#shopInputs").innerHTML = "";
  shopCount = 0;
  APP_CONFIG.defaultShops.forEach((shop) => addShop(shop.units, shop.name));
};

// ============================================
// Initialization
// ============================================
const init = () => {
  // Load saved preferences
  const savedDarkMode = loadFromStorage(APP_CONFIG.storageKeys.darkMode, false);
  const savedLanguage = loadFromStorage(APP_CONFIG.storageKeys.language, "en");

  // Apply dark mode
  $("#darkToggle").checked = savedDarkMode;
  document.body.classList.toggle("dark-mode", savedDarkMode);

  // Apply language
  currentLanguage = savedLanguage;
  $("#languageSelect").value = savedLanguage;

  // Initialize default shops
  APP_CONFIG.defaultShops.forEach((shop) => addShop(shop.units, shop.name));

  // Update UI text
  updateUILanguage();

  // Calculate initial SSCL Tax
  updateSSCLTax();

  // Event listeners
  $("#darkToggle").addEventListener("change", toggleDarkMode);
  $("#languageSelect").addEventListener("change", setLanguage);
  $("#addShopBtn").addEventListener("click", () => addShop());
  $("#resetBtn").addEventListener("click", resetForm);
  $("#printBtn").addEventListener("click", () => window.print());

  // Auto-calculate SSCL when Total Charge changes
  $("#totalCharge").addEventListener("input", updateSSCLTax);

  // Form submission
  $("#calculatorForm").addEventListener("submit", (e) => {
    e.preventDefault();
    calculate();
  });

  // Make removeShop available globally
  window.removeShop = removeShop;
};

// Start the app when DOM is ready
document.addEventListener("DOMContentLoaded", init);
