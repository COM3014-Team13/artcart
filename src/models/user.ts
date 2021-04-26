import mongoose from 'mongoose';

// An interface that describes the properties that are required to create new users.

interface UserAttrs {
    email: string;
    password: string;
    name: string;
}

//An interface that describes the properties that a user model has.

interface UserModel extends mongoose.Model <UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a user document has.

interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
    name: string;
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    
    password:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model <UserDoc, UserModel> ('User', userSchema);

const buildUser = (attrs: UserAttrs) => {
    return new User(attrs);
};

// const user = User.build({
//     email:'test@abv.bg',
//     password:'test123',
//     name: 'John'
// });

export { User};