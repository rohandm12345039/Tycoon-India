const signinTab = document.getElementById("signinTab");
const signupTab = document.getElementById("signupTab");
const submitBtn = document.getElementById("submitBtn");

signinTab.onclick = () => {
  signinTab.classList.add("active");
  signupTab.classList.remove("active");
  submitBtn.innerText = "Sign In";
};

signupTab.onclick = () => {
  signupTab.classList.add("active");
  signinTab.classList.remove("active");
  submitBtn.innerText = "Create Account";
};
