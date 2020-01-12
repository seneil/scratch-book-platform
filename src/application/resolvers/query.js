const Query = {
  me: (parent, args, { request, db }, info) => {
    const { userId } = request;

    return userId
      ? db.query.user({ where: { id: userId } }, info)
      : null;
  },
};

export default Query;
