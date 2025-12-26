const app = document.getElementById("app");

if (!window.LiveChat) {
  app.textContent = "❌ LiveChat SDK not available";
  throw new Error("LiveChat SDK missing");
}

app.textContent = "🎉 Agent App Widget loaded successfully";

window.LiveChat.createDetailsWidget()
  .then(widget => {
    console.log("Widget ready", widget);
  })
  .catch(err => {
    console.error(err);
    app.textContent = "❌ Widget init failed";
  });
