# Projeto Teste para Desenvolvedores Fullstack Vojo

Este projeto é parte do processo de seleção de desenvolvedores fullstack para a plataforma Vojo.

>Vojo é uma plataforma digital que conecta pessoas sem trabalho à oportunidades de geração de renda.

## **Sobre o Projeto**

Este é o projeto base da nova plataforma Vojo. Aqui você encontra o projeto backend, que está sendo desenvolvido em [NestJS](https://docs.nestjs.com/) e o nosso webapp em em [ReactJS](https://pt-br.reactjs.org/).

A API de autenticação já está implementada, assim como a view de Login. 

## **Requisitos**
**1. Backend:** Implementar novo módulo ***jobs*** na API com os seguintes endpoints:
* **GET** /jobs

    * listar as vagas que estão cadastradas no nosso banco de dados.

* **PUT** / jobs/:id

    * atualização de uma vaga específica.
    * este endpoint só pode ser acessado por usuários autenticados por `Authorization Bearer Token`.

**2. Frontend:** Implementar visualização da listagem de vagas e formulário de atualização de vaga específica.

**3. Infraestrutura:** Fazer o deploy da aplicação no [Heroku](https://www.heroku.com/)

## **Instruções**
1. Faça o **`clone`** deste repositório.
2. Trabalhe localmente no seu projeto.
3. Quando tiver finalizado, suba o seu projeto para um **projeto privado** no GitHub.
4. Nos envie o link do seu repositório e do aplicativo online (Heroku). Não esqueça de adicionar os nossos usuários como colaboradores do seu repositório para que possamos acessar.

Qualquer dúvida, por favor, entre em contato **[conosco](mailto:devteam@vojo.com.br)**.

## **Instruções de instalação (Frontend)**
O projeto frontend utiliza dependencias armazenadas no registry do Github. Para que você possa fazer a instalação das dependencias sem receber um erro de autenticação `401`, é necessário fazer o login utilizando o NPM. Para isso, logue-se utilizando os seguinte comando:

```sh
npm login --registry=https://npm.pkg.github.com
```

Para soluções de erros ou mais detalhes, acesse esta [documentação](https://help.github.com/pt/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#), você pode encontrar diversos métodos de autenticação. Alternativamente, consulte também links externos como [esse](https://stackoverflow.com/questions/58637544/unable-to-login-to-github-package-registry).

## **Mantenedores**

👤 **Kleber Costa**


## **Licenças**

Este projeto pertence à [MindLab](https://www.mindlab.com.br/) e não deverá ser reproduzido ou divulgado sem a prévia autorização da empresa.
