const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');

router.use('/api', apiRoutes);

router.use('/index.html', (req, res) => res.sendFile(path.join(__dirname, '../public/')));



router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;