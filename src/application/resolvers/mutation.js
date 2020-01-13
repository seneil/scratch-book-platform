import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { APPLICATION_SECRET } = process.env;

const responseToken = (response, userId) => {
  const token = jwt.sign({ userId }, APPLICATION_SECRET);

  response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
};

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
      responseToken(response, user.id);

      return user;
    });
  },

  signin: (parent, args, { response, db }) => {
    const email = args.email.toLowerCase();

    return db.query.user({
      where: { email },
    }).then(user => {
      const isPasswordValid = bcrypt.compareSync(args.password, user.password);

      if (!isPasswordValid) return Promise.reject();

      responseToken(response, user.id);

      return user;
    }).catch(() => {
      throw new Error('No such user found');
    });
  },
};

export default Mutation;
