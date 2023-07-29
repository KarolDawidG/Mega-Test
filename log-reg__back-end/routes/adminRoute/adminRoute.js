const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware')
const { verifyToken } = require('../../config/config');
router.use(middleware);


router.get('/', verifyToken, (req, res, next) => {
    const userRole = req.userRole;
    console.log(`Autoryzacja admina: ${userRole}`);
    
    if (userRole !== 'admin') {
      return res.status(403).send('You do not have permission to access this resource.');
    }
    try {
        // res.status(200).json({ userRole: userRole });
        res.status(200).json({ userRole: userRole, message: 'Everything is okey.' })
    } catch (error) {
      console.error(error);
      res.status(500).send('Unknown server error. Please contact your administrator.');
    }
  });

module.exports = router;


