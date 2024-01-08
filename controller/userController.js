const user = require('../model/userModel')
var jwt = require('jsonwebtoken');
var isLogin = false;
var nodemailer = require('nodemailer');



exports.dummy = async (req, res) => {
    


}


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'umangchodavadiya1234@gmail.com',
        pass: 'agiz nkrh vfpc zofx'
    }
});


const register = async (req, res) => {

    const users = await user.find({ email: req.body.email });

    console.log("req.file= ", req.file);
    console.log("req.body= ", req.body);

    req.body.profileImage = req.file.path

    if (users.length > 0) {
        res.status(200).json(
            {
                status: 'fail'
            }
        )
    }
    else {
        const data = await user.create(
            {
                ...req.body,
                allPasswords: [req.body.password]
            }
        )

        var mailOptions = {
            from: 'umangchodavadiya1234@gmail.com',
            to: req.body.email,
            subject: 'thakss boss !',
            html: '<div class="hello"><h1 style="color: red;">hey there please <a href="https://www.cdmi.in/" >visit the link</a> to collab !</h1></div>',
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


        res.status(200).json(
            {
                status: 'success',
                data
            }
        )
    }
}

const login = async (req, res) => {

    const data = await user.find({ email: req.body.email, password: req.body.password })
    // .skip(1).limit(1);

    if (!isLogin && data.length == 1) {

        var token = jwt.sign({ id: data[0].id }, 'cdmi');

        isLogin = true;

        res.status(200).json(
            {
                status: 'success',
                token
            }
        )
    }
    else {
        res.status(200).json(
            {
                status: 'fail'
            }
        )
    }
}

const forgetPassword = async (req, res) => {

    const data = await user.find({ email: req.body.email, allPasswords: { $in: req.body.password } })


    console.log('data = ', data);

    if (data.length == 1) {

        const password = data[0].allPasswords.includes(req.body.password)

        if (password) {

            res.status(200).json(
                {
                    status: 'Choose Another Password'
                }
            )

        }
        else {

            const newPassword = await user.findByIdAndUpdate(data[0].id, {
                password: req.body.password,
                allPasswords: [...data[0].allPasswords, req.body.password]
            })

            res.status(200).json(
                {
                    status: 'success',
                    newPassword
                }
            )

        }



    } else {

        res.status(200).json(
            {
                status: 'User Not Found !'
            }
        )

    }

}

// const sendFile = (req, res) => {
//     console.log("path=",req.path);
//     const path = __dirname.replace('controller', '')
//     console.log(path+'public/images/profileImage.jpg');
//     res.sendFile(path+'public/images/profileImage.jpg')
// }

const logout = (req, res) => {
    res.status(200).json({
        status: 'log out'
    })
}




module.exports = {
    register,
    login,
    forgetPassword,
    // sendFile
}
