import { 
  ApolloServer, 
  IResolvers as IResolversApollo,
  PubSub
} from 'apollo-server';
import { readFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';

import Subscribe from './Resolvers/Subscription';
import Mutation from './Resolvers/Mutation';

const pubSub = new PubSub();
const prisma = new PrismaClient();

// resolvers: implementação do schema acima.
const resolvers = {
  // Query: {
  //   info: () => `Essa e a API de clonar noticias`,
  //   feed: async (parent, args, context) => {
  //     const allLinks = await context.prisma.link.findMany();

  //     return allLinks
  //   }, // passo a array de Links
  //   link: async (parent, args, context) => {
  //     const { id } = args;

  //     const link = await context.prisma.link.findUnique({
  //       where: {
  //         id: Number(id)
  //       }
  //     });

  //     return link;
  //   }
  // },

  // args: São os argumentos que o schema Mutation > post recebe.
  // nesse caso a description e a url que sera criada.
  Mutation,
  Subscribe
};

const server = new ApolloServer({
  typeDefs: readFileSync(
    // indicando para o apollo onde esta minha schema.
    join(__dirname, 'schema.graphql'),
    'utf-8'
  ),
  resolvers: resolvers as unknown as IResolversApollo,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubSub,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    }
  }
});

server
  .listen(3333)
  .then(({ url }) => {
    console.log(`Server is running on ${url}`)
  });