// ==============================
// VARIABLES GLOBALES
// ==============================
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');

// Botones de header
const notificationBtn = document.getElementById('notificationBtn');
const messageBtn = document.getElementById('messageBtn');
const newBtn = document.getElementById('newBtn');
const userProfile = document.getElementById('userProfile');

// Modales
const notificationModal = document.getElementById('notificationModal');
const messageModal = document.getElementById('messageModal');
const newModal = document.getElementById('newModal');

// Botones de cerrar
const closeNotification = document.getElementById('closeNotification');
const closeMessage = document.getElementById('closeMessage');
const closeNew = document.getElementById('closeNew');

// Búsqueda
const searchInput = document.getElementById('searchInput');

// ==============================
// MENU TOGGLE (MÓVIL)
// ==============================
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Cerrar sidebar al hacer click fuera (móvil)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// ==============================
// NAVEGACIÓN SIDEBAR
// ==============================
const sectionTitles = {
    'dashboard': 'Dashboard',
    'analytics': 'Analíticas',
    'users': 'Usuarios',
    'products': 'Productos',
    'sales': 'Ventas',
    'settings': 'Configuración'
};

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover clase active de todos
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Agregar clase active al clickeado
        item.classList.add('active');
        
        // Cambiar título de página
        const section = item.getAttribute('data-section');
        pageTitle.textContent = sectionTitles[section];
        
        // Cerrar sidebar en móvil
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
        
        // Mostrar mensaje de navegación (simulado)
        showToast(`Navegando a ${sectionTitles[section]}`);
    });
});

// ==============================
// MODALES
// ==============================
function openModal(modal) {
    modal.classList.add('active');
}

function closeModal(modal) {
    modal.classList.remove('active');
}

// Abrir modales
notificationBtn.addEventListener('click', () => {
    openModal(notificationModal);
    // Limpiar badge
    document.getElementById('notificationBadge').textContent = '0';
});

messageBtn.addEventListener('click', () => {
    openModal(messageModal);
    // Limpiar badge
    document.getElementById('messageBadge').textContent = '0';
});

newBtn.addEventListener('click', () => {
    openModal(newModal);
});

// Cerrar modales
closeNotification.addEventListener('click', () => closeModal(notificationModal));
closeMessage.addEventListener('click', () => closeModal(messageModal));
closeNew.addEventListener('click', () => closeModal(newModal));

// Cerrar modal al hacer click fuera
[notificationModal, messageModal, newModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(notificationModal);
        closeModal(messageModal);
        closeModal(newModal);
    }
});

// ==============================
// OPCIONES DEL MODAL NUEVO
// ==============================
const modalOptions = document.querySelectorAll('.modal-option');
modalOptions.forEach(option => {
    option.addEventListener('click', () => {
        const text = option.textContent.trim();
        showToast(`Creando: ${text}`);
        closeModal(newModal);
    });
});

// ==============================
// PERFIL DE USUARIO
// ==============================
userProfile.addEventListener('click', () => {
    showToast('Abriendo perfil de usuario...');
});

// ==============================
// BÚSQUEDA
// ==============================
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length > 2) {
        console.log('Buscando:', searchTerm);
        // Aquí podrías implementar la lógica de búsqueda real
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = e.target.value;
        if (searchTerm) {
            showToast(`Buscando: ${searchTerm}`);
            // Implementar búsqueda
        }
    }
});

// ==============================
// INTERACCIONES CON TARJETAS
// ==============================
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('p').textContent;
        showToast(`Ver detalles de: ${title}`);
    });
});

// ==============================
// TABLA INTERACTIVA
// ==============================
const tableRows = document.querySelectorAll('.data-table tbody tr');
tableRows.forEach(row => {
    row.addEventListener('click', () => {
        const product = row.querySelector('td').textContent;
        showToast(`Ver detalles de: ${product}`);
    });
});

// ==============================
// GRÁFICO INTERACTIVO
// ==============================
const bars = document.querySelectorAll('.bar');
bars.forEach(bar => {
    bar.addEventListener('click', () => {
        const month = bar.querySelector('span').textContent;
        const height = bar.style.height;
        showToast(`Ventas de ${month}: ${height}`);
    });
});

// ==============================
// NOTIFICACIONES TOAST
// ==============================
function showToast(message) {
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Estilos del toast
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #00adb5 0%, #00d9ff 100%)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease',
        maxWidth: '300px'
    });
    
    document.body.appendChild(toast);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Añadir animaciones CSS para toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==============================
// ACTIVIDAD RECIENTE
// ==============================
const activityItems = document.querySelectorAll('.activity-item');
activityItems.forEach(item => {
    item.addEventListener('click', () => {
        const text = item.querySelector('strong').textContent;
        showToast(`Detalles: ${text}`);
    });
});

// ==============================
// INICIALIZACIÓN
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard cargado correctamente');
    
    // Simular carga de datos
    setTimeout(() => {
        showToast('¡Bienvenido al Dashboard!');
    }, 500);
});

// ==============================
// RESPONSIVE - AJUSTES DINÁMICOS
// ==============================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});