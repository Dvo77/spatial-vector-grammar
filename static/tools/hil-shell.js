/**
 * HIL Shell v1.0
 * Drop into any HIL tool with:
 *   <link rel="stylesheet" href="hil-shell.css">
 *   <script src="hil-shell.js"></script>
 *   <script>HILShell.init({ toolName: 'Vault', toolCode: 'VAULT' });</script>
 *
 * Provides: Firebase init, Google Auth, shell header + nav, toast system, modal base
 */

const HILShell = (() => {

  // ── CONFIG ──────────────────────────────────────────────────────────────────
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyD-placeholder",
    authDomain: "hlsystem.firebaseapp.com",
    projectId: "project-97444efa-3b6f-493b-b96",
    storageBucket: "hilsystem.appspot.com",
    messagingSenderId: "placeholder",
    appId: "placeholder"
  };

  const ADMIN_UID = "KwxzIWwmxxYZ9fmCWq9RyAxWPCy2";

  const TOOLS = [
    { code: 'VAULT',    name: 'Vault',          url: '/tools/hl-vault-cloud.html',        icon: '🗄️' },
    { code: 'MUSEUM',   name: 'Museum',         url: '/tools/hil-museum-builder.html',    icon: '🏛️' },
    { code: 'FIELD',    name: 'Field Tool',     url: '/tools/hil-field-tool.html',        icon: '📍' },
    { code: 'LABELS',   name: 'Labels',         url: '/tools/hil-label-generator.html',   icon: '🏷️' },
    { code: 'ROOMS',    name: 'Room Codes',     url: '/tools/hl-room-code-generator.html',icon: '📐' },
    { code: 'SIGNS',    name: 'Sign Studio',    url: '/tools/hil-sign-studio.html',       icon: '🪧' },
    { code: 'LEDGER',   name: 'Family Ledger',  url: '/tools/hil-family-ledger.html',     icon: '📒' },
    { code: 'EXCHANGE', name: 'Exchange',       url: '/tools/hil-exchange.html',          icon: '🔁' },
  ];

  // ── STATE ────────────────────────────────────────────────────────────────────
  let _user = null;
  let _isAdmin = false;
  let _opts = {};
  let _authCallbacks = [];
  let _db = null;

  // ── INJECT CSS ────────────────────────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('hil-shell-css')) return;
    const style = document.createElement('style');
    style.id = 'hil-shell-css';
    style.textContent = `
      /* ── HIL DESIGN TOKENS ─────────────────────────────────── */
      :root {
        --hil-bg:          #0d0d0d;
        --hil-surface:     #141414;
        --hil-surface-2:   #1a1a1a;
        --hil-surface-3:   #222222;
        --hil-border:      #2a2a2a;
        --hil-border-2:    #333333;

        --hil-green:       #00cc66;
        --hil-green-dim:   #00994d;
        --hil-green-glow:  rgba(0, 204, 102, 0.15);
        --hil-green-text:  #00ff80;

        --hil-text:        #e8e8e8;
        --hil-text-2:      #999999;
        --hil-text-3:      #666666;

        --hil-amber:       #f5a623;
        --hil-red:         #e53e3e;
        --hil-blue:        #4a9eff;

        --hil-font-display: 'Orbitron', 'Courier New', monospace;
        --hil-font-mono:    'Space Mono', 'Courier New', monospace;
        --hil-font-body:    'Barlow Condensed', 'Arial Narrow', sans-serif;

        --hil-radius:      4px;
        --hil-radius-lg:   8px;
        --hil-shell-h:     56px;
        --hil-nav-h:       40px;
      }

      /* ── RESET / BASE ─────────────────────────────────────── */
      *, *::before, *::after { box-sizing: border-box; }

      body {
        margin: 0;
        background: var(--hil-bg);
        color: var(--hil-text);
        font-family: var(--hil-font-body);
        font-size: 15px;
        line-height: 1.5;
        padding-top: calc(var(--hil-shell-h) + var(--hil-nav-h));
      }

      /* ── SHELL HEADER ─────────────────────────────────────── */
      #hil-shell-header {
        position: fixed;
        top: 0; left: 0; right: 0;
        height: var(--hil-shell-h);
        background: var(--hil-surface);
        border-bottom: 1px solid var(--hil-border);
        display: flex;
        align-items: center;
        padding: 0 16px;
        z-index: 1000;
        gap: 12px;
      }

      #hil-shell-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        flex-shrink: 0;
      }

      #hil-shell-logo .logo-hex {
        width: 32px;
        height: 32px;
      }

      #hil-shell-logo .logo-text {
        font-family: var(--hil-font-display);
        font-size: 14px;
        font-weight: 700;
        color: var(--hil-green);
        letter-spacing: 0.1em;
        line-height: 1;
      }

      #hil-shell-logo .logo-sub {
        font-family: var(--hil-font-mono);
        font-size: 9px;
        color: var(--hil-text-3);
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      #hil-shell-tool-badge {
        font-family: var(--hil-font-mono);
        font-size: 10px;
        color: var(--hil-text-3);
        letter-spacing: 0.12em;
        padding: 3px 8px;
        border: 1px solid var(--hil-border);
        border-radius: var(--hil-radius);
        background: var(--hil-surface-2);
        text-transform: uppercase;
      }

      #hil-shell-spacer { flex: 1; }

      #hil-shell-auth {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      #hil-shell-user {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--hil-text-2);
      }

      #hil-shell-user img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid var(--hil-border-2);
      }

      #hil-shell-admin-badge {
        font-family: var(--hil-font-mono);
        font-size: 9px;
        color: var(--hil-amber);
        border: 1px solid var(--hil-amber);
        padding: 2px 6px;
        border-radius: var(--hil-radius);
        letter-spacing: 0.1em;
      }

      .hil-btn-signin {
        font-family: var(--hil-font-mono);
        font-size: 11px;
        color: var(--hil-green);
        background: transparent;
        border: 1px solid var(--hil-green-dim);
        border-radius: var(--hil-radius);
        padding: 6px 14px;
        cursor: pointer;
        letter-spacing: 0.08em;
        transition: background 0.15s, color 0.15s;
      }
      .hil-btn-signin:hover {
        background: var(--hil-green-glow);
        color: var(--hil-green-text);
      }

      .hil-btn-signout {
        font-family: var(--hil-font-mono);
        font-size: 10px;
        color: var(--hil-text-3);
        background: transparent;
        border: 1px solid var(--hil-border);
        border-radius: var(--hil-radius);
        padding: 4px 10px;
        cursor: pointer;
        letter-spacing: 0.06em;
        transition: border-color 0.15s, color 0.15s;
      }
      .hil-btn-signout:hover {
        border-color: var(--hil-red);
        color: var(--hil-red);
      }

      /* ── TOOL NAV BAR ─────────────────────────────────────── */
      #hil-shell-nav {
        position: fixed;
        top: var(--hil-shell-h);
        left: 0; right: 0;
        height: var(--hil-nav-h);
        background: var(--hil-surface-2);
        border-bottom: 1px solid var(--hil-border);
        display: flex;
        align-items: stretch;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        z-index: 999;
        padding: 0 8px;
        gap: 2px;
      }
      #hil-shell-nav::-webkit-scrollbar { display: none; }

      .hil-nav-item {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 0 12px;
        font-family: var(--hil-font-mono);
        font-size: 10px;
        letter-spacing: 0.08em;
        color: var(--hil-text-3);
        text-decoration: none;
        white-space: nowrap;
        border-bottom: 2px solid transparent;
        transition: color 0.15s, border-color 0.15s;
        text-transform: uppercase;
      }
      .hil-nav-item:hover {
        color: var(--hil-text);
      }
      .hil-nav-item.active {
        color: var(--hil-green);
        border-bottom-color: var(--hil-green);
      }
      .hil-nav-item .nav-icon {
        font-size: 12px;
      }
      .hil-nav-admin {
        margin-left: auto;
        color: var(--hil-amber) !important;
        opacity: 0.7;
      }
      .hil-nav-admin:hover { opacity: 1; }

      /* ── SHARED COMPONENT TOKENS ──────────────────────────── */

      /* Buttons */
      .hil-btn {
        font-family: var(--hil-font-mono);
        font-size: 12px;
        letter-spacing: 0.06em;
        padding: 8px 18px;
        border-radius: var(--hil-radius);
        border: 1px solid transparent;
        cursor: pointer;
        transition: all 0.15s;
        text-transform: uppercase;
      }
      .hil-btn-primary {
        background: var(--hil-green);
        color: #000;
        border-color: var(--hil-green);
        font-weight: 700;
      }
      .hil-btn-primary:hover { background: var(--hil-green-text); }
      .hil-btn-secondary {
        background: transparent;
        color: var(--hil-text);
        border-color: var(--hil-border-2);
      }
      .hil-btn-secondary:hover { border-color: var(--hil-text-2); }
      .hil-btn-danger {
        background: transparent;
        color: var(--hil-red);
        border-color: var(--hil-red);
      }
      .hil-btn-ghost {
        background: transparent;
        color: var(--hil-text-2);
        border-color: transparent;
        padding: 8px 10px;
      }
      .hil-btn-ghost:hover { color: var(--hil-text); }

      /* Cards */
      .hil-card {
        background: var(--hil-surface-2);
        border: 1px solid var(--hil-border);
        border-radius: var(--hil-radius-lg);
        padding: 16px;
      }
      .hil-card:hover {
        border-color: var(--hil-border-2);
      }

      /* Form inputs */
      .hil-input {
        width: 100%;
        background: var(--hil-surface-3);
        border: 1px solid var(--hil-border-2);
        border-radius: var(--hil-radius);
        color: var(--hil-text);
        font-family: var(--hil-font-body);
        font-size: 14px;
        padding: 8px 12px;
        outline: none;
        transition: border-color 0.15s;
      }
      .hil-input:focus { border-color: var(--hil-green); }
      .hil-input::placeholder { color: var(--hil-text-3); }

      .hil-label {
        font-family: var(--hil-font-mono);
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--hil-text-3);
        display: block;
        margin-bottom: 5px;
      }

      /* Status badges */
      .hil-badge {
        font-family: var(--hil-font-mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 2px 7px;
        border-radius: 2px;
        border: 1px solid;
      }
      .hil-badge-green { color: var(--hil-green); border-color: var(--hil-green-dim); background: var(--hil-green-glow); }
      .hil-badge-amber { color: var(--hil-amber); border-color: rgba(245,166,35,0.4); background: rgba(245,166,35,0.08); }
      .hil-badge-red   { color: var(--hil-red);   border-color: rgba(229,62,62,0.4);  background: rgba(229,62,62,0.08); }
      .hil-badge-gray  { color: var(--hil-text-3); border-color: var(--hil-border-2); background: var(--hil-surface-3); }

      /* HL address monospace display */
      .hil-address {
        font-family: var(--hil-font-mono);
        font-size: 11px;
        color: var(--hil-green);
        letter-spacing: 0.08em;
        background: var(--hil-green-glow);
        padding: 2px 6px;
        border-radius: var(--hil-radius);
        border: 1px solid rgba(0,204,102,0.2);
      }

      /* Section headers */
      .hil-section-header {
        font-family: var(--hil-font-display);
        font-size: 11px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--hil-text-3);
        border-bottom: 1px solid var(--hil-border);
        padding-bottom: 8px;
        margin-bottom: 16px;
      }

      /* ── TOAST SYSTEM ─────────────────────────────────────── */
      #hil-toast-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 9999;
        pointer-events: none;
      }

      .hil-toast {
        font-family: var(--hil-font-mono);
        font-size: 12px;
        letter-spacing: 0.06em;
        padding: 10px 16px;
        border-radius: var(--hil-radius);
        border-left: 3px solid;
        background: var(--hil-surface-2);
        color: var(--hil-text);
        box-shadow: 0 4px 20px rgba(0,0,0,0.6);
        animation: hil-toast-in 0.2s ease, hil-toast-out 0.3s ease 2.7s forwards;
        pointer-events: auto;
        max-width: 320px;
      }
      .hil-toast-success { border-color: var(--hil-green); }
      .hil-toast-error   { border-color: var(--hil-red); }
      .hil-toast-info    { border-color: var(--hil-blue); }
      .hil-toast-warn    { border-color: var(--hil-amber); }

      @keyframes hil-toast-in {
        from { opacity: 0; transform: translateX(20px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes hil-toast-out {
        from { opacity: 1; }
        to   { opacity: 0; transform: translateX(20px); }
      }

      /* ── AUTH GATE OVERLAY ────────────────────────────────── */
      #hil-auth-gate {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 800;
        backdrop-filter: blur(4px);
      }
      #hil-auth-gate.hidden { display: none; }

      .hil-auth-gate-card {
        background: var(--hil-surface);
        border: 1px solid var(--hil-border-2);
        border-radius: var(--hil-radius-lg);
        padding: 40px;
        max-width: 360px;
        width: 90%;
        text-align: center;
      }
      .hil-auth-gate-card .gate-logo {
        font-family: var(--hil-font-display);
        font-size: 22px;
        color: var(--hil-green);
        letter-spacing: 0.15em;
        margin-bottom: 4px;
      }
      .hil-auth-gate-card .gate-tool {
        font-family: var(--hil-font-mono);
        font-size: 10px;
        color: var(--hil-text-3);
        letter-spacing: 0.15em;
        text-transform: uppercase;
        margin-bottom: 24px;
      }
      .hil-auth-gate-card p {
        color: var(--hil-text-2);
        font-size: 13px;
        margin-bottom: 24px;
        line-height: 1.6;
      }
      .hil-btn-google {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: var(--hil-font-mono);
        font-size: 12px;
        letter-spacing: 0.06em;
        color: var(--hil-text);
        background: var(--hil-surface-3);
        border: 1px solid var(--hil-border-2);
        border-radius: var(--hil-radius);
        padding: 10px 20px;
        cursor: pointer;
        transition: border-color 0.15s, background 0.15s;
        width: 100%;
        justify-content: center;
      }
      .hil-btn-google:hover {
        border-color: var(--hil-green);
        background: var(--hil-surface-2);
      }

      /* ── SCROLLBAR ────────────────────────────────────────── */
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: var(--hil-surface); }
      ::-webkit-scrollbar-thumb { background: var(--hil-border-2); border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--hil-text-3); }
    `;
    document.head.appendChild(style);
  }

  // ── GOOGLE FONTS ─────────────────────────────────────────────────────────────
  function injectFonts() {
    if (document.getElementById('hil-fonts')) return;
    const link = document.createElement('link');
    link.id = 'hil-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Space+Mono&family=Barlow+Condensed:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
  }

  // ── BUILD HEADER HTML ─────────────────────────────────────────────────────────
  function buildHeader() {
    const tool = TOOLS.find(t => t.code === _opts.toolCode) || {};

    const header = document.createElement('header');
    header.id = 'hil-shell-header';
    header.innerHTML = `
      <a id="hil-shell-logo" href="/tools/">
        <svg class="logo-hex" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="#00cc66" stroke-width="1.5"/>
          <text x="16" y="20" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#00cc66">HL</text>
        </svg>
        <div>
          <div class="logo-text">HIL</div>
          <div class="logo-sub">Home Inventory Locator</div>
        </div>
      </a>
      ${_opts.toolName ? `<div id="hil-shell-tool-badge">${tool.icon || ''} ${_opts.toolName}</div>` : ''}
      <div id="hil-shell-spacer"></div>
      <div id="hil-shell-auth">
        <div id="hil-shell-user" style="display:none"></div>
        <button class="hil-btn-signin" id="hil-signin-btn" style="display:none">Sign In</button>
      </div>
    `;
    document.body.prepend(header);
  }

  // ── BUILD NAV BAR ─────────────────────────────────────────────────────────────
  function buildNav() {
    const nav = document.createElement('nav');
    nav.id = 'hil-shell-nav';

    const links = TOOLS.map(t => {
      const isActive = t.code === _opts.toolCode;
      return `<a class="hil-nav-item${isActive ? ' active' : ''}" href="${t.url}">
        <span class="nav-icon">${t.icon}</span>${t.name}
      </a>`;
    }).join('');

    nav.innerHTML = links;

    // Admin link — only shown if admin
    if (_isAdmin) {
      nav.innerHTML += `<a class="hil-nav-item hil-nav-admin" href="/tools/hil-admin.html">⚙ Admin</a>`;
    }

    const existingNav = document.getElementById('hil-shell-nav');
    if (existingNav) existingNav.remove();

    const header = document.getElementById('hil-shell-header');
    if (header) header.after(nav);
    else document.body.prepend(nav);
  }

  // ── AUTH STATE ────────────────────────────────────────────────────────────────
  function updateAuthUI() {
    const userEl    = document.getElementById('hil-shell-user');
    const signinBtn = document.getElementById('hil-signin-btn');
    if (!userEl || !signinBtn) return;

    if (_user) {
      userEl.style.display = 'flex';
      signinBtn.style.display = 'none';
      userEl.innerHTML = `
        ${_user.photoURL ? `<img src="${_user.photoURL}" alt="">` : ''}
        <span>${_user.displayName || _user.email || 'User'}</span>
        ${_isAdmin ? '<span class="hil-shell-admin-badge">ADMIN</span>' : ''}
        <button class="hil-btn-signout" id="hil-signout-btn">Sign out</button>
      `;
      document.getElementById('hil-signout-btn')?.addEventListener('click', signOut);
      buildNav(); // re-render nav to show/hide admin link
    } else {
      userEl.style.display = 'none';
      signinBtn.style.display = 'inline-flex';
    }

    // Dismiss auth gate if signed in
    const gate = document.getElementById('hil-auth-gate');
    if (gate) {
      gate.classList.toggle('hidden', !!_user);
    }
  }

  // ── TOAST SYSTEM ──────────────────────────────────────────────────────────────
  function buildToastContainer() {
    if (document.getElementById('hil-toast-container')) return;
    const el = document.createElement('div');
    el.id = 'hil-toast-container';
    document.body.appendChild(el);
  }

  function toast(message, type = 'info') {
    const container = document.getElementById('hil-toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `hil-toast hil-toast-${type}`;
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  // ── AUTH GATE ─────────────────────────────────────────────────────────────────
  function buildAuthGate(requireAuth) {
    if (!requireAuth) return;
    const gate = document.createElement('div');
    gate.id = 'hil-auth-gate';
    gate.innerHTML = `
      <div class="hil-auth-gate-card">
        <div class="gate-logo">HIL</div>
        <div class="gate-tool">${_opts.toolName || 'System'}</div>
        <p>Sign in with your Google account to access this tool.</p>
        <button class="hil-btn-google" id="hil-gate-signin">
          <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.9 2.3 30.3 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.8 6c1.9-5.6 7.1-9.8 13.5-9.8z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.1z"/><path fill="#FBBC05" d="M10.5 28.8A14.5 14.5 0 0 1 9.5 24c0-1.7.3-3.3.8-4.8l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2 1.4-4.6 2.2-7.6 2.2-6.4 0-11.6-4.2-13.5-9.8l-7.9 6C6.7 42.6 14.7 48 24 48z"/></svg>
          Continue with Google
        </button>
      </div>
    `;
    document.body.appendChild(gate);
    gate.classList.toggle('hidden', !!_user);
    document.getElementById('hil-gate-signin')?.addEventListener('click', signIn);
  }

  // ── FIREBASE INIT ─────────────────────────────────────────────────────────────
  function initFirebase(config, onAuthChange) {
    // Firebase must already be loaded via CDN in the page
    // This is called from init() after scripts load
    if (!window.firebase) {
      console.warn('[HILShell] Firebase SDK not found. Load via CDN before hil-shell.js');
      return;
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(config || FIREBASE_CONFIG);
    }
    if (window.firebase.firestore) {
      _db = firebase.firestore();
    }
    firebase.auth().onAuthStateChanged(user => {
      _user = user;
      _isAdmin = user ? user.uid === ADMIN_UID : false;
      updateAuthUI();
      _authCallbacks.forEach(cb => cb(user, _isAdmin));
      if (onAuthChange) onAuthChange(user, _isAdmin);
    });
  }

  function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(err => {
      toast('Sign-in failed: ' + err.message, 'error');
    });
  }

  function signOut() {
    firebase.auth().signOut().then(() => toast('Signed out', 'info'));
  }

  // ── PUBLIC API ────────────────────────────────────────────────────────────────
  function init(opts = {}) {
    _opts = opts;
    // opts: { toolName, toolCode, requireAuth, onAuthChange, firebaseConfig }

    injectCSS();
    injectFonts();

    // Wait for DOM
    const ready = () => {
      buildHeader();
      buildNav();
      buildToastContainer();
      buildAuthGate(opts.requireAuth);

      // Wire header sign-in button
      document.getElementById('hil-signin-btn')?.addEventListener('click', signIn);

      // Init Firebase
      initFirebase(opts.firebaseConfig, opts.onAuthChange);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', ready);
    } else {
      ready();
    }
  }

  return {
    init,
    toast,
    signIn,
    signOut,
    getUser: () => _user,
    isAdmin: () => _isAdmin,
    getDb: () => _db,
    ADMIN_UID,
    onAuth: (cb) => {
      _authCallbacks.push(cb);
      if (_user !== null) cb(_user, _isAdmin); // fire immediately if already resolved
    }
  };

})();
