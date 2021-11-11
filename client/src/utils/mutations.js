import { gql } from '@apollo/client';

// Submit info when user added, return authentication
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

// Submit info when user logged in, return authentication
export const LOGIN_USER = gql`
    mutation login($email: String!, password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
                email
            }
        }
    }
`;

// Save book using book input data, return user
export const SAVE_BOOK = gql`
    mutation saveBook($input: BookInput){
        saveBook(input: $input){
            _id
            username
            email
            savedBooks{
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`;

// Remove book using book ID, return user
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!){
        removeBook(bookId: $bookId){
            _id
            username
            email
            savedBooks{
                _id
                authors
                description
                image 
                link
                title
            }
        }
    }
`;