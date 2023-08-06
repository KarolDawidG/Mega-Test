const express = require('express');
const {pool} = require('../../database/db')
const middleware = require("../../config/middleware");
const {limiter, errorHandler} = require('../../config/config');
const router = express.Router();

router.use(middleware);
router.use(limiter);
router.use(errorHandler);

// router.get('/', async (req, res)=>{
//     try{
//         return res.status(200).redirect('/');
//     }catch(error){
//         console.error(error);
//         return res.status(500).send('Unknown server error. Please contact your administrator.');
//     }
// });

// router.post('/', async (req, res) => {
//     const user = req.body.username;
//     const role = req.body.role;
//     try {
//         const query = 'UPDATE accounts SET role = ? WHERE username = ?';
//         await pool.query(query, [role, user]);
//         return res.status(200).redirect('/users/');
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Unknown server error. Please contact your administrator.');
//     }
// });




module.exports = router;

