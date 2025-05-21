/* eslint-disable @typescript-eslint/no-explicit-any */

// Mock do middleware de autenticação para simular a autenticação durante o teste
// Em vez de executar a lógica real, esse mock adiciona um userId fixo no objeto req e chama next()
jest.mock('../../middlewares/auth.middleware', () => ({
    authenticate: (req: any, res: any, next: any) => {
        req.userId = 1; // Simula que o usuário autenticado tem ID 1
        next(); // Continua para o próximo middleware ou rota
    },
}));

import request from 'supertest';
import app from '../../app';

// Define o conjunto de testes para o endpoint POST /api/tasks
describe('POST /api/tasks', () => {
    // Teste que verifica se a criação de uma tarefa via API funciona corretamente
    it('deve criar uma tarefa', async () => {
        // Faz uma requisição POST para /api/tasks enviando um objeto com o título da tarefa
        const response = await request(app).post('/api/tasks').send({ title: 'Nova tarefa' });

        // Verifica se o status da resposta HTTP é 201 (Created)
        expect(response.statusCode).toBe(201);
        // Verifica se o corpo da resposta contém o título da tarefa criada
        expect(response.body.title).toBe('Nova tarefa');
    });
});
