import { createApp } from "@livechat/agent-app-sdk";

const output = document.getElementById("output");

function render(data) {
  output.textContent = JSON.stringify(data, null, 2);
}

const app = createApp();

// get current chat
app.get("chat").then(chat => {
  render(chat);
});

// listen for chat changes
app.on("chat", chat => {
  render(chat);
});
