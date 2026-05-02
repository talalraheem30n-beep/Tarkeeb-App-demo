document.addEventListener('DOMContentLoaded', () => {
  const cardLogin = document.getElementById('cardLogin');
  const cardRegister = document.getElementById('cardRegister');
  const cardSuccess = document.getElementById('cardSuccess');
  const loginError = document.getElementById('loginError');

  // Check if Google OAuth is configured and handle URL errors
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('error') === 'google_not_configured') {
    loginError.textContent = 'Google Sign-In is not configured yet. Use username & password.';
  } else if (urlParams.get('error') === 'google_failed') {
    loginError.textContent = 'Google Sign-In failed. Please try again.';
  }

  // Check Google config from server and disable button if not ready
  fetch('/api/config').then(r => r.json()).then(cfg => {
    const btnGoogle = document.getElementById('btnGoogle');
    if (!cfg.googleEnabled && btnGoogle) {
      btnGoogle.style.opacity = '0.5';
      btnGoogle.title = 'Google Sign-In not configured yet';
    }
  }).catch(() => {});


  // Toggle to Register
  document.getElementById('linkToRegister').addEventListener('click', () => {
    cardLogin.style.display = 'none';
    cardRegister.style.display = 'block';
  });

  // Toggle to Login
  document.getElementById('linkToLogin').addEventListener('click', () => {
    cardRegister.style.display = 'none';
    cardLogin.style.display = 'block';
  });

  // Handle Registration Submit
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorEl = document.getElementById('registerError');
    const btn = e.target.querySelector('button[type="submit"]');
    const username = document.getElementById('regUsername').value.trim();
    const name = document.getElementById('regName').value.trim();
    const password = document.getElementById('regPassword').value;

    errorEl.textContent = '';

    // Client-side validation: passwords must match
    if (password !== document.getElementById('regConfirm').value) {
      errorEl.textContent = 'Passwords do not match.';
      return;
    }

    btn.textContent = 'Creating account…';
    btn.disabled = true;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, name, password })
      });
      const data = await res.json();

      if (data.success) {
        // Registration successful, redirect to app
        window.location.href = '/app';
      } else {
        errorEl.textContent = data.error || 'Registration failed. Please try again.';
      }
    } catch (err) {
      errorEl.textContent = 'Connection error. Is the server running?';
    }

    btn.textContent = 'Create Account';
    btn.disabled = false;
  });

  // Toggle Password Visibility
  document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input.type === 'password') {
        input.type = 'text';
        this.textContent = '🙈';
      } else {
        input.type = 'password';
        this.textContent = '👁️';
      }
    });
  });

  // Login Logic
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorEl = document.getElementById('loginError');
    const btn = document.getElementById('loginBtn');
    errorEl.textContent = '';
    btn.textContent = 'Signing in…';
    btn.disabled = true;
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: document.getElementById('username').value,
          password: document.getElementById('password').value
        })
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = '/app';
      } else {
        errorEl.textContent = data.error || 'Login failed';
      }
    } catch (err) {
      errorEl.textContent = 'Connection error. Is the server running?';
    }
    btn.textContent = 'Sign In';
    btn.disabled = false;
  });
});
