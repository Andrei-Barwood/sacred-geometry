import re

with open('discography.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '<html lang="en">': '<html lang="es">',
    'content="Discography - Devotional and spiritual music"': 'content="Discografía - Música devocional y espiritual"',
    'content="devotional music, spiritual music, discography, albums"': 'content="música devocional, música espiritual, discografía, álbumes"',
    '<title>Discography - Kirtan Teg Singh</title>': '<title>Discografía - Kirtan Teg Singh</title>',
    '<h1>Please enable JavaScript</h1>': '<h1>Por favor, habilite JavaScript</h1>',
    '<p>This site requires JavaScript to work. Enable it in your browser settings and reload the page.</p>': '<p>Este sitio requiere JavaScript para funcionar. Habilítelo en la configuración de su navegador y recargue la página.</p>',
    'Skip to main content': 'Saltar al contenido principal',
    '">Home</a>': '">Inicio</a>',
    '">Biography</a>': '">Biografía</a>',
    '">Discography</a>': '">Discografía</a>',
    '">Cloud</a>': '">Nube</a>',
    'Toggle dark mode': 'Alternar modo oscuro',
    'aria-label="Navigation menu"': 'aria-label="Menú de navegación"',
    '<h1 style="text-align: center; margin-bottom: 3rem;">Discography</h1>': '<h1 style="text-align: center; margin-bottom: 3rem;">Discografía</h1>'
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('discography.html', 'w', encoding='utf-8') as f:
    f.write(content)
