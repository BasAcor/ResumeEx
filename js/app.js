if ('serviceWorker' in navigator) {
  console.log("Registrando el Service Worker...");

  window.addEventListener("load", function() {
    navigator.serviceWorker.register("./sw.js")
      .then(reg => console.log("Service Worker registrado con éxito: (Scope: ", reg.scope, ')'))
      .catch(err => console.error("Error al registrar el Service Worker:", err));
    });
}else {
  console.log("Service Worker no es compatible con este navegador.");
}


const ctaMessage = document.getElementById("ctaMessage");
const ctaPortfolio = document.getElementById("ctaPortfolio");
const contactForm = document.getElementById("contactForm");
const status = document.getElementById("status");

ctaMessage.addEventListener("click", () => {
  document.getElementById("contacto").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

ctaPortfolio.addEventListener("click", () => {
  window.scrollTo({
    top: document.body.scrollHeight / 3,
    behavior: "smooth",
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    status.textContent = "Por favor completa todos los campos antes de enviar.";
    status.style.color = "#f87171";
    return;
  }

  const mailto = new URL("mailto:tu-correo@ejemplo.com");
  mailto.searchParams.set(
    "subject",
    `Contacto desde la landing - ${name}`
  );
  mailto.searchParams.set(
    "body",
    `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
  );

  status.textContent = "Abriendo tu cliente de correo...";
  status.style.color = "var(--success)";
  window.location.href = mailto.toString();
});