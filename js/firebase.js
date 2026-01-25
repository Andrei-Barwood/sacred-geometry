// Firebase Configuration - Placeholders
// IMPORTANT: Replace all values with your real Firebase configuration

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, Timestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// ⚠️ CONFIGURATION: Replace these values with your real Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAumycxwZ-DwoP6EXrcGaTXib2Bwnmglxo",
  authDomain: "sacred-geometry-5d1b7.firebaseapp.com",
  projectId: "sacred-geometry-5d1b7",
  storageBucket: "sacred-geometry-5d1b7.firebasestorage.app",
  messagingSenderId: "159857462257",
  appId: "1:159857462257:web:3971efd68061309d769250"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.warn('Error initializing Firebase. Make sure to replace the placeholders with your real configuration.', error);
}

/**
 * Add a comment to a post
 * @param {string} postId - Post ID
 * @param {Object} data - Comment data { name, text }
 * @returns {Promise<string>} - Created comment ID
 */
export async function addComment(postId, data) {
  if (!db) {
    throw new Error('Firebase is not initialized. Check your configuration.');
  }

  try {
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const commentData = {
      name: data.name || 'Anonymous',
      text: data.text,
      timestamp: Timestamp.now(),
      createdAt: Date.now()
    };
    
    const docRef = await addDoc(commentsRef, commentData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

/**
 * Subscribe to post comments in real time
 * @param {string} postId - Post ID
 * @param {Function} callback - Runs when changes occur (receives comments array)
 * @returns {Function} - Unsubscribe function
 */
export function subscribeToComments(postId, callback) {
  if (!db) {
    console.warn('Firebase is not initialized. Comments will not load.');
    callback([]);
    return () => {}; // Return empty unsubscribe function
  }

  try {
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentsRef, orderBy('timestamp', 'desc'), limit(50));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comments = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        comments.push({
          id: doc.id,
          name: data.name || 'Anonymous',
          text: data.text,
          timestamp: data.timestamp?.toMillis() || data.createdAt || Date.now(),
          createdAt: data.createdAt || Date.now()
        });
      });
      callback(comments);
    }, (error) => {
        console.error('Error subscribing to comments:', error);
      callback([]);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up subscription:', error);
    callback([]);
    return () => {};
  }
}

/**
 * Helper to generate avatar color from name hash
 * @param {string} name - User name
 * @returns {string} - Hex color
 */
export function getAvatarColor(name) {
  if (!name || name === 'Anonymous') {
    return '#57C4DD'; // Default secondary color
  }
  
  // Generate simple hash from name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert hash to color (using site palette)
  const colors = [
    '#325394', // primary
    '#57C4DD', // secondary
    '#EA428B', // accent
    '#2D3558', // text-medium
    '#9C9AAD', // muted
  ];
  
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
}

/**
 * Helper to get initials from a name
 * @param {string} name - User name
 * @returns {string} - Initials (max 2 characters)
 */
export function getInitials(name) {
  if (!name || name === 'Anonymous') {
    return '?';
  }
  
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

/**
 * Helper to format relative time
 * @param {number} timestamp - Timestamp in milliseconds
 * @returns {string} - Formatted date (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) {
    return 'just now';
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (days < 7) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}

// Export instances for direct use if needed
export { app, db };

