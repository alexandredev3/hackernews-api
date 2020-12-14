import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // const newLink = await prisma.link.create({
  //   data: {
  //     description: 'Fullstack tutorial for GraphQL',
  //     url: 'www.howtographql.com'
  //   }
  // });

  const id = 1;

  await prisma.link.findUnique({
    where: {
      id: id
    }
  });

  const allLinks = await prisma.link.findMany();

  // const allLinks = await prisma.link.findMany();

  console.log(allLinks);
};

main()
  .catch((error) => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  });