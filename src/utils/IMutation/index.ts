import { Prisma, UniqueLink, DeletedLink } from '../Prisma/Link';

type Parent = {
  id: string;
  description: string;
  url: string;
}

type Args = {
  id: string;
  description: string;
  url: string;
}

export interface MutationArgs {
  parent: Parent;
  args: Args;
  context: Prisma
}

export default interface IMutation {
  post?: ({ parent, args, context }: MutationArgs) => Promise<UniqueLink>;
  updateLink?: ({ parent, args, context }: MutationArgs) => Promise<UniqueLink>;
  deleteLink?: ({ parent, args, context }: MutationArgs) => Promise<DeletedLink>;
};