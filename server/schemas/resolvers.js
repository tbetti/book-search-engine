const {Book, User} = require('../models');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express')

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
        },
        login: async (parent, {username, email, password}) =>{
            // I don't know how to use username OR password here
            const user = await User.findOne ({username, email});
            const validatePw = await user.isCorrectPassword(password);
            const token = signToken(user);

            // If username or password incorrect, throw error
            if (!user){
                throw new AuthenticationError('Username or password incorrect');
            }
            if (!validatePw){
                throw new AuthenticationError('Username or password incorrect');
            }
            return {token, user};
        }
    }
}

module.exports = resolvers;