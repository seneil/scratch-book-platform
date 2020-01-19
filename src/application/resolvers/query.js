import { forwardTo } from 'prisma-binding';

const Query = {
  me: (parent, args, { request, db }, info) => {
    const { userId } = request;

    return userId
      ? db.query.user({ where: { id: userId } }, info)
      : null;
  },

  note: forwardTo('db'),

  notes: (parent, args, { request, db }, info) => {
    const { userId } = request;

    const first = args.first || 5;

    return userId
      ? db.query.notes({ where: { author: { id: userId } }, ...args, first }, info)
      : null;
  },
};

export default Query;
