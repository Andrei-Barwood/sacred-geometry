import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '<html lang="en">': '<html lang="es">',
    'content="Minimalist spiritual portal - Reflections, meditations, and devotional content"': 'content="Portal espiritual minimalista - Reflexiones, meditaciones y contenido devocional"',
    'content="spirituality, meditation, devotion, reflection, minimalist spirituality"': 'content="espiritualidad, meditación, devoción, reflexión, espiritualidad minimalista"',
    '<h1>Please enable JavaScript</h1>': '<h1>Por favor, habilite JavaScript</h1>',
    '<p>This site requires JavaScript to work. Enable it in your browser settings and reload the page.</p>': '<p>Este sitio requiere JavaScript para funcionar. Habilítelo en la configuración de su navegador y recargue la página.</p>',
    'Skip to main content': 'Saltar al contenido principal',
    '">Home</a>': '">Inicio</a>',
    '">Biography</a>': '">Biografía</a>',
    '">Discography</a>': '">Discografía</a>',
    '">Cloud</a>': '">Nube</a>',
    '"Union with the Lord\'s Name is the true purpose of human life. In the silence of meditation, the soul finds its home."': '"La unión con el Nombre del Señor es el verdadero propósito de la vida humana. En el silencio de la meditación, el alma encuentra su hogar."',
    'Latest Reflections': 'Últimas Reflexiones',
    'min read': 'min de lectura',
    'Read more': 'Leer más',
    '>Spiritual Blog<': '>Blog Espiritual<',
    'Explore deep reflections, nourishing nutrition essays, spiritual content reviews, and meditations on the inner path.': 'Explora profundas reflexiones, ensayos sobre nutrición, reseñas de contenido espiritual y meditaciones en el camino interior.',
    'Latest reflections →': 'Últimas reflexiones →',
    'Devotional music that nourishes the soul. Discover inspiring albums that accompany the spiritual journey.': 'Música devocional que nutre el alma. Descubre álbumes inspiradores que acompañan el viaje espiritual.',
    'Explore music →': 'Explorar música →',
    'Discover the spiritual journey, meaningful milestones, and teachings that shaped this inner path.': 'Descubre el viaje espiritual, hitos significativos y las enseñanzas que formaron este camino interior.',
    'My story →': 'Mi historia →',
    'Toggle dark mode': 'Alternar modo oscuro',
    'aria-label="Navigation menu"': 'aria-label="Menú de navegación"'
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
