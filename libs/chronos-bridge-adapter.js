import { hebrewToGregorian, islamicToGregorian, persianToGregorian } from './chronos-bridge/src/index.js';

function addDays(date, days) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function getNthWeekdayOfMonth(year, month, weekday, n) {
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  const currentWeekday = firstDayOfMonth.getUTCDay();
  let daysToAdd = (weekday - currentWeekday + 7) % 7;
  daysToAdd += (n - 1) * 7;
  return addDays(firstDayOfMonth, daysToAdd);
}

function getWesternEaster(year) {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const k = Math.floor(year / 100);
  const p = Math.floor((13 + 8 * k) / 25);
  const q = Math.floor(k / 4);
  const M = (15 - p + k - q) % 30;
  const N = (4 + k - q) % 7;
  const d = (19 * a + M) % 30;
  const e = (2 * b + 4 * c + 6 * d + N) % 7;
  const day = 22 + d + e;
  return day > 31 ? new Date(Date.UTC(year, 3, day - 31)) : new Date(Date.UTC(year, 2, day));
}

function getOrthodoxEaster(year) {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const dayOfMonth = d + e + 113;
  const month = Math.floor(dayOfMonth / 31);
  const day = (dayOfMonth % 31) + 1;
  const orthodoxEasterJulian = new Date(Date.UTC(year, month - 1, day));
  orthodoxEasterJulian.setUTCDate(orthodoxEasterJulian.getUTCDate() + 13);
  return orthodoxEasterJulian;
}

function findIslamicDateInGregorianYear(gYear, iMonth, iDay) {
  let hYear = Math.round((gYear - 622) * 1.0307);
  for (let i = -1; i <= 2; i++) {
    const parts = islamicToGregorian({ year: hYear + i, month: iMonth, day: iDay });
    if (parts.year === gYear) {
      return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
    }
  }
  return null;
}

function findPersianDateInGregorianYear(gYear, pMonth, pDay) {
  const pYearBase = gYear - 621;
  for (let y = pYearBase - 1; y <= pYearBase + 1; y++) {
    const parts = persianToGregorian({ year: y, month: pMonth, day: pDay });
    if (parts.year === gYear) {
      return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
    }
  }
  return null;
}

window.ChronosBridge = {
  Utils: {
    addDays,
    getNthWeekdayOfMonth,
    getWesternEaster,
    getOrthodoxEaster
  },
  Hebrew: {
    convertToGregorian(hYear, hMonth, hDay) {
      const parts = hebrewToGregorian({ year: hYear, month: hMonth, day: hDay });
      return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
    }
  },
  Islamic: {
    convertToGregorian(iYear, iMonth, iDay) {
      const parts = islamicToGregorian({ year: iYear, month: iMonth, day: iDay });
      return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
    },
    findDateInGregorianYear: findIslamicDateInGregorianYear
  },
  Persian: {
    convertToGregorian(pYear, pMonth, pDay) {
      const parts = persianToGregorian({ year: pYear, month: pMonth, day: pDay });
      return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
    },
    findDateInGregorianYear: findPersianDateInGregorianYear
  }
};
