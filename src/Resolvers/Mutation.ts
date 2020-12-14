import IMutation, { MutationArgs } from '../utils/IMutation';
import { UniqueLink, DeletedLink } from '../utils/Prisma/Link';

class Mutation implements IMutation {
  constructor() {
    this.post;
    this.updateLink;
    this.deleteLink;
  }

  public async post({ parent, args, context }: MutationArgs): Promise<UniqueLink> {
    const userId = getUserId(context)

    const link = await context.prisma.link.create({
      data: {
        description: args.description,
        url: args.url,
        postedBy: {
          connect: {
            id: userId
          }
        }
      }
    });
    
    context.pubsub.publish("NEW_LINK", link);
  
    return link;
  }

  public async updateLink({ parent, args, context }: MutationArgs): Promise<UniqueLink> {
    const { id } = args;

    const link = await context.prisma.link.update({
      where: {
        id: Number(id)
      },
      data: {
        description: args.description,
        url: args.url
      }
    });
  
    return link
  }

  public async deleteLink({ parent, args, context }: MutationArgs): Promise<DeletedLink> {
    const { id } = args;

    await context.prisma.link.delete({
      where: {
        id: Number(id)
      }
    });
  
    return {
      message: `Link with id: ${args.id} has been deleted`
    };
  }
}

export default new Mutation();

