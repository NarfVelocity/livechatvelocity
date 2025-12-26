const app = document.getElementById("app");

if (!window.LiveChat) {
  app.textContent = "❌ LiveChat SDK not available";
  throw new Error("LiveChat SDK missing");
}

app.textContent = "🟡 Initializing widget…";

window.LiveChat.createDetailsWidget()
  .then(widget => {
    app.innerHTML = `
      <div style="font-family: system-ui; font-size: 13px;">
        <h4>LiveChat Context</h4>
        <pre id="context">Listening…</pre>
      </div>
    `;

    const contextEl = document.getElementById("context");

    // ✅ Listen via widget instance (correct)
    widget.on("chat", chat => {
      contextEl.textContent = JSON.stringify(chat, null, 2);
    });

    // ✅ Initial fetch
    widget.get("chat").then(chat => {
      contextEl.textContent = JSON.stringify(chat, null, 2);
    });
  })
  .catch(err => {
    console.error(err);
    app.textContent = "❌ Widget init failed";
  });
