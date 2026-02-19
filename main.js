document.addEventListener("DOMContentLoaded", async () => {
  const authDiv = document.getElementById("authActions");

  const { data: { session } } = await supabase.auth.getSession();

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
