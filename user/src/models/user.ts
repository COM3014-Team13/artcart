import mongoose from 'mongoose';
import { Password } from '../services/password';

enum userRole {
  'seller',
  'customer'
}

// An interface that describes the properties that are required to create new users.

interface UserAttrs {
  email: string;
  password: string;
  name: string;
  role: userRole;
}

//An interface that describes the properties that a user model has.

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a user document has.

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: userRole;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['customer', 'seller'],
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User };
