const { PrismaClient, TaskStatus, TaskPriority } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Upsert user
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'Patrick',
      lastName: 'Lay',
      email: 'test@gmail.com',
      password: 'contoh',
      verified: true,
    },
  });

  // Upsert board
  const board = await prisma.board.upsert({
    where: { boardCode: 'PA-1' },
    update: {},
    create: {
      title: 'Project Alpha',
      boardCode: 'PA-1',
      description: 'Main project board',
      creator: { connect: { id: user.id } },
    },
  });

  // Insert 3 tasks
  const tasks = [
    {
      taskKey: 'PA-1',
      title: 'UserStory 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.TODO,
      dateCreated: new Date(2025, 2, 25),
      dateFinish: null,
    },
    {
      taskKey: 'PA-2',
      title: 'UserStory 2',
      description: 'This is the second user story.',
      priority: TaskPriority.HIGH,
      status: TaskStatus.IN_PROGRESS,
      dateCreated: new Date(2025, 2, 26),
      dateFinish: null,
    },
    {
      taskKey: 'PA-3',
      title: 'UserStory 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      priority: TaskPriority.LOW,
      status: TaskStatus.DONE,
      dateCreated: new Date(2025, 2, 27),
      dateFinish: null,
    },
  ];
  

  for (const task of tasks) {
    await prisma.task.create({
      data: {
        ...task,
        board: { connect: { id: board.id } },
        assignee: { connect: { id: user.id } },
      },
    });
  }

  console.log('Seed complete: 1 board, 3 tasks');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
