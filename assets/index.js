function boot() {
  const app = document.getElementById("app");
  if (!app) {
    console.error("Missing #app root");
    return;
  }

  // 👇 VERY IMPORTANT: tell LiveChat we are alive immediately
  app.textContent = "Initializing…";

  window.LiveChat.createDetailsWidget()
    .then(widget => {
      app.innerHTML = `<pre id="out">Listening…</pre>`;
      const out = document.getElementById("out");

      widget.get("chat").then(chat => {
        out.textContent = JSON.stringify(chat, null, 2);
      });

      widget.on("chat", chat => {
        out.textContent = JSON.stringify(chat, null, 2);
      });
    })
    .catch(err => {
      console.error("Widget init failed", err);
      app.textContent = "Init failed";
    });
}

// ✅ Ensure DOM is ready before handshake
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
