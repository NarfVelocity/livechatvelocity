function boot() {
  const root = document.getElementById("app");

  if (!window.LiveChat || !window.LiveChat.createApp) {
    root.textContent = "LiveChat SDK not available";
    return;
  }

  window.LiveChat.createApp()
    .then(app => {
      root.innerHTML = `<pre id="out">Listening…</pre>`;
      const out = document.getElementById("out");

      // Initial read
      app.get("chat").then(chat => {
        out.textContent = JSON.stringify(chat, null, 2);
      });

      // Live updates
      app.on("chat", chat => {
        out.textContent = JSON.stringify(chat, null, 2);
      });
    })
    .catch(err => {
      console.error(err);
      root.textContent = "Init failed";
    });
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", boot)
  : boot();
