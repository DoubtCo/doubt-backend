const Form = require("../models/form");
const sendMail = require("../helpers/send_mail");

exports.contact = async (req,res) => {
    const form = new Form({
        type: 'Contact Request',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    await form.save();
    await sendMail("doubt.co923@gmail.com", "Contact Request", `A user has submitted a contact request. ${form._id}`);
    res.send("OK");
}