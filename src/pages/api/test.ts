import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.user.findMany({
      include: {
        tasks: true,
        boards: true,
      },
    });

    const boards = await prisma.board.findMany({
      include: {
        creator: true,
        tasks: true,
      },
    });

    const tasks = await prisma.task.findMany({
      include: {
        board: true,
        assignee: true,
      },
    });


    // Format everything into readable HTML
    const html = `
      <html>
        <head>
          <title>Database Dump</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h2 { margin-top: 30px; }
            pre { background: #f4f4f4; padding: 10px; border-radius: 6px; }
          </style>
        </head>
        <body>
          <h1>📦 Full Database Dump</h1>

          <h2>👤 Users</h2>
          <pre>${JSON.stringify(users, null, 2)}</pre>

          <h2>📋 Boards</h2>
          <pre>${JSON.stringify(boards, null, 2)}</pre>

          <h2>🧩 Tasks</h2>
          <pre>${JSON.stringify(tasks, null, 2)}</pre>

        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
