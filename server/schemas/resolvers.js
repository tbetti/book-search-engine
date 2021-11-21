// Don't need Book because it is a child of the User, so we can always reference User to find book
const { User } = require('../models');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express')

const resolvers = {
    Query: {
        // find a single user by either id or username
        // me is person interacting with code
        // args is req.body; context tells us who is interacting
        me: async (parent, args, context) =>{
            if(context.user){
                // excludes password form User object
                const userData = await User.findOne({_id: context.user._id}).select('-__v -password');
                return userData;
            }

            throw new AuthenticationError('Not logged in!');
        },
        getUsers: async (parent, args) =>{
            return User.find();
        }
    },

    Mutation: {
        // args could also be destructured as {username, password}
        addUser: async (parent, args) =>{
            console.log(args);
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {args}) =>{
            const user = await User.findOne(args.email);
            const validatePw = await user.isCorrectPassword(args.password);
            const token = signToken(user);

            // If username or password incorrect, throw error
            if (!user){
                throw new AuthenticationError('Username or password incorrect');
            }
            if (!validatePw){
                throw new AuthenticationError('Username or password incorrect');
            }
            return {token, user};
        },
        saveBook: async (parent, {bookData}, context) =>{
            if (context.user){
                // get array and push new book onto array
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedBooks: bookData}},
                    {new: true}
                )

                return updatedUser;
            }

            throw new AuthenticationError('User not logged in!');
        },
        removeBook: async (parent, {bookId}, context) =>{
            if (context.user){
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    // {bookId} = bookData.bookId - curly braces destructure
                    {$pull: {savedBooks: {bookId}}},
                    {new: true}
                )
                return updatedUser;
            }
            throw new AuthenticationError('User not logged in!');
        }
    }
}

module.exports = resolvers;