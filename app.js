// Lokaler Provider fÃ¼r Korschenbroich (Bleibt erhalten)
        class KorschenbroichProvider {
            constructor(year) {
                this.year = year;
            }
            getHolidays() {
                const easter = UniversalHolidayLib.Utils.getWesternEaster(this.year);
                const ungesPengsteDate = UniversalHolidayLib.Utils.addDays(easter, 49); // Pfingstsonntag
                return [
                    {
                        name: 'Unges Pengste',
                        date: ungesPengsteDate,
                        category: 'Lokal (Korschenbroich)', // New property name compatible
                        isLegal: false,
                        isSilent: false,
                        description: 'Traditionelles SchÃ¼tzenfest in Korschenbroich'
                    }
                ];
            }
        }

        class HolidayCalendar {
            constructor() {
                this.yearSelect = document.getElementById('year-select');
                this.container = document.getElementById('holidays-container');
                this.footnotesContainer = document.getElementById('footnotes');
                this.emptyState = document.getElementById('empty-state');

                // Filters
                this.filterLegal = document.getElementById('filter-legal');
                this.filterCath = document.getElementById('filter-catholic');
                this.filterProt = document.getElementById('filter-protestant');
                this.filterOrth = document.getElementById('filter-orthodox');
                this.filterJew = document.getElementById('filter-jewish');
                this.filterIslam = document.getElementById('filter-islamic');
                this.filterIranian = document.getElementById('filter-iranian'); // NEU
                this.filterCult = document.getElementById('filter-cultural');
                this.filterMinorFasting = document.getElementById('filter-minor-fasting');

                this.init();
            }

            init() {
                this.populateYearSelect();
                this.bindEvents();
                this.render();
            }

            populateYearSelect() {
                const currentYear = new Date().getFullYear();
                for (let year = currentYear - 5; year <= currentYear + 10; year++) {
                    const option = document.createElement('option');
                    option.value = year;
                    option.textContent = year;
                    if (year === currentYear) option.selected = true;
                    this.yearSelect.appendChild(option);
                }
            }

            bindEvents() {
                const elements = [
                    this.yearSelect, this.filterLegal, this.filterCath,
                    this.filterProt, this.filterOrth, this.filterJew,
                    this.filterIslam, this.filterIranian, this.filterCult, this.filterMinorFasting
                ];
                elements.forEach(el => el.addEventListener('change', () => this.render()));
            }

            render() {
                const year = parseInt(this.yearSelect.value, 10);

                // 1. Data Collection
                let libHolidays = UniversalHolidayLib.getHolidays(year);
                let localHolidays = new KorschenbroichProvider(year).getHolidays();
                let allHolidays = [...libHolidays, ...localHolidays];

                // 2. Filter Logic
                const filteredHolidays = allHolidays.filter(h => {
                    const category = h.category || '';
                    const scope = h.scope || '';
                    
                    // Logic to map the lib properties to filterable concepts
                    const isLegalOrTrading = h.isLegal || h.isTradingHoliday || scope === 'Bundesweit' || scope === 'Regional' || scope.includes('Lokal');
                    const isCatholic = category.includes('Christlich') && (h.key === 'fronleichnam' || h.key === 'mariae_himmelfahrt' || h.key === 'allerheiligen' || h.key === 'heilige_drei_koenige');
                    // Simple check: if category is Christlich but not specifically Protestant/Catholic handled above, treat as Catholic/General or Protestant depending on filter context? 
                    // Better: The Lib doesn't strictly separate "Catholic" vs "Protestant" in the final object property 'category' (it's just 'Christlich').
                    // We need to infer from keys or check strict category if Provider set it (Lib providers set 'Christlich' or 'Orthodox').
                    // Actually, the Lib providers set: ChristianCatholicProvider -> category: 'Christlich'.
                    // So we must rely on keys or assume general Christian are shown if either is checked?
                    // Let's refine based on the provider logic embedded:
                    // General -> Aschermittwoch, Karfreitag, Ostern, Himmelfahrt, Pfingsten, Weihnachten. (Relevant for both)
                    
                    let categoryActive = false;

                    // Group 1: Legal/Trading
                    if (this.filterLegal.checked && isLegalOrTrading) {
                        categoryActive = true;
                    }

                    // Group 2: Specific Religious/Cultural Categories
                    
                    // Helper: Is this a general christian holiday?
                    const isGeneralChristian = ['karfreitag', 'ostersonntag', 'ostermontag', 'christi_himmelfahrt', 'pfingstsonntag', 'pfingstmontag', 'heiligabend', '1_weihnachtstag', '2_weihnachtstag', 'nikolaus'].includes(h.key);
                    const isCatholicSpecific = ['heilige_drei_koenige', 'fronleichnam', 'mariae_himmelfahrt', 'allerheiligen'].includes(h.key);
                    const isProtestantSpecific = ['reformationstag', 'buss_und_bettag', 'totensonntag'].includes(h.key);

                    if (this.filterCath.checked && (category === 'Christlich' && (isGeneralChristian || isCatholicSpecific))) categoryActive = true;
                    if (this.filterProt.checked && (category === 'Christlich' && (isGeneralChristian || isProtestantSpecific))) categoryActive = true;
                    
                    if (this.filterOrth.checked && category.includes('Orthodox')) categoryActive = true;
                    if (this.filterJew.checked && category.includes('JÃ¼disch')) categoryActive = true;
                    if (this.filterIslam.checked && category.includes('Islamisch')) categoryActive = true;
                    if (this.filterIranian.checked && category.includes('Iranisch')) categoryActive = true;
                    if (this.filterCult.checked && (category.includes('Kulturell') || category.includes('Lokal') || category === 'Staatlich' && !h.isLegal)) categoryActive = true;

                    // Exception: If something is legal but unchecked in legal filter, it might still show up if it matches a religious filter
                    // Example: Christmas is Legal. If Legal is OFF but Catholic is ON, Christmas should appear.
                    // The logic above sets categoryActive = true if ANY condition is met. That is correct (OR logic).

                    if (!categoryActive) return false;

                    // -- Fasting Logic --
                    if (h.isFasting) {
                        const level = h.fastingLevel || 0;
                        if (level === 1) return true; // Major fasting always shown if category active
                        if (level === 2) {
                            return this.filterMinorFasting.checked;
                        }
                        return true;
                    }

                    return true;
                });

                // 3. Sorting
                filteredHolidays.sort((a, b) => a.date - b.date);

                // 4. Rendering
                this.container.innerHTML = '';
                this.footnotesContainer.innerHTML = '';

                if (filteredHolidays.length === 0) {
                    this.emptyState.classList.remove('hidden');
                    this.footnotesContainer.classList.add('hidden');
                    return;
                }
                this.emptyState.classList.add('hidden');

                const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
                const monthNames = ["Jan", "Feb", "MÃ¤r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
                let activeFootnotes = new Set();
                const footnoteDefinitions = {
                    '*': '<strong>*In Sachsen:</strong> Nur in bestimmten katholisch geprÃ¤gten Gemeinden des sorbischen Siedlungsgebietes.',
                    '**': '<strong>**In ThÃ¼ringen:</strong> Nur in bestimmten Gemeinden im Landkreis Eichsfeld sowie Teilen des Unstrut-Hainich-Kreises und des Wartburgkreises.',
                    '***': '<strong>***In Bayern:</strong> Nur in Gemeinden mit Ã¼berwiegend katholischer BevÃ¶lkerung.'
                };

                filteredHolidays.forEach(h => {
                    const day = h.date.getUTCDate();
                    const dayName = dayNames[h.date.getUTCDay()];
                    const monthName = monthNames[h.date.getUTCMonth()];

                    // Determine Badge Text
                    let badgeText = h.scope || h.category;
                    if (h.isLegal) badgeText = h.scope; // Prefer scope (Bundesweit/Regional) for legal holidays
                    if (!h.isLegal && h.category) badgeText = h.category; 

                    // Styling
                    let typeClass = "bg-gray-100 text-gray-600";
                    let borderClass = "border-transparent";
                    let iconColor = "bg-gray-50 text-gray-500 border-gray-200";

                    const cat = h.category || '';

                    if (h.isLegal || (h.scope && h.scope.includes('Bundesweit'))) {
                        borderClass = "border-indigo-500";
                        typeClass = "bg-indigo-50 text-indigo-700 font-medium";
                        iconColor = "bg-indigo-50 text-indigo-600 border-indigo-100";
                    } else if (cat.includes('JÃ¼disch')) {
                        typeClass = "bg-purple-50 text-purple-700";
                        iconColor = "bg-purple-50 text-purple-600 border-purple-100";
                    } else if (cat.includes('Islamisch')) {
                        typeClass = "bg-emerald-50 text-emerald-700";
                        iconColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
                    } else if (cat.includes('Iranisch')) {
                        typeClass = "bg-amber-50 text-amber-700";
                        iconColor = "bg-amber-50 text-amber-600 border-amber-100";
                    } else if (cat.includes('Orthodox')) {
                        typeClass = "bg-cyan-50 text-cyan-700";
                    } else if (cat.includes('Christlich')) {
                        typeClass = "bg-blue-50 text-blue-700";
                        iconColor = "bg-blue-50 text-blue-600 border-blue-100";
                    }

                    // Fasting Badge
                    const isFastingVisible = h.isFasting && ((h.fastingLevel === 2 && this.filterMinorFasting.checked) || h.fastingLevel !== 2);
                    const fastingBadge = isFastingVisible
                        ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 ml-2 shadow-sm">FASTEN ${h.fastingLevel === 2 ? '(Klein)' : ''}</span>`
                        : '';

                    // Footnote Logic
                    let displaySuffix = '';
                    if (h.footnote) {
                        displaySuffix = ` <span class="text-indigo-600 font-bold tracking-widest">${h.footnote}</span>`;
                        h.footnote.split(' ').forEach(f => {
                            if (f.trim()) activeFootnotes.add(f.trim());
                        });
                    }

                    const card = document.createElement('div');
                    card.className = `card flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border-l-4 ${borderClass} mb-3 fade-in`;
                    card.innerHTML = `
                        <div class="flex items-center w-full">
                            <div class="flex flex-col items-center justify-center w-14 h-14 rounded-xl mr-5 border flex-shrink-0 ${iconColor}">
                                <span class="text-xl font-bold">${day}</span>
                                <span class="text-[10px] uppercase font-bold tracking-wider">${monthName}</span>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800 text-lg leading-tight">
                                    ${h.name}${displaySuffix} ${fastingBadge}
                                </h3>
                                <p class="text-sm text-gray-500 mt-1 font-medium">
                                    ${dayName}, ${h.date.toLocaleDateString('de-DE')}
                                    ${h.states ? `<span class="hidden sm:inline mx-1 text-gray-300">|</span> <span class="text-xs text-gray-400 font-normal">${h.states}</span>` : ''}
                                </p>
                            </div>
                        </div>
                        <div class="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0 self-end sm:self-center">
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-medium ${typeClass}">${badgeText}</span>
                        </div>
                    `;
                    this.container.appendChild(card);
                });

                // Render Footnotes
                if (filteredHolidays.length > 0) {
                    this.footnotesContainer.classList.remove('hidden');

                    let notesHtml = '';
                    if (activeFootnotes.size > 0) {
                        notesHtml += `<h5 class="font-bold text-gray-800 mt-4 mb-2 text-xs uppercase tracking-wider">Besonderheiten bei regionalen Feiertagen</h5>`;
                        [...activeFootnotes].sort().forEach(key => {
                           if(footnoteDefinitions[key]) {
                               notesHtml += `<p class="mb-1.5 leading-relaxed text-xs">${footnoteDefinitions[key]}</p>`;
                           }
                        });
                    }

                    // Full Disclaimer Layout
                    this.footnotesContainer.innerHTML = `
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            <div>
                                <h4 class="font-bold text-gray-900 mb-3 flex items-center text-sm">
                                    <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    AbkÃ¼rzungen der BundeslÃ¤nder
                                </h4>
                                <div class="text-xs text-gray-600 leading-6 bg-white bg-opacity-60 rounded-lg p-3 border border-blue-100">
                                    <span class="font-bold text-gray-800">BW:</span> Baden-WÃ¼rttemberg,
                                    <span class="font-bold text-gray-800">BY:</span> Bayern,
                                    <span class="font-bold text-gray-800">BE:</span> Berlin,
                                    <span class="font-bold text-gray-800">BB:</span> Brandenburg,
                                    <span class="font-bold text-gray-800">HB:</span> Bremen,
                                    <span class="font-bold text-gray-800">HH:</span> Hamburg,
                                    <span class="font-bold text-gray-800">HE:</span> Hessen,
                                    <span class="font-bold text-gray-800">MV:</span> Mecklenburg-Vorpommern,
                                    <span class="font-bold text-gray-800">NI:</span> Niedersachsen,
                                    <span class="font-bold text-gray-800">NW:</span> Nordrhein-Westfalen,
                                    <span class="font-bold text-gray-800">RP:</span> Rheinland-Pfalz,
                                    <span class="font-bold text-gray-800">SL:</span> Saarland,
                                    <span class="font-bold text-gray-800">SN:</span> Sachsen,
                                    <span class="font-bold text-gray-800">ST:</span> Sachsen-Anhalt,
                                    <span class="font-bold text-gray-800">SH:</span> Schleswig-Holstein,
                                    <span class="font-bold text-gray-800">TH:</span> ThÃ¼ringen
                                </div>
                            </div>

                            <div>
                                <h4 class="font-bold text-gray-900 mb-3 text-sm">Wichtige Hinweise</h4>
                                <div class="text-xs text-gray-600">
                                    <p class="mb-3 italic">
                                        Entscheidend bei gesetzlichen Feiertagen ist der Arbeitsort, nicht der Wohnort der Arbeitnehmer*innen.
                                    </p>
                                    ${notesHtml}
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    this.footnotesContainer.classList.add('hidden');
                }
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            new HolidayCalendar();
        });
