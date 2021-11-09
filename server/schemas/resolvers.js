const {Book, User} = require('../models');

const resolvers = {
    Query: {
        // find a single user by either id or username
        // TO DO: find by id
        user: async (parent, {username}) =>{
            return User.findOne({username}).populate('books');
        }
    }
}

module.exports = resolvers;