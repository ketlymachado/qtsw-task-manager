import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { CreateTask } from './index';
import { MemoryRouter } from 'react-router-dom';

// Mock do contexto de autenticação para fornecer um token falso durante os testes
vi.mock('../../context/AuthContext', () => ({
    useAuth: () => ({ token: 'fake-token' }), // sempre retorna token fake
}));

// Cria um mock da função create da API que será utilizada no teste
const mockCreate = vi.fn().mockResolvedValue({});
// Mock do módulo da API para substituir a função create real pela mockada
vi.mock('../../api/index', () => ({
    create: (...args: any[]) => mockCreate(...args), // encaminha chamadas para o mockCreate
}));

// Define o conjunto de testes para o componente CreateTask
describe('CreateTask (teste unitário)', () => {
    // Teste específico que verifica se a função create da API é chamada com os dados corretos
    it('chama a função create da API com os dados do formulário', async () => {
        // Renderiza o componente CreateTask dentro do MemoryRouter para simular o ambiente do React Router
        render(
            <MemoryRouter>
                <CreateTask />
            </MemoryRouter>,
        );

        // Simula o usuário digitando "Minha tarefa" no campo de input cujo label contém "título"
        fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Minha tarefa' } });

        // Usa `act` para garantir que a interação e a mudança de estado sejam tratadas corretamente
        await act(async () => {
            // Simula o clique no botão de criar tarefa (botão com texto "criar tarefa")
            fireEvent.click(screen.getByRole('button', { name: /criar tarefa/i }));
        });

        // Verifica se o mockCreate foi chamado com um objeto contendo o título correto e com o token falso
        expect(mockCreate).toHaveBeenCalledWith(
            expect.objectContaining({ title: 'Minha tarefa' }),
            'fake-token',
        );
    });
});
