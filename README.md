Desafio MB Web
Este projeto é uma aplicação full-stack que consiste em um frontend construído com Vue.js e um backend utilizando Node.js com Express. O frontend coleta dados do usuário e os envia para o backend, que os processa e os armazena em um banco de dados.

Estrutura do Projeto
Frontend: Desenvolvido com Vue.js.
Backend: Construído com Node.js e Express.
Pré-requisitos
Necessário ter instalados em sua máquina:

Node.js (versão 18 ou superior)
NPM ou Yarn (gerenciador de pacotes)
Configuração do Ambiente
Clone o repositório

git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
Configure o Backend

Navegue até o diretório do backend e instale as dependências:

cd backend
npm install

Inicie o servidor:

node server.js
O servidor estará disponível em http://localhost:3000.

Configure o Frontend

Navegue até o diretório do frontend e instale as dependências:

cd frontend
npm install
Em um projeto rodando teremos variáveis de ambientes que não podem estar no .env como senhas de banco de dados e tokens de api, porém como a aplicação do desafio é pequena e possui no .env apenas a url do servidor estarei deixando fora do gitignore o .env para agilizar o processo de teste também.

VITE_API_URL=http://localhost:3000/api

Inicie o Servidor 
npm run dev
O frontend estará disponível em http://localhost:5173.