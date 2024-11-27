import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import database from './database.js'
import { GraphQLError } from 'graphql';
// import { Company, Contact } from './models'
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

enum EntityType {
  COMPANY = 'Company',
  CONTACT = 'Contact',
};

const resolvers = {

    Entity: {
      __resolveType: (entity) => {
        return EntityType[entity.entityType]
      },
    },
    Query: {
      getEntities: () => { return  database.entities.map((entity) => {
          return {...entity}
      })},
      getEntity: (_, { id }) => { 
        const entity = database.entities.find((entity) =>  entity.id === id );

        return entity
      }
    },
    Mutation: {
      updateEntity: (_, { input }) => {

        if(input.id){

          database.entities.map((entity) => {
            if(entity.id === input.id){
              return {...entity, ...input}
            }

            return entity
          })

        }
        else {
          throw new GraphQLError('Field "Id" is required.', {
            extensions: {
              code: 'BAD_REQUEST',
            },
          });
        }
      },
      createEntity: (_, { input }) => {

        if(input?.name) {
          let entity = {
            ...input,
            id: Math.floor(Math.random()*1000)
          };

          database.entities.push(entity);
          return entity
        } else {
          throw new GraphQLError('Field "name" is required.', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }
      },
    }
  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);