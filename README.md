
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

## Publicando no GitHub Pages

Para publicar o projeto no GitHub Pages, siga os passos abaixo:

1. **Instale a biblioteca `gh-pages`:**

   ```bash
   npm install gh-pages --save-dev
   ```

2. **Configure o `package.json`:**

   Adicione as seguintes propriedades ao seu `package.json`:

   ```json
   {
     "homepage": "https://<seu-usuario-github>.github.io/<seu-repositorio>",
     // ...
   }
   ```

   Adicione os seguintes scripts ao seu `package.json`:

   ```json
   {
     "scripts": {
       // ...
       "predeploy": "npm run build",
       "deploy": "gh-pages -d out"
     }
   }
   ```

3. **Configure o `next.config.mjs`:**

   Adicione a seguinte configuração ao seu `next.config.mjs` para garantir que os assets sejam carregados corretamente no GitHub Pages:

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     // Optional: Add a trailing slash to all paths `/about` -> `/about/`
     // trailingSlash: true,
     // Optional: Change the output directory `out` -> `dist`
     // distDir: 'dist',
   }

   export default nextConfig
   ```

4. **Faça o deploy:**

   Execute o comando de deploy:

   ```bash
   npm run deploy
   ```

   Este comando irá criar uma branch `gh-pages` em seu repositório e publicar os arquivos da pasta `out` nela.

5. **Configure o GitHub Pages:**

   No seu repositório do GitHub, vá em "Settings" > "Pages". Em "Source", selecione a branch `gh-pages` e a pasta `/ (root)`. Salve as alterações.

   Sua aplicação estará disponível em `https://<seu-usuario-github>.github.io/<seu-repositorio>`.
