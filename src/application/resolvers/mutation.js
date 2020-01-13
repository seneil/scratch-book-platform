import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { APPLICATION_SECRET } = process.env;

const Mutation = {
  signup: (parent, args, { response, db }, info) => {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(args.password, salt);
    const email = args.email.toLowerCase();

    return db.mutation.createUser({
      data: {
        ...args, email, password,
      },
    }, info).then(user => {
      const token = jwt.sign({ userId: user.id }, APPLICATION_SECRET);

      response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });

      return user;
    });
  },
};

export default Mutation;
