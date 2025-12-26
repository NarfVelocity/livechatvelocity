const app = document.getElementById("app");

if (!window.LiveChat) {
  app.textContent = "❌ LiveChat SDK not available";
  throw new Error("LiveChat SDK missing");
}

app.textContent = "🟡 Loaded outside LiveChat (preview mode)";

let initialized = false;

// Only try to initialize when embedded in LiveChat
window.LiveChat.createDetailsWidget({ timeout: 3000 })
  .then(widget => {
    initialized = true;
    console.log("Widget ready", widget);
    app.textContent = "🎉 Agent App Widget loaded successfully";
  })
  .catch(err => {
    if (!initialized) {
      console.info("Not embedded in LiveChat — skipping init");
    } else {
      console.error(err);
      app.textContent = "❌ Widget init failed";
    }
  });
