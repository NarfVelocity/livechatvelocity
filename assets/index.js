function boot() {
  const root = document.getElementById("app");

  // ✅ Correct global for Agent Apps
  if (!window.AgentApp || !window.AgentApp.createApp) {
    console.error("AgentApp SDK not available", window.AgentApp);
    root.textContent = "Agent App SDK not available";
    return;
  }

  window.AgentApp.createApp()
    .then(app => {
      console.log("Agent App initialized", app);

      root.innerHTML = `<pre id="out">Waiting for chat…</pre>`;
      const out = document.getElementById("out");

      // Initial snapshot
      app.get("chat").then(chat => {
        console.log("Initial chat:", chat);
        out.textContent = JSON.stringify(chat, null, 2);
      });

      // Live updates
      app.on("chat", chat => {
        console.log("Chat update:", chat);
        out.textContent = JSON.stringify(chat, null, 2);
      });
    })
    .catch(err => {
      console.error("Agent App init failed", err);
      root.textContent = "Init failed";
    });
}

// DOM-safe boot
document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", boot)
  : boot();
