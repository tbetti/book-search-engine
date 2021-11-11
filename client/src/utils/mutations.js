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
    mutation saveBook($authors: [String], $description: String!, $bookId: String!, $image: String, link: String, title: String!){
        saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title){
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

// Remove book using book ID, return user
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!){
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