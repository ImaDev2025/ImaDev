function sendMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const telephone = document.getElementById("telephone").value;
  const message = document.getElementById("message").value;
  const botToken = "7794384596:AAH7OeDHZhIQMnX1Bgi8fFHMDSdOHaXL9Bo"; // Replace with your bot token
  const chatId = "-4848787946"; // Replace with your group chat ID
  if (name && email && telephone && message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = {
      chat_id: chatId,
      text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${telephone}\nMessage: ${message}`,
    };
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          alert("Message envoyé ! Nous vous contacterons bientôt.");
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("telephone").value = "";
          document.getElementById("message").value = "";
        } else {
          alert("Erreur lors de l'envoi du message.");
        }
      })
      .catch((error) => alert("Erreur : " + error));
  } else {
    alert("Veuillez remplir tous les champs.");
  }
}
