import re

with open('js/blog-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    # Article 9
    "'Geometry of the Heart: Nitnem, the Electromagnetic Field and Heart Center Kriya, and Fifteen Vertices of Transformation'": "'Geometría del Corazón: Nitnem, la Kriya del Campo Electromagnético y Centro del Corazón, y Quince Vértices de Transformación'",
    "'A reflection on the intersection between the medicinal benefits of Nitnem and the Kundalini Yoga kriya for the electromagnetic field and the heart center, articulated through fifteen geometric-spiritual concepts.'": "'Una reflexión sobre la intersección entre los beneficios medicinales del Nitnem y la kriya de Kundalini Yoga para el campo electromagnético y el centro del corazón, articulada a través de quince conceptos geométrico-espirituales.'",

    # Article 10
    "'Unfolding: The Fracture of Identity on the Path of Self-Knowledge'": "'Desdoblamiento: La Fractura de la Identidad en el Camino del Autoconocimiento'",
    "'An exploration from Ayurveda and Sikh spirituality on unfolding as a metaphor for the self-knowledge process, directed at Western medicine professionals.'": "'Una exploración desde el Ayurveda y la espiritualidad sij sobre el desdoblamiento como metáfora del proceso de autoconocimiento, dirigida a profesionales de la medicina occidental.'",

    # Article 11
    "'The Water Moon Elixir: Where Ayurvedic Wisdom Meets Modern Physiology'": "'El Elixir de la Luna de Agua: Donde la Sabiduría Ayurvédica Encuentra a la Fisiología Moderna'",
    "'A cucumber, lemon, and black pepper infusion—Jal Chandra Ras—and how its traditional applications find unexpected resonance in modern biomedical understanding.'": "'Una infusión de pepino, limón y pimienta negra (Jal Chandra Ras) y cómo sus aplicaciones tradicionales encuentran una resonancia inesperada en la comprensión biomédica moderna.'",

    # Article 12
    "'The Unfading Dodecahedron: From Sexual Energy to Spiritual Luminosity'": "'El Dodecaedro Inmarcesible: De la Energía Sexual a la Luminosidad Espiritual'",
    "'An exploration of Ojas, Brahmacharya, and the transmutation of vital energy as a geometric and alchemical process.'": "'Una exploración del Ojas, Brahmacharya y la transmutación de la energía vital como un proceso geométrico y alquímico.'",

    # Article 13
    "'Amrit Vela: The Circadian Antidote to the Americanized Mind'": "'Amrit Vela: El Antídoto Circadiano para la Mente Americanizada'",
    "'How the pre-dawn hours offer a physiological and spiritual sanctuary against the modern culture of constant productivity and burnout.'": "'Cómo las horas antes del amanecer ofrecen un santuario fisiológico y espiritual contra la cultura moderna de la productividad constante y el agotamiento mental.'"
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('js/blog-data.js', 'w', encoding='utf-8') as f:
    f.write(content)
