document.addEventListener("DOMContentLoaded", () => {
  const SUPABASE_URL = "https://vpspctvqozslesrqcpdz.supabase.co";
  const SUPABASE_KEY = "sb_publishable_onkRSlaZfvgbDvuBAisiWw_whg2NiJc";

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  const signinTab = document.getElementById("signinTab");
  const signupTab = document.getElementById("signupTab");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("authForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  let mode = "signin";

  signinTab.addEventListener("click", () => {
    mode = "signin";
    signinTab.classList.add("active");
    signupTab.classList.remove("active");
    submitBtn.textContent = "Sign In";
  });

  signupTab.addEventListener("click", () => {
    mode = "signup";
    signupTab.classList.add("active");
    signinTab.classList.remove("active");
    submitBtn.textContent = "Create Account";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    let result;
    if (mode === "signup") {
      result = await supabase.auth.signUp({ email, password });
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    if (result.error) {
      alert(result.error.message);
    } else {
      setTimeout(() => {
  window.location.href = "index.html";
}, 800);
    }
  });
});
