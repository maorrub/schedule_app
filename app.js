/* ══════════════════════════════════════════
   Student Schedule PWA — App Logic
   ══════════════════════════════════════════ */
(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const views = ['today', 'week', 'month', 'settings'];
  const navBtns = document.querySelectorAll('.bottom-nav__item');

  const STORAGE_KEY = 'student_schedule';
  const SETTINGS_KEY = 'schedule_settings';

  const i18n = {
    en: {
      appTitle: "My Schedule",
      todayViewTitle: "Today",
      todayEmptyDesc: "Nothing scheduled today — enjoy your free time!",
      weekViewTitle: "Week",
      settingsTitle: "Settings",
      languageSetting: "Language",
      languageDesc: "Choose your preferred language",
      classReminders: "Class Reminders",
      classRemindersDesc: "Get notified before each class starts",
      reminderTime: "Reminder Time",
      reminderTimeDesc: "How early before class?",
      min5: "5 min", min10: "10 min", min15: "15 min", min30: "30 min", hour1: "1 hour", hours5: "5 hours", day1: "1 day",
      themeSetting: "Theme",
      themeDark: "Dark mode",
      themeLight: "Light mode",
      installApp: "Install App",
      installStatus: "Add to home screen",
      installBtn: "Install",
      manualInstall: "Manual install:",
      androidChromeDesc: "Android Chrome: Tap ⋮ menu → 'Add to Home screen'",
      iphoneSafariDesc: "iPhone Safari: Tap Share ↑ → 'Add to Home Screen'",
      desktopChromeDesc: "Desktop Chrome: Click the install icon in the address bar",
      resetSchedule: "Reset Schedule",
      resetScheduleDesc: "Clear all classes and start fresh",
      resetBtn: "Reset",
      addEventTitle: "Add Event",
      editEventTitle: "Edit Event",
      typeLabel: "Type",
      typeClass: "📘 Class",
      typeTest: "📝 Test",
      typeHomework: "📋 Homework",
      typeMeeting: "🤝 Meeting",
      typeCustom: "✨ Custom",
      typeCustomPlaceholder: "e.g. Study Group, Gym, Lab…",
      nameLabel: "Name",
      namePlaceholder: "e.g. Linear Algebra",
      dateLabel: "Date",
      locationLabel: "Location",
      locationPlaceholder: "e.g. Room B-204",
      startLabel: "Start",
      endLabel: "End",
      repeatLabel: "Repeat",
      repeatNone: "Does not repeat",
      repeatDaily: "Every day",
      repeatWeekly: "Every week",
      repeatMonthly: "Every month",
      colorLabel: "Color",
      addEventBtn: "Add to Schedule",
      saveChangesBtn: "Save Changes",
      navToday: "Today",
      navWeek: "Week",
      navMonth: "Month",
      navSettings: "Settings",
      eventSingle: "event",
      eventPlural: "events",
      statusDone: "Done",
      statusNow: "Now",
      statusIn: "In",
      noEventsWeek: "No events",
      noEventsMonth: "📭 No events scheduled for this day",
      deleteConfirm: "Delete this event?",
      resetConfirm: "Delete all events and start fresh?",
      readyInstall: "Ready to install",
      useBrowserMenu: "Use your browser menu to install"
    },
    he: {
      appTitle: "הלוח שלי",
      todayViewTitle: "היום",
      todayEmptyDesc: "אין אירועים להיום — תהנה מהזמן הפנוי!",
      weekViewTitle: "שבוע",
      settingsTitle: "הגדרות",
      languageSetting: "שפה",
      languageDesc: "בחר את השפה המועדפת עליך",
      classReminders: "תזכורות לאירועים",
      classRemindersDesc: "קבלת התראה לפני התחלת אירוע",
      reminderTime: "זמן התראה",
      reminderTimeDesc: "כמה זמן לפני האירוע?",
      min5: "5 דק'", min10: "10 דק'", min15: "15 דק'", min30: "30 דק'", hour1: "שעה אחת", hours5: "5 שעות", day1: "יום אחד",
      themeSetting: "עיצוב",
      themeDark: "מצב לילה",
      themeLight: "מצב יום",
      installApp: "התקן אפליקציה",
      installStatus: "הוסף למסך הבית",
      installBtn: "התקן",
      manualInstall: "התקנה ידנית:",
      androidChromeDesc: "אנדרואיד כרום: לחץ על התפריט (⋮) ← 'הוסף לבית'",
      iphoneSafariDesc: "אייפון ספארי: לחץ על התפריט (↑) ← 'הוסף לבית'",
      desktopChromeDesc: "כרום למחשב: לחץ על סמל ההתקנה בשורת הכתובת",
      resetSchedule: "איפוס המערכת",
      resetScheduleDesc: "מחיקת כל האירועים והתחלה מחדש",
      resetBtn: "איפוס",
      addEventTitle: "הוספת אירוע",
      editEventTitle: "עריכת אירוע",
      typeLabel: "סוג",
      typeClass: "📘 שיעור",
      typeTest: "📝 מבחן",
      typeHomework: "📋 שיעורי בית",
      typeMeeting: "🤝 פגישה",
      typeCustom: "✨ מותאם",
      typeCustomPlaceholder: "לדוגמה קבוצת למידה, חדר כושר...",
      nameLabel: "שם",
      namePlaceholder: "לדוגמה אלגברה ליניארית",
      dateLabel: "תאריך",
      locationLabel: "מיקום",
      locationPlaceholder: "לדוגמה חדר B-204",
      startLabel: "התחלה",
      endLabel: "סיום",
      repeatLabel: "חזרות",
      repeatNone: "ללא חזרות",
      repeatDaily: "כל יום",
      repeatWeekly: "כל שבוע",
      repeatMonthly: "כל חודש",
      colorLabel: "צבע",
      addEventBtn: "הוסף למערכת",
      saveChangesBtn: "שמור שינויים",
      navToday: "היום",
      navWeek: "שבוע",
      navMonth: "חודש",
      navSettings: "הגדרות",
      eventSingle: "אירוע",
      eventPlural: "אירועים",
      statusDone: "בוצע",
      statusNow: "עכשיו",
      statusIn: "בעוד",
      noEventsWeek: "אין אירועים",
      noEventsMonth: "📭 אין אירועים שנקבעו ליום זה",
      deleteConfirm: "האם למחוק אירוע זה?",
      resetConfirm: "האם למחוק את כל האירועים ולהתחיל מחדש?",
      readyInstall: "מוכן להתקנה",
      useBrowserMenu: "השתמש בתפריט הדפדפן להתקנה"
    }
  };
  let currentView = 'today';
  let monthOffset = 0;
  let selectedColor = '#7c3aed';
  let selectedType = 'Class';
  let editingId = null;
  let deferredInstallPrompt = null;
  let reminderTimeouts = [];

  const DAY_NAMES = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    he: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
  };
  const DAY_SHORT = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    he: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']
  };
  const MONTH_NAMES = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    he: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']
  };
  const REPEAT_LABELS = {
    en: { none: '', daily: '🔁 Daily', weekly: '🔁 Weekly', monthly: '🔁 Monthly' },
    he: { none: '', daily: '🔁 כל יום', weekly: '🔁 כל שבוע', monthly: '🔁 כל חודש' }
  };

  /* ── Storage ─────────────────────────── */
  function getClasses() {
    try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) return JSON.parse(raw); } catch (e) { }
    return [];
  }
  function saveClasses(c) { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); }
  function getSettings() {
    try { const raw = localStorage.getItem(SETTINGS_KEY); if (raw) return JSON.parse(raw); } catch (e) { }
    return { notificationsOn: false, reminderMin: 15, theme: 'dark', language: 'en' };
  }
  function saveSettings(s) { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }

  function t(key) {
    const s = getSettings();
    const lang = s.language || 'en';
    return (i18n[lang] && i18n[lang][key]) || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    const s = getSettings();
    document.documentElement.dir = s.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = s.language || 'en';
  }

  /* ── Helpers ─────────────────────────── */
  function formatTime(t) {
    const [h, m] = t.split(':').map(Number);
    return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  }
  function timeToMin(t) { const [h, m] = t.split(':').map(Number); return h * 60 + m; }
  function nowMin() { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); }
  function toDateStr(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function getTodayStr() { return toDateStr(new Date()); }

  function typeBadge(type) {
    let typeKey = 'Event';
    if (type === 'Class' || type === 'שיעור') typeKey = t('typeClass').split(' ')[1];
    else if (type === 'Test' || type === 'מבחן') typeKey = t('typeTest').split(' ')[1];
    else if (type === 'Homework' || type === 'שיעורי בית') typeKey = t('typeHomework').split(' ')[1];
    else if (type === 'Meeting' || type === 'פגישה') typeKey = t('typeMeeting').split(' ')[1];
    else typeKey = type;
    return `<span class="event-type-badge">${typeKey}</span>`;
  }
  function repeatBadge(repeat) {
    if (!repeat || repeat === 'none') return '';
    const s = getSettings();
    const lang = s.language || 'en';
    return `<span class="repeat-badge">${REPEAT_LABELS[lang][repeat] || ''}</span>`;
  }

  /* ── Check if an event occurs on a specific date ── */
  function eventMatchesDate(ev, dateStr) {
    const evDate = ev.date;
    if (!evDate) return false;
    if (evDate === dateStr) return true; // exact match

    const repeat = ev.repeat || 'none';
    if (repeat === 'none') return false;

    const evD = new Date(evDate);
    const targetD = new Date(dateStr);
    if (targetD < evD) return false; // repeat only goes forward

    if (repeat === 'daily') return true;
    if (repeat === 'weekly') return evD.getDay() === targetD.getDay();
    if (repeat === 'monthly') return evD.getDate() === targetD.getDate();
    return false;
  }

  function getEventsForDate(classes, dateStr) {
    return classes.filter(c => eventMatchesDate(c, dateStr));
  }

  function updateHeaderDate() {
    const s = getSettings();
    const loc = s.language === 'he' ? 'he-IL' : 'en-US';
    $('header-date').textContent = new Date().toLocaleDateString(loc, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  /* ── Delete event ────────────────────── */
  function deleteEvent(id) {
    if (!confirm(t('deleteConfirm'))) return;
    const classes = getClasses().filter(c => c.id !== id);
    saveClasses(classes);
    switchView(currentView);
    scheduleReminders();
  }
  window.deleteEvent = deleteEvent;

  /* ── Edit event ──────────────────────── */
  function editEvent(id) {
    const classes = getClasses();
    const ev = classes.find(c => c.id === id);
    if (!ev) return;
    editingId = id;
    selectedType = ev.type || 'Class';

    // set type chips
    const chips = document.querySelectorAll('.type-chip');
    const customInput = $('event-type');
    const presetTypes = ['Class', 'Test', 'Homework', 'Meeting'];
    let isPreset = false;
    chips.forEach(chip => {
      if (chip.dataset.type === selectedType) {
        chip.classList.add('active');
        isPreset = true;
      } else if (chip.dataset.type === 'custom' && !presetTypes.includes(selectedType)) {
        chip.classList.add('active');
        customInput.classList.remove('hidden');
        customInput.value = selectedType;
      } else {
        chip.classList.remove('active');
      }
    });
    if (isPreset) { customInput.classList.add('hidden'); customInput.value = ''; }

    $('class-name').value = ev.name;
    $('class-date').value = ev.date || '';
    $('class-room').value = (ev.room && ev.room !== '—') ? ev.room : '';
    $('class-start').value = ev.start;
    $('class-end').value = ev.end || '';
    $('event-repeat').value = ev.repeat || 'none';
    selectedColor = ev.color;
    document.querySelectorAll('.color-dot').forEach(d => d.classList.toggle('active', d.dataset.color === ev.color));
    $('modal-title').textContent = t('editEventTitle');
    document.querySelector('.btn-primary').textContent = t('saveChangesBtn');
    openModal();
  }
  window.editEvent = editEvent;

  /* ══════════════════════════════════════════
     VIEW SWITCHING
     ══════════════════════════════════════════ */
  function switchView(name) {
    currentView = name;
    views.forEach(v => $(`view-${v}`).classList.toggle('view--active', v === name));
    navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.view === name));
    if (name === 'today') renderToday();
    if (name === 'week') renderWeek();
    if (name === 'month') renderMonth();
  }
  navBtns.forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));

  /* ── Action buttons HTML ─────────────── */
  function actionBtns(id) {
    return `<div class="event-actions">
      <button class="event-action-btn event-action-btn--edit" onclick="editEvent(${id})" title="Edit">✏️</button>
      <button class="event-action-btn event-action-btn--delete" onclick="deleteEvent(${id})" title="Delete">🗑️</button>
    </div>`;
  }

  /* ══════════════════════════════════════════
     TODAY VIEW
     ══════════════════════════════════════════ */
  function renderToday() {
    const classes = getClasses();
    const todayStr = getTodayStr();
    const todayEvents = getEventsForDate(classes, todayStr).sort((a, b) => timeToMin(a.start) - timeToMin(b.start));
    const container = $('timeline-today');
    const empty = $('today-empty');
    const badge = $('today-count');

    badge.textContent = `${todayEvents.length} ${todayEvents.length === 1 ? t('eventSingle') : t('eventPlural')}`;

    if (!todayEvents.length) { container.innerHTML = ''; empty.classList.remove('hidden'); return; }
    empty.classList.add('hidden');
    const now = nowMin();

    container.innerHTML = todayEvents.map((c, i) => {
      const startM = timeToMin(c.start), endM = c.end ? timeToMin(c.end) : startM;
      let statusClass = 'time-left--later', statusText = '';
      if (now >= endM) { statusClass = 'time-left--done'; statusText = t('statusDone'); }
      else if (now >= startM) { statusClass = 'time-left--soon'; statusText = t('statusNow'); }
      else {
        const diff = startM - now;
        if (diff <= 30) { statusClass = 'time-left--soon'; statusText = `${t('statusIn')} ${diff}m`; }
        else if (diff <= 60) { statusText = `${t('statusIn')} ${diff}m`; }
        else { statusText = `${t('statusIn')} ${Math.floor(diff / 60)}h ${diff % 60}m`; }
      }
      const roomStr = c.room && c.room !== '—' ? `<span>📍 ${c.room}</span>` : '';
      const endStr = c.end && c.end !== c.start ? ' – ' + formatTime(c.end) : '';
      return `
        <div class="timeline-card" style="animation-delay:${i * .06}s">
          <div class="timeline-card__accent" style="background:${c.color}"></div>
          <div class="timeline-card__body">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span class="timeline-card__name">${c.name}</span>
              ${typeBadge(c.type || 'Event')}
              ${repeatBadge(c.repeat)}
              ${actionBtns(c.id)}
            </div>
            <div class="timeline-card__meta">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${formatTime(c.start)}${endStr}</span>
              ${roomStr}
              <span class="timeline-card__time-left ${statusClass}">${statusText}</span>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  /* ══════════════════════════════════════════
     WEEK VIEW
     ══════════════════════════════════════════ */
  function renderWeek() {
    const classes = getClasses();
    const today = new Date();
    const todayDay = today.getDay();
    // Get the start of this week (Sunday)
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - todayDay);

    const s = getSettings();
    const lang = s.language || 'en';
    const container = $('week-grid');
    container.innerHTML = DAY_NAMES[lang].map((day, i) => {
      const cellDate = new Date(weekStart);
      cellDate.setDate(weekStart.getDate() + i);
      const dateStr = toDateStr(cellDate);
      const dayClasses = getEventsForDate(classes, dateStr).sort((a, b) => timeToMin(a.start) - timeToMin(b.start));
      const isToday = i === todayDay;
      const classesHtml = dayClasses.length ? dayClasses.map(c => {
        const endStr = c.end && c.end !== c.start ? ' – ' + formatTime(c.end) : '';
        return `
        <div class="week-class">
          <div class="week-class__dot" style="background:${c.color}"></div>
          <div class="week-class__info">
            <span class="week-class__name">${c.name} ${typeBadge(c.type || 'Event')} ${repeatBadge(c.repeat)}</span>
            <span class="week-class__time">${formatTime(c.start)}${endStr}</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <span class="week-class__room">${c.room || ''}</span>
            ${actionBtns(c.id)}
          </div>
        </div>`;
      }).join('') : `<div class="week-class"><span style="color:var(--text-muted);font-size:.78rem">${t('noEventsWeek')}</span></div>`;
      return `
        <div class="week-day glass-card">
          <div class="week-day__header">
            <span class="week-day__name ${isToday ? 'week-day__name--today' : ''}">${isToday ? '● ' : ''}${day}</span>
            <span class="week-day__count">${dayClasses.length} ${dayClasses.length === 1 ? t('eventSingle') : t('eventPlural')}</span>
          </div>
          <div class="week-day__classes">${classesHtml}</div>
        </div>`;
    }).join('');
  }

  /* ══════════════════════════════════════════
     MONTH VIEW
     ══════════════════════════════════════════ */
  let selectedMonthDate = null;

  function renderMonth() {
    const classes = getClasses();
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    const year = target.getFullYear(), month = target.getMonth();
    const s = getSettings();
    const lang = s.language || 'en';
    $('month-title').textContent = `${MONTH_NAMES[lang][month]} ${year}`;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let html = DAY_SHORT[lang].map(d => `<div class="month-calendar__day-label">${d}</div>`).join('');
    for (let i = 0; i < firstDay; i++) html += '<div class="month-calendar__cell month-calendar__cell--empty"></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      const isToday = (d === now.getDate() && month === now.getMonth() && year === now.getFullYear());
      const isSelected = selectedMonthDate === dateStr;
      const dayEvents = getEventsForDate(classes, dateStr);
      const dots = dayEvents.slice(0, 3).map(c => `<div class="month-dot" style="background:${c.color}"></div>`).join('');
      html += `<div class="month-calendar__cell ${isToday ? 'month-calendar__cell--today' : ''} ${isSelected ? 'month-calendar__cell--selected' : ''}" data-date="${dateStr}">
        <span>${d}</span>${dots ? `<div class="month-dots">${dots}</div>` : ''}
      </div>`;
    }
    $('month-calendar').innerHTML = html;

    // attach click handlers to day cells
    document.querySelectorAll('.month-calendar__cell[data-date]').forEach(cell => {
      cell.addEventListener('click', () => {
        const dateStr = cell.dataset.date;
        if (selectedMonthDate === dateStr) {
          // toggle off if same day clicked again
          selectedMonthDate = null;
          $('month-day-detail').classList.add('hidden');
          cell.classList.remove('month-calendar__cell--selected');
        } else {
          selectedMonthDate = dateStr;
          // update selected styling
          document.querySelectorAll('.month-calendar__cell--selected').forEach(c => c.classList.remove('month-calendar__cell--selected'));
          cell.classList.add('month-calendar__cell--selected');
          renderMonthDayDetail(dateStr, classes);
        }
      });
    });

    // if a date was already selected and is still in this month, show it
    if (selectedMonthDate) {
      const stillVisible = document.querySelector(`.month-calendar__cell[data-date="${selectedMonthDate}"]`);
      if (stillVisible) {
        renderMonthDayDetail(selectedMonthDate, classes);
      } else {
        selectedMonthDate = null;
        $('month-day-detail').classList.add('hidden');
      }
    }
  }

  function renderMonthDayDetail(dateStr, classes) {
    const events = getEventsForDate(classes, dateStr).sort((a, b) => timeToMin(a.start) - timeToMin(b.start));
    const d = new Date(dateStr + 'T00:00:00');
    const s = getSettings();
    const loc = s.language === 'he' ? 'he-IL' : 'en-US';
    const title = d.toLocaleDateString(loc, { weekday: 'long', month: 'long', day: 'numeric' });
    const panel = $('month-day-detail');

    let eventsHtml;
    if (events.length === 0) {
      eventsHtml = `<div class="month-day-detail__empty">${t('noEventsMonth')}</div>`;
    } else {
      eventsHtml = `<div class="month-day-detail__events">` +
        events.map((c, i) => {
          const endStr = c.end && c.end !== c.start ? ' – ' + formatTime(c.end) : '';
          const roomStr = c.room && c.room !== '—' ? `<span>📍 ${c.room}</span>` : '';
          return `
            <div class="month-event-card" style="animation-delay:${i * .05}s">
              <div class="month-event-card__accent" style="background:${c.color}"></div>
              <div class="month-event-card__info">
                <div class="month-event-card__name">
                  ${c.name}
                  ${typeBadge(c.type || 'Event')}
                  ${repeatBadge(c.repeat)}
                </div>
                <div class="month-event-card__time">
                  <span>🕐 ${formatTime(c.start)}${endStr}</span>
                  ${roomStr}
                </div>
              </div>
              ${actionBtns(c.id)}
            </div>`;
        }).join('') +
        `</div>`;
    }

    panel.innerHTML = `
      <div class="month-day-detail__header">
        <div style="display:flex;align-items:center;gap:10px">
          <span class="month-day-detail__title">${title}</span>
          <span class="month-day-detail__count">${events.length} ${events.length === 1 ? t('eventSingle') : t('eventPlural')}</span>
        </div>
        <button class="month-day-detail__close" id="month-detail-close" aria-label="Close">✕</button>
      </div>
      ${eventsHtml}`;

    panel.classList.remove('hidden');

    // close button
    $('month-detail-close').addEventListener('click', () => {
      selectedMonthDate = null;
      panel.classList.add('hidden');
      document.querySelectorAll('.month-calendar__cell--selected').forEach(c => c.classList.remove('month-calendar__cell--selected'));
    });

    // scroll detail panel into view
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  $('month-prev').addEventListener('click', () => { monthOffset--; selectedMonthDate = null; $('month-day-detail').classList.add('hidden'); renderMonth(); });
  $('month-next').addEventListener('click', () => { monthOffset++; selectedMonthDate = null; $('month-day-detail').classList.add('hidden'); renderMonth(); });

  /* ══════════════════════════════════════════
     MODAL / ADD-EDIT EVENT
     ══════════════════════════════════════════ */
  const modalOverlay = $('modal-overlay');
  function openModal() {
    modalOverlay.classList.add('open');
    // default date to today if empty
    if (!$('class-date').value) $('class-date').value = getTodayStr();
  }
  function closeModal() { modalOverlay.classList.remove('open'); resetForm(); }
  function resetForm() {
    editingId = null;
    $('class-form').reset();
    $('modal-title').textContent = t('addEventTitle');
    document.querySelector('.btn-primary').textContent = t('addEventBtn');
    document.querySelectorAll('.type-chip').forEach(c => c.classList.toggle('active', c.dataset.type === 'Class'));
    $('event-type').classList.add('hidden');
    $('event-type').value = '';
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    document.querySelector('.color-dot').classList.add('active');
    selectedColor = '#7c3aed';
    selectedType = 'Class';
    $('event-repeat').value = 'none';
  }

  $('fab').addEventListener('click', openModal);
  $('modal-close').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

  // type preset chips
  document.querySelectorAll('.type-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.type-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const customInput = $('event-type');
      if (chip.dataset.type === 'custom') {
        customInput.classList.remove('hidden');
        customInput.focus();
        selectedType = customInput.value || 'Custom';
      } else {
        customInput.classList.add('hidden');
        customInput.value = '';
        selectedType = chip.dataset.type;
      }
    });
  });
  $('event-type').addEventListener('input', e => { selectedType = e.target.value || 'Custom'; });

  // color picker
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      selectedColor = dot.dataset.color;
    });
  });

  $('class-form').addEventListener('submit', e => {
    e.preventDefault();
    let classes = getClasses();
    // determine final type
    const customInput = $('event-type');
    const customChipActive = document.querySelector('.type-chip[data-type="custom"]').classList.contains('active');
    const finalType = customChipActive && customInput.value.trim() ? customInput.value.trim() : selectedType;

    const entry = {
      id: editingId || Date.now(),
      name: $('class-name').value.trim(),
      type: finalType,
      date: $('class-date').value,
      start: $('class-start').value,
      end: $('class-end').value || $('class-start').value,
      room: $('class-room').value.trim() || '—',
      color: selectedColor,
      repeat: $('event-repeat').value,
    };
    if (editingId) {
      classes = classes.map(c => c.id === editingId ? entry : c);
    } else {
      classes.push(entry);
    }
    saveClasses(classes);
    closeModal();
    switchView(currentView);
    scheduleReminders();
  });

  /* ══════════════════════════════════════════
     SETTINGS
     ══════════════════════════════════════════ */
  function initSettings() {
    const s = getSettings();
    $('language-select').value = s.language || 'en';
    $('notif-toggle').checked = s.notificationsOn;
    $('reminder-time').value = s.reminderMin;
    applyTheme(s.theme || 'dark');
    $('theme-toggle').checked = (s.theme === 'light');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    $('theme-label').textContent = theme === 'light' ? t('themeLight') : t('themeDark');
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.content = theme === 'light' ? '#f4f3f8' : '#0f0e17';
  }

  $('theme-toggle').addEventListener('change', e => {
    const s = getSettings();
    s.theme = e.target.checked ? 'light' : 'dark';
    saveSettings(s);
    applyTheme(s.theme);
  });

  $('language-select').addEventListener('change', e => {
    const s = getSettings();
    s.language = e.target.value;
    saveSettings(s);
    applyTranslations();
    applyTheme(s.theme || 'dark'); // re-evaluate theme string as language changed
    updateHeaderDate();
    switchView(currentView); // re-render view with new format
  });

  $('notif-toggle').addEventListener('change', async e => {
    const s = getSettings();
    if (e.target.checked) {
      if ('Notification' in window) {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') s.notificationsOn = true;
        else { e.target.checked = false; s.notificationsOn = false; }
      } else e.target.checked = false;
    } else s.notificationsOn = false;
    saveSettings(s);
    scheduleReminders();
  });
  $('reminder-time').addEventListener('change', e => {
    const s = getSettings();
    s.reminderMin = parseInt(e.target.value);
    saveSettings(s);
    scheduleReminders();
  });
  $('reset-btn').addEventListener('click', () => {
    if (confirm(t('resetConfirm'))) {
      localStorage.removeItem(STORAGE_KEY);
      switchView(currentView);
      scheduleReminders();
    }
  });

  /* ══════════════════════════════════════════
     NOTIFICATIONS
     ══════════════════════════════════════════ */
  function scheduleReminders() {
    reminderTimeouts.forEach(t => clearTimeout(t));
    reminderTimeouts = [];
    const s = getSettings();
    if (!s.notificationsOn || !('Notification' in window) || Notification.permission !== 'granted') return;
    const classes = getClasses();
    const todayStr = getTodayStr();
    const currentMin = nowMin();
    const leadMin = s.reminderMin;
    const todayEvents = getEventsForDate(classes, todayStr);
    todayEvents.forEach(c => {
      const startMin = timeToMin(c.start);
      const alertMin = startMin - leadMin;
      const diff = alertMin - currentMin;
      if (diff > 0) {
        const tid = setTimeout(() => {
          let timeStr = leadMin + ' minutes';
          if (leadMin >= 1440) timeStr = '1 day';
          else if (leadMin >= 60) timeStr = Math.floor(leadMin / 60) + ' hour' + (leadMin >= 120 ? 's' : '');
          new Notification(`${c.type}: ${c.name} starts in ${timeStr}`, {
            body: `${formatTime(c.start)}${c.end && c.end !== c.start ? ' – ' + formatTime(c.end) : ''} · ${c.room || ''}`,
            icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: `event-${c.id}`,
          });
        }, diff * 60 * 1000);
        reminderTimeouts.push(tid);
      }
    });
  }

  /* ══════════════════════════════════════════
     INSTALL PROMPT
     ══════════════════════════════════════════ */
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    $('install-banner').classList.remove('hidden');
    $('install-status').textContent = t('readyInstall');
    $('install-instructions').classList.add('hidden');
  });

  function triggerInstall() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(() => {
        deferredInstallPrompt = null;
        $('install-banner').classList.add('hidden');
      });
    } else {
      $('install-instructions').classList.toggle('hidden');
      $('install-status').textContent = t('useBrowserMenu');
    }
  }

  $('install-btn').addEventListener('click', triggerInstall);
  $('settings-install-btn').addEventListener('click', triggerInstall);
  $('install-dismiss').addEventListener('click', () => $('install-banner').classList.add('hidden'));

  /* ── Service Worker ──────────────────── */
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });

  /* ── Init ────────────────────────────── */
  applyTranslations();
  updateHeaderDate();
  initSettings();
  switchView('today');
  scheduleReminders();
  setInterval(() => { if (currentView === 'today') renderToday(); }, 60000);
})();
