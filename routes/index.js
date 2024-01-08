var express = require('express');
const { register, login, forgetPassword, sendFile, sendOTP, dummy } = require('../controller/userController');
var router = express.Router();

var check = require('../middleware/auth');

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })


/* GET home page. */
router.get('/', function (req, res) {
    res.send('hello world')
});

router.post('/', upload.single('profileImage'), register);
router.post('/login', login);
router.post('/forgetPassword', forgetPassword);

const accountSid = 'ACbcaf1c3214cedbccc87bdc42a82c2c9e';
const authToken = 'e7192a9b859910162c3a3e8370ddc3d5';

const client = require('twilio')(accountSid, authToken);

router.get('/sendWhatsappOTP', function (req, res) {
    var OTP = ''

    for (let i = 0; i < 6; i++) {
        OTP += Math.floor(Math.random() * 10)
    }

    client.messages
        .create({
            body: `Your Otp is ${OTP} and gave a great day !`,
            to: 'whatsapp:+918980247098',
            from: 'whatsapp:+14155238886',
            
        })
        .then(message => {
            console.log(message.sid)
            res.status(200).json(
                {
                    OTP,
                    message: message.body,
                    messageId: message.sid
                }
            )
        })
}
)

router.get('/sendOTP', function (req, res) {

    var OTP = ''

    for (let i = 0; i < 6; i++) {
        OTP += Math.floor(Math.random() * 10)
    }

    client.messages
        .create({
            body: `Your Otp is ${OTP} and gave a great day !`,
            to: '+918980247098',
            from: '+12018174237',
        })
        .then(message => {
            console.log(message.sid)
            res.status(200).json(
                {
                    message: message.body,
                    OTP,
                    messageId: message.sid
                }
            )
        })
}
)
// router.get('/public/images/profileImage.jpg', sendFile)


module.exports = router;
