import re

with open('biography.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '<html lang="en">': '<html lang="es">',
    'content="Biography - The personal spiritual journey"': 'content="Biografía - El viaje espiritual personal"',
    'content="biography, spiritual journey, personal story, spiritual growth"': 'content="biografía, viaje espiritual, historia personal, crecimiento espiritual"',
    '<title>Biography - Kirtan Teg Singh</title>': '<title>Biografía - Kirtan Teg Singh</title>',
    '<h1>Please enable JavaScript</h1>': '<h1>Por favor, habilite JavaScript</h1>',
    '<p>This site requires JavaScript to work. Enable it in your browser settings and reload the page.</p>': '<p>Este sitio requiere JavaScript para funcionar. Habilítelo en la configuración de su navegador y recargue la página.</p>',
    'Skip to main content': 'Saltar al contenido principal',
    '">Home</a>': '">Inicio</a>',
    '">Biography</a>': '">Biografía</a>',
    '">Discography</a>': '">Discografía</a>',
    '">Cloud</a>': '">Nube</a>',
    'Toggle dark mode': 'Alternar modo oscuro',
    'aria-label="Navigation menu"': 'aria-label="Menú de navegación"',
    '<h1 style="text-align: center; margin-bottom: 3rem;">Biography</h1>': '<h1 style="text-align: center; margin-bottom: 3rem;">Biografía</h1>',
    '<h2>The Spiritual Journey</h2>': '<h2>El Viaje Espiritual</h2>',
    '''<p>
            This portal was born from a deep desire to share a personal spiritual journey, 
            a path marked by the constant search for meaning, connection, and understanding 
            of the nature of existence.
          </p>''': '''<p>
            Este portal nació de un profundo deseo de compartir un viaje espiritual personal, 
            un camino marcado por la búsqueda constante de significado, conexión y comprensión 
            de la naturaleza de la existencia.
          </p>''',
    '<h3>First Steps</h3>': '<h3>Primeros Pasos</h3>',
    '''<p>
            The journey began with simple yet fundamental questions: What is the purpose 
            of life? Is there something beyond the material? These inquiries led to an 
            exploration of diverse spiritual traditions, finding particular resonance in 
            the teachings of the Sri Guru Granth Sahib and the philosophy of Bhakti.
          </p>''': '''<p>
            El viaje comenzó con preguntas simples pero fundamentales: ¿Cuál es el propósito 
            de la vida? ¿Hay algo más allá de lo material? Estas indagaciones llevaron a una 
            exploración de diversas tradiciones espirituales, encontrando resonancia particular en 
            las enseñanzas del Sri Guru Granth Sahib y la filosofía del Bhakti.
          </p>''',
    '<h3>Finding the Path</h3>': '<h3>Encontrando el Camino</h3>',
    '''<p>
            Spiritual practice became an integral part of daily life. 
            It was not about escaping the world, but finding harmony between the material 
            and the spiritual. Each day brought new lessons in patience, gratitude, 
            and the importance of steady practice, even in the most difficult moments.
          </p>''': '''<p>
            La práctica espiritual se convirtió en una parte integral de la vida diaria. 
            No se trataba de escapar del mundo, sino de encontrar armonía entre lo material 
            y lo espiritual. Cada día traía nuevas lecciones en paciencia, gratitud, 
            y la importancia de la práctica constante, incluso en los momentos más difíciles.
          </p>''',
    '<h3>Service as Expression</h3>': '<h3>El Servicio como Expresión</h3>',
    '''<p>
            One of the most transformative teachings was discovering that selfless service, 
            or Seva, is not simply doing good deeds but a profound spiritual practice. 
            Through service, I have learned humility, gratitude, and above all that serving 
            is simply love in action.
          </p>''': '''<p>
            Una de las enseñanzas más transformadoras fue descubrir que el servicio desinteresado, 
            o Seva, no es simplemente hacer buenas acciones sino una profunda práctica espiritual. 
            A través del servicio, he aprendido humildad, gratitud, y sobre todo que servir 
            es simplemente amor en acción.
          </p>''',
    '<h3>Building Community</h3>': '<h3>Construyendo Comunidad</h3>',
    '''<p>
            This portal is an invitation to share the spiritual journey with others. 
            I firmly believe we do not walk alone on this path. In the company of 
            elevated souls, we find inspiration and mutual support. "In the company of 
            the saints, one becomes saintly," and this space aims to be that company 
            for those who seek.
          </p>''': '''<p>
            Este portal es una invitación a compartir el viaje espiritual con otros. 
            Creo firmemente que no caminamos solos en este camino. En compañía de 
            almas elevadas, encontramos inspiración y apoyo mutuo. "En la compañía de 
            los santos, uno se vuelve santo", y este espacio pretende ser esa compañía 
            para aquellos que buscan.
          </p>''',
    '<h3>The Present and the Future</h3>': '<h3>El Presente y el Futuro</h3>',
    '''<p>
            Today, I continue exploring and sharing the teachings that have shaped 
            this path. Through the blog, the music, and the shared reflections, 
            I hope to create a space where others can find inspiration for their 
            own spiritual journey, always remembering that each day is a new 
            opportunity for growth and connection.
          </p>''': '''<p>
            Hoy, continúo explorando y compartiendo las enseñanzas que han dado forma 
            a este camino. A través del blog, la música y las reflexiones compartidas, 
            espero crear un espacio donde otros puedan encontrar inspiración para su 
            propio viaje espiritual, recordando siempre que cada día es una nueva 
            oportunidad para el crecimiento y la conexión.
          </p>''',
    '<h2 class="timeline-title">Spiritual Milestones</h2>': '<h2 class="timeline-title">Hitos Espirituales</h2>',
    'Beginning of the spiritual path and first connection with the teachings of the Guru Granth Sahib': 'Inicio del camino espiritual y primera conexión con las enseñanzas del Guru Granth Sahib',
    'Establishing a daily practice of meditation and sacred scripture reading': 'Establecimiento de una práctica diaria de meditación y lectura de escrituras sagradas',
    'Deepening the practice of Seva (selfless service) ': 'Profundización en la práctica del Seva (servicio desinteresado) ',
    'First devotional music album: "The Fall of the Seele Concept"': 'Primer álbum de música devocional: "The Fall of the Seele Concept"',
    'Deeper understanding of the balance between material and spiritual life': 'Comprensión más profunda del equilibrio entre la vida material y espiritual',
    'Creation of this digital portal to share the spiritual journey with others': 'Creación de este portal digital para compartir el viaje espiritual con otros',
    'The journey continues, always open to learning and spiritual growth': 'El viaje continúa, siempre abierto al aprendizaje y al crecimiento espiritual'
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('biography.html', 'w', encoding='utf-8') as f:
    f.write(content)
