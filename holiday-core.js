/**
     * Universal Holiday & Calendar Library v1.3
     */

    // =============================================================================
    // 1. DEUTSCHE GESETZES-KONFIGURATION (The Rules)
    // =============================================================================

    const GERMAN_LEGAL_CONFIG = {
        // --- Staatliche Feiertage ---
        'neujahr': { isLegal: true, scope: 'Bundesweit', isSilent: false, isTradingHoliday: true },
        'tag_der_arbeit': { isLegal: true, scope: 'Bundesweit', isSilent: false, isTradingHoliday: true },
        'tag_der_deutschen_einheit': { isLegal: true, scope: 'Bundesweit', isSilent: false, isTradingHoliday: true },

        // Dynamisch: Internationaler Frauentag
        'frauentag': (year) => {
            if (year >= 2023) return { isLegal: true, scope: 'Regional', states: 'BE, MV', isSilent: false, isTradingHoliday: false };
            if (year >= 2019) return { isLegal: true, scope: 'Regional', states: 'BE', isSilent: false, isTradingHoliday: false };
            return { isLegal: false, scope: 'Kein Feiertag', states: '', isSilent: false, isTradingHoliday: false };
        },

        // Dynamisch: Tag der Befreiung
        'tag_der_befreiung': (year) => {
            if (year === 2025 || year === 2020) {
                return { isLegal: true, scope: 'Regional (Einmalig)', states: 'BE', isSilent: false, isTradingHoliday: false };
            }
            return { isLegal: false, scope: 'Gedenktag', states: '', isSilent: false, isTradingHoliday: false };
        },

        'augsburger_friedensfest': { isLegal: true, scope: 'Lokal (Augsburg)', states: 'BY (Augsburg)', isSilent: false, isTradingHoliday: false },
        'weltkindertag': (year) => {
            if (year >= 2019) return { isLegal: true, scope: 'Regional', states: 'TH', isSilent: false, isTradingHoliday: false };
            return { isLegal: false, scope: 'Gedenktag', states: '', isSilent: false, isTradingHoliday: false };
        },

        // --- Christliche Feiertage ---
        'karfreitag': { isLegal: true, scope: 'Bundesweit', isSilent: true, isTradingHoliday: true },
        'ostermontag': { isLegal: true, scope: 'Bundesweit', isSilent: false, isTradingHoliday: true },
        'christi_himmelfahrt': { isLegal: true, scope: 'Bundesweit', isSilent: false, isTradingHoliday: false },
        'pfingstmontag': { isLegal: true, scope: 'Bundesweit', isSilent: false, isTradingHoliday: true },
        '1_weihnachtstag': { isLegal: true, scope: 'Bundesweit', isSilent: false, isTradingHoliday: true },
        '2_weihnachtstag': { isLegal: true, scope: 'Bundesweit', isSilent: false, isTradingHoliday: true },

        'ostersonntag': { isLegal: true, scope: 'Regional (BB)', states: 'BB', isSilent: true, isTradingHoliday: false },
        'pfingstsonntag': { isLegal: true, scope: 'Regional (BB)', states: 'BB', isSilent: true, isTradingHoliday: false },

        'heilige_drei_koenige': { isLegal: true, scope: 'Regional', states: 'BW, BY, ST', isSilent: false, isTradingHoliday: false },
        'fronleichnam': { isLegal: true, scope: 'Regional', states: 'BW, BY, HE, NW, RP, SL', footnote: '* **', isSilent: false, isTradingHoliday: false },
        'mariae_himmelfahrt': { isLegal: true, scope: 'Regional', states: 'SL, BY (Teile)', footnote: '***', isSilent: false, isTradingHoliday: false },
        'allerheiligen': { isLegal: true, scope: 'Regional', states: 'BW, BY, NW, RP, SL', isSilent: true, isTradingHoliday: false },
        'reformationstag': (year) => {
            if (year === 2017) return { isLegal: true, scope: 'Bundesweit (500 Jahre)', isSilent: false, isTradingHoliday: true };
            return { isLegal: true, scope: 'Regional', states: 'BB, HB, HH, MV, NI, SN, ST, SH, TH', isSilent: false, isTradingHoliday: false };
        },
        'buss_und_bettag': { isLegal: true, scope: 'Regional (SN)', states: 'SN', isSilent: true, isTradingHoliday: false },

        // Stille Tage / Brauchtum
        'aschermittwoch': { isLegal: false, scope: 'Brauchtum', isSilent: true, isTradingHoliday: false },
        'heiligabend': { isLegal: false, scope: 'Stiller Tag / Bankfeiertag', isSilent: true, isTradingHoliday: true },
        'volkstrauertag': { isLegal: false, scope: 'Gedenktag', isSilent: true, isTradingHoliday: false },
        'totensonntag': { isLegal: false, scope: 'Gedenktag', isSilent: true, isTradingHoliday: false },
        'silvester': { isLegal: false, scope: 'Jahreswechsel / Bankfeiertag', isSilent: false, isTradingHoliday: true },

        // --- JÃ¼dische Feiertage (Gesetzlich geschÃ¼tzt) ---
        // Diese Tage sind i.d.R. keine arbeitsfreien Feiertage fÃ¼r alle, genieÃŸen aber Schutz (Freistellung/LÃ¤rmschutz).
        'rosch_ha_schana_1': { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },
        'rosch_ha_schana_2': { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },
        'jom_kippur':        { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },
        
        'sukkot_1':          { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },
        'sukkot_2':          { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },
        'schemini_azeret':   { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false }, // Sukkot Ende 1
        'simchat_tora':      { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false }, // Sukkot Ende 2
        
        'pessach_1':         { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },
        'pessach_2':         { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },
        'pessach_7':         { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },
        'pessach_8':         { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },
        
        'schawuot_1':        { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },
        'schawuot_2':        { isLegal: false, scope: 'Gesetzlich geschÃ¼tzt (JÃ¼disch)', isSilent: true, isTradingHoliday: false },


        // --- Fallback ---
        'DEFAULT': { isLegal: false, scope: 'Sonstige / ReligiÃ¶s', states: '', isSilent: false, isTradingHoliday: false }
    };


    // =============================================================================
    // 2. KALENDER-UTILS & SYSTEME
    // =============================================================================

    class CalendarUtils {
        static addDays(date, days) {
            const result = new Date(date);
            result.setUTCDate(result.getUTCDate() + days);
            return result;
        }

        static getNthWeekdayOfMonth(year, month, weekday, n) {
            const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
            let currentWeekday = firstDayOfMonth.getUTCDay();
            let daysToAdd = (weekday - currentWeekday + 7) % 7;
            daysToAdd += (n - 1) * 7;
            return this.addDays(firstDayOfMonth, daysToAdd);
        }

        static getWesternEaster(year) {
            const a = year % 19, b = year % 4, c = year % 7, k = Math.floor(year / 100),
                p = Math.floor((13 + 8 * k) / 25), q = Math.floor(k / 4),
                M = (15 - p + k - q) % 30, N = (4 + k - q) % 7,
                d = (19 * a + M) % 30, e = (2 * b + 4 * c + 6 * d + N) % 7,
                day = 22 + d + e;
            return day > 31 ? new Date(Date.UTC(year, 3, day - 31)) : new Date(Date.UTC(year, 2, day));
        }

        static getOrthodoxEaster(year) {
            const a = year % 4, b = year % 7, c = year % 19, d = (19 * c + 15) % 30;
            const e = (2 * a + 4 * b - d + 34) % 7, dayOfMonth = d + e + 113;
            const month = Math.floor(dayOfMonth / 31), day = (dayOfMonth % 31) + 1;
            const orthodoxEasterJulian = new Date(Date.UTC(year, month - 1, day));
            orthodoxEasterJulian.setUTCDate(orthodoxEasterJulian.getUTCDate() + 13);
            return orthodoxEasterJulian;
        }

        static jdToGregorian(jd) {
            const J = Math.floor(jd + 0.5), j = J + 32044, g = Math.floor(j / 146097), dg = j % 146097;
            const c = Math.floor((Math.floor(dg / 36524) + 1) * 3 / 4), dc = dg - c * 36524;
            const b = Math.floor(dc / 1461), db = dc % 1461, a = Math.floor((Math.floor(db / 365) + 1) * 3 / 4), da = db - a * 365;
            const y = g * 400 + c * 100 + b * 4 + a, m = Math.floor((da * 5 + 308) / 153) - 2, d = da - Math.floor((m + 4) * 153 / 5) + 122;
            const year = y - 4800 + Math.floor((m + 2) / 12), month = (m + 2) % 12 + 1, day = d + 1;
            return new Date(Date.UTC(year, month - 1, day));
        }
    }

    class HebrewCalendarSystem {
        static isLeapYear(year) { return ((year * 7 + 1) % 19) < 7; }
        static getYearLength(year) { return this.hebrewToJd(year + 1, 7, 1) - this.hebrewToJd(year, 7, 1); }
        static hebrewToJd(year, month, day) {
            const HEBREW_EPOCH = 347995.5;
            const months = Math.floor((235 * year - 234) / 19), parts = 12084 + 13753 * months;
            let days = months * 29 + Math.floor(parts / 25920), dayOfWeek = days % 7;
            if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) { days++; }
            if (dayOfWeek === 0 && this.isLeapYear(year) && months > 6) { days++; }
            if (dayOfWeek === 1 && !this.isLeapYear(year - 1) && months > 5) { days++; }
            let jd = HEBREW_EPOCH + days;
            const isLeap = this.isLeapYear(year);
            const getMonthDays = (y, m) => {
                 if (m === 2 || m === 4 || m === 6 || m === 10 || m === 13) return 29;
                 if (m === 12 && !this.isLeapYear(y)) return 29;
                 if (m === 8 || m === 9) {
                     const yearLen = this.getYearLength(y);
                     const longHeshvan = yearLen % 10 === 5;
                     const shortKislev = yearLen % 10 === 3;
                     if (m === 8 && !longHeshvan) return 29;
                     if (m === 9 && shortKislev) return 29;
                 }
                 return 30;
            };
            if (month < 7) {
                for (let m = 7; m <= (isLeap ? 13 : 12); m++) jd += getMonthDays(year, m);
                for (let m = 1; m < month; m++) jd += getMonthDays(year, m);
            } else { for (let m = 7; m < month; m++) jd += getMonthDays(year, m); }
            jd += day; return jd;
        }
        static convertToGregorian(hYear, hMonth, hDay) { return CalendarUtils.jdToGregorian(this.hebrewToJd(hYear, hMonth, hDay)); }
    }

    class IslamicCalendarSystem {
        static islamicToJd(year, month, day) {
            const ISLAMIC_EPOCH = 1948439.5;
            return day + Math.ceil(29.5 * (month - 1)) + (year - 1) * 354 + Math.floor((3 + 11 * year) / 30) + ISLAMIC_EPOCH - 1;
        }
        static convertToGregorian(iYear, iMonth, iDay) { return CalendarUtils.jdToGregorian(this.islamicToJd(iYear, iMonth, iDay)); }
        static findDateInGregorianYear(gYear, iMonth, iDay) {
            let hYear = Math.round((gYear - 622) * 1.0307);
            for (let i = -1; i <= 2; i++) {
                let gDate = this.convertToGregorian(hYear + i, iMonth, iDay);
                if (gDate.getUTCFullYear() === gYear) { return gDate; }
            }
            return null;
        }
    }

    class PersianCalendarSystem {
        // Konvertiert ein Jalali-Datum (jY, jM, jD) in ein gregorianisches Date-Objekt
        static jalaliToGregorian(jY, jM, jD) {
            let jy = jY - 979;
            let jm = jM - 1;
            let jd = jD - 1;

            let j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
            for (let i = 0; i < jm; ++i) j_day_no += (i < 6) ? 31 : 30;

            let j_np = j_day_no + jd;
            let g_day_no = j_np + 79;

            let gy = 1600 + 400 * parseInt(g_day_no / 146097);
            g_day_no = g_day_no % 146097;

            let leap = true;
            if (g_day_no >= 36525) {
                g_day_no--;
                gy += 100 * parseInt(g_day_no / 36524);
                g_day_no = g_day_no % 36524;

                if (g_day_no >= 365) {
                    g_day_no++;
                } else {
                    leap = false;
                }
            }

            gy += 4 * parseInt(g_day_no / 1461);
            g_day_no %= 1461;

            if (g_day_no >= 366) {
                leap = false;
                g_day_no--;
                gy += parseInt(g_day_no / 365);
                g_day_no = g_day_no % 365;
            }

            let i;
            const days = [31, (leap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            
            for (i = 0; i < 12; i++) {
                if (g_day_no < days[i]) break;
                g_day_no -= days[i];
            }
            
            return new Date(Date.UTC(gy, i, g_day_no + 1));
        }

        // Hilfsmethode: Findet ein persisches Datum im gegebenen gregorianischen Jahr
        static findDateInGregorianYear(gYear, pMonth, pDay) {
            // Das persische Jahr beginnt im MÃ¤rz.
            // Wenn wir z.B. Yalda (Monat 9) im Jahr 2025 suchen, ist das persisches Jahr 1404.
            // Wenn wir Nowruz (Monat 1) im Jahr 2025 suchen, ist das persisches Jahr 1404.
            
            // NÃ¤herung: Gregorianisches Jahr - 621 = Persisches Jahr
            let pYearBase = gYear - 621;
            
            // Wir prÃ¼fen pYearBase und pYearBase - 1, um sicherzugehen
            for (let y = pYearBase - 1; y <= pYearBase + 1; y++) {
                let date = this.jalaliToGregorian(y, pMonth, pDay);
                if (date.getUTCFullYear() === gYear) {
                    return date;
                }
            }
            return null;
        }
    }

    // =============================================================================
    // 3. FEIERTAGE-PROVIDER (Datenlieferanten)
    // =============================================================================

    class BaseProvider { constructor(year) { this.year = year; } getHolidays() { return []; } }

    class StateProvider extends BaseProvider {
        getHolidays() {
            return [
                { name: 'Neujahr', date: new Date(Date.UTC(this.year, 0, 1)), key: 'neujahr', category: 'Staatlich' },
                { name: 'Internationaler Frauentag', date: new Date(Date.UTC(this.year, 2, 8)), key: 'frauentag', category: 'Staatlich' },
                { name: 'Tag der Arbeit', date: new Date(Date.UTC(this.year, 4, 1)), key: 'tag_der_arbeit', category: 'Staatlich' },
                { name: 'Jahrestag der Befreiung', date: new Date(Date.UTC(this.year, 4, 8)), key: 'tag_der_befreiung', category: 'Staatlich' },
                { name: 'Augsburger Hohes Friedensfest', date: new Date(Date.UTC(this.year, 7, 8)), key: 'augsburger_friedensfest', category: 'Staatlich' },
                { name: 'Weltkindertag', date: new Date(Date.UTC(this.year, 8, 20)), key: 'weltkindertag', category: 'Staatlich' },
                { name: 'Tag der Deutschen Einheit', date: new Date(Date.UTC(this.year, 9, 3)), key: 'tag_der_deutschen_einheit', category: 'Staatlich' },
            ];
        }
    }

    class ChristianGeneralProvider extends BaseProvider {
        getHolidays() {
            const easter = CalendarUtils.getWesternEaster(this.year);
            return [
                { name: 'Aschermittwoch', date: CalendarUtils.addDays(easter, -46), key: 'aschermittwoch', category: 'Christlich', isFasting: true, fastingLevel: 2 },
                { name: 'Karfreitag', date: CalendarUtils.addDays(easter, -2), key: 'karfreitag', category: 'Christlich', isFasting: true, fastingLevel: 1 },
                { name: 'Ostersonntag', date: easter, key: 'ostersonntag', category: 'Christlich' },
                { name: 'Ostermontag', date: CalendarUtils.addDays(easter, 1), key: 'ostermontag', category: 'Christlich' },
                { name: 'Christi Himmelfahrt', date: CalendarUtils.addDays(easter, 39), key: 'christi_himmelfahrt', category: 'Christlich' },
                { name: 'Pfingstsonntag', date: CalendarUtils.addDays(easter, 49), key: 'pfingstsonntag', category: 'Christlich' },
                { name: 'Pfingstmontag', date: CalendarUtils.addDays(easter, 50), key: 'pfingstmontag', category: 'Christlich' },
                { name: 'Heiligabend', date: new Date(Date.UTC(this.year, 11, 24)), key: 'heiligabend', category: 'Christlich' },
                { name: '1. Weihnachtstag', date: new Date(Date.UTC(this.year, 11, 25)), key: '1_weihnachtstag', category: 'Christlich' },
                { name: '2. Weihnachtstag', date: new Date(Date.UTC(this.year, 11, 26)), key: '2_weihnachtstag', category: 'Christlich' },
            ];
        }
    }

    class ChristianCatholicProvider extends BaseProvider {
        getHolidays() {
            const easter = CalendarUtils.getWesternEaster(this.year);
            return [
                { name: 'Heilige Drei KÃ¶nige', date: new Date(Date.UTC(this.year, 0, 6)), key: 'heilige_drei_koenige', category: 'Christlich' },
                { name: 'Fronleichnam', date: CalendarUtils.addDays(easter, 60), key: 'fronleichnam', category: 'Christlich' },
                { name: 'MariÃ¤ Himmelfahrt', date: new Date(Date.UTC(this.year, 7, 15)), key: 'mariae_himmelfahrt', category: 'Christlich' },
                { name: 'Allerheiligen', date: new Date(Date.UTC(this.year, 10, 1)), key: 'allerheiligen', category: 'Christlich' },
            ];
        }
    }

    class ChristianProtestantProvider extends BaseProvider {
        getHolidays() {
            const nov22 = new Date(Date.UTC(this.year, 10, 22));
            const bussOffset = (nov22.getUTCDay() - 3 + 7) % 7;
            const bussTag = CalendarUtils.addDays(nov22, -bussOffset);
            return [
                { name: 'Reformationstag', date: new Date(Date.UTC(this.year, 9, 31)), key: 'reformationstag', category: 'Christlich' },
                { name: 'Volkstrauertag', date: CalendarUtils.addDays(bussTag, -4), key: 'volkstrauertag', category: 'Staatlich' },
                { name: 'BuÃŸ- und Bettag', date: bussTag, key: 'buss_und_bettag', category: 'Christlich' },
                { name: 'Totensonntag', date: CalendarUtils.addDays(bussTag, 4), key: 'totensonntag', category: 'Christlich' }
             ];
        }
    }

    class OrthodoxProvider extends BaseProvider {
        getHolidays() {
            const easter = CalendarUtils.getOrthodoxEaster(this.year);
            return [
                { name: 'Orthodoxes Weihnachtsfest', date: new Date(Date.UTC(this.year, 0, 7)), key: 'orthodox_weihnachten', category: 'Orthodox' },
                { name: 'Orthodoxer Karfreitag', date: CalendarUtils.addDays(easter, -2), key: 'orthodox_karfreitag', category: 'Orthodox', isFasting: true, fastingLevel: 1 },
                { name: 'Orthodoxer Ostersonntag', date: easter, key: 'orthodox_ostersonntag', category: 'Orthodox' },
                { name: 'Orthodoxer Ostermontag', date: CalendarUtils.addDays(easter, 1), key: 'orthodox_ostermontag', category: 'Orthodox' },
            ];
        }
    }

    class JewishProvider extends BaseProvider {
        getHolidays() {
            // Gesetzlich geschÃ¼tzte Tage in DE:
            // Pessach (1., 2. und 7., 8. Tag)
            // Wochenfest/Schawuot (2 Tage)
            // LaubhÃ¼ttenfest/Sukkot (1., 2. Tag)
            // Schlussfest/Schemini Azeret & Simchat Tora (die "letzten zwei" von Sukkot)
            // Neujahr/Rosch Haschana (2 Tage)
            // VersÃ¶hnungstag/Jom Kippur (1 Tag)

            const configs = [
                // Pessach (1. Monat Nissan)
                { name: 'Pessach (1. Tag)', month: 1, day: 15, key: 'pessach_1' },
                { name: 'Pessach (2. Tag)', month: 1, day: 16, key: 'pessach_2' },
                { name: 'Pessach (7. Tag)', month: 1, day: 21, key: 'pessach_7' },
                { name: 'Pessach (8. Tag)', month: 1, day: 22, key: 'pessach_8' },

                // Schawuot / Wochenfest (3. Monat Sivan)
                { name: 'Schawuot (1. Tag)', month: 3, day: 6, key: 'schawuot_1' },
                { name: 'Schawuot (2. Tag)', month: 3, day: 7, key: 'schawuot_2' },

                // Rosch Haschana (7. Monat Tischri)
                { name: 'Rosch ha-Schana (1. Tag)', month: 7, day: 1, key: 'rosch_ha_schana_1' },
                { name: 'Rosch ha-Schana (2. Tag)', month: 7, day: 2, key: 'rosch_ha_schana_2' },

                // Jom Kippur
                { name: 'Jom Kippur', month: 7, day: 10, key: 'jom_kippur', isFasting: true, fastingLevel: 1 },

                // Sukkot / LaubhÃ¼ttenfest (7. Monat Tischri)
                { name: 'Sukkot (1. Tag)', month: 7, day: 15, key: 'sukkot_1' },
                { name: 'Sukkot (2. Tag)', month: 7, day: 16, key: 'sukkot_2' },

                // Schlussfest (Direkt nach Sukkot)
                { name: 'Schemini Azeret', month: 7, day: 22, key: 'schemini_azeret' },
                { name: 'Simchat Tora', month: 7, day: 23, key: 'simchat_tora' },

                // Weitere (ReligiÃ¶s, aber oft nicht explizit im Gesetzestext, aber Tradition)
                { name: 'Chanukka (1. Tag)', month: 9, day: 25, key: 'chanukka' },
                { name: 'Fasten Esther', month: 12, day: 13, key: 'fasten_esther', isFasting: true, fastingLevel: 2 },
                { name: '17. Tammuz (Fasten)', month: 4, day: 17, key: '17_tammuz', isFasting: true, fastingLevel: 2 },
                { name: 'Tisha B\'Av (Fasten)', month: 5, day: 9, key: 'tisha_b_av', isFasting: true, fastingLevel: 1 },
            ];

            return configs.map(c => {
                let hYear = this.year + 3760;
                let date = HebrewCalendarSystem.convertToGregorian(hYear, c.month, c.day);
                // Korrektur, falls das hebrÃ¤ische Datum in ein anderes gregorianisches Jahr fÃ¤llt
                if (date.getUTCFullYear() < this.year || (date.getUTCFullYear() === this.year && date.getUTCMonth() > 8 && c.month < 7)) {
                    hYear++; date = HebrewCalendarSystem.convertToGregorian(hYear, c.month, c.day);
                } else if (date.getUTCFullYear() > this.year && c.month > 6) {
                    hYear--; date = HebrewCalendarSystem.convertToGregorian(hYear, c.month, c.day);
                }
                // Verschiebung von Fastentagen, wenn sie auf Sabbat fallen (Ausnahme Jom Kippur)
                if (['tisha_b_av', '17_tammuz', 'fasten_gedalja', 'fasten_esther'].includes(c.key) && date.getUTCDay() === 6) {
                     // Esther wird vorverlegt, andere nach hinten (vereinfacht, hier meist +1, Esther mÃ¼sste eigentlich -2 wenn Sabbat)
                     // Um die Lib einfach zu halten, lassen wir die simple Verschiebung fÃ¼r Minor Fasts
                     date = CalendarUtils.addDays(date, 1); 
                }

                return { name: c.name, date: date, key: c.key, category: 'JÃ¼disch', isFasting: !!c.isFasting, fastingLevel: c.fastingLevel || 0 };
            });
        }
    }

    class IslamicProvider extends BaseProvider {
        getHolidays() {
            const configs = [
                { name: 'Islamisches Neujahr', month: 1, day: 1, key: 'islamisches_neujahr' },
                { name: 'Aschura', month: 1, day: 10, key: 'aschura', isFasting: true, fastingLevel: 2 },
                { name: 'Ramadan Beginn', month: 9, day: 1, key: 'ramadan_beginn', isFasting: true, fastingLevel: 1 },
                { name: 'Eid al-Fitr', month: 10, day: 1, key: 'eid_al_fitr' },
                { name: 'Eid al-Adha', month: 12, day: 10, key: 'eid_al_adha' },
            ];
            const holidays = [];
            configs.forEach(c => {
                const date = IslamicCalendarSystem.findDateInGregorianYear(this.year, c.month, c.day);
                if (date) holidays.push({ name: c.name, date: date, key: c.key, category: 'Islamisch', isFasting: c.isFasting, fastingLevel: c.fastingLevel || 0 });
            });
            return holidays;
        }
    }

    class IranianProvider extends BaseProvider {
        getHolidays() {
            const configs = [
                // FrÃ¼hlingsfeste
                { name: 'Nowruz (Persisches Neujahr)', month: 1, day: 1, key: 'nowruz', category: 'Iranisch' },
                { name: 'Sizdah Bedar (Tag der Natur)', month: 1, day: 13, key: 'sizdah_bedar', category: 'Iranisch' },
            
                // Sommerfeste
                { name: 'Tirgan (Sommerfest)', month: 4, day: 13, key: 'tirgan', category: 'Iranisch' },
            
                // Herbstfeste
                { name: 'Mehregan (Herbstfest)', month: 7, day: 16, key: 'mehregan', category: 'Iranisch' },
            
                // Winterfeste
                { name: 'Shab-e Yalda (Yalda-Nacht)', month: 9, day: 30, key: 'yalda_nacht', category: 'Iranisch' },
                { name: 'Jashn-e Sadeh (Fest des Feuers)', month: 11, day: 10, key: 'sadeh', category: 'Iranisch' }
            ];

            const holidays = [];
   
            // Standard-Daten hinzufÃ¼gen
            configs.forEach(c => {
                const date = PersianCalendarSystem.findDateInGregorianYear(this.year, c.month, c.day);
                if (date) {
                    holidays.push({ 
                        name: c.name, 
                        date: date, 
                        key: c.key, 
                        category: c.category 
                    });
                }
            });

            // Sonderfall: Chaharshanbe Suri (Der Vorabend des letzten Mittwochs)
            const nowruzDate = PersianCalendarSystem.findDateInGregorianYear(this.year, 1, 1);
            if (nowruzDate) {
                // 1. Finde den Wochentag von Nowruz (0=So, 1=Mo, ..., 3=Mi, ...)
                const dayOfWeekNowruz = nowruzDate.getUTCDay();

                // 2. Berechne den Abstand zum letzten Mittwoch vor Nowruz
                // Wenn Nowruz ein Mittwoch ist, ist der "letzte Mittwoch" genau 7 Tage vorher.
                let daysToLastWednesday = (dayOfWeekNowruz - 3 + 7) % 7;
                if (daysToLastWednesday === 0) daysToLastWednesday = 7;

                // 3. Gehe vom letzten Mittwoch einen weiteren Tag zurÃ¼ck auf den Dienstag
                const suriDate = CalendarUtils.addDays(nowruzDate, -(daysToLastWednesday + 1));

                holidays.push({
                    name: 'Chaharshanbe Suri (Feuerfest)',
                    date: suriDate,
                    key: 'chaharshanbe_suri',
                    category: 'Iranisch'
                });
            }

            return holidays;
        }
    }


    class CulturalProvider extends BaseProvider {
        getHolidays() {
            return [
                { name: 'Valentinstag', date: new Date(Date.UTC(this.year, 1, 14)), key: 'valentinstag', category: 'Kulturell' },
                { name: 'Muttertag', date: CalendarUtils.getNthWeekdayOfMonth(this.year, 4, 0, 2), key: 'muttertag', category: 'Kulturell' },
                { name: 'Erntedankfest', date: CalendarUtils.getNthWeekdayOfMonth(this.year, 9, 0, 1), key: 'erntedankfest', category: 'Kulturell' },
                { name: 'Halloween', date: new Date(Date.UTC(this.year, 9, 31)), key: 'halloween', category: 'Kulturell' },
                { name: 'Nikolaus', date: new Date(Date.UTC(this.year, 11, 6)), key: 'nikolaus', category: 'Christlich' },
                { name: 'Silvester', date: new Date(Date.UTC(this.year, 11, 31)), key: 'silvester', category: 'Kulturell' }
            ];
        }
    }

    // =============================================================================
    // 4. HAUPTKLASSE
    // =============================================================================

    class UniversalHolidayLib {

        static _applyGermanLaws(rawHoliday, year) {
            let key = rawHoliday.key;
            if (!key) {
                 key = rawHoliday.name.toLowerCase()
                    .replace(/Ã¤/g, 'ae').replace(/Ã¶/g, 'oe').replace(/Ã¼/g, 'ue').replace(/ÃŸ/g, 'ss')
                    .replace(/[^a-z0-9]/g, '_');
            }

            let configEntry = GERMAN_LEGAL_CONFIG[key] || GERMAN_LEGAL_CONFIG['DEFAULT'];

            if (typeof configEntry === 'function') {
                configEntry = configEntry(year);
            }

            return {
                ...rawHoliday,
                ...configEntry
            };
        }

        static getHolidays(year) {
            const providers = [
                new StateProvider(year),
                new ChristianGeneralProvider(year),
                new ChristianCatholicProvider(year),
                new ChristianProtestantProvider(year),
                new OrthodoxProvider(year),
                new JewishProvider(year),
                new IslamicProvider(year),
                new IranianProvider(year),
                new CulturalProvider(year)
            ];

            let allRaw = providers.flatMap(p => p.getHolidays());
            const enrichedHolidays = allRaw.map(h => this._applyGermanLaws(h, year));
            return enrichedHolidays.filter(h => h && h.date).sort((a, b) => a.date - b.date);
        }

        static get Utils() { return CalendarUtils; }
        static get Providers() {
            return { StateProvider, ChristianGeneralProvider, ChristianCatholicProvider, ChristianProtestantProvider, OrthodoxProvider, JewishProvider, IslamicProvider, IranianProvider, CulturalProvider };
        }
        static get Hebrew() { return HebrewCalendarSystem; }
        static get Islamic() { return IslamicCalendarSystem; }
    }
    
    // Global verfÃ¼gbar machen
    window.UniversalHolidayLib = UniversalHolidayLib;
