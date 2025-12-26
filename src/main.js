import * as LiveChat from "@livechat/agent-app-sdk";

const output = document.getElementById("output");

function render(data) {
  output.textContent = JSON.stringify(data, null, 2);
}

// Create the app
LiveChat.createApp().then(app => {
  // Get current chat
  app.get("chat").then(chat => {
    render(chat);
  });

  // Listen for chat changes
  app.on("chat", chat => {
    render(chat);
  });
});


