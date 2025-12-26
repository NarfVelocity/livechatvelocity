const app = document.getElementById("app");

window.LiveChat.createDetailsWidget()
  .then(widget => {
    app.innerHTML = `
      <pre id="out">Listening…</pre>
    `;

    const out = document.getElementById("out");

    // ✅ Correct event source
    widget.on("chat", chat => {
      out.textContent = JSON.stringify(chat, null, 2);
    });

    // ✅ Initial fetch
    widget.get("chat").then(chat => {
      out.textContent = JSON.stringify(chat, null, 2);
    });
  })
  .catch(err => {
    console.error(err);
    app.textContent = "Init failed";
  });
