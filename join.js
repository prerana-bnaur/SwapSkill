document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("joinForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const skill = form.skill.value.trim();
    const learn = form.learn.value.trim();

    if (!name || !email || !skill || !learn) {
      alert("Please fill out all fields.");
      return;
    }

    // Simulate submission
    alert(`Thank you, ${name}! 🎉 You've officially joined SwapSkill!`);

    form.reset();
  });
});
