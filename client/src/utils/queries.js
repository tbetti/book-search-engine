import { gql } from '@apollo/client';

// This will give us the User object with all coming along
export const QUERY_ME = gql`
  {
    me {
        _id
        username
        email
        savedBooks{
            bookId
            authors
            image
            description
            title
            link
        }
    }
  }
`;
