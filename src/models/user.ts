import mongoose from 'mongoose';
import { Password } from '../services/password';

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

userSchema.pre('save', async function(done){
    if (this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
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