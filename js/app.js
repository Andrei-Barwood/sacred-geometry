// Alpine.js App State and Functions
// Dynamic Spiritual Portal

import { getLatestEntries, getEntriesByType, getEntryById } from './blog-data.js';
import { addComment, subscribeToComments, getAvatarColor, getInitials, formatRelativeTime } from './firebase.js';
import { cloudPhrases } from './cloud-phrases.js';

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
    
    filterPosts(type) {
      this.selectedFilter = type;
      this.filteredPosts = getEntriesByType(type === 'All' ? 'All' : type);
    },
    
    viewPost(postId) {
      const post = getEntryById(postId);
      if (post) {
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
              text: 'As a physician with 47 years of experience and 12 board-certified specialties, I must point out that this article lacks evidence based on randomized, double-blind, placebo-controlled trials. Where are the laboratory data demonstrating the existence of \'ojas\'? Has anyone measured \'gunas\' with a mass spectrometer? Until I see a Cochrane meta-analysis on the efficacy of \'Prana Vata\' in identity fragmentation, this is pseudoscience. Furthermore, why don\'t they mention the adverse effects of Nitnem? Can it cause tachycardia? Drug interactions? I need to see the package insert.',
              timestamp: now - 86400000 * 3, // 3 days ago
              createdAt: now - 86400000 * 3,
              isSatirical: true
            },
            {
              id: 'satirical-2',
              name: 'Dr. Mitchell, Board-Certified Neurologist',
              text: 'This is dangerous. As a neurologist, I\'ve seen patients who believed in \'parallel realities\' and ended up in the emergency department. The \'unfolding\' you describe sounds exactly like an unspecified dissociative disorder (F44.9) according to the DSM-5. Where is the warning that these patients need immediate psychiatric evaluation? And what about contraindications? Can someone with epilepsy perform \'breath of fire\'? This should come with an FDA warning label. I need to see Phase I, II, and III safety studies before recommending this to my patients.',
              timestamp: now - 86400000 * 2, // 2 days ago
              createdAt: now - 86400000 * 2,
              isSatirical: true
            },
            {
              id: 'satirical-3',
              name: 'Dr. Thompson, Internal Medicine & Evidence-Based Medicine Enthusiast',
              text: 'As an internist who only believes in what can be measured with a stethoscope or laboratory tests, I must object. This article mentions \'ojas\' but does not provide normal reference values. What is the normal range of ojas in serum? Is it measured in mg/dL or international units? And regarding \'Prana Vata\'—is there any biomarker? CRP? Procalcitonin? Without quantifiable data, this is philosophy, not medicine. Furthermore, where is the informed consent for these practices? Have patients signed a form explaining the risks of \'unfolding\'?',
              timestamp: now - 86400000 * 2, // 2 days ago
              createdAt: now - 86400000 * 2,
              isSatirical: true
            },
            {
              id: 'satirical-4',
              name: 'Dr. Rodriguez, Emergency Medicine & Skeptic',
              text: 'In the emergency department, when a patient arrives saying they have \'multiple versions of themselves,\' I don\'t prescribe shabad singing—I order a head CT and evaluate for intoxication. This article omits organic causes: brain tumor, encephalitis, Cushing\'s syndrome, severe hypoglycemia. Have you considered that \'unfolding\' might simply be hyponatremia? I need to see sodium levels before discussing \'samskaras.\' And another thing: what is the therapeutic dose of \'kirtan\'? How many milligrams of mantra per kilogram of body weight? Without pharmacokinetics, this is not medicine.',
              timestamp: now - 86400000 * 1, // 1 day ago
              createdAt: now - 86400000 * 1,
              isSatirical: true
            },
            {
              id: 'satirical-5',
              name: 'Dr. Chen, Cardiologist & Data-Driven Physician',
              text: 'As a cardiologist, I\'m concerned about the cardiovascular safety of these practices. Have you measured blood pressure during \'breath of fire\'? What about hypertensive patients? And the risk of arrhythmias? I need to see a 24-hour Holter monitor before and after these practices. Furthermore, you mention \'ojas\' but don\'t specify if it affects the lipid profile. Does it increase LDL cholesterol? Does it improve endothelial function? Without echocardiography and cardiac catheterization data, I cannot recommend this. Where is the multicenter randomized study with a primary endpoint of major cardiovascular events?',
              timestamp: now - 3600000, // 1 hour ago
              createdAt: now - 3600000,
              isSatirical: true
            },
            {
              id: 'satirical-6',
              name: 'Dr. Sarah Martinez, MD, Family Medicine (56)',
              text: 'After 30 years in practice and raising three children, I\'ve learned that medicine requires both rigor and wisdom. Reading these comments, I see what each colleague missed: Dr. Harrison demands RCTs for ojas, but overlooks that Ayurveda\'s ojas corresponds to what we call "allostatic load" and "resilience markers"—measurable through cortisol, DHEA, and HRV. Dr. Mitchell sees only pathology, missing that Prana Vata imbalance maps to our understanding of autonomic dysregulation and HPA axis dysfunction—conditions we treat with breathwork and meditation (now with Level 1 evidence). Dr. Thompson wants serum ojas levels, yet ignores that gunas (sattva/rajas/tamas) parallel our neuroendocrine states: parasympathetic dominance, sympathetic overdrive, and metabolic depression—all quantifiable. Dr. Rodriguez jumps to organic causes but misses that "unfolding" describes the neuroplastic reorganization we see in trauma recovery and meditation practitioners—documented in fMRI studies. Dr. Chen worries about cardiovascular safety, yet breathwork protocols (similar to pranayama) are standard in cardiac rehabilitation. The article bridges ancient wisdom with modern science beautifully. Perhaps we need less skepticism and more curiosity about how these traditions understood the mind-body connection centuries before we had the tools to measure it.',
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
    maxChars: 500,
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
      return this.charCount >= 450;
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
        alert('Error sending comment. Please try again.');
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

