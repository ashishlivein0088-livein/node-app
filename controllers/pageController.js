const path = require('path');

const sendLoginPage = (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
};

const sendAppPage = (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
};

module.exports = {
  sendLoginPage,
  sendAppPage
};
