//Methods to encrypt and validate passwords during local registration

const crypto = require("crypto");

exports.encryptPassword = (plainPassword) => {
    var salt = crypto.randomBytes(32).toString('hex');
    var hash = crypto.pbkdf2Sync(plainPassword, salt, 10000, 64, 'sha512').toString('hex');

    return{
        salt: salt,
        hash: hash
    }
}

exports.validatePassword = (enteredPassword, enteredSalt, enteredHash) => {
    var verifyHash = crypto.pbkdf2Sync(enteredPassword, enteredSalt, 10000, 64, 'sha512').toString('hex');
    return verifyHash === enteredHash;
}