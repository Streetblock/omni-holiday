/**
 * OmniHoliday Domain
 * Feiertagsregeln, Provider und gesetzliche Einordnung.
 */
if (!window.ChronosBridge) {
    throw new Error('ChronosBridge ist nicht geladen. Bitte chronos-bridge.js vor omni-holiday.js laden.');
}
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

        // --- Jüdische Feiertage (Gesetzlich geschützt) ---
        // Diese Tage sind i.d.R. keine arbeitsfreien Feiertage für alle, genießen aber Schutz (Freistellung/Lärmschutz).
        'rosch_ha_schana_1': { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },
        'rosch_ha_schana_2': { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },
        'jom_kippur':        { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },
        
        'sukkot_1':          { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },
        'sukkot_2':          { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },
        'schemini_azeret':   { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false }, // Sukkot Ende 1
        'simchat_tora':      { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false }, // Sukkot Ende 2
        
        'pessach_1':         { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },
        'pessach_2':         { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },
        'pessach_7':         { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },
        'pessach_8':         { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },
        
        'schawuot_1':        { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },
        'schawuot_2':        { isLegal: false, scope: 'Gesetzlich geschützt (Jüdisch)', isSilent: true, isTradingHoliday: false },


        // --- Fallback ---
        'DEFAULT': { isLegal: false, scope: 'Sonstige / Religiös', states: '', isSilent: false, isTradingHoliday: false }
    };
const { Utils: CalendarUtils, Hebrew: HebrewCalendarSystem, Islamic: IslamicCalendarSystem, Persian: PersianCalendarSystem } = window.ChronosBridge;
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
                { name: 'Heilige Drei Könige', date: new Date(Date.UTC(this.year, 0, 6)), key: 'heilige_drei_koenige', category: 'Christlich' },
                { name: 'Fronleichnam', date: CalendarUtils.addDays(easter, 60), key: 'fronleichnam', category: 'Christlich' },
                { name: 'Mariä Himmelfahrt', date: new Date(Date.UTC(this.year, 7, 15)), key: 'mariae_himmelfahrt', category: 'Christlich' },
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
                { name: 'Buß- und Bettag', date: bussTag, key: 'buss_und_bettag', category: 'Christlich' },
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
            // Gesetzlich geschützte Tage in DE:
            // Pessach (1., 2. und 7., 8. Tag)
            // Wochenfest/Schawuot (2 Tage)
            // Laubhüttenfest/Sukkot (1., 2. Tag)
            // Schlussfest/Schemini Azeret & Simchat Tora (die "letzten zwei" von Sukkot)
            // Neujahr/Rosch Haschana (2 Tage)
            // Versöhnungstag/Jom Kippur (1 Tag)

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

                // Sukkot / Laubhüttenfest (7. Monat Tischri)
                { name: 'Sukkot (1. Tag)', month: 7, day: 15, key: 'sukkot_1' },
                { name: 'Sukkot (2. Tag)', month: 7, day: 16, key: 'sukkot_2' },

                // Schlussfest (Direkt nach Sukkot)
                { name: 'Schemini Azeret', month: 7, day: 22, key: 'schemini_azeret' },
                { name: 'Simchat Tora', month: 7, day: 23, key: 'simchat_tora' },

                // Weitere (Religiös, aber oft nicht explizit im Gesetzestext, aber Tradition)
                { name: 'Chanukka (1. Tag)', month: 9, day: 25, key: 'chanukka' },
                { name: 'Fasten Esther', month: 12, day: 13, key: 'fasten_esther', isFasting: true, fastingLevel: 2 },
                { name: '17. Tammuz (Fasten)', month: 4, day: 17, key: '17_tammuz', isFasting: true, fastingLevel: 2 },
                { name: 'Tisha B\'Av (Fasten)', month: 5, day: 9, key: 'tisha_b_av', isFasting: true, fastingLevel: 1 },
            ];

            return configs.map(c => {
                let hYear = this.year + 3760;
                let date = HebrewCalendarSystem.convertToGregorian(hYear, c.month, c.day);
                // Korrektur, falls das hebräische Datum in ein anderes gregorianisches Jahr fällt
                if (date.getUTCFullYear() < this.year || (date.getUTCFullYear() === this.year && date.getUTCMonth() > 8 && c.month < 7)) {
                    hYear++; date = HebrewCalendarSystem.convertToGregorian(hYear, c.month, c.day);
                } else if (date.getUTCFullYear() > this.year && c.month > 6) {
                    hYear--; date = HebrewCalendarSystem.convertToGregorian(hYear, c.month, c.day);
                }
                // Verschiebung von Fastentagen, wenn sie auf Sabbat fallen (Ausnahme Jom Kippur)
                if (['tisha_b_av', '17_tammuz', 'fasten_gedalja', 'fasten_esther'].includes(c.key) && date.getUTCDay() === 6) {
                     // Esther wird vorverlegt, andere nach hinten (vereinfacht, hier meist +1, Esther müsste eigentlich -2 wenn Sabbat)
                     // Um die Lib einfach zu halten, lassen wir die simple Verschiebung für Minor Fasts
                     date = CalendarUtils.addDays(date, 1); 
                }

                return { name: c.name, date: date, key: c.key, category: 'Jüdisch', isFasting: !!c.isFasting, fastingLevel: c.fastingLevel || 0 };
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
                // Frühlingsfeste
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
   
            // Standard-Daten hinzufügen
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

                // 3. Gehe vom letzten Mittwoch einen weiteren Tag zurück auf den Dienstag
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
                    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
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
    
    // Global verfügbar machen
    window.UniversalHolidayLib = UniversalHolidayLib;

