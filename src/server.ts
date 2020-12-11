import { ApolloServer, IResolvers } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';

interface IParent {
  id: string;
  description: string;
  url: string;
}

interface IArgs {
  id: string;
  description: string;
  url: string;
}

const links = [
  {
    id: 'link-0',
    description: 'FullStack tutorial for Graphql',
    url: 'www.howtographql.com'
  }
]

let idCount = links.length;

console.log(idCount)

// resolvers: implementação do schema acima.
const resolvers = {
  Query: {
    info: () => `Essa e a API de clonar noticias`,
    feed: () => links, // passo a array de Links
    link: (parent: IParent, args: IArgs) => links.find(link => link.id === args.id)
  },

  // args: São os argumentos que o schema Mutation > post recebe.
  // nesse caso a description e a url que sera criada.
  Mutation: {
    post: (parent: IParent, args: IArgs) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }


      links.push(link)

      return link;
    },
    updateLink: (parent: IParent, args: IArgs) => {
      const linkIndex = links.findIndex(link => link.id === args.id)

      const link = {
        id: args.id,
        description: args.description,
        url: args.url
      }

      links[linkIndex] = link;

      return link;
    },
    deleteLink: (parent: IParent, args: IArgs) => {
      const linkIndex = links.findIndex(link => link.id === args.id);

      links.splice(linkIndex, 1);

      return `${args.id} has been deleted`;
    }
  },

  // aqui na implementação do Link Schema.
  // recebo as propriedades do objeto links pelo argumento parent(ou root) da função de cada campo.
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url
  // }
};

const server = new ApolloServer({
  typeDefs: readFileSync(
    // indicando para o apollo onde esta minha schema.
    join(__dirname, 'schema.graphql'),
    'utf-8'
  ),
  resolvers
});

server
  .listen(3333)
  .then(({ url }) => {
    console.log(`Server is running on ${url}`)
  });