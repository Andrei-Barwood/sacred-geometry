import re

with open('blog.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '<html lang="en">': '<html lang="es">',
    'content="Spiritual blog - reflections, nutrition, reviews, and devotional content"': 'content="Blog espiritual - reflexiones, nutrición, reseñas y contenido devocional"',
    'content="spiritual blog, reflections, nutrition, reviews, meditation"': 'content="blog espiritual, reflexiones, nutrición, reseñas, meditación"',
    '<title>Spiritual Blog - Kirtan Teg Singh</title>': '<title>Blog Espiritual - Kirtan Teg Singh</title>',
    '<h1>Please enable JavaScript</h1>': '<h1>Por favor, habilite JavaScript</h1>',
    '<p>This site requires JavaScript to work. Enable it in your browser settings and reload the page.</p>': '<p>Este sitio requiere JavaScript para funcionar. Habilítelo en la configuración de su navegador y recargue la página.</p>',
    'Skip to main content': 'Saltar al contenido principal',
    '">Home</a>': '">Inicio</a>',
    '">Biography</a>': '">Biografía</a>',
    '">Discography</a>': '">Discografía</a>',
    '">Cloud</a>': '">Nube</a>',
    'Toggle dark mode': 'Alternar modo oscuro',
    'aria-label="Navigation menu"': 'aria-label="Menú de navegación"',
    '<h1 style="text-align: center; margin-bottom: 3rem;">Spiritual Blog</h1>': '<h1 style="text-align: center; margin-bottom: 3rem;">Blog Espiritual</h1>',
    '>All<': '>Todos<',
    '>Nutrition<': '>Nutrición<',
    '>Reviews<': '>Reseñas<',
    '>Reflections<': '>Reflexiones<',
    '>Casual<': '>Casual<',
    'min read': 'min de lectura',
    'Read more →': 'Leer más →',
    '<p>No entries to show in this category.</p>': '<p>No hay entradas para mostrar en esta categoría.</p>',
    '← Back to blog': '← Volver al blog',
    '<h2>Comments</h2>': '<h2>Comentarios</h2>',
    'placeholder="Write your comment..."': 'placeholder="Escribe tu comentario..."',
    'placeholder="Name (optional, will be \'Anonymous\' if left blank)"': 'placeholder="Nombre (opcional, será \'Anónimo\' si se deja en blanco)"',
    '>Send<': '>Enviar<',
    '>Sending...<': '>Enviando...<',
    "alert('Comment sent successfully!');": "alert('¡Comentario enviado con éxito!');",
    "alert('Error sending comment: ' + (result.error || 'Please try again.'));": "alert('Error al enviar comentario: ' + (result.error || 'Por favor, inténtalo de nuevo.'));",
    'Loading comments...': 'Cargando comentarios...',
    '<p>No comments yet. Be the first to share your reflection.</p>': '<p>Aún no hay comentarios. Sé el primero en compartir tu reflexión.</p>'
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('blog.html', 'w', encoding='utf-8') as f:
    f.write(content)
