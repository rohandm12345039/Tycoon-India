import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://vpspctvqozslesrqcpdz.supabase.co";
const SUPABASE_KEY = "sb_publishable_onkRSlaZfvgbDvuBAisiWw_whg2NiJc";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadUser() {
  const { data: { session } } = await supabase.auth.getSession();
  const authArea = document.getElementById("authArea");

  if (!authArea) return;

  if (session?.user) {
    const email = session.user.email;
    const letter = email[0].toUpperCase();

    authArea.innerHTML = `
      <div class="user-menu">
        <div class="avatar">${letter}</div>
        <span class="email">${email}</span>
        <button id="logoutBtn">Logout</button>
      </div>
    `;

    document.getElementById("logoutBtn").onclick = async () => {
      await supabase.auth.signOut();
      location.reload();
    };
  }
}

loadUser();
