/* =================================================================
    DONNÉES GÉRÉES PAR L'ADMINISTRATEUR
    NOTE: Dans une application réelle, ces données viendraient d'une base de données.
================================================================== */

// ADMIN: Gérer les images publicitaires ici.
// Pour changer les publicités, modifiez simplement les liens dans ce tableau.
const adImages = [
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/tintin.jpg', // Image d'une boisson
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/AmaliCorp.jpeg', 
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/service client.jpg', 
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/secu.jpg',
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/bus.jpg',
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/logo_16-19.jpg',
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/copilot_image_1752426379085.jpeg', // Image d'un paysage congolais
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/fret.jpg',  // Image d'un service de livraison
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/pump_bus.jpg',
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/pump_moto.jpg', 
    'https://raw.githubusercontent.com/amalicorprdc/MulykapAppProject/refs/heads/image/entrepot.jpg'
];

// Données de démonstration pour les billets de l'utilisateur
const userTickets = [
    { from: 'Lubumbashi', to: 'Kolwezi', date: '2025-12-20', id: 'MKP-589302', status: 'upcoming' },
    { from: 'Kolwezi', to: 'Lubumbashi', date: '2025-11-10', id: 'MKP-412389', status: 'past' },
    { from: 'Lubumbashi', to: 'Likasi', date: '2025-10-25', id: 'MKP-309124', status: 'past' }
];

// Données de démonstration pour le compte utilisateur
let currentUser = {
    name: '',
    phone: '',
    hometown: ''
};

// ADMIN: Gérer les horaires des voyages ici.
const tripSchedules = [
    { from: 'Lubumbashi', to: 'Kolwezi', time: '07:30', bus: 'Confort Climatisé' },
    { from: 'Lubumbashi', to: 'Likasi', time: '08:00', bus: 'Standard' },
    { from: 'Kolwezi', to: 'Lubumbashi', time: '14:00', bus: 'VIP' },
    { from: 'Fungurume', to: 'Lubumbashi', time: '10:00', bus: 'Confort Climatisé' },
    { from: 'Lubumbashi', to: 'Kasumbalesa', time: '09:15', bus: 'Standard' }
];


/* =================================================================
    LOGIQUE DE L'APPLICATION
================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    setupAdsSlider();
    populateSchedules();
    populateTickets(); // Appel de la nouvelle fonction
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
});

// Gère l'affichage des différents écrans
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Fonction de "connexion"
function login() {
    // On sauvegarde les infos de l'utilisateur pour les afficher plus tard
    currentUser.name = document.getElementById('name').value;
    currentUser.phone = document.getElementById('phone').value;
    currentUser.hometown = document.getElementById('hometown').value;

    if (!currentUser.name || !currentUser.phone || !currentUser.hometown) {
        alert("Veuillez remplir tous les champs.");
        return;
    }
    
    // Personnalisation du message d'accueil et des infos du compte
    document.getElementById('welcome-message').textContent = `Bonjour, ${currentUser.name} !`;
    document.getElementById('account-name').textContent = currentUser.name;
    document.getElementById('account-phone').textContent = currentUser.phone;
    document.getElementById('account-hometown').textContent = currentUser.hometown;

    showScreen('home-screen');
}

// Fonction de déconnexion
function logout() {
    // On réinitialise les champs et on retourne à l'écran de connexion
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('password').value = '';
    document.getElementById('hometown').value = '';
    showScreen('login-screen');
}

// Affichage de la liste des billets
function populateTickets() {
    const container = document.getElementById('ticket-list-container');
    container.innerHTML = '';

    if (userTickets.length === 0) {
        container.innerHTML = `<p class="no-tickets-message">Vous n'avez aucun billet pour le moment.</p>`;
        return;
    }

    userTickets.forEach(ticket => {
        const ticketCard = document.createElement('div');
        // Ajoute la classe 'upcoming' ou 'past' en fonction du statut
        ticketCard.className = `ticket-card ${ticket.status}`;

        const formattedDate = new Date(ticket.date).toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'long', year: 'numeric'
        });

        ticketCard.innerHTML = `
            <div class="ticket-card-info">
                <h5>${ticket.from} &rarr; ${ticket.to}</h5>
                <p>Date: ${formattedDate} | ID: ${ticket.id}</p>
            </div>
            <div class="ticket-card-action">
                <button class="btn-small" onclick="alert('Affichage du QR Code pour le billet ${ticket.id}')">Voir Billet</button>
            </div>
        `;
        container.appendChild(ticketCard);
    });
}

// Configuration du slider pour les publicités
let currentSlideIndex = 0;
function setupAdsSlider() {
    const sliderContainer = document.querySelector('.ads-slider-container');
    
    // ADMIN: Les images sont chargées depuis le tableau 'adImages'
    adImages.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        if (index === 0) slide.classList.add('active');
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Publicité ${index + 1}`;
        slide.appendChild(img);
        sliderContainer.appendChild(slide);
    });

    // Démarre le slider automatique (4 secondes par image)
    setInterval(nextSlide, 4000);
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add('active');
}

// Affichage des horaires
function populateSchedules() {
    const scheduleList = document.getElementById('schedule-list');
    scheduleList.innerHTML = ''; // Vide la liste
    
    // ADMIN: Les horaires sont chargés depuis le tableau 'tripSchedules'
    tripSchedules.forEach(trip => {
        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `
            <h5>${trip.from} &rarr; ${trip.to}</h5>
            <p><strong>Heure de départ:</strong> ${trip.time}</p>
            <p><strong>Type de bus:</strong> ${trip.bus}</p>
        `;
        scheduleList.appendChild(item);
    });
}


// Affiche l'écran de paiement et met à jour le résumé
function showPaymentScreen() {
    const from = document.getElementById('depart').value;
    const to = document.getElementById('arrivee').value;
    const date = new Date(document.getElementById('date').value).toLocaleDateString('fr-FR');
    
    document.getElementById('summary-details').textContent = `${from} → ${to}`;
    document.getElementById('summary-date').textContent = `Le ${date}`;
    
    showScreen('payment-screen');
}

// Simule le processus de paiement et génère le ticket
function processPayment(method) {
    console.log(`Paiement initié via ${method}`);
    
    // Animation de chargement (simulée)
    alert(`Veuillez suivre les instructions pour payer avec ${method}.`);
    
    generateTicket();
    showScreen('ticket-screen');
}

// Génère les informations du ticket et le QR Code
function generateTicket() {
    const from = document.getElementById('depart').value;
    const to = document.getElementById('arrivee').value;
    const date = new Date(document.getElementById('date').value).toLocaleDateString('fr-FR');
    
    // Génération d'un ID de ticket unique (simplifié)
    const ticketId = `MKP-${Date.now().toString().slice(-6)}`;
    
    document.getElementById('ticket-id').textContent = ticketId;
    document.getElementById('ticket-trajet').textContent = `${from} → ${to}`;
    document.getElementById('ticket-date').textContent = date;
    
    // Génération du QR Code
    const qrData = {
        id: ticketId,
        trajet: `${from}-${to}`,
        date: date
    };
    
    new QRious({
        element: document.getElementById('qr-code'),
        value: JSON.stringify(qrData),
        size: 200,
        foreground: '#0D47A1', // Couleur du QR Code
        level: 'H' // Haute tolérance aux erreurs
    });
}