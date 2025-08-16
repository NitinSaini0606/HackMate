const express = require('express'); 

const { signUp, login } = require('../Controllers/Signup.js');
const { saveEducation , getAllEducation , getMyEducation} = require('../Controllers/Education.js');

// const authenticate = require('../Middleware/authenticate.js');

const Edu = require('../Models/edu.js');
const authenticate = require('../Middleware/authenticate.js');
const { createConnectionRequest, getReceivedRequests , acceptConnectionRequest , rejectConnectionRequest , getSentRequests} = require('../Controllers/request.js');
const router = express.Router();

router.post('/signup',signUp);
router.post('/login',login);
router.post('/education',authenticate, saveEducation);
router.get('/get-all-education', authenticate, getAllEducation);
router.get('/get-my-education', authenticate, getMyEducation);
router.post('/send-request', authenticate, createConnectionRequest);
router.get('/get-request', authenticate, getReceivedRequests);
router.patch('/accept-request/:id', authenticate, acceptConnectionRequest);
router.patch('/reject-request/:id', authenticate, rejectConnectionRequest);
router.get('/sent-requests', authenticate, getSentRequests);




module.exports = router;