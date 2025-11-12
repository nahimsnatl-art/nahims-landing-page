<script>
  const scriptURL = "https://script.google.com/macros/s/AKfycbwfIF6qGbl74Db2QsJxGMEgdcftSsXMEAP_q5k1670J45BRiRSs079kwPRIC7xRGsRiBA/exec";

  document.getElementById("anonForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = document.getElementById("anonMessage").value.trim();
    const successEl = document.getElementById("anonSuccess");
    const errorEl = document.getElementById("anonError");

    successEl.classList.add("d-none");
    errorEl.classList.add("d-none");

    if (!message) {
      errorEl.textContent = "Message cannot be empty.";
      errorEl.classList.remove("d-none");
      return;
    }

    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      if (data.status === "success") {
        successEl.classList.remove("d-none");
        e.target.reset();
      } else {
        errorEl.textContent = data.message || "Something went wrong.";
        errorEl.classList.remove("d-none");
      }

    } catch (err) {
      console.error(err);
      errorEl.textContent = "Server error — please try again later.";
      errorEl.classList.remove("d-none");
    }
  });
</script>
