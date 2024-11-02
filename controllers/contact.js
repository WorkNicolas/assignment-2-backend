let ContactModel = require('../models/contact');

module.exports.create = async function (req, res, next) {
    try {
        let newContact = new ContactModel(req.body);

        let result = await ContactModel.create(newContact);
        res.json(
            {
                success: true,
                message: 'Contact created successfully.'
            }
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.list = async function (req, res, next) {
    try {
        let list = await ContactModel.find({});
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.contactGet = async function (req, res, next) {
    try {
        let contactID = req.params.contactID;

        req.contact = await ContactModel.findOne({ _id: contactID });
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.contactByID = async function (req, res, next) {
    res.json(req.contact);
}

module.exports.update = async function (req, res, next) {
    try {
        let contactID = req.params.contactID;

        let updateContact = new ContactModel(req.body);
        updateContact._id = contactID;

        let result = await ContactModel.updateOne({ _id: contactID }, updateContact);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'Contact updated successfully.'
                }
            );
        } else {
            throw new Error('Contact not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.delete = async function (req, res, next) {
    try {
        let contactID = req.params.contactID;

        let result = await ContactModel.deleteOne({ _id: contactID });
        console.log(result);

        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'Contact deleted successfully.'
                }
            );
        } else {
            throw new Error('Contact not deleted. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}
