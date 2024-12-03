import { gql } from "@apollo/client"

const CREATE_ENTITY = gql`
mutation CreateEntity($input: CreateEntityInput) {
  createEntity(input: $input) {
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
`

const UPDATE_ENTITY = gql`
mutation UpdateEntity($input: UpdateEntityInput) {
  updateEntity(input: $input) {
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

export default { UPDATE_ENTITY, CREATE_ENTITY }


  