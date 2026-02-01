// Blog Data - Dynamic Spiritual Content
// 9+ entries: Interview, Review, Reflection, Casual/Tarot

/** Only entries whose IDs are listed here are shown in the blog and Latest Reflections. Set to null to show all. */
const VISIBLE_ENTRY_IDS = [9, 10, 11];

function getVisibleEntries() {
  if (!VISIBLE_ENTRY_IDS) return [...blogEntries];
  return blogEntries.filter(entry => VISIBLE_ENTRY_IDS.includes(entry.id));
}

export const blogEntries = [
  // ENTRY TYPE: INTERVIEW (2)
  {
    id: 1,
    type: 'Interview',
    title: 'Dialogue with Wisdom: A Conversation on the Inner Journey',
    date: '2026-01-15',
    excerpt: 'A deep interview about the spiritual path and the search for meaning in modern life.',
    coverImage: 'assets/placeholder.svg',
    readTime: 8,
    content: `
      <div class="interview-question">What is the fundamental purpose of the spiritual journey?</div>
      <div class="interview-answer">The fundamental purpose is union with the Divine. As the Sri Guru Granth Sahib teaches, true purpose is found in remembering the Divine Name. This is not about escaping the world, but about finding harmony between the material and the spiritual.</div>
      
      <div class="interview-question">How can we sustain spiritual practice in daily life?</div>
      <div class="interview-answer">Practice does not require isolation. Every action can become an offering when performed with awareness. The Guru teaches that meditation can be present in every moment, in every breath, in every act of service.</div>
      
      <div class="interview-question">What role does community play in spiritual growth?</div>
      <div class="interview-answer">Sangat, the spiritual community, is essential. We do not walk alone. In the company of elevated souls, we find inspiration and support. "In the company of the saints, one becomes saintly." It is a collective journey toward illumination.</div>
      
      <div class="interview-question">How do we face doubts and moments of darkness?</div>
      <div class="interview-answer">Doubts are part of the process. The Guru reminds us that even in the deepest darkness, the light of the Divine Name is present. Steady practice, scripture reading, and meditation are our tools for passing through these moments.</div>
    `
  },
  {
    id: 2,
    type: 'Interview',
    title: 'Voices of the Present: Reflections on Faith in the Digital Era',
    date: '2026-01-10',
    excerpt: 'Exploring how ancestral teachings find their place in a digitally connected world.',
    coverImage: 'assets/placeholder.svg',
    readTime: 6,
    content: `
      <div class="interview-question">How does modern technology affect our spiritual practice?</div>
      <div class="interview-answer">Technology is neutral; it depends on how we use it. It can be a powerful tool to connect with spiritual communities, access teachings, and maintain a steady practice. Yet it can also distract us if we do not keep discipline.</div>
      
      <div class="interview-question">Is it possible to find moments of silence in such a noisy world?</div>
      <div class="interview-answer">Absolutely. Silence does not require the absence of external sound, but inner stillness. We can create sacred spaces anywhere: during a commute, in a pause at work, upon waking. The Guru teaches that the Divine Name is always available, regardless of external circumstances.</div>
      
      <div class="interview-question">What advice would you give to those beginning their spiritual path?</div>
      <div class="interview-answer">Start with patience and compassion toward yourself. Do not seek instant perfection. As the Guru says, "Little by little, drop by drop, the heart fills with love." Consistency in practice is more valuable than occasional intensity. And remember: each day is a new opportunity.</div>
    `
  },
  
  // ENTRY TYPE: REVIEW (2)
  {
    id: 3,
    type: 'Review',
    title: 'Review: "The Path of Devotion" - An Album That Transcends',
    date: '2026-01-08',
    excerpt: 'A musical exploration of the depths of Bhakti and divine connection through sound.',
    coverImage: 'assets/placeholder.svg',
    readTime: 5,
    content: `
      <div class="review-rating">
        <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      
      <p>This album represents an extraordinary synthesis between devotional musical tradition and contemporary expressions. Each track invites deep inner reflection.</p>
      
      <div class="review-pros-cons">
        <div class="pros">
          <h4>Strengths</h4>
          <ul>
            <li>Impeccable production that honors tradition</li>
            <li>Lyrics that connect with the spiritual heart</li>
            <li>A rich variety of authentic instruments</li>
            <li>Arrangements that invite meditation</li>
          </ul>
        </div>
        <div class="cons">
          <h4>Areas to Improve</h4>
          <ul>
            <li>Some tracks could be longer</li>
            <li>Some verse translations could be deeper</li>
          </ul>
        </div>
      </div>
      
      <p>Overall, "The Path of Devotion" offers a transformative sonic experience that transcends entertainment to become a tool for spiritual growth. Highly recommended for those seeking music that nourishes the soul.</p>
    `
  },
  {
    id: 4,
    type: 'Review',
    title: 'Analysis: "Reflections of the Soul" - Modern Spiritual Literature',
    date: '2026-01-05',
    excerpt: 'A critical examination of a literary work that bridges ancient wisdom and contemporary consciousness.',
    coverImage: 'assets/placeholder.svg',
    readTime: 7,
    content: `
      <div class="review-rating">
        <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg class="star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      
      <p>"Reflections of the Soul" is a collection of essays that addresses spiritual themes from a perspective accessible to modern readers. The author demonstrates deep knowledge of sacred traditions while presenting them in a contemporary voice.</p>
      
      <div class="review-pros-cons">
        <div class="pros">
          <h4>Strengths</h4>
          <ul>
            <li>Clear, accessible language without losing depth</li>
            <li>Excellent references to the Sri Guru Granth Sahib</li>
            <li>A structure suited to both short and continuous reading</li>
            <li>Reflective questions at the end of each chapter</li>
          </ul>
        </div>
        <div class="cons">
          <h4>Considerations</h4>
          <ul>
            <li>Some chapters could go deeper</li>
            <li>Footnotes for additional references are missing</li>
          </ul>
        </div>
      </div>
      
      <p>This work serves as an excellent introduction for those approaching spiritual teachings for the first time, while also offering new perspectives for more experienced practitioners. The integration of theory and personal practice makes this book a valuable addition to any spiritual library.</p>
    `
  },
  
  // ENTRY TYPE: REFLECTION (2)
  {
    id: 5,
    type: 'Reflection',
    title: 'Silence as Teacher: Learning to Listen',
    date: '2026-01-12',
    excerpt: 'A meditation on the power of silence and inner listening in our spiritual journey.',
    coverImage: 'assets/placeholder.svg',
    readTime: 6,
    content: `
      <p>In a world filled with constant noise, finding silence can feel like an unreachable luxury. Yet silence is not the absence of sound, but the presence of deep attention.</p>
      
      <div class="reflection-quote">
        "In the silence of meditation, the soul speaks and the heart listens to the Guru's voice."
      </div>
      
      <p>The Guru Granth Sahib teaches that true wisdom arises when we quiet external and internal voices. This is not a passive act, but an active state of receptivity where divine intuition can flow freely.</p>
      
      <p>In my own practice, I have found that the most transformative moments occur not when I seek answers actively, but when I sit in silence and allow the teachings to sink in naturally. It is like watering a seed: we do not force it to grow, we simply provide the right conditions.</p>
      
      <div class="reflection-quote">
        "Quiet the mind, and in that silence you will find the One who is closer than your very breath."
      </div>
      
      <p>Silence teaches patience. In modern culture, we value speed and efficiency, but spiritual growth follows its own rhythm. Like the seasons, we cannot hurry inner flowering. We must learn to trust the process and honor each stage of the journey.</p>
      
      <p>Practice for today: devote five minutes to conscious silence. Do not actively meditate; simply sit and listen. Let thoughts arrive and depart without clinging. In that space, find the presence that has always been there, waiting to be recognized.</p>
    `
  },
  {
    id: 6,
    type: 'Reflection',
    title: 'Service as an Expression of Divine Love',
    date: '2026-01-03',
    excerpt: 'Reflecting on how Seva (selfless service) becomes a transformative spiritual practice.',
    coverImage: 'assets/placeholder.svg',
    readTime: 7,
    content: `
      <p>Selfless service, or Seva, is not simply doing good deeds. It is a profound spiritual practice that transforms both the one who serves and the one who receives.</p>
      
      <div class="reflection-quote">
        "Selfless service is the most direct path to Self-realization. In the act of giving, we find ourselves."
      </div>
      
      <p>I have observed that when we serve with expectations, when we seek recognition or gratitude, the act loses its transformative power. True Seva occurs when we forget we are serving, when the ego dissolves and only the act itself remains, pure and without labels.</p>
      
      <p>The Guru teaches that each being is a manifestation of the Divine. Therefore, when we serve another, we are truly serving that One Presence that dwells in all. This understanding completely changes the nature of service.</p>
      
      <div class="reflection-quote">
        "There is no difference between serving God and serving humanity. Both are expressions of the same unconditional love."
      </div>
      
      <p>In my experience, service has been one of my greatest teachers. It has taught me humility when I realized how much I have received compared to how little I have given. It has taught me gratitude as I recognize my privileges. And above all, it has taught me love by showing me that serving is simply love in action.</p>
      
      <p>Service does not require grand gestures. It can be listening to someone who needs to be heard, offering a genuine smile, helping without anyone knowing, or simply being present for another human being. In these small acts, we find the greatness of the spirit.</p>
      
      <p>Invitation: this week, seek an opportunity to serve without anyone knowing and without expecting anything in return. Observe how this simple act transforms your perspective and your relationship with the world.</p>
    `
  },
  
  // ENTRY TYPE: CASUAL/TAROT (2)
  {
    id: 7,
    type: 'Casual',
    title: 'The Sun Card: Illumination and Inner Clarity',
    date: '2026-01-01',
    excerpt: 'Exploring the symbolism of the Sun card in the context of our personal spiritual awakening.',
    coverImage: 'assets/placeholder.svg',
    readTime: 5,
    content: `
      <div class="tarot-card-layout">
        <img src="assets/placeholder.svg" alt="The Sun card" class="tarot-card-img">
        <div>
          <p>The Sun card represents one of the highest states of consciousness on the spiritual journey. It is not sudden illumination, but the gradual recognition of the light that has always been present within us.</p>
          
          <p>In the context of spiritual teachings, this card reminds us of the Guru's words: "The divine light dwells in every heart, yet few recognize it." The Sun is not something we need to seek outside; it is our true nature, temporarily obscured by the clouds of ignorance and ego.</p>
          
          <p>When this card appears in a reading, it may indicate a period of clarity and deep understanding. It is a moment to trust our intuition, to let our true essence shine without restriction.</p>
        </div>
      </div>
      
      <p>Solar symbolism connects with many spiritual traditions. In many teachings, the sun represents the Atman, the true Self that transcends the limitations of the individual ego. It is pure, eternal, radiant consciousness.</p>
      
      <p>In our daily practice, we can invoke the energy of the Sun through morning meditation, allowing the first rays to remind us of our own luminous nature. It is not a complex ritual, but a simple practice of recognition and gratitude.</p>
    `
  },
  // ENTRY TYPE: REFLECTION (3) — Sacred Geometry, Nitnem, Electromagnetic Kriya
  {
    id: 9,
    type: 'Reflection',
    title: 'Geometry of the Heart: Nitnem, the Electromagnetic Field and Heart Center Kriya, and Fifteen Vertices of Transformation',
    date: '2026-01-22',
    excerpt: 'A reflection on the intersection between the medicinal benefits of Nitnem and the Kundalini Yoga kriya for the electromagnetic field and the heart center, articulated through fifteen geometric-spiritual concepts.',
    coverImage: 'assets/02.jpg',
    readTime: 22,
    content: `
      <p>Two practices—Nitnem as devotional repetition and the <em>Electromagnetic Field and Heart Center</em> kriya as somatic geometry—intersect on the same plane: that of nervous system repair, hormonal balance, and the stabilization of the individual psycho-electromagnetic field. This reflection traverses fifteen conceptual vertices that articulate this intersection, linking them with three transversal gestations: that of a song, that of a daughter, and that of a recursive loop of constant evolution.</p>

      <h3>Unfolding</h3>
      <p><strong>Theorem:</strong> <em>Unfolding</em> is the fracture of identity upon encountering alternate versions of oneself—the one who meditates, the one who forgets; the one who chants Nitnem, the one who doubts.</p>
      <p><strong>Scholium:</strong> Nitnem, by repeating the same banis daily, does not erase these versions but places them in resonance. The kriya, with the stomach pump and breath of fire, strengthens the electromagnetic field; when the elbows bend, the field does not reform properly. The body and identity unfold in acts—sometimes devotional, sometimes physical—that, when sustained, reconfigure internal geometry.</p>
      <p><strong>Problem and Solution:</strong> One who lives fragmented between roles (father, artist, seeker) feels that "he" is not one. The solution is not to eliminate the unfolding, but to inhabit it: Nitnem as a fixed thread, the kriya as a somatic anchor. Like a song that is born from multiple sketches until it finds a stable melodic line.</p>

      <h3>Vortex</h3>
      <p><strong>Theorem:</strong> The <em>vortex</em> is a dimensional door: a symbol of transformation and controlled chaos.</p>
      <p><strong>Scholium:</strong> Breath of fire and abdominal pumping generate a vortex in the body—rhythmic chaos that obeys a higher law. Nitnem, with its daily cycle of repetitions, also operates as a temporal vortex: every Amrit Vela, every Japji, every review of the day opens a breach in routine and allows something deeper to express itself.</p>
      <p><strong>Problem and Solution:</strong> Fear of change paralyzes. Practice—both the kriya and Nitnem—does not avoid the vortex; it uses it. Entering the vortex with breath and recitation is like gestating a daughter: we might see there is chaos in conception, in pregnancy, in birth, but the process follows a logic that transcends it.</p>

      <h3>Echo-existence</h3>
      <p><strong>Theorem:</strong> <em>Echo-existence</em> is the idea that multiple "selves" coexist in quantum resonance—not as enemies, but as echoes.</p>
      <p><strong>Scholium:</strong> The kriya set works on the heart, thyroid, and navel center; it balances prana and apana. Nitnem, meanwhile, articulates a community echo-existence: the same bani repeated by millions of people across time. That collective resonance stabilizes the individual field.</p>
      <p><strong>Problem and Solution:</strong> Internal contradiction ("I want to be faithful to the path and also be free") generates anguish. The solution is echo-existence: do not choose one "self" and kill the other, but let both resonate. The song in gestation contains contradictory versions; the final harmony does not erase them, it integrates them.</p>

      <h3>Uprooting</h3>
      <p><strong>Theorem:</strong> <em>Uprooting</em> is the sudden loss of physical and emotional anchorage in reality.</p>
      <p><strong>Scholium:</strong> If the exhale after pumping is rough or gasping, the magnetic field is very weak. Somatic uprooting—damaged nerves, unbalanced blood—is reflected in existential uprooting. The kriya repairs the nervous system and balances the blood; Nitnem anchors in time (early morning, same order of banis) and in sound (divine name).</p>
      <p><strong>Problem and Solution:</strong> One who loses home, community, or health floats without references. Devotional practice and the kriya act as correcting algorithms: the body regains coordinates (posture, respiratory rhythm), the day has structure (Nitnem), and the heart—stimulated by exercises 2, 6, 10, and 11—beats again as an anchor.</p>

      <h3>Simulacrum</h3>
      <p><strong>Theorem:</strong> The <em>simulacrum</em> are imperfect copies of people, laws, or cultures that seem familiar but are not.</p>
      <p><strong>Scholium:</strong> There is a correct way to do the kriya: straight elbows, precise pump, full time. If imitated without understanding, one obtains a simulacrum—appearance of practice without the reparative effect. Nitnem, likewise: reciting without presence is simulacrum; repeating with attention is living geometry.</p>
      <p><strong>Problem and Solution:</strong> We live among simulacra—hollow rites, surface relationships, songs that sound good but transmit nothing. The solution is not to flee from form, but to fill it with intention. The gestation of a daughter is not a simulacrum of "being a father"; it is real commitment. Practice, likewise: form + presence = integrity.</p>

      <h3>Threshold</h3>
      <p><strong>Theorem:</strong> The <em>threshold</em> is the instant between worlds, charged with potential and danger.</p>
      <p><strong>Scholium:</strong> Exercise 4—forehead on the ground, arms extended, then deep breathing and chanting Ong/Sohung—feeds new blood to the brain and moves spinal fluid. It is a physiological threshold: what was damaged (by substances, by trauma) can begin to repair. Nitnem, by opening and closing the day, marks temporal thresholds; crossing those instants with consciousness changes the quality of what follows.</p>
      <p><strong>Problem and Solution:</strong> In thresholds (waking, sleeping, changing jobs, birth of a child) there is vertigo. The solution is to ritualize the threshold: Nitnem at dawn, relaxation after the kriya, a pause before entering the next phase. Thus the threshold ceases to be only danger and becomes a door.</p>

      <h3>Dissonance</h3>
      <p><strong>Theorem:</strong> <em>Dissonance</em> is the clash between expectations and alternate realities.</p>
      <p><strong>Scholium:</strong> The kriya coordinates and repairs the nervous system; the normal feeling of happiness, connection, and well-being depends on the balance of the individual psycho-electromagnetic field. When there is dissonance between "what should be" and "what is," the body and mind desynchronize. Nitnem and the kriya do not eliminate the world's dissonance; they restore internal coherence so one can traverse it.</p>
      <p><strong>Problem and Solution:</strong> We expected a linear life; reality is fragmented, sometimes brutal. The solution is to accept dissonance as data and use practice to maintain a stable center. Like composing a song: dissonant notes exist; harmony integrates them into a larger structure.</p>

      <h3>Inverse Gravity</h3>
      <p><strong>Theorem:</strong> <em>Inverse gravity</em> is the metaphor of what sustains your world until it stops doing so.</p>
      <p><strong>Scholium:</strong> Exercise 9—shoulder stand with legs spread and breath of fire—works the thyroid; exercise 8 balances prana and apana. The body depends on hormones, flows, fields; when something fails, the "gravity" that kept us stable inverts and everything disorders. Nitnem and the kriya restore that geometry: not as escape, but as re-establishment of an internal order that can sustain again.</p>
      <p><strong>Problem and Solution:</strong> A crisis (illness, grief, failure) makes the ground disappear. The solution is to rebuild gravity from within: daily practice, repetition, postures that recalibrate. The gestation of a daughter also alters the gravity of the parents; commitment to the process is what returns a new equilibrium.</p>

      <h3>Chrono-anchor</h3>
      <p><strong>Theorem:</strong> The <em>chrono-anchor</em> is time—or the object that embodies it, like a timer—as a thread of return that maintains connection with the stable.</p>
      <p><strong>Scholium:</strong> The kriya has precise durations: pump 1–3 minutes, breath of fire 3 minutes, Maha Mudra 3 minutes, etc. The timer is not optional; it is a chrono-anchor. Nitnem anchors the day in fixed slots (Amrit Vela, midday, evening). These temporal windows allow always returning to the same structured "here and now."</p>
      <p><strong>Problem and Solution:</strong> Time disperses, days blur. The solution is to adopt chrono-anchors: Nitnem at the same hour, kriya with timer, predictable moments of silence. Like a song that has tempo and time signature: without them, there is only noise.</p>

      <h3>Social Mirage</h3>
      <p><strong>Theorem:</strong> The <em>social mirage</em> are inverted political or cultural realities that seem coherent but disorient.</p>
      <p><strong>Scholium:</strong> The external world can look upside down—inverted priorities, simulated values. The kriya and Nitnem do not correct the world; they strengthen internal criteria. The glow in the eyes and radiant complexion the kriya promotes are not cosmetics: they are signs that the thyroid, heart, and involved centers are nourished. That internal clarity allows discerning mirages.</p>
      <p><strong>Problem and Solution:</strong> Living in environments that reward the opposite of what one values produces disorientation. The solution is not to isolate, but to cultivate a center so stable that mirages cease to define identity. Constant evolution includes learning to navigate mirages without getting lost.</p>

      <h3>Dimensional Resonance</h3>
      <p><strong>Theorem:</strong> <em>Dimensional resonance</em> is the energetic echo between planes—close to concepts of nadis, chakras, or subtle flows.</p>
      <p><strong>Scholium:</strong> The kriya stimulates the heart, thyroid, parathyroid, and navel; it moves blood and spinal fluid. Nitnem, through sound and repetition, activates subtle channels. The two work different but complementary planes: the physical and the vibratory. Resonance between both is what produces lasting transformation.</p>
      <p><strong>Problem and Solution:</strong> Sometimes one works only the body or only "the spiritual"; the result is partial. The solution is to integrate: kriya for internal geometry, Nitnem for devotional resonance. Like in the gestation of a daughter: there is biology, emotion, legacy, and love; all resonating at once.</p>

      <h3>Ontological Displacement</h3>
      <p><strong>Theorem:</strong> <em>Ontological displacement</em> occurs when the "being" no longer knows which plane it belongs to.</p>
      <p><strong>Scholium:</strong> Maha Mudra—sitting on one heel, leg stretched, holding the big toe, retention on exhale with mul bandh and diaphragmatic lock—is considered the great seal; its effects fill pages. It is a voluntary displacement: the body in an unusual form, breath suspended. Nitnem displaces identity toward the divine name; one is "no longer just" the daily role.</p>
      <p><strong>Problem and Solution:</strong> One who has lived strong ruptures no longer knows "who they are" nor "where they are." The solution is to choose displacements that repair: the kriya and Nitnem as rituals that relocate the being to a plane where the heart and nervous system can recalibrate.</p>

      <h3>Lived Fiction</h3>
      <p><strong>Theorem:</strong> <em>Lived fiction</em> is the erased border between narrative and direct experience.</p>
      <p><strong>Scholium:</strong> The final meditation of the set—"God and me, me and God, are one"—is not an external affirmation; it is a lived fiction that, when repeated, modifies experience. Nitnem, likewise: the banis recount and embody a reality; by reciting them, one inhabits it. The kriya converts the body into the stage for that fiction: nerves, hormones, and heart participate.</p>
      <p><strong>Problem and Solution:</strong> Sometimes life feels like someone else's script. The solution is to take the reins of the narrative: practice as "fiction" that one chooses to live until it becomes experience. The song being composed starts as an idea; upon finishing, it is no longer just an idea, it is sonic reality.</p>

      <h3>Ordered Chaos</h3>
      <p><strong>Theorem:</strong> <em>Ordered chaos</em> is apparent disorder that follows higher laws—like in a raga or a well-defined sequence.</p>
      <p><strong>Scholium:</strong> The kriya has twelve exercises; each has time, form, and effect. The set seems demanding, almost chaotic, but obeys a logic: build the field, nourish the heart, repair nerves, balance prana and apana. Nitnem has its own order—banis in sequence, times of day. Chaos (daily life, unforeseen events) becomes ordered chaos when there is a structure that contains it.</p>
      <p><strong>Problem and Solution:</strong> Existence is experienced as pure chaos. The solution is to install ordered chaos: practice as an algorithm that, day by day, introduces restorative patterns. Constant evolution is not linear; it is a recursive loop where each cycle integrates a bit more disorder into a wider order.</p>

      <h3>Quantum Shadow</h3>
      <p><strong>Theorem:</strong> The <em>quantum shadow</em> is the version of oneself that took another path and left traces in the current equation.</p>
      <p><strong>Scholium:</strong> One who did not practice, who chose another route, who got lost in substances or evasion, leaves a shadow: that of what could have been. The kriya helps repair damage to the brain and nerves; Nitnem resumes the thread with a more stable identity. The shadow is not erased; it is integrated. Practice does not deny alternate versions; it includes them in a wider geometry.</p>
      <p><strong>Problem and Solution:</strong> Regret, paths not taken, lost "selves" generate anguish. The solution is not to erase the past, but to use it: the quantum shadow informs the current equation. The gestation of a daughter, the gestation of a song, constant evolution—all carry the traces of paths not walked and, even so, can result in something whole and alive.</p>

      <div class="reflection-quote">
        "The best result is obtained by practicing a set until mastering it. If you cannot do the exercises for the full time, do what you can and build up. When you can fulfill all times and every posture, continue the set each day for forty days while mastering the mental poise of the full set."
      </div>

      <p>Nitnem and the <em>Electromagnetic Field and Heart Center</em> kriya do not substitute life; they repair and reorder it. They act as correcting algorithms on the body, nervous system, hormones, and psycho-electromagnetic field, while devotional repetition anchors consciousness amidst uprooting and dissonance. The gestation of a song, that of a daughter, and constant evolution are processes that benefit from that geometry: form, time, resonance, and commitment. The result is not a fixed identity, but a positive feedback loop between practice, healing, and consciousness expansion—an ordered chaos that follows higher laws and includes, without erasing, every quantum shadow and every threshold crossed.</p>
    `
  },
  {
    id: 8,
    type: 'Casual',
    title: 'The Star: Hope and Guidance in Dark Moments',
    date: '2025-12-28',
    excerpt: 'A casual reflection on how the Star card guides us in times of spiritual uncertainty.',
    coverImage: 'assets/placeholder.svg',
    readTime: 4,
    content: `
      <div class="tarot-card-layout">
        <img src="assets/placeholder.svg" alt="The Star card" class="tarot-card-img">
        <div>
          <p>The Star is one of the most comforting cards in spiritual tarot. After the turbulence represented by the Tower, the Star emerges as a beacon of hope in the dark night of the soul.</p>
          
          <p>This card speaks of renewed faith, of the ability to find meaning even in the most difficult moments. The Guru reminds us: "In the deepest darkness, the light of a single star is enough to find the path."</p>
          
          <p>The Star also represents spiritual inspiration, that divine spark that moves us forward when everything seems lost. It is the inner voice that whispers that we are greater than our circumstances, that our essence transcends temporary challenges.</p>
        </div>
      </div>
      
      <p>In practical terms, the appearance of this card suggests it is time to connect with our inner source of inspiration. It may be through reading sacred scriptures, meditation, or simply contemplating the beauty of the night sky.</p>
      
      <p>The Star teaches us that even in the darkest periods of our spiritual life, guidance is available. We only need to learn to look upward, to trust that light always returns, and to remember that stars are most visible when the night is darkest.</p>
    `
  },
  {
    id: 10,
    type: 'Reflection',
    title: 'Unfolding: The Fracture of Identity on the Path of Self-Knowledge',
    date: '2026-01-25',
    excerpt: 'An exploration from Ayurveda and Sikh spirituality on unfolding as a metaphor for the self-knowledge process, directed at Western medicine professionals.',
    coverImage: 'assets/05.jpg',
    readTime: 15,
    content: `
      <p>In clinical practice, when a patient describes the experience of encountering alternate versions of themselves—the one who meditates and the one who forgets, the one who maintains discipline and the one who disperses, the one who feels connection and the one who doubts—the immediate response often orients toward diagnostic categories. However, there exists another possible reading, one that does not deny neurological or psychological complexity, but recognizes in this fragmentation a deeper dimension: that of unfolding as a metaphor for the self-knowledge process on the spiritual path.</p>

      <p>This phenomenon, which we might call <em>unfolding</em>, is not necessarily pathological. It is, in many cases, the expression of a consciousness system that begins to recognize its own internal multiplicity before being able to integrate it into a broader unity. From the Ayurvedic perspective, this experience reflects an initial imbalance in the doshas, particularly in Vata and its subtype Prana Vata, which governs the mind, perception, and the movement of consciousness.</p>

      <div class="reflection-quote">
        "Unfolding is the fracture of identity upon encountering alternate versions of oneself. It is not the disease, but the symptom of a system seeking to reorder itself."
      </div>

      <h3>Quantum Unfolding and Samskaras</h3>

      <p>There exists a useful analogy between what quantum physics describes as parallel realities and what the Vedic tradition knows as <em>samskaras</em>—the karmic impressions that the <em>jiva</em>, the individual soul, carries with it through multiple existences. Just as if travelling through time by virtue of music, the travellers navigate between parallel dimensions where alternate versions of themselves make different decisions, the jiva confronts its multiple samskaras: each unrealized choice, each latent tendency, each unexpressed potential exists as a resonance in the field of consciousness.</p>

      <p>When spiritual practice begins to activate these deeper levels of the psyche, these alternate versions emerge to the surface of consciousness. The individual may simultaneously experience the one who maintains Nitnem discipline and the one who abandons it, the one who feels deep devotion and the one who experiences skepticism. This is not pathological dissociation, but an expansion of observational capacity: the nervous system, becoming more subtle through practice, begins to perceive dimensions of identity that previously remained unconscious.</p>

      <h3>Identity as a Flow of Gunas</h3>

      <p>Ayurveda does not conceive identity as a fixed entity, but as a dynamic flow of <em>gunas</em>—the three fundamental qualities that govern all manifestation. <em>Sattva</em> represents clarity, harmony, and coherence; <em>rajas</em> activity, movement, and dispersion; <em>tamas</em> inertia, darkness, and fragmentation.</p>

      <p>In a state of equilibrium, sattva predominates, allowing consciousness to experience itself as unified and coherent. However, when rajas or tamas intensify—whether due to stress, trauma, dietary imbalances, sleep disturbances, or the accumulation of unprocessed mental impressions—the sensation of fragmentation becomes more pronounced. Excess rajas generates a dispersive mental activity that prevents integration; excess tamas creates a sensation of heaviness and disconnection that fragments the experience of being.</p>

      <p>Unfolding, then, can be understood as the conscious perception of this imbalance in the gunas. The individual is not "sick" in the traditional pathological sense; they are experiencing the fluid nature of their own identity at a moment of transition, when previous structures of coherence dissolve to allow a deeper reorganization.</p>

      <h3>The Role of Ojas in Reintegration</h3>

      <p>For this fragmentation to resolve into a broader unity, Ayurveda identifies a crucial factor: <em>ojas</em>, the vital essence that sustains the integrity of the mind-body system. Ojas is the most refined product of digestion—not only of food, but of all experiences, thoughts, and emotions. It is the subtle substance that maintains the cohesion of consciousness, allowing multiple aspects of being to function as an integrated unity.</p>

      <p>Without sufficient ojas, the mind cannot sustain the unity of consciousness. The nervous system, exhausted or imbalanced, experiences reality as fragmented because it lacks the subtle energy necessary to maintain coherence. It is like trying to maintain a clear image on a screen with insufficient power: the image fragments, unfolds, multiplies.</p>

      <p>Sustained spiritual practice—especially daily Nitnem, Kundalini meditation, and kirtan—acts directly on the production and conservation of ojas. The repetition of mantras, conscious breathing, and devotional singing are not merely rituals; they are precise technologies for the regeneration of this vital essence. When ojas is restored, fragmentation begins to resolve naturally, not because the multiple dimensions of being are eliminated, but because the system acquires the capacity to hold them in a broader unity.</p>

      <h3>Prana Vata and the Dispersion of Consciousness</h3>

      <p>The Prana Vata subtype of Vata dosha is particularly relevant here. Prana Vata governs the movement of consciousness, breathing, sensory perception, and coordination between mind and body. When Prana Vata becomes imbalanced—due to excess stimulation, lack of routine, sleep disturbances, or accumulated stress—consciousness loses its capacity to anchor itself and disperses.</p>

      <p>This dispersion may manifest as the experience of unfolding: the mind jumps between different versions of identity without being able to stabilize in any of them. The individual may feel that there are multiple "selves" operating simultaneously, each with its own motivations, fears, and desires. From the Ayurvedic perspective, this is not a primary pathology, but a symptom of imbalanced Prana Vata that requires restoration through specific practices.</p>

      <h3>Dinacharya: Restoring Internal Cohesion</h3>

      <p>Ayurveda offers a practical framework for restoring this cohesion: <em>dinacharya</em>, the daily routine that aligns the individual with natural rhythms and stabilizes the doshas. In the context of unfolding, certain dinacharya practices acquire special relevance.</p>

      <p>The practice of shabad singing in the early morning hours—before the mind disperses into the day's activities—acts as an anchor for Prana Vata. Sacred sound, when sung with attention and devotion, stabilizes the flow of prana, the vital force that Prana Vata governs. This morning anchor creates a structure of coherence that persists throughout the day, allowing the mind to return to a stable reference point when fragmentation emerges.</p>

      <p>The specific sequence is important: awakening before dawn (during the Vata period), performing oral cleansing, sitting in a stable posture, and beginning shabad singing before the mind becomes fully active. This moment—when consciousness is still at the threshold between sleep and wakefulness—is especially receptive. Sacred sound, intoned in this liminal space, imprints deeply on the nervous system, creating a foundation of coherence that supports the integration of the multiple dimensions of being.</p>

      <p>In addition to morning singing, other dinacharya practices contribute to this restoration: regular meditation, which trains the mind to maintain a focal point despite internal multiplicity; eating according to constitutional type, which balances the doshas and supports ojas production; adequate sleep at regular times, which allows nervous system regeneration; and the practice of specific asanas or kriyas that balance Prana Vata and strengthen the body's electromagnetic field.</p>

      <h3>The Paradox of Unfolding as a Gateway to Healing</h3>

      <p>Here resides the central paradox: unfolding, which initially reflects an imbalance, can become a gateway to healing when approached with spiritual discipline (sadhana). Sustained practice—daily Nitnem, Kundalini meditation, kirtan—does not eliminate the multiple dimensions of being. Instead, it integrates them into a broader structure of coherence.</p>

      <p>It is as if the system, upon recognizing its own multiplicity, were preparing for a deeper reorganization. Unfolding is not the final problem; it is the symptom of a system ready to expand beyond the limitations of a rigid, one-dimensional identity. Spiritual practice provides the container—the structure, the discipline, the subtle energy—necessary for this expansion to occur in an integrated rather than fragmented manner.</p>

      <div class="reflection-quote">
        "Unfolding is not the crisis; it is the soul's call to remember its true nature—not multiple, but Ek Ong Kar: One in Essence."
      </div>

      <h3>Ek Ong Kar: Unity in Multiplicity</h3>

      <p>In the Sikh tradition, the phrase <em>Ek Ong Kar</em> means "One in Essence"—a statement that recognizes the fundamental unity underlying all apparent multiplicity. Unfolding, when understood from this perspective, is not a denial of unity, but a stage in the process of recognizing it more deeply.</p>

      <p>The multiple versions of being—the one who meditates and the one who forgets, the one who maintains discipline and the one who disperses—are not separate entities that must be eliminated or forcibly unified. They are expressions of the same fundamental essence, manifesting at different moments, under different conditions, with different levels of clarity. Spiritual practice does not seek to eliminate this multiplicity, but to recognize the unity that sustains it.</p>

      <p>When ojas is restored, when Prana Vata is balanced, when the gunas align toward sattva, the experience of unfolding transforms. It is no longer a fragmentation that causes anguish, but an expansion of observational capacity that allows the individual to recognize the essential unity underlying all apparent divisions.</p>

      <h3>Clinical Implications</h3>

      <p>For the Western medicine professional open to integrative perspectives, this understanding of unfolding offers a complementary framework for working with patients experiencing identity fragmentation. This is not about replacing psychiatric diagnoses when they are appropriate, but about recognizing that certain experiences of internal multiplicity may have both neurological and spiritual dimensions.</p>

      <p>A patient who describes encountering alternate versions of themselves may be experiencing, simultaneously, a measurable neurological process and a spiritual self-knowledge process. The appropriate clinical response may include both standard medical interventions—when necessary—and recognition and support for practices that restore ojas and balance Prana Vata: regular routines, breathing practices, devotional singing, structured meditation.</p>

      <p>The key lies in not prematurely pathologizing experiences that, though intense and sometimes disorienting, may be part of a growth and reorganization process. At the same time, it is crucial to recognize when fragmentation exceeds the limits of what can be integrated through spiritual practices alone and requires professional medical or psychological intervention.</p>

      <h3>Conclusion: The Soul's Call</h3>

      <p>Unfolding, then, is not necessarily a crisis that must be resolved through the elimination of multiplicity. It is, rather, the soul's call to remember its true nature. When the consciousness system begins to expand beyond the limitations of a rigid identity, the initial fragmentation is often the price of this expansion—a period of reorganization during which previous structures dissolve to allow the emergence of something broader and more integrated.</p>

      <p>Sustained spiritual practice—daily Nitnem that anchors Prana Vata, shabad singing that restores ojas, meditation that balances the gunas—provides the necessary container for this process to occur safely and transformatively. It does not eliminate the multiple dimensions of being, but integrates them into a deeper unity, allowing the individual to recognize that, in essence, they are Ek Ong Kar: One, manifesting in multiple forms, but always One in Essence.</p>

      <p>For the medical professional, recognizing this dimension of unfolding does not require abandoning scientific rigor or diagnostic precision. It requires, simply, maintaining an openness to the possibility that certain fragmentation experiences may be, simultaneously, measurable neurological processes and expressions of a deeper spiritual journey—a journey that, when properly supported, can lead to more complete integration and a deeper understanding of the nature of identity and consciousness.</p>
    `
  },
  {
    id: 11,
    type: 'Casual',
    title: 'The Water Moon Elixir: Where Ayurvedic Wisdom Meets Modern Physiology',
    date: '2026-01-31',
    excerpt: 'A cucumber, lemon, and black pepper infusion—Jal Chandra Ras—and how its traditional applications find unexpected resonance in modern biomedical understanding.',
    coverImage: 'assets/06.jpg',
    readTime: 18,
    content: `
      <p><em>By Kirtan Teg Singh</em></p>
      <div class="post-video-wrap">
        <iframe width="280" height="158" src="https://www.youtube.com/embed/WalR5GNvZIY?si=7frzsPbc4nuhW6vc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <p>In an era of genomic sequencing and functional MRI scans, a quiet revolution is unfolding within integrative medicine: the recognition that systems of healing developed millennia before the stethoscope hold profound relevance for contemporary wellness. Among these ancient frameworks, Ayurveda—India's 5,000-year-old science of life—offers not superstition, but sophisticated observation of human physiology through the lens of elemental balance, circadian rhythm, and subtle energy flow. Today, we examine a simple yet profound preparation known in yogic circles as "Jal Chandra Ras" or Water Moon Elixir—a cucumber, lemon, and black pepper infusion—and explore how its traditional applications find unexpected resonance in modern biomedical understanding.</p>

      <h3>Beyond the 500-Year Myth: Ayurveda's Temporal Depth</h3>
      <p>Before addressing the elixir itself, a necessary correction: Ayurveda's documented lineage spans approximately five millennia, with foundational texts like the Charaka Samhita (circa 300 BCE) systematizing knowledge transmitted orally for centuries prior. This temporal depth matters profoundly. While 20th-century medicine developed powerful tools to measure physiological phenomena—blood pressure, hormone levels, neural firing—Ayurvedic physicians cultivated an equally rigorous methodology: sustained observation of thousands of individuals across lifetimes, climates, and constitutional types. They lacked microscopes but possessed something equally valuable: time. Five thousand years of clinical iteration represents a dataset no single randomized controlled trial can replicate. The wisdom embedded in Ayurvedic formulations emerges not from technological measurement, but from pattern recognition across generations—a form of longitudinal research impossible to replicate in our era of fragmented healthcare.</p>

      <h3>The Elixir's Triad: Biochemical and Energetic Synergy</h3>
      <p><strong>Ingredient One: Cucumber (Cucumis sativus) — The Hydration Matrix</strong></p>
      <p>Western physiology recognizes cucumber as 95% water with notable silica content—a trace mineral critical for connective tissue integrity and vascular elasticity. Its potassium-to-sodium ratio supports cellular hydration without triggering fluid retention. But Ayurveda perceives deeper layers: cucumber (<em>Kshira</em>) embodies <em>shitala virya</em> (cooling potency), specifically pacifying <em>Pitta dosha</em>—the metabolic fire governing enzymatic activity, inflammation, and neural excitation. Modern correlates emerge in research on dietary nitrates: cucumber's nitrate content converts to nitric oxide in the endothelium, promoting vasodilation and reducing sympathetic nervous system arousal. This biochemical pathway mirrors Ayurveda's description of cucumber "cooling the blood" and calming <em>ranjaka Pitta</em> (hepatic fire). For the Kundalini practitioner, this cooling effect proves essential: intense pranayama generates metabolic heat that, without balancing <em>shitala</em> agents, may manifest as irritability, insomnia, or inflammatory responses—what Ayurveda terms <em>Pitta vitiation</em>.</p>

      <p><strong>Ingredient Two: Lemon (Citrus limon) — The Alkalizing Paradox</strong></p>
      <p>Western nutrition initially mischaracterized lemon as acid-forming due to its citric acid content. Contemporary understanding reveals its metabolic fate: once metabolized, lemon yields alkaline ash rich in potassium citrate, supporting urinary pH balance and reducing calcium oxalate stone formation. Ayurveda classifies lemon (<em>Jambira</em>) as <em>ushna virya</em> (heating) yet <em>madhura vipaka</em> (sweet post-digestive effect)—a seeming contradiction resolved through temporal observation. The initial pungency stimulates <em>agni</em> (digestive fire), while its ultimate effect nourishes <em>rasa dhatu</em> (plasma tissue). Crucially, lemon's vitamin C enhances non-heme iron absorption—a function aligning with Ayurveda's description of lemon "carrying nutrients to the tissues." For spiritual practitioners, this matters profoundly: vitamin C is a cofactor in catecholamine synthesis (dopamine, norepinephrine), neurotransmitters modulated during meditation. Lemon doesn't "create" spiritual states but supports the neurochemical substrate through which heightened awareness manifests.</p>

      <p><strong>Ingredient Three: Black Pepper (Piper nigrum) — The Bioenhancer Principle</strong></p>
      <p>Here, East and West converge most dramatically. Ayurveda designates black pepper (<em>Maricha</em>) as <em>yogavahi</em>—"the vehicle that carries medicine to its destination." Modern pharmacology validates this through piperine, pepper's active alkaloid, which inhibits hepatic glucuronidation—slowing the liver's deactivation of compounds and increasing systemic bioavailability by up to 2,000% for certain nutrients. This isn't mystical thinking; it's enzymatic kinetics. When added to the cucumber-lemon base, pepper transforms a hydrating beverage into a delivery system: enhancing absorption of lemon's flavonoids and cucumber's silica while stimulating <em>agni</em> without aggravating <em>Pitta</em> (unlike chili peppers). For the practitioner, this represents Ayurveda's core insight: healing requires not just correct substances, but correct delivery. Without <em>yogavahi</em>, even potent herbs remain superficial—much like pharmaceuticals with poor bioavailability.</p>

      <h3>The Integration Point: Nervous System as Convergence Zone</h3>
      <p>Where does spiritual practice interface with physiology? The autonomic nervous system provides the bridge. Kundalini yoga's breath techniques intentionally activate the sympathetic nervous system (via rapid diaphragmatic pumping), followed by parasympathetic rebound during meditation—a cycle generating neuroplasticity. But this practice demands physiological support:</p>
      <ul>
        <li>Cucumber's electrolyte profile stabilizes neuronal membrane potential during sympathetic activation</li>
        <li>Lemon's flavonoids (hesperidin, diosmin) protect vascular endothelium from oxidative stress induced by breath retention</li>
        <li>Pepper's piperine modulates serotonin and dopamine reuptake—neurotransmitters fluctuating during extended meditation</li>
      </ul>
      <p>Ayurveda describes this through <em>ida</em> (lunar/parasympathetic) and <em>pingala</em> (solar/sympathetic) nadis—energy channels whose balance determines spiritual progress. Modern neuroscience maps these to vagal tone and locus coeruleus activity. The Water Moon Elixir doesn't "activate Kundalini"—a dangerous oversimplification—but creates physiological conditions where the nervous system can safely navigate intense energetic practices without decompensation. This is preventive medicine: supporting <em>ojas</em> (vital essence) before depletion occurs.</p>

      <h3>Responsible Integration: Ethics of Ancient Wisdom in Modern Practice</h3>
      <p>Integrating Ayurveda requires discernment, not dogma. Three principles guide ethical application:</p>
      <ol>
        <li><strong>Complementarity, Not Replacement</strong>: This elixir supports hydration and nutrient absorption but doesn't replace treatment for clinical dehydration, electrolyte disorders, or inflammatory conditions. Ayurveda itself prescribes <em>shodhana</em> (purification therapies) under supervision for pathological states—never self-administered extremes.</li>
        <li><strong>Contraindication Awareness</strong>: Lemon may aggravate gastric ulcers; pepper contraindicated in hyperacidity; cucumber's diuretic effect requires caution in hypotension. Ayurvedic wisdom includes knowing when <em>not</em> to use a remedy—a nuance often lost in wellness commodification.</li>
        <li><strong>Cultural Humility</strong>: Ayurveda emerged within Dharmic philosophy where food is <em>prasad</em> (sacred offering). Reducing it to "biohacks" severs remedies from their ethical framework. The true power of Jal Chandra Ras lies not in chemical constituents alone, but in consuming it with <em>sattvic bhavana</em> (pure intention)—a variable no spectrometer measures, yet profoundly impacts psychoneuroimmunology.</li>
      </ol>

      <h3>Conclusion: The Future is Integrative</h3>
      <p>The Water Moon Elixir exemplifies what integrative medicine must become: not cherry-picking "exotic" ingredients, but understanding <em>why</em> traditional systems paired specific elements. Ayurveda's 5,000-year observation revealed that cooling agents require catalytic fire (pepper) to avoid <em>ama</em> (toxic stagnation)—a principle now validated by pharmacokinetics. Western medicine excels at acute intervention; Ayurveda at constitutional maintenance. Neither holds monopoly on truth.</p>
      <p>As we advance technologically, we must also advance temporally—honoring knowledge systems refined across centuries of human observation. The cucumber in your glass carries not just silica and water, but the distilled wisdom of physicians who understood that true healing occurs when biochemistry, rhythm, and consciousness align. That is not mysticism. It is medicine matured by time—a resource no laboratory can manufacture, but every practitioner can learn to honor.</p>
    `
  }
];

// Helper function to get latest entries
export function getLatestEntries(limit = 3) {
  return [...getVisibleEntries()]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

// Helper function to get entries by type
export function getEntriesByType(type) {
  const visible = getVisibleEntries();
  if (type === 'All') return visible;
  return visible.filter(entry => entry.type === type);
}

// Helper function to get an entry by ID
export function getEntryById(id) {
  return getVisibleEntries().find(entry => entry.id === parseInt(id));
}

