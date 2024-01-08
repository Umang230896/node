const mongoose = require('mongoose')

const user = mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        } ,
        password: {
            type: String
        },
        allPasswords: {
            type: Array
        },
        profileImage: {
            type: String
        }
    }
)

module.exports = mongoose.model('User',user)