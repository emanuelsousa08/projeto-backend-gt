# 🔌 API E-commerce Drip Store - Projeto Backend do curso GTech 🛒

Esta é uma API backend desenvolvida em Node.js para dar suporte a aplicação de e-commerce Drip Store. Ela gerencia usuários, autenticação, produtos (categorias, imagens dos produtos e opções de produtos), utilizando um banco de dados MySQL.

## 🔥 Funcionalidades

- 👤 **CRUD Completo de usuários**, com registro e login de usuários com armazenamento de senha;
- 🔐 **Sistema de Autenticação** , com criptografia de senhas com Bcrypt;
- 🔑 **Middleware**, com autenticação JWT;
- 🛍️ **CRUD Completo de Categorias** dos produtos;
- 👟 **CRUD completo de produtos** com criação, modificação e exclusão dos mesmos;
- 🔎 **Endpoint para busca avançada** de produtos, com filtros por nome, descrição, faixa de preço, categorias e opções;
- 🧩 **Ambiente de desenvolvimento** para separação de lógica dos controllers existentes;
- 🖥️ **Conexão com banco de dados** MySQL usando Sequelize.

## 📑 Endpoints Principais

| Método  | Endpoint                | Descrição                        | Autenticação |
|---------|-------------------------|----------------------------------|--------------|
| POST    | /v1/usuario             | Cria um novo usuário             | Não          |
| POST    | /v1/usuario/token       | Gera token JWT (login)           | Não          |
| GET     | /v1/usuario/:id         | Busca usuário por ID             | Não          |
| PUT     | /v1/usuario/:id         | Atualiza usuário                 | Sim          |
| DELETE  | /v1/usuario/:id         | Deleta usuário                   | Sim          |
| GET     | /v1/categoria/pesquisa  | Lista/pesquisa categorias        | Não          |
| GET     | /v1/categoria/:id       | Busca categoria por ID           | Não          |
| POST    | /v1/categoria           | Cria nova categoria              | Sim          |
| PUT     | /v1/categoria/:id       | Atualiza categoria               | Sim          |
| DELETE  | /v1/categoria/:id       | Deleta categoria                 | Sim          |
| GET     | /v1/produto/pesquisa    | Lista/pesquisa produtos          | Não          |
| GET     | /v1/produto/:id         | Busca produto por ID             | Não          |
| POST    | /v1/produto             | Cria novo produto                | Sim          |
| PUT     | /v1/produto/:id         | Atualiza produto                 | Sim          |
| DELETE  | /v1/produto/:id         | Deleta produto                   | Sim          |

> **Observação:**  
> Endpoints marcados com "Sim" em autenticação exigem envio do token JWT no header Authorization.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- Node.js (versão 14 ou superior);
- MySQL (certifique-se de que esteja em execução).

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) - Ambiente de criação do servidor que executa Javascript;
- [Express](https://expressjs.com/) - Framework web para construção de API;
- [MySQL](https://www.mysql.com/) com [mysql2](https://www.npmjs.com/package/mysql2) - Sistema de gerenciamento de banco de dados relacional (SGBDR) de código aberto e o MySQL2 é uma biblioteca cliente para MySQL escrita em JavaScript;
- [Sequelize](https://sequelize.org/) (ORM) - ORM (Object-Relational Mapper) para Node.js, escrito em JavaScript;
- [Dotenv](https://www.npmjs.com/package/dotenv) - Biblioteca que carrega variáveis de ambiente de um arquivo .env;
- [Nodemon](https://www.npmjs.com/package/nodemon) -  Ferramenta de linha de comando para desenvolvimento em Node.js
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - Biblioteca JavaScript utilizada para hash de senhas de forma segura
- [JWT (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken) - Padrão aberto (RFC 7519) para a criação de tokens compactos e independentes.

## 🔧 Instalação

Clone o repositório e instale as dependências:

```bash
# Clone o repositório
git clone https://github.com/emanuelsousa08/projeto-backend-gt.git

# Acesse a pasta do projeto
cd projeto-backend-gt

# Instale as dependências
npm install
```
## ▶️ Como Executar

# Crie seu arquivo de configuração

Por segurança, o arquivo .env não está no repositório. Você deve criar uma cópia do arquivo de exemplo para configurar suas variáveis. Para copiar, digite o seguinte comando:

```bash
# Se estiver no Windows, use "copy" ao invés de "cp".
# Não se esqueça de editar as variáveis de amebiente conforme seu banco de dados
cp .example.env .env
```
Em seguida, execute/rode o servidor:

```bash
npm run dev

# A API estará disponível em: http://localhost.3000/v1
```
Para executar/rodar os testes, execute o seguinte comando:

```bash
npm run test
```

## 👥 Colaboradores

Agradecimentos especiais a todos que contribuíram para este projeto:

- 👑 Emanuel Sousa (O protagonista) - @emanuelsousa08
- Kamila Vieira - @kamilavieira

## 🧾 Licença

Este projeto está licenciado sob os termos da licença MIT.
Você pode ler o conteúdo completo abaixo:

<details>
<summary>🔒 Ver licença MIT</summary>
MIT License

Copyright (c) 2025 Emanuel Sousa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

</details>
