# API de Produtos

Esta é uma API para gerenciar informações sobre produtos, permitindo operações CRUD (Create, Read, Update, Delete). A API foi construída usando Express.js, Knex.js e utiliza um banco de dados SQLite. Ela segue as boas práticas de uma arquitetura REST e utiliza os métodos padrão do protocolo HTTP para interações. Além disso, a API possui rotas dedicadas à criação e autenticação de usuários, e utiliza o JSON Web Token (JWT) para processos de autenticação, garantindo a segurança e autorização adequadas.

## Endpoints

### Usuários

| Método | Endpoint       | Descrição                                                 |
| ------ | -------------- | --------------------------------------------------------- |
| POST   | /users         | Adiciona um novo usuário à base de dados.                 |
| POST   | /users/session | Realiza a autenticação de um usuário e inicia uma sessão. |

OBS.: Não é possível cadastar um usuário como administrador, para testar a api com acesso de administrardor utilize as seguintes credenciais:

```
email: admin@test.com
password: 123456
```

### Produtos

Os endpoints abaixo são restritos a usuários autentificados.

| Método | Endpoint      | Descrição                                                    | Restrito a Administradores |
| ------ | ------------- | ------------------------------------------------------------ | -------------------------- |
| GET    | /products     | Retorna a lista de todos os produtos.                        | Não                        |
| GET    | /products/:id | Retorna os detalhes de um produto específico com base no ID. | Não                        |
| POST   | /products     | Adiciona um novo produto à base de dados.                    | Sim                        |
| PUT    | /products/:id | Atualiza os detalhes de um produto existente com base no ID. | Sim                        |
| DELETE | /products/:id | Exclui um produto com base no ID.                            | Sim                        |

## Estrutura de Dados

### Usuários

| Campo    | Tipo                    | Descrição                              |
| -------- | ----------------------- | -------------------------------------- |
| id       | UUID                    | Identificador Único                    |
| name     | String                  | Nome do usuário                        |
| email    | String                  | E-mail do usuário                      |
| password | String                  | Senha do usuário (mínimo 6 caracteres) |
| role     | Enum: (`user`, `admin`) | Função do usuário                      |

### Produtos

| Campo      | Tipo    | Descrição                                              |
| ---------- | ------- | ------------------------------------------------------ |
| id         | UUID    | Identificador Único                                    |
| name       | String  | Nome do produto                                        |
| descripton | String  | Descrição do produto                                   |
| price      | Float   | Preço do produto (número não negativo)                 |
| quantity   | Integer | Quantidade do produto em estoque (número não negativo) |

## Deploy

[https://exercicio03-node-puc-api.onrender.com/](https://exercicio03-node-puc-api.onrender.com/)
