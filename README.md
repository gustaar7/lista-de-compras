# 🛒 Lista de Compras

Web app mobile para gerenciamento de lista de compras. Feito com **Next.js 14 + TypeScript**.

## Stack

- Next.js 14 (App Router)
- TypeScript
- CSS puro com variáveis (dark mode nativo)
- lucide-react (ícones)
- Fontes: Syne + DM Sans

## Como rodar

```bash
# Instalar dependências
npm install

# Configurar o backend
cp .env.local.example .env.local
# Edite .env.local e coloque a URL do seu backend

# Rodar em dev
npm run dev
```

## Configurar o Backend

Edite `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://sua-api.com
```

## Endpoints esperados

| Método | Rota              | Descrição         |
|--------|-------------------|-------------------|
| GET    | /products         | Listar produtos   |
| POST   | /products         | Criar produto     |
| PUT    | /products/:id     | Atualizar produto |
| DELETE | /products/:id     | Deletar produto   |

### Estrutura da entidade

```json
{
  "id": "string",
  "nome": "string",
  "quantidade": number,
  "descricao": "string"
}
```

## Features

- ✅ Listar produtos com skeleton loading
- ✅ Adicionar produto (modal bottom-sheet)
- ✅ Editar produto
- ✅ Deletar com confirmação
- ✅ Toggle dark/light mode (persiste no localStorage)
- ✅ Responsivo mobile-first
- ✅ Animações suaves
- ✅ Feedback visual de erros