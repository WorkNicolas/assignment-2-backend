let UserModel = require('../models/user');

module.exports.create = async function (req, res, next) {
    try {
        let newUser = new UserModel(req.body);

        let result = await UserModel.create(newUser);
        res.json(
            {
                success: true,
                message: 'User created successfully.'
            }
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.list = async function (req, res, next) {
    try {
        let list = await UserModel.find({});
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.userGet = async function (req, res, next) {
    try {
        let userID = req.params.userID;

        req.user = await UserModel.findOne({ _id: userID });
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.userByID = async function (req, res, next) {
    res.json(req.user);
}

module.exports.update = async function (req, res, next) {
    try {
        let userID = req.params.userID;

        let updateUser = new UserModel(req.body);
        updateUser._id = userID;

        let result = await UserModel.updateOne({ _id: userID }, updateUser);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'User updated successfully.'
                }
            );
        } else {
            throw new Error('User not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.delete = async function (req, res, next) {
    try {
        let userID = req.params.userID;

        let result = await UserModel.deleteOne({ _id: userID });
        console.log(result);

        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'User deleted successfully.'
                }
            );
        } else {
            throw new Error('User not deleted. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}
