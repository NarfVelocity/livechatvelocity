// src/widget.js
import { createDetailsWidget } from "@livechat/agent-app-sdk";

function setStatus(text) {
  const el = document.getElementById("status");
  if (el) el.textContent = text;
}

function setOutput(obj) {
  const el = document.getElementById("output");
  if (el) el.textContent = obj ? JSON.stringify(obj, null, 2) : "(no data yet)";
}

function appendLog(label, obj) {
  const el = document.getElementById("logs");
  if (!el) return;
  const line = document.createElement("div");
  line.style.marginBottom = "8px";
  line.textContent = `${label}: ${JSON.stringify(obj)}`;
  el.prepend(line);
}

async function main() {
  setStatus("Initializing widget…");

  try {
    const widget = await createDetailsWidget();
    setStatus("Connected to LiveChat ✅");
    setOutput(null);

    // IMPORTANT:
    // We don’t know exact event names your environment will emit.
    // So we log *everything* we can.
    // We'll tighten this once we see real payloads.

    if (typeof widget.onAny === "function") {
      widget.onAny((type, payload) => {
        appendLog(`event:${type}`, payload);
      });
    } else {
      // Fallback: try a few likely event channels
      const candidates = ["chat", "customer_profile", "customer", "thread", "contact", "event"];
      candidates.forEach((name) => {
        try {
          widget.on(name, (payload) => appendLog(`event:${name}`, payload));
        } catch (_) {}
      });
    }

    // Also try: show “current chat” if SDK provides getters (varies by version)
    if (typeof widget.get === "function") {
      try {
        const snapshot = await widget.get("chat");
        if (snapshot) {
          setStatus("Chat snapshot received ✅");
          setOutput(snapshot);
        }
      } catch (_) {}
    }
  } catch (err) {
    console.error(err);
    setStatus("❌ Failed to initialize (check console)");
    setOutput({ error: String(err?.message || err) });
  }
}

document.addEventListener("DOMContentLoaded", main);
