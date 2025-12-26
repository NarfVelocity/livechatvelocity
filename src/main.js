import { createApp } from "agent-app-sdk/packages/agent-app-sdk/dist/index.js";

const output = document.getElementById("output");

function render(data) {
  output.textContent = JSON.stringify(data, null, 2);
}

const app = createApp();

app.get("chat").then(chat => {
  render(chat);
});

app.on("chat", chat => {
  render(chat);
});

