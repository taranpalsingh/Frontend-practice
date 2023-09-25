import { gql } from 'apollo-angular';

const LOGIN = gql`
    query {
        createUser {
            _id
            email
        }
    }
`

const SIGNUP = gql`
    query {
        createUser {
            _id
            email
        }
    }
`

const TODOS = gql`
    query {
        todos {
            id
            description
            done
        }
    }
`

const INSERT_TODO = gql`
    mutation  todos ($description: String!) {
        insert_todos(objects: [{ description: $description, done: false }]) {
            returning {
              id
              description
            }
          }
    }
`
export { 
    LOGIN, 
    SIGNUP,
    TODOS,
    INSERT_TODO
}