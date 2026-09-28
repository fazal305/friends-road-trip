/**
 * Shared formatting helpers so number/date presentation stays consistent
 * across pages instead of being reimplemented per component.
 */

export function formatCurrency(amount, currency = "PKR") {
  const value = Number.isFinite(amount) ? amount : 0;
  try {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString()}`;
  }
}

export function formatDate(dateString, options = {}) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  });
}

export function formatShortDate(dateString) {
  return formatDate(dateString, { year: undefined });
}

export function formatWeekday(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function formatDistance(km) {
  const value = Number.isFinite(km) ? km : 0;
  return `${value.toLocaleString()} km`;
}

export function formatDuration(hours) {
  const value = Number.isFinite(hours) ? hours : 0;
  const wholeHours = Math.floor(value);
  const minutes = Math.round((value - wholeHours) * 60);
  if (minutes === 0) return `${wholeHours}h`;
  return `${wholeHours}h ${minutes}m`;
}

export function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
