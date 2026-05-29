import re

with open('tarot.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '<html lang="en">': '<html lang="es">',
    'content="Cloud - Project your mind like a cloud. Daily phrase updates at 12:30 PM local time."': 'content="Nube - Proyecta tu mente como una nube. Actualización de frase diaria a las 12:30 PM hora local."',
    'content="cloud, reflection, daily phrase, mindfulness, spirituality"': 'content="nube, reflexión, frase diaria, atención plena, espiritualidad"',
    '<title>Cloud - Kirtan Teg Singh</title>': '<title>Nube - Kirtan Teg Singh</title>',
    '<h1>Please enable JavaScript</h1>': '<h1>Por favor, habilite JavaScript</h1>',
    '<p>This site requires JavaScript to work. Enable it in your browser settings and reload the page.</p>': '<p>Este sitio requiere JavaScript para funcionar. Habilítelo en la configuración de su navegador y recargue la página.</p>',
    'Skip to main content': 'Saltar al contenido principal',
    '">Home</a>': '">Inicio</a>',
    '">Biography</a>': '">Biografía</a>',
    '">Discography</a>': '">Discografía</a>',
    '">Cloud</a>': '">Nube</a>',
    'Toggle dark mode': 'Alternar modo oscuro',
    'aria-label="Navigation menu"': 'aria-label="Menú de navegación"',
    '<h1 style="text-align: center; margin-bottom: 3rem;">Cloud</h1>': '<h1 style="text-align: center; margin-bottom: 3rem;">Nube</h1>',
    '<h2>Project your mind like a cloud</h2>': '<h2>Proyecta tu mente como una nube</h2>',
    '''<p>
          Let a quiet phrase drift in today, reminding you that minds can gather, dissolve, 
          and form again. Your daily phrase updates at 12:30 PM in your local timezone.
        </p>''': '''<p>
          Deja que una frase tranquila fluya hoy, recordándote que las mentes pueden reunirse, disolverse, 
          y formarse de nuevo. Tu frase diaria se actualiza a las 12:30 PM en tu zona horaria local.
        </p>''',
    "Receive today's cloud phrase": 'Recibir la frase de la nube de hoy'
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('tarot.html', 'w', encoding='utf-8') as f:
    f.write(content)
