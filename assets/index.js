function boot() {
  const appRoot = document.getElementById("app");
  appRoot.textContent = "Initializing…";

  window.LiveChat.createApp()
    .then(app => {
      appRoot.innerHTML = `<pre id="out">Listening…</pre>`;
      const out = document.getElementById("out");

      // Initial fetch
      app.get("chat").then(chat => {
        out.textContent = JSON.stringify(chat, null, 2);
      });

      // Live updates
      app.on("chat", chat => {
        out.textContent = JSON.stringify(chat, null, 2);
      });
    })
    .catch(err => {
      console.error("App init failed", err);
      appRoot.textContent = "Init failed";
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
