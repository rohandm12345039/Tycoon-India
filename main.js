document.addEventListener("DOMContentLoaded", () => {
  const authDiv = document.getElementById("authActions");

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      const letter = session.user.email[0].toUpperCase();

      authDiv.innerHTML = `
        <div class="user-circle">${letter}</div>
        <button class="logout-btn" id="logoutBtn">Logout</button>
      `;

      document.getElementById("logoutBtn").onclick = async () => {
        await supabase.auth.signOut();
        location.reload();
      };
    }
  });
});
