const storageKeys = {
  theme: 'todoAppTheme'
};

const themeToggle = document.getElementById('themeToggle');

const applyTheme = (theme) => {
  document.body.classList.toggle('dark', theme === 'dark');
};

const getStoredTheme = () => {
  return localStorage.getItem(storageKeys.theme) || 'light';
};

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem(storageKeys.theme, nextTheme);
  applyTheme(nextTheme);
});

applyTheme(getStoredTheme());
