/**
 * add new currency here
 */
export const CURRENCY_TYPE = {
  FLASH: 1,
  BTC: 2,
  LTC: 3,
  DASH: 4,
  ETH: 5,
};

export const CURRENCY_TYPE_UNIT = {
  1: 'Flash',
  2: 'BTC',
  3: 'LTC',
  4: 'DASH',
  5: 'ETH',
};

export const CURRENCY_TYPE_UNIT_UPCASE = {
  1: 'FLASH',
  2: 'BTC',
  3: 'LTC',
  4: 'DASH',
  5: 'ETH',
};

export const CURRENCY_ICON_URL = {
  1: 'assets/images/flash-icon.png',
  2: 'assets/images/btc-icon.png',
  3: 'assets/images/ltc-icon.png',
  4: 'assets/images/dash-icon.png',
  5: 'assets/images/eth-icon.png',
};

export function getCurrencyUnitUpcase(currency_type) {
  if (!currency_type) currency_type = localStorage.getItem('currency_type');
  return CURRENCY_TYPE_UNIT_UPCASE[currency_type];
}

export function getCurrencyIconUrl(currency_type) {
  if (!currency_type) currency_type = localStorage.getItem('currency_type');
  return CURRENCY_ICON_URL[currency_type];
}

export function getCurrencyUnit() {
  return CURRENCY_TYPE_UNIT[localStorage.getItem('currency_type')];
}
