# Complete Tutorial: Setup and Maintenance of the Spiritual Portal

## 📋 Index
1. [Firebase Setup](#firebase-setup)
2. [Create New Blog Entries](#create-new-blog-entries)
3. [Keep the Site Updated](#keep-the-site-updated)
4. [Troubleshooting](#troubleshooting)

---

## 🔥 Firebase Setup

### Step 1: Create a Project in Firebase Console

1. **Open Firebase Console**
   - Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Add project" or "Create a project"
   - Enter a name for your project (e.g., "minimalismo-espiritual")
   - Optional: Disable Google Analytics if you do not need it
   - Click "Create project"

3. **Wait for creation to complete**
   - This can take a few minutes

### Step 2: Set Up Firestore Database

1. **Enable Firestore**
   - In the left menu, go to "Firestore Database"
   - Click "Create database"
   
2. **Choose security mode**
   - Select "Test mode" for development
   - ⚠️ **IMPORTANT**: Later you will need real security rules for production
   - Choose a location (pick the closest to your users)

3. **Wait for the database to be created**

### Step 3: Configure Firestore Security Rules

1. **Open Rules**
   - In Firestore Database, go to the "Rules" tab

2. **Set basic rules for comments**
   Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public comments - open read, validated write
    match /posts/{postId}/comments/{commentId} {
      // Allow reads for everyone
      allow read: if true;
      
      // Allow writes for everyone (you can restrict this later)
      allow create: if request.resource.data.keys().hasAll(['name', 'text', 'timestamp', 'createdAt'])
                   && request.resource.data.text is string
                   && request.resource.data.text.size() <= 500
                   && request.resource.data.name is string
                   && request.resource.data.name.size() <= 100;
      
      // Do not allow updating or deleting comments
      allow update, delete: if false;
    }
  }
}
```

3. **Publish the rules**
   - Click "Publish"

### Step 4: Get Firebase Configuration

1. **Open Project Settings**
   - Click the gear icon ⚙️ next to "Project Overview"
   - Select "Project settings"

2. **Go to the web apps section**
   - Click the `</>` icon (Add app) to add a web app
   - Or if an app already exists, click it

3. **Register the app**
   - Enter a name (e.g., "Kirtan Teg Singh Web Portal")
   - Optional: Check "Also set up Firebase Hosting" if you plan to host
   - Click "Register app"

4. **Copy the configuration**
   - You'll see a `firebaseConfig` object with your credentials
   - It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop",
  measurementId: "G-XXXXXXXXXX"
};
```

### Step 5: Configure in the Project

1. **Open `js/firebase.js` in Cursor IDE**
   - Locate the file in your project

2. **Replace the placeholders**
   - Find the placeholder values in the config
   - Replace each value with the real data from your config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Your real API key
  authDomain: "your-project.firebaseapp.com", // Your real domain
  projectId: "your-project", // Your real Project ID
  storageBucket: "your-project.appspot.com", // Your Storage Bucket
  messagingSenderId: "123456789012", // Your Sender ID
  appId: "1:123456789012:web:abcdefghijklmnop", // Your App ID
  measurementId: "G-XXXXXXXXXX" // Your Measurement ID (optional)
};
```

3. **Save the file**

### Step 6: Test the Configuration

1. **Open the site locally**
   - Make sure you have a local server running (see "Serve the Site Locally")

2. **Test comments**
   - Go to any blog entry
   - Try leaving a comment
   - You should see it appear in real time
   - Check in Firebase Console → Firestore that the comment was saved

3. **Verify in Firebase Console**
   - Go to Firestore Database
   - You should see a `posts` collection with a document for each post
   - Each post has a `comments` subcollection

---

## ✍️ Create New Blog Entries

### Method 1: From Cursor IDE (Recommended)

#### Step 1: Open the data file

1. In Cursor IDE, navigate to `js/blog-data.js`
2. Open the file

#### Step 2: Understand the structure of an entry

Each entry is a JavaScript object with these properties:

```javascript
{
  id: 9,                    // Unique sequential number (next available)
  type: 'Reflection',       // Type: 'Interview', 'Review', 'Reflection', or 'Casual'
  title: 'Post Title',      // Engaging title
  date: '2026-01-20',       // Date in YYYY-MM-DD format
  excerpt: 'Short description...', // Short summary (appears in lists)
  coverImage: 'assets/placeholder.svg', // Image path
  readTime: 5,              // Estimated read time in minutes
  content: `                // HTML with full content
    <p>Your content here...</p>
    <!-- You can use full HTML -->
  `
}
```

#### Step 3: Create a new entry

**Example: New Reflection**

```javascript
{
  id: 9,
  type: 'Reflection',
  title: 'Gratitude as a Daily Practice',
  date: '2026-01-20',
  excerpt: 'Exploring how gratitude transforms our perspective and deepens our spiritual connection.',
  coverImage: 'assets/placeholder.svg',
  readTime: 6,
  content: `
    <p>Gratitude is not simply a passing emotion, but a profound spiritual practice that can completely transform our experience of life.</p>
    
    <div class="reflection-quote">
      "In gratitude, we find true abundance. It is not what we have, but how we perceive it that creates inner wealth."
    </div>
    
    <p>When we cultivate gratitude daily, we actively recognize the presence of the Divine in every aspect of our existence, no matter how small.</p>
  `
}
```

**Example: New Interview**

```javascript
{
  id: 10,
  type: 'Interview',
  title: 'Dialogue: The Power of Morning Meditation',
  date: '2026-01-18',
  excerpt: 'An intimate conversation about how morning practice transforms the whole day.',
  coverImage: 'assets/placeholder.svg',
  readTime: 7,
  content: `
    <div class="interview-question">Why is it important to meditate in the morning?</div>
    <div class="interview-answer">Morning sets the tone for the whole day. When we begin with silence and presence, we carry that energy into all later activities. It is like planting a seed of peace that grows throughout the day.</div>
    
    <div class="interview-question">What advice would you give to those struggling to maintain a steady practice?</div>
    <div class="interview-answer">Start small. Five minutes are enough. Consistency is more valuable than duration. Better five minutes daily than one hour once a week. And be compassionate with yourself; difficult days are part of the process.</div>
  `
}
```

**Example: New Review**

```javascript
{
  id: 11,
  type: 'Review',
  title: 'Review: "Evening Meditations" - A Transformative Album',
  date: '2026-01-15',
  excerpt: 'An in-depth analysis of an album that blends instrumental music with devotional chants.',
  coverImage: 'assets/placeholder.svg',
  readTime: 5,
  content: `
    <div class="review-rating">
      <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <svg class="star filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <svg class="star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    </div>
    
    <p>This album achieves something extraordinary: it blends the depth of traditional music with an accessible contemporary sound.</p>
    
    <div class="review-pros-cons">
      <div class="pros">
        <h4>Strengths</h4>
        <ul>
          <li>Impeccable production</li>
          <li>Variety of instruments</li>
          <li>Perfect for meditation</li>
        </ul>
      </div>
      <div class="cons">
        <h4>Areas to Improve</h4>
        <ul>
          <li>Some tracks could be longer</li>
        </ul>
      </div>
    </div>
  `
}
```

**Example: New Casual (Tarot)**

```javascript
{
  id: 12,
  type: 'Casual',
  title: 'The Hermit Card: Inner Seeking',
  date: '2026-01-10',
  excerpt: 'A casual exploration of the Hermit’s symbolism and its meaning in our spiritual journey.',
  coverImage: 'assets/placeholder.svg',
  readTime: 4,
  content: `
    <div class="tarot-card-layout">
      <img src="assets/placeholder.svg" alt="The Hermit card" class="tarot-card-img">
      <div>
        <p>The Hermit represents a period of deep introspection. It is not loneliness, but a conscious search for inner wisdom.</p>
        
        <p>This card appears when we need to step away from the world's noise to hear our inner voice more clearly.</p>
      </div>
    </div>
    
    <p>In a spiritual context, the Hermit reminds us that all the wisdom we seek already exists within us. We only need to create the space to recognize it.</p>
  `
}
```

#### Step 4: Add the entry to the array

1. Locate the `blogEntries` array in the file
2. Add your new entry at the start of the array (so it appears as most recent)
3. **Important**: Make sure the `id` is unique and sequential

```javascript
export const blogEntries = [
  // Your new entry here (first position)
  {
    id: 9,
    type: 'Reflection',
    // ... rest of the entry
  },
  // Existing entries...
];
```

#### Step 5: Save and verify

1. **Save the file** (Cmd+S / Ctrl+S)
2. **Reload the browser** to see changes
3. Verify that:
   - The new entry appears in the blog list
   - The filter by type works correctly
   - The entry shows correctly in the detail view

---

## 🔄 Keep the Site Updated

### Update Existing Content

#### Edit an existing entry

1. Open `js/blog-data.js`
2. Find the entry you want to edit (use Cmd+F / Ctrl+F to search)
3. Modify the content directly
4. Save the file
5. Reload the browser

#### Change the order of entries

- Newer entries should have more recent dates
- Entries with later dates appear first in lists
- To make an entry appear "most recent," update its `date`

### Add New Albums to the Discography

1. Open `discography.html`
2. Find the `albums` array inside `x-data`
3. Add a new object:

```javascript
{
  id: 7,  // Next available ID
  title: 'New Album',
  year: 2026,  // Release year
  image: 'assets/new-album.jpg',  // Image path
  description: 'Album description...'
}
```

4. If you need to add a new year to the filter, add an option:

```html
<option value="2026">2026</option>
```

### Update the Biography

1. Open `biography.html`
2. Modify the content inside `<div class="bio-text">`
3. To update the timeline, add new items:

```html
<div class="timeline-item">
  <div class="timeline-year">2026</div>
  <div class="timeline-event">New important spiritual milestone</div>
</div>
```

### Update the Tarot Page

1. Open `tarot.html`
2. Modify the content inside `<article class="blog-content">`
3. To add new phrases to the "Project your mind like a cloud" section, edit `js/cloud-phrases.js`:

```javascript
export const cloudPhrases = [
  { gurmukhi: '...', romanized: '...', spanish: '...' },
  { gurmukhi: '...', romanized: '...', spanish: '...' }, // Add here
  // ... other phrases
];
```

### Update CSS Styles

1. Open `css/style.css`
2. Modify any styles directly
3. Save and reload

### Change Colors (Palette)

In `css/style.css`, find `:root` and edit the variables:

```css
:root {
  --primary: #325394;      /* Primary color */
  --secondary: #57C4DD;    /* Secondary color */
  --accent: #EA428B;       /* Accent color */
  /* ... etc */
}
```

All components use these variables, so changing them updates the whole site.

---

## 🛠️ Serve the Site Locally

### Option 1: Python (Recommended)

```bash
# Python 3
python3 -m http.server 8000

# Then open: http://localhost:8000
```

### Option 2: Node.js (http-server)

```bash
# Install
npm install -g http-server

# Run
http-server -p 8000
```

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code / Cursor
2. Right-click `index.html`
3. Select "Open with Live Server"

### Option 4: PHP

```bash
php -S localhost:8000
```

---

## 🐛 Troubleshooting

### Comments do not appear

**Problem**: Firebase is not configured
- Verify that you replaced all placeholders in `js/firebase.js`
- Check the browser console (F12) for errors
- Make sure Firestore is enabled in Firebase Console

**Problem**: Security rules block access
- Verify Firestore rules in Firebase Console
- Make sure the rules allow public reads

### New entries do not appear

**Problem**: Browser cache
- Do a hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Or clear the browser cache

**Problem**: Syntax error in blog-data.js
- Check the browser console for errors
- Make sure all quotes are closed
- Verify that the object structure is correct

### Styles are not applied

- Verify that `css/style.css` is being loaded
- Verify the path in HTML: `<link rel="stylesheet" href="css/style.css">`
- Make sure you serve the site from the root (not opening HTML directly)

### Alpine.js does not work

- Verify that Alpine.js loads before `app.js`
- Check the browser console for errors
- Make sure the local server is running (needed for ES6 modules)

### Images do not appear

- Verify the paths are correct (e.g., `assets/placeholder.svg`)
- Make sure the image file exists
- For development, you can use placeholder services:
  - `https://via.placeholder.com/1200x675` for 16:9 images
  - `https://via.placeholder.com/800x800` for square images
  - `https://via.placeholder.com/600x600` for biography images
  - `https://via.placeholder.com/300x500` for card images

---

## 📝 Important Notes

1. **Unique IDs**: Always use unique sequential IDs for blog entries
2. **Date Format**: Use `YYYY-MM-DD` format for dates
3. **HTML in Content**: You can use full HTML in the `content` field
4. **Entry Order**: Entries are automatically ordered by date (most recent first)
5. **Dark Mode**: It is saved in `localStorage`, so it persists across sessions

---

## 🚀 Next Steps

- Set up Firebase Hosting to publish the site
- Add authentication if you want to moderate comments
- Build a more robust admin system
- Add more interactive features

Enjoy creating and sharing spiritual content! 🙏
