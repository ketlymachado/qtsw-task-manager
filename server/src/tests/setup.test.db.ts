import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const setupTestDB = async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            id: 1,
            name: 'Usuário de Teste',
            email: 'teste@example.com',
            password: 'senha123',
        },
    });
};

export const disconnectTestDB = async () => {
    await prisma.$disconnect();
};
