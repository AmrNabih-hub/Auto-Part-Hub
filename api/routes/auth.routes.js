const express = require('express');
const router = express.Router();
const {
  registerUser,
  becomeVendor,
  loginUser,
} = require('../controllers/auth.controller');

router.post('/register', registerUser);
router.post('/become-vendor', becomeVendor);
router.post('/login', loginUser);

module.exports = router;
