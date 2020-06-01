# Vojo Backend
Projeto backend desenvolvido em [NestJS](https://docs.nestjs.com/) TypeScript para a aplicação VOJO.

## Instalação

```bash
$ yarn
```

## Rodado o projeto

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Scripts adicionais

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Antes de começar
* Através do endpoint de registro de usuário, cadastre um novo usuário com os seus dados para usar nos testes durante o desenvolvimento.
* Configure o banco de dados com os dados recebidos do recrutador.
* Collections disponíveis para utilização no banco de dados:

  * `users`
  * `jobs`

## Endpoints disponíveis
* **POST** `/v3/auth/register` : cadastro de novo usuário, sem retorno de dados.
* **POST** `/v3/auth/login` : login de usuário, retorna o token em header `Vojo-Authorization`.
* **GET** `/v3/auth/me` : rota autenticada com header `Authorization Bearer Token`, retorna os dados do usuário autenticado.

## Endpoints que precisam ser implementados
* **GET** `/v3/jobs` : listagem de vagas disponíveis.
* **PUT** `/v3/jobs/:id` : atualização de vaga específica.
