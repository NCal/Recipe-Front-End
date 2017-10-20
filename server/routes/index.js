let deps = require('../misc/deps.js');
let router = deps.router;
let path = deps.path;

router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;
