import { createApp } from "agent-app-sdk/dist/sdk";

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

