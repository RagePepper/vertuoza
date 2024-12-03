import { gql } from "@apollo/client"

const GET_ENTITIES = gql`query {
    getEntities {
      id
      name
      ... on Contact {
        id
        name
        email
        phone
      }
      ... on Company {
        id
        name
        industry
        contactEmail
      }
    }
  }
`;

const GET_ENTITY = gql`query ($getEntityId: ID!) {
    getEntity(id: $getEntityId) {
      ... on Contact {
        id
        name
        email
        phone
      }
      ... on Company {
        id
        name
        industry
        contactEmail
      }
    }
}`

export { GET_ENTITIES, GET_ENTITY }