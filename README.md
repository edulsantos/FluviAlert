# FluviAlert — Frontend

Interface web do FluviAlert, um sistema de monitoramento de nível de rios e alertas de enchente. A aplicação consome a API do [backend](https://github.com/edulsantos/FluviAlert_backend) para exibir os níveis monitorados, o estado de alerta atual e permitir o acesso autenticado dos usuários.

## Funcionalidades

- Visualização do nível do rio e do estado de alerta em tempo próximo do real.
- Autenticação de usuários (login/cadastro) integrada à API.
- Interface responsiva, adaptada para desktop e mobile.
- Navegação entre páginas com React Router.

## Stack

- **React 19** + **TypeScript**
- **Vite** — build e dev server
- **Tailwind CSS** — estilização
- **React Router** — roteamento
- **Axios** — consumo da API REST
- **lucide-react** — ícones

## Como rodar localmente

Pré-requisitos: Node.js 18+ e o [backend](https://github.com/edulsantos/FluviAlert_backend) em execução.

```bash
# Clonar o repositório
git clone https://github.com/edulsantos/FluviAlert.git
cd FluviAlert

# Instalar dependências
npm install

# Configurar a URL da API (crie um arquivo .env)
echo "VITE_API_URL=http://localhost:8000" > .env

# Iniciar em modo de desenvolvimento
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## Scripts

- `npm run dev` — ambiente de desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — pré-visualização do build

## Backend

A API que alimenta esta interface está em: https://github.com/edulsantos/FluviAlert_backend

---

Projeto desenvolvido por [Eduardo Lourenço](https://www.linkedin.com/in/eduardo-santos-lourenco).
