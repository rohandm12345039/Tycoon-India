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

if (!signinTab || !signupTab || !submitBtn || !form) {
  console.error("Auth elements missing in HTML");
}


let mode = "signin";

signinTab.onclick = () => {
  mode = "signin";
  signinTab.classList.add("active");
  signupTab.classList.remove("active");
  submitBtn.innerText = "Sign In";
};

signupTab.onclick = () => {
  mode = "signup";
  signupTab.classList.add("active");
  signinTab.classList.remove("active");
  submitBtn.innerText = "Create Account";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;

  let result;

  if (mode === "signup") {
    result = await supabase.auth.signUp({ email, password });
  } else {
    result = await supabase.auth.signInWithPassword({ email, password });
  }

  if (result.error) {
    alert(result.error.message);
  } else {
    alert("Success!");
    window.location.href = "index.html"; // redirect after login
  }
});
