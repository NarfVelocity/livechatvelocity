function boot() {
  const root = document.getElementById("app");

  if (!window.LiveChat?.agentApp) {
    root.textContent = "Agent App runtime not available";
    return;
  }

  window.LiveChat.agentApp.init({
    onReady({ context }) {
      root.innerHTML = `
        <h3>Account Context</h3>
        <pre id="out">${JSON.stringify(context, null, 2)}</pre>
      `;
    },

    onContextUpdate(context) {
      document.getElementById("out").textContent =
        JSON.stringify(context, null, 2);
    },

    onError(error) {
      console.error("Agent App error", error);
      root.textContent = "Agent App error";
    }
  });
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", boot)
  : boot();
