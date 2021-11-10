const {Book, User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        // find a single user by either id or username
        // TO DO: find by id
        user: async (parent, {username}) =>{
            return User.findOne({username}).populate('books');
        }
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) =>{
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        }
    }
}

module.exports = resolvers;