const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const RANGE = "Phones"; // sheet name + data range

function normalizeRow(headers, row) {
  // fill missing columns so index always exists
  for (let i = 0; i < headers.length; i++) {
    if (row[i] === undefined) row[i] = "";
  }

  const obj = {};
  headers.forEach((col, i) => {
    obj[col.trim()] = row[i];
  });

  // price → number
  obj.price = parseInt(obj.price) || 0;

  // boolean parsing
  const bool = v =>
    v === true ||
    v === "TRUE" ||
    v === "true" ||
    v === 1 ||
    v === "1" ||
    v?.toString().toLowerCase() === "yes";

  obj.available = bool(obj.available);
  obj.is_deal = bool(obj.is_deal);

  // images parsing
  if (typeof obj.images === "string") {
    try {
      // JSON array?
      obj.images = JSON.parse(obj.images);
    } catch {
      // comma separated?
      obj.images = obj.images.split(",").map(v => v.trim());
    }
  }
  if (!Array.isArray(obj.images)) obj.images = [];

  return obj;
}

async function fetchSheetRaw() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
  const res = await fetch(url);
  const data = await res.json();
  if (!data.values) return [];

  const headers = data.values[0];
  const rows = data.values.slice(1);

  return rows.map(r => normalizeRow(headers, r));
}

export const phoneAPI = {
  async getAllPhones(filters = {}) {
    let phones = await fetchSheetRaw();

    if (filters.availableOnly) phones = phones.filter(p => p.available);
    if (filters.dealsOnly) phones = phones.filter(p => p.is_deal);
    if (filters.brand) phones = phones.filter(
      p => p.brand?.toLowerCase() === filters.brand.toLowerCase()
    );
    if (filters.minPrice) phones = phones.filter(p => p.price >= filters.minPrice);
    if (filters.maxPrice) phones = phones.filter(p => p.price <= filters.maxPrice);

    // newest first if created_at exists
    phones.sort((a, b) => {
      if (a.created_at && b.created_at)
        return new Date(b.created_at) - new Date(a.created_at);
      return 0;
    });

    return phones;
  },

  async getAllBrands(availableOnly = true) {
    let phones = await fetchSheetRaw();
    if (availableOnly) phones = phones.filter(p => p.available);
    return [...new Set(phones.map(p => p.brand))].sort();
  },

  async getPhoneById(id) {
    const phones = await fetchSheetRaw();
    return phones.find(p => p.id === id || p.id === String(id)) || null;
  },
};