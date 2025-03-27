// custom.js

// Array met kleuren om uit te kiezen
const kleuren = ['#FF5733', '#33FF57', '#3357FF', '#F39C12', '#9B59B6', '#1ABC9C'];

// Alle links in de navbar selecteren
const navLinks = document.querySelectorAll('.nav-link');

// Voor elke link een event listener toevoegen voor hover
navLinks.forEach(link => {
    link.addEventListener('mouseover', function () {
        const randomColor = kleuren[Math.floor(Math.random() * kleuren.length)];
        this.style.color = randomColor;
    });

    // Als de muis weggaat, kleur resetten
    link.addEventListener('mouseout', function () {
        this.style.color = ''; // Terug naar standaard kleur (zoals via CSS)
    });
});