const { Schema, model } = require('mongoose');

// To do change user model according to exam description
//TODO add validation
const Name_Pattern = /^[a-zA-Z]+$/;
const Email_Pattern = /^([a-zA-Z])+@[a-zA-Z]+\.[a-zA-Z]+$/
const userSchema = new Schema({
    firstName: { type: String, minlength: [3, 'First name must be at least 3 characters long'], validate: {
validator(value){
return Name_Pattern.test(value);
},
message: 'First name may contain only english letters'
    } 
},
    lastName: { type: String, minlength: [5, 'Last name must be at least 5 characters long'], validate: {
        validator(value){
        return Name_Pattern.test(value);
        },
        message: 'Last name may contain only english letters'
            } },
    email: { type: String, required: [true, 'Email is required'], validate: {
        validator(value){
            return Email_Pattern.test(value);
            },
            message: 'Email must be valid and may contain only english letters'
    } },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;