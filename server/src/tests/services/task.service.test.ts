import { TaskService } from '../../services/tark.service';
import { prisma } from '../../utils/prisma';

// Mock do módulo prisma para substituir a implementação real durante o teste
// Aqui, mockamos especificamente a função prisma.task.create como jest.fn()
jest.mock('../../utils/prisma', () => ({
    prisma: {
        task: {
            create: jest.fn(), // mock da função create do prisma
        },
    },
}));

// Define o conjunto de testes para o método createTask do TaskService
describe('TaskService.createTask', () => {
    const mockUserId = 1; // ID do usuário usado nos testes

    // Teste para validar a criação normal da tarefa com título válido
    it('deve criar a tarefa normalmente se o nome for válido', async () => {
        const dadosValidos = {
            title: 'Tarefa válida', // título válido
            description: 'descrição qualquer',
        };

        // Objeto que representa a tarefa criada, como o prisma retornaria
        const mockTarefaCriada = {
            id: 42,
            ...dadosValidos,
            dueDate: null,
            priority: null,
            userId: mockUserId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Configura o mock da função prisma.task.create para resolver com o objeto acima
        (prisma.task.create as jest.Mock).mockResolvedValue(mockTarefaCriada);

        // Chama o método createTask do serviço com dados válidos
        const tarefa = await TaskService.createTask(mockUserId, dadosValidos);

        // Verifica se prisma.task.create foi chamado com os dados corretos para criar a tarefa
        expect(prisma.task.create).toHaveBeenCalledWith({
            data: {
                ...dadosValidos,
                dueDate: null,
                priority: undefined,
                userId: mockUserId,
            },
        });

        // Verifica se a tarefa retornada pelo método é exatamente igual ao mockTarefaCriada
        expect(tarefa).toEqual(mockTarefaCriada);
    });

    // Teste para validar a regra que não permite título começando com número
    it('deve lançar erro se o nome da tarefa começar com número', async () => {
        const dadosInvalidos = {
            title: '123Tarefa', // título inválido (começa com número)
            description: 'teste', // descrição qualquer
        };

        // Espera que a chamada a createTask com dados inválidos lance um erro com mensagem específica
        await expect(TaskService.createTask(mockUserId, dadosInvalidos)).rejects.toThrow(
            'O nome da tarefa não pode começar com número',
        );
    });
});
