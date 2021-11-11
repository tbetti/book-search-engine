const {gql} = require('apollo-server-express');

// Define data and describe how db works
const typeDefs = gql `
    type User{
        _id: ID!
        username: String!
        email: String!
        savedBooks: [Book]
    }

    type Book{
        _id: ID!
        authors: [String]
        description: String!
        image: String
        link: String
        title: String!
    }

    input BookInput{
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Auth{
        token: ID!
        user: User
    }

    type Query{
        me: User
    }

    type Mutation{
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }
`

module.exports = typeDefs;