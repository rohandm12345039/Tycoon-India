document.addEventListener("DOMContentLoaded", async () => {
  const authDiv = document.getElementById("authActions");

  // 1️⃣ CHECK EXISTING SESSION ON LOAD
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    showUser(session.user);
  }

  // 2️⃣ LISTEN FOR LOGIN / LOGOUT CHANGES
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      showUser(session.user);
    } else {
      showSignedOut();
    }
  });

  function showUser(user) {
    const letter = user.email[0].toUpperCase();

    authDiv.innerHTML = `
      <div class="user-circle">${letter}</div>
      <button class="logout-btn" id="logoutBtn">Logout</button>
    `;

    document.getElementById("logoutBtn").onclick = async () => {
      await supabase.auth.signOut();
    };
  }

  function showSignedOut() {
    authDiv.innerHTML = `
      <button class="lang-btn">🌐 Language</button>
      <a href="auth.html" class="btn primary">Sign In</a>
    `;
  }
});
