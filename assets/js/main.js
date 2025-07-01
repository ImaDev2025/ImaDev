// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function () {
  // Menu burger functionality
  const burger = document.getElementById("burger-menu");
  const navMenu = document.getElementById("nav-menu");

  if (burger && navMenu) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("active");
      navMenu.classList.toggle("active");
      navMenu.classList.toggle("pr2rem");
    });
  }

  // Fermer le menu lors du clic sur un lien
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      burger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Fermer le menu lors du clic à l'extérieur
  document.addEventListener("click", function (event) {
    if (!burger.contains(event.target) && !navMenu.contains(event.target)) {
      burger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// Fonction pour fermer le menu (appelée depuis HTML)
function closeMenu() {
  const burger = document.getElementById("burger-menu");
  const navMenu = document.getElementById("nav-menu");

  if (burger && navMenu) {
    burger.classList.remove("active");
    navMenu.classList.remove("active");
  }
}

// Fonction d'envoi de message améliorée
function sendMessage() {
  // Vérifier que tous les éléments existent avant d'accéder à leurs valeurs
  const nameElement = document.getElementById("name");
  const emailElement = document.getElementById("email");
  const telephoneElement = document.getElementById("telephone");
  const messageElement = document.getElementById("message");

  // Si un élément n'existe pas, arrêter la fonction
  if (!nameElement || !emailElement || !telephoneElement || !messageElement) {
    console.error("Un ou plusieurs éléments du formulaire sont introuvables");
    showNotification("Erreur: Formulaire non trouvé", "error");
    return;
  }

  const name = nameElement.value.trim();
  const email = emailElement.value.trim();
  const telephone = telephoneElement.value.trim();
  const message = messageElement.value.trim();

  // Validation des champs
  if (!name || !email || !telephone || !message) {
    showNotification("Veuillez remplir tous les champs", "warning");
    return;
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification("Veuillez entrer une adresse email valide", "warning");
    return;
  }

  // Validation du téléphone (simple)
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(telephone)) {
    showNotification(
      "Veuillez entrer un numéro de téléphone valide",
      "warning"
    );
    return;
  }

  const botToken = "7794384596:AAH7OeDHZhIQMnX1Bgi8fFHMDSdOHaXL9Bo";
  const chatId = "-4848787946";

  // Désactiver le bouton pendant l'envoi
  const button = document.querySelector("#contact button");
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Envoi en cours...";

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: `🔔 Nouveau message depuis ImaDev\n\n👤 Nom: ${name}\n📧 Email: ${email}\n📞 Téléphone: ${telephone}\n💬 Message: ${message}\n\n⏰ Date: ${new Date().toLocaleString(
      "fr-FR"
    )}`,
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        // Vider les champs seulement s'ils existent
        nameElement.value = "";
        emailElement.value = "";
        telephoneElement.value = "";
        messageElement.value = "";

        showNotification("Message envoyé avec succès! 🚀", "success");
      } else {
        throw new Error("Erreur de l'API Telegram");
      }
    })
    .catch((error) => {
      console.error("Erreur : " + error);
      showNotification(
        "Erreur lors de l'envoi du message. Veuillez réessayer.",
        "error"
      );
    })
    .finally(() => {
      // Réactiver le bouton
      button.disabled = false;
      button.textContent = originalText;
    });
}

// Fonction pour afficher les notifications
function showNotification(message, type = "info") {
  // Supprimer les notifications existantes
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notif) => notif.remove());

  // Créer la notification
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: 10px;">&times;</button>
    `;

  // Styles pour la notification
  const styles = {
    position: "fixed",
    top: "80px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    zIndex: "9999",
    maxWidth: "300px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    animation: "slideIn 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  Object.assign(notification.style, styles);

  // Couleurs selon le type
  switch (type) {
    case "success":
      notification.style.background =
        "linear-gradient(45deg, #4CAF50, #45a049)";
      break;
    case "error":
      notification.style.background =
        "linear-gradient(45deg, #f44336, #d32f2f)";
      break;
    case "warning":
      notification.style.background =
        "linear-gradient(45deg, #ff9800, #f57c00)";
      break;
    default:
      notification.style.background =
        "linear-gradient(45deg, #2196F3, #1976D2)";
  }

  // Ajouter la notification au document
  document.body.appendChild(notification);

  // Supprimer automatiquement après 5 secondes
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}

// Ajouter les animations CSS pour les notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: Arial, sans-serif;
        transition: all 0.3s ease;
    }
    
    .notification:hover {
        transform: translateX(-5px);
    }
    
    @media screen and (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
            top: 70px;
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling pour les liens de navigation
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 60; // 60px pour compenser la hauteur du nav fixe

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});

// Animation des cartes au scroll
function animateOnScroll() {
  const cards = document.querySelectorAll("#services .card");
  const windowHeight = window.innerHeight;

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < windowHeight - 100) {
      card.style.animation = "slideUp 0.6s ease forwards";
    }
  });
}

// Ajouter l'animation slideUp
const slideUpStyle = document.createElement("style");
slideUpStyle.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    #services .card {
        opacity: 0;
    }
`;
document.head.appendChild(slideUpStyle);

// Écouter le scroll pour les animations
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Effet de parallaxe léger pour la section hero
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const homeSection = document.getElementById("home");

  if (homeSection) {
    homeSection.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Validation en temps réel des champs du formulaire
document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("telephone");

  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      const email = this.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email && !emailRegex.test(email)) {
        this.style.borderColor = "#f44336";
        this.style.boxShadow = "0 0 10px rgba(244, 67, 54, 0.3)";
      } else {
        this.style.borderColor = "#e2e8f0";
        this.style.boxShadow = "none";
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("blur", function () {
      const phone = this.value.trim();
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;

      if (phone && !phoneRegex.test(phone)) {
        this.style.borderColor = "#f44336";
        this.style.boxShadow = "0 0 10px rgba(244, 67, 54, 0.3)";
      } else {
        this.style.borderColor = "#e2e8f0";
        this.style.boxShadow = "none";
      }
    });
  }
});
