<h1 style="text-align: center; font-weight: bold;">Delliv API</h1>
<br>
<br>

## Sobre o Projeto

O Delliv API é um backend desenvolvido para oferecer funcionalidades avançadas de rastreamento de entregas, proporcionando aos usuários autenticados uma experiência intuitiva e segura. Utilizando o padrão RESTful, a aplicação implementa autenticação com JWT (JSON Web Token) para garantir a segurança das operações.

### Tecnologias Usadas

- [NestJS]: Um framework Node.js progressivo para construir aplicativos eficientes e escaláveis.
- [Prisma]: Um ORM (Object-Relational Mapping) moderno e robusto para interagir com o banco de dados.
- [TypeScript]: Uma linguagem de programação que adiciona tipos ao JavaScript, proporcionando mais robustez e autocompletar durante o desenvolvimento.
- [Docker]: Uma plataforma para desenvolver, enviar e executar aplicativos em contêineres.

### Funcionalidades Principais

- **Rastreamento de Entregas**: Visualize uma lista de pedidos e atualize o status de cada entrega.
- **Autenticação com JWT**: Garanta a segurança das operações com autenticação baseada em JSON Web Tokens.
- **Documentação da API**: Explore e integre facilmente com a API através do Swagger, acessível em [http://localhost:3333/api](http://localhost:3333/api).
- **Banco de Dados Prisma**: Gerencie e explore os dados armazenados pela aplicação através da interface amigável em [http://localhost:5555/](http://localhost:5555/).

### Como rodar a aplicação

```bash
# Clone este repositório
$ git clone https://github.com/rafaelsrabelo/api-delliv
# Acesse a pasta do projeto
$ cd api-delliv
# Instale as dependências
$ pnpm install
# Rodar banco de dados com docker
$ docker-compose up -d
# gerar o schema
$ pnpm run prisma:generate
# gerar as migrações
$ pnpm run prisma:migrate dev
#  subir a aplicação
$ pnpm run start:dev
#  subir banco de dados com prisma
$ pnpm prisma studio

#  Configurações .env
$ lembrar de transformar o arquivo .env.example em .env
