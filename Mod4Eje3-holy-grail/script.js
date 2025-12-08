document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a');
    const mainContent = document.getElementById('main-content');

    const newsContent = {
        inicio: {
            title: 'Bienvenido al Portal de Noticias',
            content: '<p>Selecciona una sección de noticias en la navegación.</p>'
        },
        tecnologia: {
            title: 'Últimas Noticias de Tecnología',
            content: `
                <p>Descubre los últimos avances en tecnología.</p>
                <ul>
                    <li>Nuevo smartphone XYZ con características innovadoras.</li>
                    <li>Inteligencia Artificial alcanza nuevos hitos.</li>
                    <li>Realidad Virtual y Aumentada transforman la industria.</li>
                </ul>
            `
        },
        deportes: {
            title: 'Noticias de Deportes',
            content: '<p>Mantente al día con los eventos deportivos más recientes.</p>'
        },
        cultura: {
            title: 'Noticias de Cultura',
            content: '<p>Explora las últimas tendencias y eventos culturales.</p>'
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            
            if (newsContent[section]) {
                mainContent.innerHTML = `<h2>${newsContent[section].title}</h2>${newsContent[section].content}`;
            } else {
                mainContent.innerHTML = '<h2>Contenido no disponible</h2><p>Lo sentimos, no hay contenido para esta sección.</p>';
            }
        });
    });
});