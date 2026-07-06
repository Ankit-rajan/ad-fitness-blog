// ============================================================
// AD FITNESS — admin.js (admin panel behavior)
// Note: static demo. Data lives in localStorage so the panel
// feels real across reloads; wire these to your real API when ready.
// ============================================================

const ASTORE = {
  members: "adf_admin_members",
  trainers: "adf_admin_trainers",
  programs: "adf_admin_programs",
  payments: "adf_admin_payments",
  articles: "adf_admin_articles",
};

let pendingDelete = null; // { type, index }

document.addEventListener("DOMContentLoaded", () => {
  seedAdminData();

  renderStats();
  renderGrowthChart();
  renderActivityFeed();
  renderAnalytics();
  renderMembers();
  renderTrainers();
  renderPrograms();
  renderPayments();
  renderArticles();

  initSidebar();
  initScrollspy();
  initDropdown();
  initTabs();
  initModals();
  initMemberFilters();
  initForms();
  setTopbarDate();
});

// ------------------------------------------------------------
// Seed demo data
// ------------------------------------------------------------
function seedAdminData() {
  if (!localStorage.getItem(ASTORE.members)) {
    localStorage.setItem(
      ASTORE.members,
      JSON.stringify([
        { name: "Rahul Sharma", email: "rahul.sharma@email.com", plan: "Pro", status: "Active", joined: "2024-02-12", lastActive: "2026-07-06" },
        { name: "Ananya Gupta", email: "ananya.gupta@email.com", plan: "Elite", status: "Active", joined: "2023-11-04", lastActive: "2026-07-07" },
        { name: "Vikram Singh", email: "vikram.singh@email.com", plan: "Basic", status: "Trial", joined: "2026-06-28", lastActive: "2026-07-05" },
        { name: "Neha Kapoor", email: "neha.kapoor@email.com", plan: "Pro", status: "Active", joined: "2025-01-19", lastActive: "2026-07-04" },
        { name: "Karan Mehta", email: "karan.mehta@email.com", plan: "Basic", status: "Inactive", joined: "2024-08-22", lastActive: "2026-04-10" },
        { name: "Priya Nair", email: "priya.nair@email.com", plan: "Elite", status: "Active", joined: "2023-05-30", lastActive: "2026-07-07" },
        { name: "Arjun Rao", email: "arjun.rao@email.com", plan: "Pro", status: "Active", joined: "2025-09-15", lastActive: "2026-07-03" },
        { name: "Simran Kaur", email: "simran.kaur@email.com", plan: "Basic", status: "Trial", joined: "2026-07-01", lastActive: "2026-07-06" },
        { name: "Rohan Das", email: "rohan.das@email.com", plan: "Pro", status: "Inactive", joined: "2024-03-11", lastActive: "2026-02-18" },
        { name: "Divya Menon", email: "divya.menon@email.com", plan: "Elite", status: "Active", joined: "2023-09-08", lastActive: "2026-07-06" },
      ])
    );
  }

  if (!localStorage.getItem(ASTORE.trainers)) {
    localStorage.setItem(
      ASTORE.trainers,
      JSON.stringify([
        { name: "Aman Khanna", specialty: "Strength & Conditioning", rating: 4.9, members: 34 },
        { name: "Priya Verma", specialty: "HIIT & Group Classes", rating: 4.8, members: 41 },
        { name: "Sana Iyer", specialty: "Nutrition & Recovery", rating: 4.7, members: 22 },
      ])
    );
  }

  if (!localStorage.getItem(ASTORE.programs)) {
    localStorage.setItem(
      ASTORE.programs,
      JSON.stringify([
        { name: "Iron Foundations", category: "Strength", difficulty: "Beginner", duration: 8, enrolled: 142 },
        { name: "Shred & Sprint", category: "HIIT", difficulty: "Intermediate", duration: 6, enrolled: 98 },
        { name: "Endurance Engine", category: "Cardio", difficulty: "Intermediate", duration: 10, enrolled: 64 },
        { name: "Power Builder", category: "Strength", difficulty: "Advanced", duration: 12, enrolled: 51 },
        { name: "Recover & Restore", category: "Mobility", difficulty: "Beginner", duration: 4, enrolled: 87 },
      ])
    );
  }

  if (!localStorage.getItem(ASTORE.payments)) {
    localStorage.setItem(
      ASTORE.payments,
      JSON.stringify([
        { member: "Ananya Gupta", plan: "Elite", amount: 4999, date: "2026-07-05", status: "Paid" },
        { member: "Rahul Sharma", plan: "Pro", amount: 2999, date: "2026-07-04", status: "Paid" },
        { member: "Karan Mehta", plan: "Basic", amount: 1499, date: "2026-07-02", status: "Failed" },
        { member: "Priya Nair", plan: "Elite", amount: 4999, date: "2026-07-01", status: "Paid" },
        { member: "Arjun Rao", plan: "Pro", amount: 2999, date: "2026-06-29", status: "Paid" },
        { member: "Rohan Das", plan: "Pro", amount: 2999, date: "2026-06-27", status: "Refunded" },
        { member: "Divya Menon", plan: "Elite", amount: 4999, date: "2026-06-25", status: "Paid" },
      ])
    );
  }

  if (!localStorage.getItem(ASTORE.articles)) {
    localStorage.setItem(
      ASTORE.articles,
      JSON.stringify([
        { title: "5 Compound Lifts Every Beginner Needs", category: "Training", author: "Sara Khan", published: "2026-06-20", status: "Published" },
        { title: "Rahul's 12kg Transformation", category: "Success Story", author: "Priya Verma", published: "2026-06-14", status: "Published" },
        { title: "Protein Timing: Does It Really Matter?", category: "Nutrition", author: "Sana Iyer", published: "2026-07-01", status: "Draft" },
        { title: "Active Recovery Days Explained", category: "Recovery", author: "Aman Khanna", published: "2026-05-30", status: "Published" },
      ])
    );
  }
}

function getData(key) { return JSON.parse(localStorage.getItem(key)); }
function setData(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
function initials(name) { return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase(); }
function formatDate(iso) { return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
function setTopbarDate() { document.getElementById("topbarDate").textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }); }

// ------------------------------------------------------------
// Dashboard stats + growth chart + activity feed
// ------------------------------------------------------------
function renderStats() {
  const members = getData(ASTORE.members);
  const payments = getData(ASTORE.payments);
  const active = members.filter((m) => m.status === "Active").length;
  const revenue = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const newSignups = members.filter((m) => new Date(m.joined) > new Date(Date.now() - 30 * 86400000)).length;
  const trainers = getData(ASTORE.trainers).length;

  const stats = [
    { icon: "fa-users", label: "Total Members", value: members.length, trendText: `${active} active`, trend: "up" },
    { icon: "fa-user-plus", label: "New Signups (30d)", value: newSignups, trendText: "vs last period", trend: "up" },
    { icon: "fa-sack-dollar", label: "Monthly Revenue", value: `₹${revenue.toLocaleString()}`, trendText: "from paid invoices", trend: "up" },
    { icon: "fa-person-chalkboard", label: "Active Trainers", value: trainers, trendText: "fully booked: 2", trend: "up" },
  ];

  document.getElementById("adminStats").innerHTML = stats
    .map(
      (s) => `
    <div class="stat-card compact">
      <div class="stat-icon"><i class="fa-solid ${s.icon}"></i></div>
      <h2>${s.value}</h2>
      <p>${s.label}</p>
      <div class="stat-trend ${s.trend}"><i class="fa-solid fa-arrow-up"></i> ${s.trendText}</div>
    </div>`
    )
    .join("");

  document.getElementById("memberCountBadge").textContent = members.length;
}

function renderGrowthChart() {
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const values = [420, 468, 502, 540, 587, 612]; // cumulative members, demo trend
  const max = Math.max(...values);
  document.getElementById("growthBarChart").innerHTML = months
    .map((m, i) => {
      const isLast = i === months.length - 1;
      return `
      <div class="bar-col ${isLast ? "today" : ""}">
        <div class="bar" style="height:${(values[i] / max) * 100}%;"><span class="bar-value">${values[i]}</span></div>
        <span class="bar-label">${m}</span>
      </div>`;
    })
    .join("");
  const growthPct = (((values[values.length - 1] - values[0]) / values[0]) * 100).toFixed(1);
  document.getElementById("growthBadge").textContent = `+${growthPct}%`;
}

function renderActivityFeed() {
  const items = [
    { icon: "fa-user-plus", type: "", text: "<strong>Simran Kaur</strong> started a free trial", time: "2 hours ago" },
    { icon: "fa-credit-card", type: "", text: "<strong>Ananya Gupta</strong> renewed the Elite plan", time: "5 hours ago" },
    { icon: "fa-triangle-exclamation", type: "ember", text: "Payment failed for <strong>Karan Mehta</strong>", time: "1 day ago" },
    { icon: "fa-newspaper", type: "blue", text: "<strong>Sana Iyer</strong> submitted a draft article", time: "1 day ago" },
    { icon: "fa-dumbbell", type: "", text: "<strong>Power Builder</strong> program hit 50 enrollments", time: "2 days ago" },
  ];
  document.getElementById("activityFeed").innerHTML = items
    .map(
      (i) => `
    <div class="feed-item">
      <div class="feed-icon ${i.type}"><i class="fa-solid ${i.icon}"></i></div>
      <div class="feed-text"><p>${i.text}</p><span>${i.time}</span></div>
    </div>`
    )
    .join("");
}

// ------------------------------------------------------------
// Analytics: donut, peak hours, retention
// ------------------------------------------------------------
function renderAnalytics() {
  const data = [
    { label: "Strength", value: 38, color: "#C8FF3D" },
    { label: "HIIT", value: 27, color: "#FF5A2E" },
    { label: "Cardio", value: 20, color: "#4A90D9" },
    { label: "Mobility", value: 15, color: "#E8C547" },
  ];
  const total = data.reduce((s, d) => s + d.value, 0);
  let acc = 0;
  const stops = data
    .map((d) => {
      const start = (acc / total) * 360;
      acc += d.value;
      const end = (acc / total) * 360;
      return `${d.color} ${start}deg ${end}deg`;
    })
    .join(", ");
  document.getElementById("workoutDonut").style.background = `conic-gradient(${stops})`;
  document.getElementById("donutTotal").textContent = total * 10;

  document.getElementById("donutLegend").innerHTML = data
    .map((d) => `<li><span class="swatch" style="background:${d.color};"></span> ${d.label} <span class="val">${d.value}%</span></li>`)
    .join("");

  const hours = ["6am", "9am", "12pm", "3pm", "6pm", "9pm"];
  const load = [40, 65, 45, 30, 95, 70];
  const maxLoad = Math.max(...load);
  document.getElementById("peakHoursChart").innerHTML = hours
    .map(
      (h, i) => `
    <div class="bar-col ${load[i] === maxLoad ? "today" : ""}">
      <div class="bar" style="height:${(load[i] / maxLoad) * 100}%;"></div>
      <span class="bar-label">${h}</span>
    </div>`
    )
    .join("");

  const retention = [
    { label: "30-day retention", pct: 84 },
    { label: "90-day retention", pct: 67 },
    { label: "Annual renewal rate", pct: 58 },
  ];
  document.getElementById("retentionList").innerHTML = retention
    .map(
      (r) => `
    <div class="progress-row">
      <div class="progress-label"><span>${r.label}</span><span>${r.pct}%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${r.pct}%;"></div></div>
    </div>`
    )
    .join("");
}

// ------------------------------------------------------------
// Members
// ------------------------------------------------------------
function initMemberFilters() {
  document.getElementById("memberSearch").addEventListener("input", renderMembers);
  document.getElementById("memberStatusFilter").addEventListener("change", renderMembers);
  document.getElementById("memberPlanFilter").addEventListener("change", renderMembers);
}

function renderMembers() {
  const search = document.getElementById("memberSearch").value.toLowerCase();
  const statusFilter = document.getElementById("memberStatusFilter").value;
  const planFilter = document.getElementById("memberPlanFilter").value;
  let members = getData(ASTORE.members);

  members = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search) || m.email.toLowerCase().includes(search);
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    const matchesPlan = planFilter === "all" || m.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  document.getElementById("memberCountLabel").textContent = `${members.length} member${members.length === 1 ? "" : "s"}`;
  document.getElementById("memberEmptyState").hidden = members.length !== 0;

  const badgeClass = { Active: "badge-success", Trial: "badge-info", Inactive: "badge-muted" };

  document.getElementById("memberTableBody").innerHTML = members
    .map((m, idx) => {
      const realIdx = getData(ASTORE.members).indexOf(m);
      return `
    <tr>
      <td>
        <div class="cell-primary">
          <div class="avatar xs">${initials(m.name)}</div>
          <div><strong>${m.name}</strong><br /><span>${m.email}</span></div>
        </div>
      </td>
      <td>${m.plan}</td>
      <td><span class="badge ${badgeClass[m.status]}">${m.status}</span></td>
      <td class="mono">${formatDate(m.joined)}</td>
      <td class="mono">${formatDate(m.lastActive)}</td>
      <td>
        <div class="table-actions">
          <button class="icon-btn sm" data-edit-member="${realIdx}" aria-label="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-btn sm" data-delete-member="${realIdx}" aria-label="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
    })
    .join("");

  document.querySelectorAll("[data-edit-member]").forEach((btn) => {
    btn.addEventListener("click", () => openMemberModal(+btn.getAttribute("data-edit-member")));
  });
  document.querySelectorAll("[data-delete-member]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = +btn.getAttribute("data-delete-member");
      const m = getData(ASTORE.members)[idx];
      confirmDelete(`Remove ${m.name} from members? This can't be undone.`, () => {
        const list = getData(ASTORE.members);
        list.splice(idx, 1);
        setData(ASTORE.members, list);
        renderMembers();
        renderStats();
        showToast("Member removed.");
      });
    });
  });
}

function openMemberModal(index) {
  const modal = document.getElementById("memberModal");
  const title = document.getElementById("memberModalTitle");
  const submitBtn = document.getElementById("memberSubmitBtn");
  document.getElementById("memberIndex").value = index === undefined ? "" : index;

  if (index !== undefined) {
    const m = getData(ASTORE.members)[index];
    title.textContent = "Edit Member";
    submitBtn.textContent = "Save Changes";
    document.getElementById("mName").value = m.name;
    document.getElementById("mEmail").value = m.email;
    document.getElementById("mPlan").value = m.plan;
    document.getElementById("mStatus").value = m.status;
    document.getElementById("mJoined").value = m.joined;
  } else {
    title.textContent = "Add Member";
    submitBtn.textContent = "Add Member";
    document.getElementById("memberForm").reset();
    document.getElementById("mJoined").value = new Date().toISOString().slice(0, 10);
  }
  openModal("memberModal");
}

// ------------------------------------------------------------
// Trainers
// ------------------------------------------------------------
function renderTrainers() {
  const trainers = getData(ASTORE.trainers);
  document.getElementById("trainerGrid").innerHTML = trainers
    .map(
      (t, idx) => `
    <div class="card">
      <div style="display:flex; align-items:center; gap:14px; margin-bottom:16px;">
        <div class="avatar md orange">${initials(t.name)}</div>
        <div>
          <h3 style="font-size:16px;">${t.name}</h3>
          <p style="font-size:12.5px; color:var(--muted);">${t.specialty}</p>
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <span class="badge badge-success"><i class="fa-solid fa-star" style="margin-right:4px;"></i> ${t.rating}</span>
        <span class="section-sub" style="margin:0;">${t.members} members</span>
      </div>
      <div class="table-actions">
        <button class="icon-btn sm" data-delete-trainer="${idx}" aria-label="Remove"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`
    )
    .join("");

  document.querySelectorAll("[data-delete-trainer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = +btn.getAttribute("data-delete-trainer");
      const t = getData(ASTORE.trainers)[idx];
      confirmDelete(`Remove ${t.name} from trainers?`, () => {
        const list = getData(ASTORE.trainers);
        list.splice(idx, 1);
        setData(ASTORE.trainers, list);
        renderTrainers();
        renderStats();
        showToast("Trainer removed.");
      });
    });
  });
}

// ------------------------------------------------------------
// Programs
// ------------------------------------------------------------
function renderPrograms() {
  const programs = getData(ASTORE.programs);
  const diffBadge = { Beginner: "badge-success", Intermediate: "badge-info", Advanced: "badge-danger" };
  document.getElementById("programTableBody").innerHTML = programs
    .map(
      (p, idx) => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td>${p.category}</td>
      <td><span class="badge ${diffBadge[p.difficulty]}">${p.difficulty}</span></td>
      <td class="mono">${p.duration} wks</td>
      <td class="mono">${p.enrolled}</td>
      <td>
        <div class="table-actions">
          <button class="icon-btn sm" data-edit-program="${idx}" aria-label="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-btn sm" data-delete-program="${idx}" aria-label="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>`
    )
    .join("");

  document.querySelectorAll("[data-edit-program]").forEach((btn) => {
    btn.addEventListener("click", () => openProgramModal(+btn.getAttribute("data-edit-program")));
  });
  document.querySelectorAll("[data-delete-program]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = +btn.getAttribute("data-delete-program");
      const p = getData(ASTORE.programs)[idx];
      confirmDelete(`Delete the "${p.name}" program?`, () => {
        const list = getData(ASTORE.programs);
        list.splice(idx, 1);
        setData(ASTORE.programs, list);
        renderPrograms();
        showToast("Program deleted.");
      });
    });
  });
}

function openProgramModal(index) {
  const title = document.getElementById("programModalTitle");
  const submitBtn = document.getElementById("programSubmitBtn");
  document.getElementById("programIndex").value = index === undefined ? "" : index;

  if (index !== undefined) {
    const p = getData(ASTORE.programs)[index];
    title.textContent = "Edit Program";
    submitBtn.textContent = "Save Changes";
    document.getElementById("pName").value = p.name;
    document.getElementById("pCategory").value = p.category;
    document.getElementById("pDifficulty").value = p.difficulty;
    document.getElementById("pDuration").value = p.duration;
    document.getElementById("pEnrolled").value = p.enrolled;
  } else {
    title.textContent = "Add Program";
    submitBtn.textContent = "Add Program";
    document.getElementById("programForm").reset();
  }
  openModal("programModal");
}

// ------------------------------------------------------------
// Payments
// ------------------------------------------------------------
function renderPayments() {
  const payments = getData(ASTORE.payments);
  const badge = { Paid: "badge-success", Failed: "badge-danger", Refunded: "badge-muted" };

  document.getElementById("paymentTableBody").innerHTML = payments
    .map(
      (p) => `
    <tr>
      <td><strong>${p.member}</strong></td>
      <td>${p.plan}</td>
      <td class="mono">₹${p.amount.toLocaleString()}</td>
      <td class="mono">${formatDate(p.date)}</td>
      <td><span class="badge ${badge[p.status]}">${p.status}</span></td>
    </tr>`
    )
    .join("");

  const thisMonthRevenue = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  document.getElementById("revenueMonth").textContent = `₹${thisMonthRevenue.toLocaleString()}`;
  document.getElementById("mrr").textContent = `₹${(thisMonthRevenue * 1.1).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  document.getElementById("failedPayments").textContent = payments.filter((p) => p.status === "Failed").length;
}

// ------------------------------------------------------------
// Articles / Content
// ------------------------------------------------------------
function renderArticles() {
  const articles = getData(ASTORE.articles);
  document.getElementById("articleTableBody").innerHTML = articles
    .map(
      (a, idx) => `
    <tr>
      <td><strong>${a.title}</strong></td>
      <td>${a.category}</td>
      <td>${a.author}</td>
      <td class="mono">${formatDate(a.published)}</td>
      <td><span class="badge ${a.status === "Published" ? "badge-success" : "badge-muted"}">${a.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="icon-btn sm" data-toggle-article="${idx}" aria-label="Toggle status"><i class="fa-solid fa-arrows-rotate"></i></button>
          <button class="icon-btn sm" data-delete-article="${idx}" aria-label="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>`
    )
    .join("");

  document.querySelectorAll("[data-toggle-article]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = +btn.getAttribute("data-toggle-article");
      const list = getData(ASTORE.articles);
      list[idx].status = list[idx].status === "Published" ? "Draft" : "Published";
      setData(ASTORE.articles, list);
      renderArticles();
      showToast(`Article ${list[idx].status === "Published" ? "published" : "unpublished"}.`);
    });
  });
  document.querySelectorAll("[data-delete-article]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = +btn.getAttribute("data-delete-article");
      const a = getData(ASTORE.articles)[idx];
      confirmDelete(`Delete "${a.title}"?`, () => {
        const list = getData(ASTORE.articles);
        list.splice(idx, 1);
        setData(ASTORE.articles, list);
        renderArticles();
        showToast("Article deleted.");
      });
    });
  });
}

// ------------------------------------------------------------
// Sidebar + scrollspy + dropdown + tabs (shared pattern)
// ------------------------------------------------------------
function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");
  const scrim = document.getElementById("sidebarScrim");
  toggle.addEventListener("click", () => { sidebar.classList.add("open"); scrim.classList.add("open"); });
  scrim.addEventListener("click", () => { sidebar.classList.remove("open"); scrim.classList.remove("open"); });
  document.querySelectorAll(".sidebar-link[data-section]").forEach((link) => {
    link.addEventListener("click", () => { sidebar.classList.remove("open"); scrim.classList.remove("open"); });
  });
}

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

function initDropdown() {
  const trigger = document.getElementById("userMenuTrigger");
  const panel = document.getElementById("userDropdown");
  trigger.addEventListener("click", (e) => { e.stopPropagation(); panel.classList.toggle("open"); });
  document.addEventListener("click", () => panel.classList.remove("open"));
  document.getElementById("notifBtn").addEventListener("click", () => showToast("You're all caught up — no new notifications."));
}

function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");
      const scope = btn.closest("section");
      scope.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      scope.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      scope.querySelector(`[data-tab-panel="${tab}"]`).classList.add("active");
    });
  });
}

// ------------------------------------------------------------
// Modals
// ------------------------------------------------------------
function initModals() {
  document.getElementById("addMemberBtn").addEventListener("click", () => openMemberModal(undefined));
  document.getElementById("addTrainerBtn").addEventListener("click", () => { document.getElementById("trainerForm").reset(); openModal("trainerModal"); });
  document.getElementById("addProgramBtn").addEventListener("click", () => openProgramModal(undefined));
  document.getElementById("addArticleBtn").addEventListener("click", () => { document.getElementById("articleForm").reset(); openModal("articleModal"); });

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => document.querySelectorAll(".modal-overlay.open").forEach((m) => m.classList.remove("open")));
  });
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"); });
  });
}

function openModal(id) { document.getElementById(id).classList.add("open"); }
function closeModal(id) { document.getElementById(id).classList.remove("open"); }

function confirmDelete(text, onConfirm) {
  document.getElementById("confirmText").textContent = text;
  openModal("confirmModal");
  const btn = document.getElementById("confirmActionBtn");
  const newBtn = btn.cloneNode(true); // clear old listeners
  btn.parentNode.replaceChild(newBtn, btn);
  newBtn.addEventListener("click", () => {
    onConfirm();
    closeModal("confirmModal");
  });
}

// ------------------------------------------------------------
// Forms
// ------------------------------------------------------------
function initForms() {
  document.getElementById("memberForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const idxRaw = document.getElementById("memberIndex").value;
    const record = {
      name: document.getElementById("mName").value.trim(),
      email: document.getElementById("mEmail").value.trim(),
      plan: document.getElementById("mPlan").value,
      status: document.getElementById("mStatus").value,
      joined: document.getElementById("mJoined").value,
      lastActive: new Date().toISOString().slice(0, 10),
    };
    const list = getData(ASTORE.members);
    if (idxRaw !== "") list[+idxRaw] = { ...list[+idxRaw], ...record };
    else list.unshift(record);
    setData(ASTORE.members, list);
    renderMembers();
    renderStats();
    closeModal("memberModal");
    showToast(idxRaw !== "" ? "Member updated." : "Member added.");
  });

  document.getElementById("trainerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const list = getData(ASTORE.trainers);
    list.push({
      name: document.getElementById("tName").value.trim(),
      specialty: document.getElementById("tSpecialty").value.trim(),
      rating: +document.getElementById("tRating").value || 4.5,
      members: 0,
    });
    setData(ASTORE.trainers, list);
    renderTrainers();
    renderStats();
    closeModal("trainerModal");
    e.target.reset();
    showToast("Trainer added.");
  });

  document.getElementById("programForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const idxRaw = document.getElementById("programIndex").value;
    const record = {
      name: document.getElementById("pName").value.trim(),
      category: document.getElementById("pCategory").value,
      difficulty: document.getElementById("pDifficulty").value,
      duration: +document.getElementById("pDuration").value,
      enrolled: +document.getElementById("pEnrolled").value || 0,
    };
    const list = getData(ASTORE.programs);
    if (idxRaw !== "") list[+idxRaw] = record;
    else list.unshift(record);
    setData(ASTORE.programs, list);
    renderPrograms();
    closeModal("programModal");
    showToast(idxRaw !== "" ? "Program updated." : "Program added.");
  });

  document.getElementById("articleForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const list = getData(ASTORE.articles);
    list.unshift({
      title: document.getElementById("aTitle").value.trim(),
      category: document.getElementById("aCategory").value,
      author: document.getElementById("aAuthor").value.trim(),
      published: new Date().toISOString().slice(0, 10),
      status: document.getElementById("aStatus").value,
    });
    setData(ASTORE.articles, list);
    renderArticles();
    closeModal("articleModal");
    e.target.reset();
    showToast("Article saved.");
  });

  document.getElementById("siteForm").addEventListener("submit", (e) => { e.preventDefault(); showToast("Site settings saved."); });
  document.getElementById("adminAccountForm").addEventListener("submit", (e) => { e.preventDefault(); showToast("Admin account updated."); });
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
