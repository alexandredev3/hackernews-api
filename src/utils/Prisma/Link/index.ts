export type AllLinks = {
  data: {
    feed: Array<{
      id: number;
      description: string;
      url: string;
    }>
  }
}

export type UniqueLink = {
  data: {
    post: {
      id: number;
      description: string;
      url: string;
    }
  }
}

export type DeletedLink = {
  message: string;
}

type Create = {
  data: {
    description: string;
    url: string;
    postedBy: {
      connect: {
        id: string
      }
    }
  }
}

type Update = {
  where: {
    id: number;
  },
  data: {
    description: string;
    url: string;
  }
}

type Delete = {
  where: {
    id: number;
  },
}

type Unique = {
  where: {
    id: number;
  },
}

export interface Link {
  create({ data }: Create): Promise<UniqueLink>;
  findMany(): Promise<AllLinks>;
  findUnique({ where }: Unique): Promise<UniqueLink>;
  update({ where, data }: Update): Promise<UniqueLink>;
  delete({ where }: Delete): Promise<DeletedLink>
}

export interface Prisma {
  prisma: {
    link: Link;
  };
  pubsub: {
    publish(title: string, link: UniqueLink): void;
    asyncIterator(title: string): void;
  };
}