<h1 style="text-align: center; font-weight: bold;">Delliv API</h1>
  
  <div style="display: flex; align-items: center; justify-content: center">
    <img src="src/assets/logo.svg" height="100"  >
  </div>

<br>
<br>

## Sobre o Projeto

Backend para rrastreamento de entregas que permita aos usuários autenticados visualizar uma lista de pedidos, atualizar o status de cada pedido e fornecer recursos de autenticação e segurança.


### Tecnologias Usadas

- [NestJS]
- [Prisma]
- [TypeScript]
- [Docker]

### Como rodar a aplicação

```bash
# Clone este repositório
$ git clone https://github.com/rafaelsrabelo/api-delliv
# Acesse a pasta do projeto
$ cd api-delliv
# Instale as dependências
$ pnpm install
# Rodar banco de dados
$ docker-compose up -d
# Execute a aplicação em modo de desenvolvimento
$ pnpm run start:dev

```

