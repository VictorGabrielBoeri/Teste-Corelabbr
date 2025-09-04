# 🚀 Corelab Challenge - Todo App

Uma aplicação web moderna e responsiva para gerenciamento de tarefas, construída com **React + TypeScript** no frontend e **Node.js + AdonisJS** no backend.

## ✨ **Funcionalidades**

- ✅ **CRUD completo** de tarefas
- ⭐ **Sistema de favoritos** com estrelas amarelas
- 🎨 **Personalização de cores** para cada tarefa
- 🔍 **Busca inteligente** por título e descrição
- 🎯 **Filtros avançados** por favoritos e cores
- 🌙 **Tema claro/escuro** com toggle
- 📱 **Design responsivo** mobile-first
- 🗄️ **Persistência SQLite** com Adonis Lucid ORM

## ��️ **Tecnologias**

### **Backend**

- **Node.js** 16.15.0
- **AdonisJS v5** (Framework TypeScript)
- **SQLite** com Adonis Lucid ORM
- **TypeScript** para tipagem estática
- **Prettier** para formatação de código

### **Frontend**

- **React 18** com TypeScript
- **Sass/SCSS** para estilos
- **Material Symbols** para ícones
- **CSS Variables** para theming
- **Responsive Design** mobile-first

## 🚀 **Como Executar**

### **Pré-requisitos**

- Node.js 16.15.0
- npm 8.5.5

### **1. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/corelab-challenge.git
cd corelab-challenge
```

### **2. Backend (API)**

```bash
cd corelab-api-challenge

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
node ace generate:key

# Configurar banco SQLite
echo "DB_CONNECTION=sqlite" >> .env
echo "SQLITE_DB=../sqlite/dev.sqlite3" >> .env

# Executar migrações
node ace migration:run

# Iniciar servidor
npm run dev
```

**API rodando em:** http://localhost:3333

### **3. Frontend (React)**

```bash
cd ../corelab-web-challenge

# Instalar dependências
npm install

# Iniciar aplicação
npm start
```

**Frontend rodando em:** http://localhost:3000

## �� **Docker (Opcional)**

### **Backend**

```bash
cd corelab-api-challenge
docker build -t corelab-api .
docker run -p 3333:3333 corelab-api
```

### **Frontend**

```bash
cd corelab-web-challenge
docker build -t corelab-web .
docker run -p 3000:3000 corelab-web
```

### **Docker Compose (Recomendado)**

```bash
# Na raiz do projeto
docker-compose up --build
```

## 📚 **API Endpoints**

| Método   | Endpoint                | Descrição              |
| -------- | ----------------------- | ---------------------- |
| `GET`    | `/todos`                | Lista todas as tarefas |
| `GET`    | `/todos/:id`            | Busca tarefa por ID    |
| `POST`   | `/todos`                | Cria nova tarefa       |
| `PUT`    | `/todos/:id`            | Atualiza tarefa        |
| `DELETE` | `/todos/:id`            | Remove tarefa          |
| `POST`   | `/todos/:id/favorite`   | Marca como favorita    |
| `POST`   | `/todos/:id/unfavorite` | Remove dos favoritos   |
| `POST`   | `/todos/:id/color`      | Define cor da tarefa   |

## �� **Estrutura do Projeto**

corelab-challenge/
├── corelab-api-challenge/ # Backend AdonisJS
│ ├── app/
│ │ ├── Controllers/ # Controllers da API
│ │ ├── Models/ # Modelos Lucid ORM
│ │ └── Types/ # Interfaces TypeScript
│ ├── database/
│ │ └── migrations/ # Migrações SQLite
│ └── start/
│ └── routes.ts # Rotas da API
├── corelab-web-challenge/ # Frontend React
│ ├── src/
│ │ ├── components/ # Componentes reutilizáveis
│ │ ├── pages/ # Páginas da aplicação
│ │ ├── types/ # Tipos TypeScript
│ │ └── lib/ # Cliente API
│ └── public/ # Assets estáticos
└── sqlite/ # Banco de dados SQLite

## 🔧 **Scripts Disponíveis**

### **Backend**

```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run start        # Produção
npm run migration:run # Executar migrações
npm run format       # Formatar código
```

### **Frontend**

```bash
npm start            # Desenvolvimento
npm run build        # Build para produção
npm run format       # Formatar código
```

## 🌟 **Destaques Técnicos**

- **TypeScript** em todo o projeto para type safety
- **AdonisJS v5** com Lucid ORM para backend robusto
- **React Hooks** para gerenciamento de estado
- **CSS Variables** para theming dinâmico
- **Responsive Design** com abordagem mobile-first
- **Componentes reutilizáveis** para manutenibilidade
- **API RESTful** bem estruturada
- **Persistência SQLite** para simplicidade

## 📱 **Responsividade**

- ✅ **Mobile First** design
- ✅ **Breakpoints** otimizados
- ✅ **Sidebar** colapsável em mobile
- ✅ **Grid responsivo** para cards
- ✅ **Touch-friendly** interfaces

## 🎯 **Como Usar**

1. **Criar tarefa**: Digite título e descrição na sidebar
2. **Favoritar**: Clique na estrela para marcar como favorita
3. **Personalizar cor**: Use o seletor de cor em cada tarefa
4. **Filtrar**: Use os filtros na sidebar (favoritos, cores)
5. **Buscar**: Digite no campo de busca para encontrar tarefas
6. **Alternar tema**: Clique no botão Light/Dark

## �� **Deploy**

### **Backend**

```bash
npm run build
npm run start
```

### **Frontend**

```bash
npm run build
# Servir pasta build com nginx/apache
```

## �� **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 **Licença**

Este projeto foi criado para o **Corelab Challenge**.

## ��‍💻 **Autor**

Victor Gabriel - Desenvolvedor Front End

---

⭐ **Se este projeto te ajudou, deixe uma estrela!**