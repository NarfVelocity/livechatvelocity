import { createDetailsWidget } from "https://unpkg.com/@livechat/agent-app-sdk@latest/dist/agentapp.esm.js";

async function boot() {
  const root = document.getElementById("app");

  try {
    const widget = await createDetailsWidget();

    root.innerHTML = `<pre id="out">Waiting for customer…</pre>`;
    const out = document.getElementById("out");

    // Fired when agent opens a chat
    widget.on("customer_profile", profile => {
      out.textContent = JSON.stringify(profile, null, 2);
    });

    // Initial state (if already open)
    const initialProfile = widget.getCustomerProfile();
    if (initialProfile) {
      out.textContent = JSON.stringify(initialProfile, null, 2);
    }
  } catch (err) {
    console.error(err);
    root.textContent = "Widget init failed";
  }
}

boot();
