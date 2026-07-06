// ============================================================
// AD FITNESS — profile.js (member dashboard behavior)
// Note: static demo. Data lives in localStorage so the dashboard
// feels real across reloads; wire these to your real API when ready.
// ============================================================

const STORE_KEYS = {
  user: "adf_user",
  workouts: "adf_workouts",
  weightLog: "adf_weight_log",
  schedule: "adf_schedule",
  achievements: "adf_achievements",
  prefs: "adf_prefs",
};

document.addEventListener("DOMContentLoaded", () => {
  seedData();
  renderUserChrome();
  renderOverview();
  renderProfileFields();
  renderWorkoutTable();
  renderProgress();
  renderSchedule();
  renderAchievements();
  hydrateSettingsForm();

  initSidebar();
  initScrollspy();
  initDropdown();
  initTabs();
  initModals();
  initWorkoutFilters();
  initForms();
  setTopbarDate();
});

// ------------------------------------------------------------
// Seed demo data (first load only)
// ------------------------------------------------------------
function seedData() {
  if (!localStorage.getItem(STORE_KEYS.user)) {
    localStorage.setItem(
      STORE_KEYS.user,
      JSON.stringify({
        name: "Rahul Sharma",
        email: "rahul.sharma@email.com",
        phone: "+91 98765 43210",
        age: 29,
        gender: "Male",
        height: 178,
        weight: 74,
        goal: "Build Muscle",
        plan: "Pro — Annual",
        memberSince: "2024-02-12",
        renewsOn: "2027-02-12",
        trainer: "Aman Khanna",
      })
    );
  }

  if (!localStorage.getItem(STORE_KEYS.workouts)) {
    const today = new Date();
    const d = (offset) => {
      const dt = new Date(today);
      dt.setDate(dt.getDate() - offset);
      return dt.toISOString().slice(0, 10);
    };
    localStorage.setItem(
      STORE_KEYS.workouts,
      JSON.stringify([
        { date: d(0), name: "Upper Body Strength", type: "Strength", duration: 55, calories: 410, status: "Completed" },
        { date: d(1), name: "HIIT Sprint Intervals", type: "HIIT", duration: 30, calories: 380, status: "Completed" },
        { date: d(2), name: "Mobility & Stretch", type: "Mobility", duration: 25, calories: 90, status: "Completed" },
        { date: d(3), name: "Leg Day", type: "Strength", duration: 60, calories: 460, status: "Completed" },
        { date: d(4), name: "Morning Run", type: "Cardio", duration: 40, calories: 340, status: "Missed" },
        { date: d(5), name: "Full Body Circuit", type: "HIIT", duration: 45, calories: 420, status: "Completed" },
        { date: d(6), name: "Rest & Recovery Yoga", type: "Mobility", duration: 20, calories: 70, status: "Completed" },
        { date: d(8), name: "Push Day", type: "Strength", duration: 50, calories: 395, status: "Completed" },
        { date: d(10), name: "Row & Bike Cardio", type: "Cardio", duration: 35, calories: 310, status: "Completed" },
        { date: d(13), name: "Pull Day", type: "Strength", duration: 52, calories: 405, status: "Completed" },
      ])
    );
  }

  if (!localStorage.getItem(STORE_KEYS.weightLog)) {
    const base = 79;
    const log = [];
    for (let i = 11; i >= 0; i--) {
      log.push({ week: `W${12 - i}`, weight: +(base - (11 - i) * 0.45 + (Math.random() * 0.6 - 0.3)).toFixed(1) });
    }
    localStorage.setItem(STORE_KEYS.weightLog, JSON.stringify(log));
  }

  if (!localStorage.getItem(STORE_KEYS.schedule)) {
    const today = new Date();
    const d = (offset) => {
      const dt = new Date(today);
      dt.setDate(dt.getDate() + offset);
      return dt.toISOString().slice(0, 10);
    };
    localStorage.setItem(
      STORE_KEYS.schedule,
      JSON.stringify([
        { session: "1:1 Personal Training", trainer: "Aman Khanna", date: d(1), time: "07:00", location: "AD Fitness — Downtown" },
        { session: "HIIT Group Class", trainer: "Priya Verma", date: d(3), time: "18:30", location: "AD Fitness — Riverside" },
        { session: "Nutrition Consult", trainer: "Sana Iyer", date: d(6), time: "12:00", location: "Virtual" },
      ])
    );
  }

  if (!localStorage.getItem(STORE_KEYS.achievements)) {
    localStorage.setItem(
      STORE_KEYS.achievements,
      JSON.stringify([
        { title: "First Workout", desc: "Logged your first session", icon: "fa-flag-checkered", earned: true },
        { title: "7-Day Streak", desc: "Trained 7 days in a row", icon: "fa-fire", earned: true },
        { title: "50 Workouts", desc: "Completed 50 total sessions", icon: "fa-dumbbell", earned: true },
        { title: "Early Bird", desc: "5 sessions before 7am", icon: "fa-sun", earned: true },
        { title: "30-Day Streak", desc: "Trained 30 days in a row", icon: "fa-bolt", earned: false },
        { title: "100 Workouts", desc: "Completed 100 total sessions", icon: "fa-medal", earned: false },
        { title: "5K Finisher", desc: "Completed a 5K run", icon: "fa-person-running", earned: false },
        { title: "Goal Crusher", desc: "Hit your target weight", icon: "fa-bullseye", earned: false },
      ])
    );
  }

  if (!localStorage.getItem(STORE_KEYS.prefs)) {
    localStorage.setItem(STORE_KEYS.prefs, JSON.stringify({ reminders: true, reports: true, promos: false, articles: true }));
  }
}

function getUser() { return JSON.parse(localStorage.getItem(STORE_KEYS.user)); }
function setUser(u) { localStorage.setItem(STORE_KEYS.user, JSON.stringify(u)); }
function getWorkouts() { return JSON.parse(localStorage.getItem(STORE_KEYS.workouts)); }
function setWorkouts(w) { localStorage.setItem(STORE_KEYS.workouts, JSON.stringify(w)); }
function getWeightLog() { return JSON.parse(localStorage.getItem(STORE_KEYS.weightLog)); }
function getSchedule() { return JSON.parse(localStorage.getItem(STORE_KEYS.schedule)); }
function setSchedule(s) { localStorage.setItem(STORE_KEYS.schedule, JSON.stringify(s)); }
function getAchievements() { return JSON.parse(localStorage.getItem(STORE_KEYS.achievements)); }

function initials(name) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ------------------------------------------------------------
// Chrome: sidebar user card + topbar
// ------------------------------------------------------------
function renderUserChrome() {
  const u = getUser();
  const ini = initials(u.name);
  document.getElementById("sidebarAvatar").textContent = ini;
  document.getElementById("sidebarName").textContent = u.name;
  document.getElementById("sidebarPlan").textContent = u.plan.split(" — ")[0] + " Member";
  document.getElementById("topbarName").textContent = u.name.split(" ")[0];
  document.getElementById("greetingText").textContent = `Let's crush today's session, ${u.name.split(" ")[0]} 💪`;
  document.querySelectorAll(".user-menu-trigger .avatar").forEach((el) => (el.textContent = ini));
}

function setTopbarDate() {
  const el = document.getElementById("topbarDate");
  el.textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

// ------------------------------------------------------------
// Overview: stats + week bar chart + up next
// ------------------------------------------------------------
function renderOverview() {
  const workouts = getWorkouts();
  const completed = workouts.filter((w) => w.status === "Completed");

  // streak: consecutive days back from today with a completed workout
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 60; i++) {
    const dt = new Date(today);
    dt.setDate(dt.getDate() - i);
    const iso = dt.toISOString().slice(0, 10);
    const hit = workouts.find((w) => w.date === iso && w.status === "Completed");
    if (hit) streak++;
    else if (i === 0) continue; // allow today to be empty still
    else break;
  }

  const thisMonth = completed.filter((w) => new Date(w.date).getMonth() === today.getMonth()).length;
  const weekCalories = sumLastNDays(workouts, 7, "calories");
  const weekMinutes = sumLastNDays(workouts, 7, "duration");

  const stats = [
    { icon: "fa-fire", label: "Current Streak", value: `${streak} days`, trend: "up", trendText: "Keep it going" },
    { icon: "fa-dumbbell", label: "Workouts This Month", value: `${thisMonth}`, trend: "up", trendText: "+3 vs last month" },
    { icon: "fa-bolt", label: "Calories This Week", value: weekCalories.toLocaleString(), trend: "up", trendText: `${weekMinutes} min trained` },
    { icon: "fa-weight-scale", label: "Weight vs Goal", value: "-5 kg", trend: "down", trendText: "5kg to target" },
  ];

  document.getElementById("overviewStats").innerHTML = stats
    .map(
      (s) => `
    <div class="stat-card compact">
      <div class="stat-icon"><i class="fa-solid ${s.icon}"></i></div>
      <h2>${s.value}</h2>
      <p>${s.label}</p>
      <div class="stat-trend ${s.trend}"><i class="fa-solid fa-arrow-${s.trend === "up" ? "up" : "down"}"></i> ${s.trendText}</div>
    </div>`
    )
    .join("");

  // week bar chart: last 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const dt = new Date(today);
    dt.setDate(dt.getDate() - i);
    const iso = dt.toISOString().slice(0, 10);
    const w = workouts.find((x) => x.date === iso);
    days.push({ label: dt.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2), minutes: w ? w.duration : 0, isToday: i === 0 });
  }
  const maxMin = Math.max(...days.map((d) => d.minutes), 60);
  document.getElementById("weekBarChart").innerHTML = days
    .map(
      (d) => `
    <div class="bar-col ${d.isToday ? "today" : ""}">
      <div class="bar ${d.minutes === 0 ? "rest" : ""}" style="height:${Math.max((d.minutes / maxMin) * 100, 4)}%;">
        ${d.minutes > 0 ? `<span class="bar-value">${d.minutes}m</span>` : ""}
      </div>
      <span class="bar-label">${d.label}</span>
    </div>`
    )
    .join("");
  document.getElementById("weekTotalBadge").textContent = `${weekMinutes} min`;

  // up next
  const schedule = getSchedule().slice(0, 3);
  document.getElementById("upNextList").innerHTML = schedule.length
    ? schedule
        .map(
          (s) => `
    <div class="feed-item">
      <div class="feed-icon"><i class="fa-solid fa-calendar-day"></i></div>
      <div class="feed-text">
        <p><strong>${s.session}</strong> with ${s.trainer}</p>
        <span>${formatDate(s.date)} · ${formatTime(s.time)} · ${s.location}</span>
      </div>
    </div>`
        )
        .join("")
    : `<div class="empty-state"><i class="fa-solid fa-calendar"></i><p>Nothing booked yet — book a session below.</p></div>`;
}

function sumLastNDays(workouts, n, field) {
  const today = new Date();
  let total = 0;
  for (let i = 0; i < n; i++) {
    const dt = new Date(today);
    dt.setDate(dt.getDate() - i);
    const iso = dt.toISOString().slice(0, 10);
    const w = workouts.find((x) => x.date === iso && x.status === "Completed");
    if (w) total += w[field];
  }
  return total;
}

function formatTime(t) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

// ------------------------------------------------------------
// Profile details
// ------------------------------------------------------------
function renderProfileFields() {
  const u = getUser();
  document.getElementById("profileAvatarBig").textContent = initials(u.name);
  document.getElementById("profileFullName").textContent = u.name;
  document.getElementById("profileEmail").textContent = u.email;
  document.getElementById("membershipPlan").textContent = u.plan;
  document.getElementById("memberSince").textContent = formatDate(u.memberSince);
  document.getElementById("renewsOn").textContent = formatDate(u.renewsOn);
  document.getElementById("trainerName").textContent = u.trainer;

  const fields = [
    { label: "Phone", value: u.phone },
    { label: "Age", value: `${u.age} years` },
    { label: "Gender", value: u.gender },
    { label: "Height", value: `${u.height} cm` },
    { label: "Weight", value: `${u.weight} kg` },
    { label: "Fitness Goal", value: u.goal },
  ];
  document.getElementById("profileFieldsGrid").innerHTML = fields
    .map(
      (f) => `
    <div class="form-group" style="margin-bottom:0;">
      <label>${f.label}</label>
      <p style="font-size:14.5px; padding:14px 0 0;">${f.value}</p>
    </div>`
    )
    .join("");
}

// ------------------------------------------------------------
// Workout history table
// ------------------------------------------------------------
function initWorkoutFilters() {
  document.getElementById("filterType").addEventListener("change", renderWorkoutTable);
  document.getElementById("filterStatus").addEventListener("change", renderWorkoutTable);
}

function renderWorkoutTable() {
  const typeFilter = document.getElementById("filterType").value;
  const statusFilter = document.getElementById("filterStatus").value;
  let workouts = [...getWorkouts()].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (typeFilter !== "all") workouts = workouts.filter((w) => w.type === typeFilter);
  if (statusFilter !== "all") workouts = workouts.filter((w) => w.status === statusFilter);

  document.getElementById("workoutCountLabel").textContent = `${workouts.length} session${workouts.length === 1 ? "" : "s"}`;
  document.getElementById("workoutEmptyState").hidden = workouts.length !== 0;

  document.getElementById("workoutTableBody").innerHTML = workouts
    .map(
      (w) => `
    <tr>
      <td class="mono">${formatDate(w.date)}</td>
      <td><strong>${w.name}</strong></td>
      <td>${w.type}</td>
      <td class="mono">${w.duration} min</td>
      <td class="mono">${w.calories} kcal</td>
      <td><span class="badge ${w.status === "Completed" ? "badge-success" : "badge-danger"}">${w.status}</span></td>
    </tr>`
    )
    .join("");
}

// ------------------------------------------------------------
// Progress: weight line chart + BMI + goals
// ------------------------------------------------------------
function renderProgress() {
  const log = getWeightLog();
  const u = getUser();

  // line chart via SVG
  const w = 520, h = 190, pad = 24;
  const values = log.map((l) => l.weight);
  const min = Math.min(...values) - 1, max = Math.max(...values) + 1;
  const stepX = (w - pad * 2) / (log.length - 1);
  const points = log.map((l, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (l.weight - min) / (max - min)) * (h - pad * 2);
    return `${x},${y}`;
  });
  const areaPoints = `${pad},${h - pad} ${points.join(" ")} ${w - pad},${h - pad}`;

  document.getElementById("weightChartWrap").innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#C8FF3D" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#C8FF3D" stop-opacity="0" />
        </linearGradient>
      </defs>
      <polygon points="${areaPoints}" fill="url(#areaFill)" />
      <polyline points="${points.join(" ")}" fill="none" stroke="#C8FF3D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      ${points
        .map((p, i) => {
          const [x, y] = p.split(",");
          return i === points.length - 1 ? `<circle cx="${x}" cy="${y}" r="4.5" fill="#C8FF3D" />` : "";
        })
        .join("")}
    </svg>
    <div style="display:flex; justify-content:space-between; margin-top:8px;">
      <span class="mono" style="font-size:11px; color:var(--muted);">${log[0].week}</span>
      <span class="mono" style="font-size:11px; color:var(--muted);">${log[log.length - 1].week} · ${log[log.length - 1].weight}kg</span>
    </div>
  `;

  // BMI
  const heightM = u.height / 100;
  const bmi = +(u.weight / (heightM * heightM)).toFixed(1);
  let category = "Normal", markerPct = 50;
  if (bmi < 18.5) { category = "Underweight"; markerPct = (bmi / 18.5) * 25; }
  else if (bmi < 25) { category = "Normal"; markerPct = 25 + ((bmi - 18.5) / 6.5) * 25; }
  else if (bmi < 30) { category = "Overweight"; markerPct = 50 + ((bmi - 25) / 5) * 25; }
  else { category = "Obese"; markerPct = Math.min(75 + ((bmi - 30) / 10) * 25, 98); }

  document.getElementById("bmiValue").textContent = bmi;
  document.getElementById("bmiCategory").textContent = category;
  document.getElementById("bmiMarker").style.left = `${markerPct}%`;

  // Goal progress
  const goals = [
    { label: "Weight Goal (74kg → 69kg)", pct: 62 },
    { label: "Weekly Workout Target (5 sessions)", pct: 80 },
    { label: "Bench Press Goal (60kg → 80kg)", pct: 45 },
  ];
  document.getElementById("goalProgressList").innerHTML = goals
    .map(
      (g) => `
    <div class="progress-row">
      <div class="progress-label"><span>${g.label}</span><span>${g.pct}%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${g.pct}%;"></div></div>
    </div>`
    )
    .join("");
}

// ------------------------------------------------------------
// Schedule
// ------------------------------------------------------------
function renderSchedule() {
  const schedule = getSchedule().sort((a, b) => new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time));
  const tbody = document.getElementById("scheduleTableBody");

  if (!schedule.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><i class="fa-solid fa-calendar"></i><p>No sessions booked.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = schedule
    .map(
      (s, idx) => `
    <tr>
      <td><strong>${s.session}</strong></td>
      <td>${s.trainer}</td>
      <td class="mono">${formatDate(s.date)} · ${formatTime(s.time)}</td>
      <td>${s.location}</td>
      <td><button class="icon-btn sm" data-cancel-session="${idx}" aria-label="Cancel"><i class="fa-solid fa-xmark"></i></button></td>
    </tr>`
    )
    .join("");

  tbody.querySelectorAll("[data-cancel-session]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = +btn.getAttribute("data-cancel-session");
      const list = getSchedule();
      list.splice(idx, 1);
      setSchedule(list);
      renderSchedule();
      renderOverview();
      showToast("Session cancelled.");
    });
  });
}

// ------------------------------------------------------------
// Achievements
// ------------------------------------------------------------
function renderAchievements() {
  const achievements = getAchievements();
  document.getElementById("achvGrid").innerHTML = achievements
    .map(
      (a) => `
    <div class="achv-card ${a.earned ? "" : "locked"}">
      <div class="achv-icon"><i class="fa-solid ${a.icon}"></i></div>
      <h4>${a.title}</h4>
      <p>${a.desc}</p>
    </div>`
    )
    .join("");
}

// ------------------------------------------------------------
// Settings form hydration
// ------------------------------------------------------------
function hydrateSettingsForm() {
  const u = getUser();
  document.getElementById("accName").value = u.name;
  document.getElementById("accEmail").value = u.email;
  document.getElementById("accPhone").value = u.phone;
  document.getElementById("accGoal").value = u.goal;

  const prefs = JSON.parse(localStorage.getItem(STORE_KEYS.prefs));
  document.querySelectorAll("[data-pref]").forEach((input) => {
    input.checked = !!prefs[input.getAttribute("data-pref")];
    input.addEventListener("change", () => {
      const p = JSON.parse(localStorage.getItem(STORE_KEYS.prefs));
      p[input.getAttribute("data-pref")] = input.checked;
      localStorage.setItem(STORE_KEYS.prefs, JSON.stringify(p));
      showToast("Preference saved.");
    });
  });
}

// ------------------------------------------------------------
// Sidebar (mobile toggle) + active link on click
// ------------------------------------------------------------
function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");
  const scrim = document.getElementById("sidebarScrim");

  toggle.addEventListener("click", () => {
    sidebar.classList.add("open");
    scrim.classList.add("open");
  });
  scrim.addEventListener("click", () => {
    sidebar.classList.remove("open");
    scrim.classList.remove("open");
  });

  document.querySelectorAll(".sidebar-link[data-section]").forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
      scrim.classList.remove("open");
    });
  });
}

// ------------------------------------------------------------
// Scrollspy: highlight active sidebar link + update topbar title
// ------------------------------------------------------------
function initScrollspy() {
  const links = document.querySelectorAll(".sidebar-link[data-section]");
  const sections = [...links].map((l) => document.getElementById(l.getAttribute("data-section")));
  const titleEl = document.getElementById("topbarTitle");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) => l.classList.toggle("active", l.getAttribute("data-section") === id));
          const activeLink = [...links].find((l) => l.getAttribute("data-section") === id);
          if (activeLink) titleEl.textContent = activeLink.textContent.trim();
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((sec) => sec && observer.observe(sec));
}

// ------------------------------------------------------------
// User dropdown
// ------------------------------------------------------------
function initDropdown() {
  const trigger = document.getElementById("userMenuTrigger");
  const panel = document.getElementById("userDropdown");
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.toggle("open");
  });
  document.addEventListener("click", () => panel.classList.remove("open"));

  document.getElementById("notifBtn").addEventListener("click", () => {
    showToast("You're all caught up — no new notifications.");
  });
}

// ------------------------------------------------------------
// Settings tabs
// ------------------------------------------------------------
function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.querySelector(`[data-tab-panel="${tab}"]`).classList.add("active");
    });
  });
}

// ------------------------------------------------------------
// Modals
// ------------------------------------------------------------
function initModals() {
  document.getElementById("editProfileBtn").addEventListener("click", () => {
    const u = getUser();
    document.getElementById("epName").value = u.name;
    document.getElementById("epEmail").value = u.email;
    document.getElementById("epAge").value = u.age;
    document.getElementById("epGender").value = u.gender;
    document.getElementById("epHeight").value = u.height;
    document.getElementById("epWeight").value = u.weight;
    openModal("editProfileModal");
  });

  document.getElementById("logWorkoutBtn").addEventListener("click", () => {
    document.getElementById("lwDate").value = new Date().toISOString().slice(0, 10);
    openModal("logWorkoutModal");
  });

  document.getElementById("bookSessionBtn").addEventListener("click", () => {
    openModal("bookSessionModal");
  });

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      document.querySelectorAll(".modal-overlay.open").forEach((m) => m.classList.remove("open"));
    });
  });

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("open");
    });
  });
}

function openModal(id) {
  document.getElementById(id).classList.add("open");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}

// ------------------------------------------------------------
// Forms
// ------------------------------------------------------------
function initForms() {
  document.getElementById("editProfileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const u = getUser();
    u.name = document.getElementById("epName").value.trim() || u.name;
    u.email = document.getElementById("epEmail").value.trim() || u.email;
    u.age = +document.getElementById("epAge").value || u.age;
    u.gender = document.getElementById("epGender").value;
    u.height = +document.getElementById("epHeight").value || u.height;
    u.weight = +document.getElementById("epWeight").value || u.weight;
    setUser(u);
    renderUserChrome();
    renderProfileFields();
    renderProgress();
    hydrateSettingsForm();
    closeModal("editProfileModal");
    showToast("Profile updated successfully.");
  });

  document.getElementById("logWorkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const workouts = getWorkouts();
    workouts.push({
      date: document.getElementById("lwDate").value,
      name: document.getElementById("lwName").value.trim(),
      type: document.getElementById("lwType").value,
      duration: +document.getElementById("lwDuration").value,
      calories: +document.getElementById("lwCalories").value,
      status: "Completed",
    });
    setWorkouts(workouts);
    renderWorkoutTable();
    renderOverview();
    closeModal("logWorkoutModal");
    e.target.reset();
    showToast("Workout logged — nice work!");
  });

  document.getElementById("bookSessionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const schedule = getSchedule();
    schedule.push({
      session: document.getElementById("bsSession").value,
      trainer: document.getElementById("bsTrainer").value,
      date: document.getElementById("bsDate").value,
      time: document.getElementById("bsTime").value,
      location: document.getElementById("bsLocation").value,
    });
    setSchedule(schedule);
    renderSchedule();
    renderOverview();
    closeModal("bookSessionModal");
    e.target.reset();
    showToast("Session booked.");
  });

  document.getElementById("accountForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const u = getUser();
    u.name = document.getElementById("accName").value.trim() || u.name;
    u.email = document.getElementById("accEmail").value.trim() || u.email;
    u.phone = document.getElementById("accPhone").value.trim() || u.phone;
    u.goal = document.getElementById("accGoal").value;
    setUser(u);
    renderUserChrome();
    renderProfileFields();
    showToast("Account settings saved.");
  });

  document.getElementById("passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newPass = document.getElementById("newPass").value;
    const confirm = document.getElementById("confirmNewPass").value;
    if (!newPass || newPass !== confirm) {
      showToast("Passwords don't match.", true);
      return;
    }
    e.target.reset();
    showToast("Password updated.");
  });

  document.getElementById("deleteAccountBtn").addEventListener("click", () => {
    showToast("Account deletion isn't wired up on this demo.", true);
  });
}

// ------------------------------------------------------------
// Toasts
// ------------------------------------------------------------
function showToast(message, isDanger = false) {
  const stack = document.getElementById("toastStack");
  const toast = document.createElement("div");
  toast.className = `toast ${isDanger ? "danger" : ""}`;
  toast.innerHTML = `<i class="fa-solid ${isDanger ? "fa-circle-exclamation" : "fa-circle-check"}"></i> ${message}`;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.3s";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
