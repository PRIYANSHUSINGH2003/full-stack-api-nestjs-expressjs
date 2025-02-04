import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: "user1@example.com" },
    update: {},
    create: {
      name: "User One",
      email: "user1@example.com",
      password: "securepassword123",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "user2@example.com" },
    update: {},
    create: {
      name: "User Two",
      email: "user2@example.com",
      password: "anothersecurepassword"
    },
  });

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      name: "Project Alpha",
      description: "First test project",
      status: "PLANNED",
      userId: user1.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Project Beta",
      description: "Second test project",
      status: "ONGOING",
      userId: user2.id,
    },
  });

  // Create tasks
  await prisma.task.createMany({
    data: [
      {
        title: "Setup Database",
        description: "Initialize Neon PostgreSQL",
        status: "TODO",
        projectId: project1.id,
        assignedUserId: user1.id,
      },
      {
        title: "Build API",
        description: "Develop REST API using NestJS",
        status: "IN_PROGRESS",
        projectId: project2.id,
        assignedUserId: user2.id,
      },
    ],
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
