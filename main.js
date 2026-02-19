// ===== SUPABASE INIT =====
const SUPABASE_URL = "https://vpspctvqozslesrqcpdz.supabase.co";
const SUPABASE_KEY = "sb_publishable_onkRSlaZfvgbDvuBAisiWw_whg2NiJc";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ===== DOM =====
const authArea = document.getElementById("authArea");

// ===== UI STATES =====
function showLoggedOutUI() {
  authArea.innerHTML = `
    <a href="auth.html" class="btn-signin">Sign In</a>
  `;
}

function showLoggedInUI(user) {
  const initial = user.email.charAt(0).toUpperCase();

  authArea.innerHTML = `
    <div class="user-menu">
      <div class="avatar">${initial}</div>
      <button id="logoutBtn" class="logout-btn">Logout</button>
    </div>
  `;

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut();
    showLoggedOutUI();
  });
}

// ===== CHECK SESSION ON PAGE LOAD =====
async function initAuth() {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    showLoggedInUI(user);
  } else {
    showLoggedOutUI();
  }
}

initAuth();
