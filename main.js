document.addEventListener("DOMContentLoaded", () => {
  const authDiv = document.getElementById("authActions");

  function showSignedOut() {
    authDiv.innerHTML = `
      <button class="lang-btn">🌐 Language</button>
      <a href="auth.html" class="btn primary">Sign In</a>
    `;
  }

  function showUser(user) {
    const letter = user.email[0].toUpperCase();
    authDiv.innerHTML = `
      <div class="user-circle">${letter}</div>
      <button class="logout-btn" id="logoutBtn">Logout</button>
    `;
    document.getElementById("logoutBtn").onclick = async () => {
      await supabase.auth.signOut();
      location.reload();
    };
  }

  // 🔥 CHECK SESSION TWICE (this is the key)
  async function checkAuth() {
    const { data } = await supabase.auth.getUser();
    if (data && data.user) {
      showUser(data.user);
    } else {
      showSignedOut();
    }
  }

  // First check
  checkAuth();

  // Second check after delay (GitHub Pages fix)
  setTimeout(checkAuth, 1000);
});
