// Alpine.js App State and Functions
// Dynamic Spiritual Portal

import { getLatestEntries, getEntriesByType, getEntryById } from './blog-data.js';
import { addComment, subscribeToComments, getAvatarColor, getInitials, formatRelativeTime } from './firebase.js';
import { cloudPhrases } from './cloud-phrases.js';
import {
  hasCoverAnimation,
  mountCoverAnimation as mountP5CoverAnimation,
  unmountCoverAnimation as unmountP5CoverAnimation,
  mountInlineAnimation as mountP5InlineAnimation,
  unmountInlineAnimation as unmountP5InlineAnimation
} from './cover-animations.js';

function registerAppStore() {
  // If Alpine isn't ready yet, bail (we'll be called again on alpine:init)
  if (!window.Alpine || typeof window.Alpine.store !== 'function') return false;

  // Avoid double-registration (can happen if we call on alpine:init + immediate path)
  const existing = window.Alpine.store('app');
  if (existing && existing.__placeholder !== true) return true;

  window.Alpine.store('app', {
    // Navigation
    mobileMenuOpen: false,
    
    // Theme
    darkMode: localStorage.getItem('darkMode') === 'true' || false,
    
    // Blog State
    currentView: 'list', // 'list' or 'detail'
    selectedPost: null,
    selectedFilter: 'All',
    filteredPosts: getEntriesByType('All'),
    
    // Comments
    comments: {},
    commentLoading: {},
    
    // Cloud reflection
    cloudPhrase: null,
    cloudPhraseDate: null,
    cloudPhraseCheckInterval: null,
    
    // Latest entries for home page
    latestEntries: [],

    // Inline p5.js post animations
    inlineAnimationHosts: new Set(),
    
    // Methods
    init() {
      // Apply dark mode on load
      this.applyDarkMode();
      
      // Initialize blog filter
      this.filterPosts('All');
      
      // Load latest entries for home page
      this.latestEntries = getLatestEntries(3);
      
      // Auto-load daily cloud phrase
      this.getDailyCloudPhrase();
      
      // Set up periodic check for phrase updates (every minute)
      this.startCloudPhraseCheck();
    },
    
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode);
      this.applyDarkMode();
    },
    
    applyDarkMode() {
      if (this.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    },

    hasAnimatedCover(post) {
      return hasCoverAnimation(post);
    },

    mountCoverAnimation(el, post) {
      if (!this.hasAnimatedCover(post)) return;
      mountP5CoverAnimation(el, post.coverAnimation);
    },

    unmountCoverAnimation(el) {
      unmountP5CoverAnimation(el);
    },

    cleanupInlineAnimations() {
      if (!(this.inlineAnimationHosts instanceof Set)) {
        this.inlineAnimationHosts = new Set();
      }

      this.inlineAnimationHosts.forEach((host) => {
        unmountP5InlineAnimation(host);
      });
      this.inlineAnimationHosts.clear();
    },

    hydratePostContent(rootEl) {
      if (!rootEl) return;
      if (this.currentView !== 'detail' || !this.selectedPost) {
        this.cleanupInlineAnimations();
        return;
      }

      if (!(this.inlineAnimationHosts instanceof Set)) {
        this.inlineAnimationHosts = new Set();
      }

      const mountFrames = () => {
        if (!rootEl.isConnected || this.currentView !== 'detail' || !this.selectedPost) return;

        const frames = Array.from(rootEl.querySelectorAll('[data-inline-animation]'));
        const liveHosts = new Set(frames);

        Array.from(this.inlineAnimationHosts).forEach((host) => {
          if (!liveHosts.has(host)) {
            unmountP5InlineAnimation(host);
            this.inlineAnimationHosts.delete(host);
          }
        });

        frames.forEach((frame) => {
          const animationName = frame.dataset.inlineAnimation;
          if (!animationName) return;

          this.inlineAnimationHosts.add(frame);
          mountP5InlineAnimation(frame, animationName);
        });
      };

      if (window.Alpine && typeof window.Alpine.nextTick === 'function') {
        window.Alpine.nextTick(() => requestAnimationFrame(mountFrames));
        return;
      }

      setTimeout(mountFrames, 0);
    },
    
    filterPosts(type) {
      this.selectedFilter = type;
      this.filteredPosts = getEntriesByType(type === 'All' ? 'All' : type);
    },
    
    viewPost(postId) {
      const post = getEntryById(postId);
      if (post) {
        this.cleanupInlineAnimations();
        this.selectedPost = post;
        this.currentView = 'detail';
        
        // Load comments for this post
        this.loadComments(postId);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update URL without reload
        window.history.pushState({ postId }, '', `?post=${postId}`);
      }
    },
    
    backToList() {
      this.cleanupInlineAnimations();
      this.currentView = 'list';
      this.selectedPost = null;
      window.history.pushState({}, '', 'blog.html');
    },
    
    loadComments(postId) {
      if (!this.comments[postId]) {
        this.comments[postId] = [];
      }
      
      this.commentLoading[postId] = true;
      
      // Predefined satirical comments for post 10 (Unfolding)
      const getSatiricalComments = () => {
        if (postId === 10) {
          const now = Date.now();
          return [
            {
              id: 'satirical-1',
              name: 'Dr. Harrison, MD, PhD, FACS, FACP, FRSM',
              text: 'Como médico con 47 años de experiencia y 12 especialidades certificadas, debo señalar que este artículo carece de evidencia basada en ensayos aleatorizados, doble ciego y controlados por placebo. ¿Dónde están los datos de laboratorio que demuestran la existencia de \'ojas\'? ¿Alguien ha medido las \'gunas\' con un espectrómetro de masas? Hasta que no vea un metaanálisis de Cochrane sobre la eficacia del \'Prana Vata\' en la fragmentación de la identidad, esto es pseudociencia. Además, ¿por qué no mencionan los efectos adversos del Nitnem? ¿Puede causar taquicardia? ¿Interacciones con medicamentos? Necesito ver el prospecto.',
              timestamp: now - 86400000 * 3, // 3 days ago
              createdAt: now - 86400000 * 3,
              isSatirical: true
            },
            {
              id: 'satirical-2',
              name: 'Dr. Mitchell, Board-Certified Neurologist',
              text: 'Esto es peligroso. Como neurólogo, he visto pacientes que creían en \'realidades paralelas\' y terminaron en el departamento de emergencias. El \'desdoblamiento\' que describe suena exactamente como un trastorno disociativo no especificado (F44.9) según el DSM-5. ¿Dónde está la advertencia de que estos pacientes necesitan evaluación psiquiátrica inmediata? ¿Y qué hay de las contraindicaciones? ¿Puede alguien con epilepsia realizar la \'respiración de fuego\'? Esto debería venir con una etiqueta de advertencia de la FDA. Necesito ver estudios de seguridad de Fase I, II y III antes de recomendar esto a mis pacientes.',
              timestamp: now - 86400000 * 2, // 2 days ago
              createdAt: now - 86400000 * 2,
              isSatirical: true
            },
            {
              id: 'satirical-3',
              name: 'Dr. Thompson, Internal Medicine & Evidence-Based Medicine Enthusiast',
              text: 'Como internista que solo cree en lo que puede medirse con un estetoscopio o pruebas de laboratorio, debo objetar. Este artículo menciona \'ojas\' pero no proporciona valores de referencia normales. ¿Cuál es el rango normal de ojas en suero? ¿Se mide en mg/dL o unidades internacionales? Y con respecto a \'Prana Vata\', ¿existe algún biomarcador? ¿PCR? ¿Procalcitonina? Sin datos cuantificables, esto es filosofía, no medicina. Además, ¿dónde está el consentimiento informado para estas prácticas? ¿Han firmado los pacientes un formulario explicando los riesgos del \'desdoblamiento\'?',
              timestamp: now - 86400000 * 2, // 2 days ago
              createdAt: now - 86400000 * 2,
              isSatirical: true
            },
            {
              id: 'satirical-4',
              name: 'Dr. Rodriguez, Emergency Medicine & Skeptic',
              text: 'En el departamento de emergencias, cuando llega un paciente diciendo que tiene \'múltiples versiones de sí mismo\', no prescribo el canto de shabad: ordeno una tomografía computarizada de la cabeza y evalúo si hay intoxicación. Este artículo omite causas orgánicas: tumor cerebral, encefalitis, síndrome de Cushing, hipoglucemia severa. ¿Has considerado que el \'desdoblamiento\' podría ser simplemente hiponatremia? Necesito ver los niveles de sodio antes de discutir los \'samskaras\'. Y otra cosa: ¿cuál es la dosis terapéutica de \'kirtan\'? ¿Cuántos miligramos de mantra por kilogramo de peso corporal? Sin farmacocinética, esto no es medicina.',
              timestamp: now - 86400000 * 1, // 1 day ago
              createdAt: now - 86400000 * 1,
              isSatirical: true
            },
            {
              id: 'satirical-5',
              name: 'Dr. Chen, Cardiologist & Data-Driven Physician',
              text: 'Como cardiólogo, me preocupa la seguridad cardiovascular de estas prácticas. ¿Han medido la presión arterial durante la \'respiración de fuego\'? ¿Qué pasa con los pacientes hipertensos? ¿Y el riesgo de arritmias? Necesito ver un monitor Holter de 24 horas antes y después de estas prácticas. Además, menciona \'ojas\' pero no especifica si afecta el perfil lipídico. ¿Aumenta el colesterol LDL? ¿Mejora la función endotelial? Sin datos de ecocardiografía y cateterismo cardíaco, no puedo recomendar esto. ¿Dónde está el estudio aleatorizado multicéntrico con un criterio de valoración principal de eventos cardiovasculares adversos mayores?',
              timestamp: now - 3600000, // 1 hour ago
              createdAt: now - 3600000,
              isSatirical: true
            },
            {
              id: 'satirical-6',
              name: 'Dr. Sarah Martinez, MD, Family Medicine (56)',
              text: 'Después de 30 años de práctica y de criar a tres hijos, he aprendido que la medicina requiere tanto rigor como sabiduría. Al leer estos comentarios, veo lo que cada colega pasó por alto: el Dr. Harrison exige ensayos controlados aleatorizados para el ojas, pero ignora que el ojas del Ayurveda corresponde a lo que llamamos "carga alostática" y "marcadores de resiliencia", medibles a través del cortisol, la DHEA y la VFC. El Dr. Mitchell solo ve patología, ignorando que el desequilibrio de Prana Vata corresponde a nuestra comprensión de la desregulación autonómica y la disfunción del eje HPA, condiciones que tratamos con trabajo de respiración y meditación (ahora con evidencia de Nivel 1). El Dr. Thompson quiere niveles séricos de ojas, pero ignora que las gunas (sattva/rajas/tamas) son paralelas a nuestros estados neuroendocrinos: dominancia parasimpática, sobrecarga simpática y depresión metabólica, todos cuantificables. El Dr. Rodriguez salta a causas orgánicas pero no se da cuenta de que el "desdoblamiento" describe la reorganización neuroplástica que vemos en la recuperación del trauma y en practicantes de meditación, documentada en estudios de fMRI. Al Dr. Chen le preocupa la seguridad cardiovascular, sin embargo, los protocolos de trabajo de respiración (similares al pranayama) son estándar en la rehabilitación cardíaca. El artículo tiende un puente maravillosamente entre la sabiduría antigua y la ciencia moderna. Quizás necesitemos menos escepticismo y más curiosidad sobre cómo estas tradiciones entendieron la conexión mente-cuerpo siglos antes de que tuviéramos las herramientas para medirla.',
              timestamp: now - 1800000, // 30 minutes ago (most recent)
              createdAt: now - 1800000,
              isSatirical: true
            }
          ];
        }
        return [];
      };
      
      // Subscribe to real-time comments
      const unsubscribe = subscribeToComments(postId.toString(), (firebaseComments) => {
        // Combine satirical comments with Firebase comments
        const satiricalComments = getSatiricalComments();
        const allComments = [...satiricalComments, ...firebaseComments];
        
        // Sort by timestamp (newest first)
        allComments.sort((a, b) => (b.timestamp || b.createdAt || 0) - (a.timestamp || a.createdAt || 0));
        
        this.comments[postId] = allComments;
        this.commentLoading[postId] = false;
      });
      
      // Store unsubscribe function for cleanup
      if (!this.unsubscribers) {
        this.unsubscribers = {};
      }
      if (this.unsubscribers[postId]) {
        this.unsubscribers[postId]();
      }
      this.unsubscribers[postId] = unsubscribe;
    },
    
    async submitComment(postId, formData) {
      try {
        await addComment(postId.toString(), {
          name: formData.name || 'Anonymous',
          text: formData.text
        });
        
        // Clear form
        return { success: true };
      } catch (error) {
        console.error('Error sending comment:', error);
        return { success: false, error: error.message };
      }
    },
    
    // Helper: Get the active date based on local time (before 12:30 PM = yesterday, after = today)
    getLocalActiveDate() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // If before 12:30 PM, use yesterday's date
      if (hours < 12 || (hours === 12 && minutes < 30)) {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
      }
      
      // Otherwise use today's date
      return now;
    },
    
    // Helper: Format date as YYYY-MM-DD string
    formatDateString(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    
    // Helper: Hash a date string to get a deterministic number
    hashDate(dateString) {
      let hash = 0;
      for (let i = 0; i < dateString.length; i++) {
        hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    },
    
    // Get daily cloud phrase based on local active date
    getDailyCloudPhrase() {
      const activeDate = this.getLocalActiveDate();
      const dateString = this.formatDateString(activeDate);
      
      // Check if we already have the phrase for this date
      if (this.cloudPhraseDate === dateString && this.cloudPhrase) {
        return; // Already showing the correct phrase
      }
      
      // Hash the date to get a deterministic index
      const hash = this.hashDate(dateString);
      const phraseIndex = hash % cloudPhrases.length;
      
      // Set the phrase and date
      this.cloudPhrase = cloudPhrases[phraseIndex];
      this.cloudPhraseDate = dateString;
    },
    
    // Start periodic check for phrase updates
    startCloudPhraseCheck() {
      // Clear any existing interval
      if (this.cloudPhraseCheckInterval) {
        clearInterval(this.cloudPhraseCheckInterval);
      }
      
      // Check every minute if the phrase needs to update
      this.cloudPhraseCheckInterval = setInterval(() => {
        const activeDate = this.getLocalActiveDate();
        const currentDateString = this.formatDateString(activeDate);
        
        // If the active date changed, update the phrase
        if (this.cloudPhraseDate !== currentDateString) {
          this.getDailyCloudPhrase();
        }
      }, 60000); // Check every 60 seconds (1 minute)
    },
    
    // Original method - now checks date and refreshes if needed
    getCloudPhrase() {
      // Check if we need to update based on current time
      this.getDailyCloudPhrase();
    }
  });
  
  // Helper functions for templates
  // Also expose as a global function so x-data="commentForm(...)" works even if Alpine.data timing changes.
  window.commentForm = (postId) => ({
    name: '',
    text: '',
    charCount: 0,
    maxChars: 2000,
    submitting: false,
    
    init() {
      this.$watch('text', (value) => {
        this.charCount = value.length;
      });
    },
    
    get canSubmit() {
      const hasName = this.name.trim().length > 0;
      const hasValidText = this.text.trim().length > 0 && 
                          this.text.length <= this.maxChars;
      
      return hasValidText && !this.submitting;
      // Name can be empty
    },
    
    get isWarning() {
      return this.charCount >= 1900;
    },
    
    async handleSubmit() {
      if (!this.canSubmit) return;
      
      this.submitting = true;
      const result = await Alpine.store('app').submitComment(postId, {
        name: this.name.trim(),
        text: this.text.trim()
      });
      
      if (result.success) {
        this.name = '';
        this.text = '';
        this.charCount = 0;
      } else {
        alert('Error al enviar el comentario. Por favor, inténtalo de nuevo.');
      }
      
      this.submitting = false;
    }
  });

  // Run init once the DOM exists; many pages also call init() from <body x-init="...">.
  // This makes the app resilient to script ordering where x-init might run too early.
  try {
    queueMicrotask(() => {
      const app = window.Alpine?.store?.('app');
      if (app && !app.__initialized) {
        app.__initialized = true;
        app.init();
      }
    });
  } catch (_) {
    // noop
  }

  return true;
}

// Alpine.js Store Global (works whether this file loads before or after Alpine)
document.addEventListener('alpine:init', registerAppStore);
registerAppStore();

// Header scroll effect
window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    });
  }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
  const app = window.Alpine?.store?.('app');
  if (!app) return;
  if (e.state && e.state.postId) {
    app.viewPost(e.state.postId);
  } else {
    app.backToList();
  }
});

// Check for post ID in URL on load
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('post');
  if (postId) {
    const app = window.Alpine?.store?.('app');
    if (app) {
      app.viewPost(parseInt(postId));
    } else {
      // In case Alpine/store isn't ready yet, retry shortly.
      setTimeout(() => window.Alpine?.store?.('app')?.viewPost(parseInt(postId)), 50);
    }
  }
});

// Cleanup interval on page unload
window.addEventListener('beforeunload', () => {
  const app = window.Alpine?.store?.('app');
  if (app) {
    app.cleanupInlineAnimations?.();
  }
  if (app && app.cloudPhraseCheckInterval) {
    clearInterval(app.cloudPhraseCheckInterval);
  }
});

// Disable right-click and view-source / DevTools shortcuts site-wide
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
  const ctrl = e.ctrlKey || e.metaKey;
  const shift = e.shiftKey;
  const u = e.key === 'u' || e.key === 'U';
  const i = e.key === 'i' || e.key === 'I';
  const j = e.key === 'j' || e.key === 'J';
  const c = e.key === 'c' || e.key === 'C';
  const f12 = e.key === 'F12';

  if (f12) {
    e.preventDefault();
    return false;
  }
  if (ctrl && u) {
    e.preventDefault();
    return false;
  }
  if (ctrl && shift && (i || j || c)) {
    e.preventDefault();
    return false;
  }
});

// Export helpers for use in templates
window.getAvatarColor = getAvatarColor;
window.getInitials = getInitials;
window.formatRelativeTime = formatRelativeTime;
window.getEntryById = getEntryById;
