function boot() {
  const root = document.getElementById("app");

  if (!window.AgentApp) {
    root.textContent = "Agent App runtime not available";
    return;
  }

  root.textContent = "Agent App runtime detected";

  // Subscribe to context changes
  window.AgentApp.on("context", ctx => {
    root.textContent = JSON.stringify(ctx, null, 2);
  });

  // Read initial context
  const ctx = window.AgentApp.get("context");
  if (ctx) {
    root.textContent = JSON.stringify(ctx, null, 2);
  }
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", boot)
  : boot();
