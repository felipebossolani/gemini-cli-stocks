
# Projeto de Consulta de Ações

Este é um projeto web para consulta de ações brasileiras, construído com Next.js, React, e Tailwind CSS.

## Instalação

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
```

## Executando em Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento, utilize o comando:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver a aplicação.

## Build para Produção

Para gerar a versão de produção do projeto, execute:

```bash
npm run build
```

Este comando cria uma pasta `out` com os arquivos estáticos da aplicação.

## Publicando na Vercel

A Vercel é a plataforma recomendada para fazer o deploy de aplicações Next.js.

1.  **Crie uma conta na Vercel:**

    Acesse [vercel.com](https://vercel.com) e crie uma conta (você pode usar sua conta do GitHub).

2.  **Importe o projeto:**

    No dashboard da Vercel, clique em "Add New..." > "Project". Conecte sua conta do GitHub e selecione o repositório `gemini-cli-stocks`.

3.  **Configure e faça o deploy:**

    A Vercel irá detectar automaticamente que é um projeto Next.js e preencher as configurações de build. Você não precisa alterar nada. Clique em "Deploy".

    A Vercel irá construir e publicar sua aplicação. Ao final do processo, você receberá uma URL para acessar sua aplicação online.
