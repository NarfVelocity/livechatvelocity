const app = document.getElementById("app");

if (!window.LiveChat) {
  app.textContent = "❌ LiveChat SDK not loaded";
  throw new Error("LiveChat SDK missing");
}

app.textContent = "✅ LiveChat SDK loaded";

// Minimal safe call
window.LiveChat.createDetailsWidget()
  .then(widget => {
    console.log("Widget ready", widget);
    app.textContent = "🎉 Agent App Widget loaded";
  })
  .catch(err => {
    console.error(err);
    app.textContent = "❌ Widget init failed";
  });
