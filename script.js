document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  // Vaqtga qarab salomlashuv
  const h = new Date().getHours();
  const greeting = h >= 5 && h < 12 ? 'Xayrli tong'
                 : h >= 12 && h < 18 ? 'Xayrli kun'
                 : h >= 18 && h < 23 ? 'Xayrli oqshom'
                 : 'Xayrli tun';
  document.getElementById('status-greeting').textContent = greeting;

  // Yil
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Xabar (toast)
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let timer;
  function showToast(text) {
    toastMsg.textContent = text;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // Mavzu
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeBtn.querySelector('i');
  const syncIcon = () => {
    themeIcon.className = root.getAttribute('data-theme') === 'light'
      ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  };
  syncIcon();
  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('user-theme', next); } catch (e) {}
    syncIcon();
  });

  // Havolani nusxalash
  document.getElementById('copy-site-btn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      showToast('Havola nusxalandi');
    } catch (e) {
      showToast("Nusxalab bo'lmadi");
    }
  });

  // Toifalar bo'yicha filtr
  const tabs = document.querySelectorAll('.tab');
  const items = document.querySelectorAll('#links-container li');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      items.forEach(li => {
        li.hidden = !(f === 'all' || li.dataset.groups.split(' ').includes(f));
      });
    });
  });
});
