/**
 * Mening Profilim - Asosiy JavaScript Fayli (script.js)
 * Loyihaning interaktiv funksiyalari va dinamik boshqaruvi
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Dinamik Salomlashuv (Vaqtga qarab)
  // ==========================================
  const greetingEl = document.getElementById('status-greeting');
  if (greetingEl) {
    const currentHour = new Date().getHours();
    let greetingText = "Salom, xush kelibsiz! 👋";

    if (currentHour >= 5 && currentHour < 12) {
      greetingText = "Xayrli tong! 🌅";
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingText = "Xayrli kun! ☀️";
    } else if (currentHour >= 18 && currentHour < 23) {
      greetingText = "Xayrli oqshom! 🌇";
    } else {
      greetingText = "Tungi rejim aktiv! 🌙✨";
    }
    greetingEl.textContent = greetingText;
  }

  // ==========================================
  // 2. Avtomatik Yil Sozlamasi (Footer)
  // ==========================================
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 3. Mavzuni O'zgartirish (Dark / Light Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Avval saqlangan mavzuni tekshiramiz
  const savedTheme = localStorage.getItem('user-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('user-theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(newTheme === 'light' ? "Och rangli mavzu yoqildi ☀️" : "To'q rangli mavzu yoqildi 🌙");
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  // ==========================================
  // 4. Havolani Nusxalash & Toast Bildirishnoma
  // ==========================================
  const copySiteBtn = document.getElementById('copy-site-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  copySiteBtn.addEventListener('click', async () => {
    try {
      // Joriy sayt havolasini nusxalash
      await navigator.clipboard.writeText(window.location.href);
      showToast("Sayt havolasi nusxalandi! 📋");
    } catch (err) {
      // Fallback
      showToast("Havolani nusxalab bo'lmadi ❌");
    }
  });

  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ==========================================
  // 5. Havolalarni Toifalar Bo'yicha Filtrlash
  // ==========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const linkCards = document.querySelectorAll('.link-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Faol tugmani belgilash
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      linkCards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
          card.classList.remove('hidden');
          // Yengil paydo bo'lish animatsiyasi
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================
  // 6. Kartalarga 3D Qiyalik Effekti (Tilt Effect)
  // ==========================================
  linkCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  console.log("🚀 Sayt muvaffaqiyatli yuklandi!");
});
