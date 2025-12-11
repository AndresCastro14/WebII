/* =========================================
   FUNCIONALIDAD DEL CAMBIO DE TEMA
   ========================================= */
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

// Cargar el tema guardado al iniciar
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

// Función para cambiar el tema
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

// Escuchar el evento de cambio en el switch
toggleSwitch.addEventListener('change', switchTheme, false);

/* =========================================
   FUNCIONALIDAD DE LOS BOTONES
   ========================================= */

// Seleccionar los botones
const followBtn = document.querySelector('.btn-outline:first-child');
const messageBtn = document.querySelector('.btn-outline:last-child');

// Variable para rastrear el estado de seguimiento
let isFollowing = false;

// Función para el botón Follow
followBtn.addEventListener('click', function() {
    if (!isFollowing) {
        // Cambiar a estado "Following"
        this.textContent = 'Following';
        this.style.backgroundColor = 'var(--btn-border)';
        this.style.color = 'var(--bg-card)';
        isFollowing = true;
        
        // Mostrar mensaje de confirmación
        showNotification('¡Ahora sigues a Jane Doe!');
    } else {
        // Volver a estado "Follow"
        this.textContent = 'Follow';
        this.style.backgroundColor = 'transparent';
        this.style.color = 'var(--btn-text)';
        isFollowing = false;
        
        showNotification('Dejaste de seguir a Jane Doe');
    }
});

// Función para el botón Message
messageBtn.addEventListener('click', function() {
    // Simular abrir un mensaje
    showNotification('Abriendo chat con Jane Doe...');
    
    // Aquí podrías agregar más funcionalidad, como:
    // - Abrir un modal de chat
    // - Redirigir a una página de mensajes
    // - Mostrar un formulario de mensaje
    
    setTimeout(() => {
        alert('Función de mensajería: Aquí se abriría la ventana de chat con Jane Doe');
    }, 500);
});

/* =========================================
   SISTEMA DE NOTIFICACIONES
   ========================================= */
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--btn-border);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    // Agregar la notificación al body
    document.body.appendChild(notification);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Agregar estilos de animación para las notificaciones
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