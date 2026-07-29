

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. DARK MODE / LIGHT MODE ---------- */
  const btnTheme = document.querySelector(".btn-theme");
  const themeSauvegarde = localStorage.getItem("theme");

  // On applique le thème déjà choisi avant même le clic (persistance)
  if (themeSauvegarde === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (btnTheme) btnTheme.textContent = "☀️";
  }

  if (btnTheme) {
    btnTheme.addEventListener("click", function () {
      const themeActuel = document.documentElement.getAttribute("data-theme");
      if (themeActuel === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        btnTheme.textContent = "🌙";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        btnTheme.textContent = "☀️";
      }
    });
  }

  /* ---------- 2. NAVBAR DYNAMIQUE AU SCROLL + MENU BURGER ---------- */
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".nav-links");
  const burger = document.querySelector(".burger");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Bouton retour en haut
    const retourHaut = document.querySelector(".retour-haut");
    if (retourHaut) {
      if (window.scrollY > 300) {
        retourHaut.classList.add("actif");
      } else {
        retourHaut.classList.remove("actif");
      }
    }
  });

  if (burger) {
    burger.addEventListener("click", function () {
      navLinks.classList.toggle("ouvert");
    });
  }

  /* ---------- 3. ANIMATIONS AU SCROLL (IntersectionObserver) ---------- */
  const elementsAnimes = document.querySelectorAll(
    ".pourquoi-carte, .carte-intervenant, .carte-thematique"
  );

  if (elementsAnimes.length > 0) {
    const observateur = new IntersectionObserver(
      function (entrees) {
        entrees.forEach(function (entree) {
          if (entree.isIntersecting) {
            entree.target.classList.add("visible");
            observateur.unobserve(entree.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elementsAnimes.forEach(function (el) {
      observateur.observe(el);
    });
  }

  /* ---------- 4. ONGLETS DU PROGRAMME (3 jours) ---------- */
  const onglets = document.querySelectorAll(".onglet");
  const contenusJours = document.querySelectorAll(".contenu-jour");

  onglets.forEach(function (onglet) {
    onglet.addEventListener("click", function () {
      const jourCible = onglet.getAttribute("data-jour");

      onglets.forEach(function (o) { o.classList.remove("actif"); });
      onglet.classList.add("actif");

      contenusJours.forEach(function (contenu) {
        contenu.classList.remove("actif");
        if (contenu.getAttribute("data-jour") === jourCible) {
          contenu.classList.add("actif");
        }
      });
    });
  });

  /* ---------- 5. FILTRAGE DYNAMIQUE DES INTERVENANTS ---------- */
  const filtreBoutons = document.querySelectorAll(".filtre-btn");
  const cartesIntervenants = document.querySelectorAll(".carte-intervenant");

  filtreBoutons.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      const categorie = bouton.getAttribute("data-filtre");

      filtreBoutons.forEach(function (b) { b.classList.remove("actif"); });
      bouton.classList.add("actif");

      cartesIntervenants.forEach(function (carte) {
        if (categorie === "tous" || carte.getAttribute("data-categorie") === categorie) {
          carte.classList.remove("cachee");
        } else {
          carte.classList.add("cachee");
        }
      });
    });
  });

  /* ---------- 6. VALIDATION DU FORMULAIRE DE CONTACT ---------- */
  const formulaire = document.querySelector("#formulaire-inscription");

  if (formulaire) {
    formulaire.addEventListener("submit", function (e) {
      e.preventDefault();
      let formulaireValide = true;

      // Nom complet
      const nom = document.querySelector("#nom");
      if (nom.value.trim().length < 3) {
        marquerErreur(nom);
        formulaireValide = false;
      } else {
        marquerValide(nom);
      }

      // Email (vérifié par regex)
      const email = document.querySelector("#email");
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email.value.trim())) {
        marquerErreur(email);
        formulaireValide = false;
      } else {
        marquerValide(email);
      }

      // Téléphone (minimum 8 chiffres)
      const telephone = document.querySelector("#telephone");
      const chiffresTelephone = telephone.value.replace(/\D/g, "");
      if (chiffresTelephone.length < 8) {
        marquerErreur(telephone);
        formulaireValide = false;
      } else {
        marquerValide(telephone);
      }

      // Type de participation
      const participation = document.querySelector("#participation");
      if (participation.value === "") {
        marquerErreur(participation);
        formulaireValide = false;
      } else {
        marquerValide(participation);
      }

      // Pays
      const pays = document.querySelector("#pays");
      if (pays.value === "") {
        marquerErreur(pays);
        formulaireValide = false;
      } else {
        marquerValide(pays);
      }

      // Message (minimum 20 caractères)
      const message = document.querySelector("#message");
      if (message.value.trim().length < 20) {
        marquerErreur(message);
        formulaireValide = false;
      } else {
        marquerValide(message);
      }

      // Si tout est valide : succès + reset
      if (formulaireValide) {
        const messageSucces = document.querySelector(".message-succes");
        messageSucces.classList.add("actif");
        formulaire.reset();
        document.querySelectorAll(".champ").forEach(function (champ) {
          champ.classList.remove("valide");
        });

        setTimeout(function () {
          messageSucces.classList.remove("actif");
        }, 4000);
      }
    });
  }

  function marquerErreur(champInput) {
    const champParent = champInput.closest(".champ");
    champParent.classList.add("erreur");
    champParent.classList.remove("valide");
  }

  function marquerValide(champInput) {
    const champParent = champInput.closest(".champ");
    champParent.classList.remove("erreur");
    champParent.classList.add("valide");
  }

  /* ---------- 7. BOUTON RETOUR EN HAUT ---------- */
  const retourHaut = document.querySelector(".retour-haut");
  if (retourHaut) {
    retourHaut.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 8. ANNÉE DYNAMIQUE DANS LE FOOTER ---------- */
  const anneeSpan = document.querySelector("#annee-actuelle");
  if (anneeSpan) {
    anneeSpan.textContent = new Date().getFullYear();
  }

  /* ---------- COMPTEURS ANIMÉS (section chiffres clés) ---------- */
  const compteurs = document.querySelectorAll(".chiffre-item .valeur");

  if (compteurs.length > 0) {
    const observateurCompteurs = new IntersectionObserver(
      function (entrees) {
        entrees.forEach(function (entree) {
          if (entree.isIntersecting) {
            animerCompteur(entree.target);
            observateurCompteurs.unobserve(entree.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    compteurs.forEach(function (compteur) {
      observateurCompteurs.observe(compteur);
    });
  }

  function animerCompteur(element) {
    const cible = parseInt(element.getAttribute("data-cible"), 10);
    const suffixe = element.getAttribute("data-suffixe") || "";
    let valeurActuelle = 0;
    const duree = 1500;
    const etapes = 60;
    const increment = cible / etapes;
    const intervalle = duree / etapes;

    const timer = setInterval(function () {
      valeurActuelle += increment;
      if (valeurActuelle >= cible) {
        element.textContent = cible + suffixe;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(valeurActuelle) + suffixe;
      }
    }, intervalle);
  }

  /* ---------- COMPTE À REBOURS EN TEMPS RÉEL (page d'accueil) ---------- */
  const compteRebours = document.querySelector(".compte-rebours");

  if (compteRebours) {
    // Date fictive de la conférence : 12 mars 2027 (cohérente avec index.html et contact.html)
    const dateCible = new Date("2027-03-12T09:00:00").getTime();

    const jourEl = document.querySelector("#cr-jours");
    const heureEl = document.querySelector("#cr-heures");
    const minuteEl = document.querySelector("#cr-minutes");
    const secondeEl = document.querySelector("#cr-secondes");

    function majCompteRebours() {
      const maintenant = new Date().getTime();
      const distance = dateCible - maintenant;

      if (distance < 0) {
        compteRebours.innerHTML = "<p>L'événement a commencé !</p>";
        clearInterval(intervalleCompteRebours);
        return;
      }

      const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
      const heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secondes = Math.floor((distance % (1000 * 60)) / 1000);

      if (jourEl) jourEl.textContent = jours;
      if (heureEl) heureEl.textContent = heures;
      if (minuteEl) minuteEl.textContent = minutes;
      if (secondeEl) secondeEl.textContent = secondes;
    }

    majCompteRebours();
    const intervalleCompteRebours = setInterval(majCompteRebours, 1000);
  }

});