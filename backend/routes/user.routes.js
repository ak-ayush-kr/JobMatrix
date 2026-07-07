import express from 'express';
import { register,login, logout } from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.js';
import { updateProfile } from '../controllers/user.controller.js';
import { getNotifications } from '../controllers/user.controller.js';   
import getUser from '../middleware/auth.js';
const router = express.Router();

router.post('/register', upload.single('profilePhoto'), register);
router.post('/login', login);
router.post("/updateProfile",getUser,upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'resume', maxCount: 1 }]),
    updateProfile
);
router.get("/getNotices",getUser,getNotifications);

router.get("/logout",logout);

export default router;