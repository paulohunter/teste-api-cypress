# 🚀 Projeto de Testes com Cypress

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)  
[![Cypress](https://img.shields.io/badge/Cypress-14.3.2-blue)](https://www.cypress.io/)

## 📋 Índice
- [Pré-requisitos](#️-pré-requisitos)
- [Instalação](#️-instalação)
- [Tecnologias](#️-tecnologias)
- [Execução](#️-execução)
- [Estrutura](#️-estrutura)
- [Licença](#️-licença)

## ⚙️ Pré-requisitos
- Node.js 18+
- npm 9+
- Git
- Docker (opcional para ServeRest)

## 💻 Instalação

### 1. Instalar Node.js
```bash
# Windows
Baixe o instalador em: https://nodejs.org/pt-br/download/

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verifique a instalação
node -v
npm -v
```

### 2. Instalar Cypress
```bash
npm install cypress --save-dev
```

### 3. Instalar dependências adicionais
```bash
npm install joi mocha mochawesome --save-dev
```

### 4. Configurar ServeRest
```bash
# Opção Docker (recomendada)
docker run -d -p 3000:3000 paulogoncalvesbh/serve-rest:latest

# Opção Node
npx serverest@latest
```

## 🛠 Tecnologias

| Tecnologia | Versão | Uso             |
|------------|--------|-----------------|
| Cypress    | 14.3.2 | Testes E2E/API   |
| Node.js    | 18.x   | Ambiente JS     |
| Joi        | 17.x   | Validação        |
| Mocha      | 10.x   | Test Runner      |
| ServeRest  | 2.x    | API de Testes    |

## ▶️ Execução

```bash
# Modo interativo
npx cypress open

# Modo headless
npx cypress run

# Gerar relatório
npm run test:report
```

## 📂 Estrutura

```bash
cypress/
├── e2e/
│   ├── login.cy.js
│   └── products.cy.js
├── fixtures/
├── support/
reports/
node_modules/
```

## 📝 Licença
MIT - [LICENSE](./LICENSE)