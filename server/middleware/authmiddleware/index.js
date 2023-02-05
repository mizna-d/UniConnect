const { User } = require("../../mongodb/models/userModel");

const authenticate = (req, res, next) => {
    // if (env !== 'production' && USE_TEST_USER)
    //     req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

module.exports = authenticate;