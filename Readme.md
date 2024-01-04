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

## Testando as Requisições

Para facilitar os testes das requisições da API, fornecemos um arquivo do Insomnia que você pode importar. Siga as instruções abaixo:

1. Baixe o [Insomnia](https://insomnia.rest/download).
2. Abra o Insomnia e clique em **Application > Preferences**.
3. Na guia **Data**, clique em **Import Data > From File**.
4. Selecione o arquivo `insomnia/delliv-api-insomnia.json` do projeto.
5. As requisições agora estão disponíveis no seu ambiente do Insomnia.

Lembre-se de que algumas dessas requisições exigem autenticação. Certifique-se de seguir estes passos:

- Faça uma solicitação de autenticação (/ap1/v1/auth/signin) para obter um token JWT.
- Copie o token JWT gerado.
- Para as requisições que exigem autenticação, cole o token no cabeçalho de autorização usando o formato "Bearer Token".

Certifique-se de ajustar as configurações de ambiente conforme necessário para o seu ambiente local.

### Como rodar a aplicação

```bash
# Clone o repositório
git clone https://github.com/rafaelsrabelo/api-delliv

# Criar as variaveis de ambiente
Troque o example.env por .env

# Acesse a pasta do projeto
cd api-delliv

# Inicie os containers Docker com os serviços de backend
docker-compose up -d
