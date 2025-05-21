# Como testar

## Testes unitários (backend)

`cd server`

`npm install --save-dev jest ts-jest @types/jest`

Criar arquivo `.env.test`

```ENV
    DATABASE_URL="file:./dev-test.db"
```

Criar arquivo de configuração `jest.setup.ts`

> https://github.com/ketlymachado/qtsw-task-manager/blob/automated-tests/server/jest.setup.ts

Criar arquivo de configuração `jest.config.ts`

> https://github.com/ketlymachado/qtsw-task-manager/blob/automated-tests/server/jest.config.ts

Ajustar o `package.json`:

```JSON
    "scripts": {
        ...
        "test": "jest",
        "test:unit": "jest src/tests/services",
        "migrate:test": "cross-env DATABASE_URL='file:./dev-test.db' prisma migrate reset --force --skip-seed --schema=../prisma/schema.prisma",
        "run:jest": "jest src/tests/routes",
        "test:integration": "npm-run-all migrate:test run:jest",
        "coverage": "jest --coverage"
    },
```

Criar pastas `src/tests/services`

Criar arquivo de teste `src/tests/services/task.service.test.ts`

Criar testes unitários

> https://github.com/ketlymachado/qtsw-task-manager/blob/automated-tests/server/src/tests/services/task.service.test.ts

`npm run test:unit`

## Testes de integração (backend)

`npm install npm-run-all cross-env supertest @types/supertest --save-dev`

Criar arquivo de configuração `src/tests/setup.test.db.ts`

> https://github.com/ketlymachado/qtsw-task-manager/blob/automated-tests/server/src/tests/setup.test.db.ts

Criar pasta `src/tests/routes`

Criar arquivo de teste `src/tests/routes/task.routes.test.ts`

Criar teste de integração

> https://github.com/ketlymachado/qtsw-task-manager/blob/automated-tests/server/src/tests/routes/task.routes.test.ts

`npm run test:integration`

## Testes unitários (frontend)

`cd ../client`

`npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react @vitest/coverage-v8`

Ajustar o `vite.config.ts`:

```Typescript
    import { defineConfig } from 'vitest/config';
    ...
    export default defineConfig({
        ...
        test: {
            environment: 'jsdom',
            coverage: {
                reporter: ['text', 'html'],
            },
            globals: true,
        },
    });
```

Ajustar o `package.json`:

```JSON
    "scripts": {
        ...
        "test": "jest",
        "test:unit": "jest src/tests/services",
        "test:integration": "jest src/tests/routes",
        "coverage": "jest --coverage"
    },
```

Criar arquivo de teste `/src/pages/CreateTask/index.test.tsx`

Criar testes unitários

> https://github.com/ketlymachado/qtsw-task-manager/blob/automated-tests/client/src/pages/CreateTask/index.test.tsx

`npm run test`

---

`npm run coverage`

> [Back-end] Acessar file:///C:/.../qtsw-task-manager/server/coverage/lcov-report/index.html
>
> [Front-end] Acessar file:///C:/.../qtsw-task-manager/client/coverage/index.html

---
