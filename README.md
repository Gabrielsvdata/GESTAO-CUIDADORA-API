# 🚀 API Cuidadora
## 📌 Sobre o projeto

A API **Cuidadora** foi criada para gerenciar a rotina de atendimentos de idosos, resolvendo problemas como a fragmentação de informações e anotações perdidas. Com ela é possível gerenciar:

- Cadastro de pacientes
- Contatos familiares e condições de saúde
- Registros diários (pressão arterial, alimentação, etc.)
- Histórico de evolução por paciente

Essa API nos permite criar, visualizar e relacionar as ocorrências diárias com cada paciente atendido.

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- SQLite
- SQLite3
- Postman
- Nodemon

---

## 📦 Instalação
`npm install`

---

## ▶️ Como executar

```bash
npm run dev
```
`http://localhost:3000/`

[Clique aqui](http://localhost:3000/)

## 🗄️ Banco de dados
O Banco de dados é criado automaticamente ao iniciar a requisição e possui um relacionamento entre entidades.

```text
database.db
```

## 🧾 Tabelas

### 1. Tabela: pacientes
| Campo | Descrição |
|---------|-----------------------------|
| id | Identificador único |
| nome | Nome do idoso |
| contato_familiar | Telefone do responsável |
| condicao_principal | Doença ou condição de saúde |

### 2. Tabela: diario_evolucao
| Campo | Descrição |
|---------|-----------------------------|
| id | Identificador único |
| paciente_id | ID do paciente (Chave Estrangeira)|
| data_registro | Data da rotina (ex: 2026-04-03) |
| pressao_arterial | Medição da pressão no dia |
| alimentacao | Resumo da alimentação |
| observacoes | Anotações da evolução |

## 🔗 Endpoints
### Rota para listar todos os pacientes

```http
GET /pacientes
```

Retorna todos os pacientes cadastrados no banco de dados.

### Rota para cadastrar um novo paciente

```http
POST /pacientes
```

### Body (JSON)

```json
{
  "nome": "Senhor Roberto",
  "contato_familiar": "Filha Julia - (21) 98765-4321",
  "condicao_principal": "Diabetes e mobilidade reduzida"
}
```

### Rota para registrar uma rotina diária (Diário)

```http
POST /diario
```

### Body (JSON)

```json
{
  "paciente_id": 1,
  "data_registro": "2026-04-03",
  "pressao_arterial": "12x8",
  "alimentacao": "Almoçou bem, mas recusou o lanche.",
  "observacoes": "Caminhou 10 minutos pela casa."
}
```

### Rota para listar o histórico de um paciente específico

```http
GET /pacientes/:id/historico

Ex: /pacientes/1/historico
```

Retorna a evolução completa do paciente selecionado, unindo os dados do idoso com todas as suas anotações diárias.

## 🔐 Segurança

A API utiliza `?` nas queries SQL na hora de inserir ou buscar dados:

```sql
WHERE p.id = ?
```

Isso evita ataques de SQL Injection, garantindo que os dados inseridos sejam tratados como texto e não como comandos executáveis.

---

## 📚 Conceitos

- CRUD (Create e Read)
- Relacionamento de Tabelas (INNER JOIN e Chaves Estrangeiras)
- Rotas com Express
- Métodos/Verbos HTTP

---

## 👩‍💻 Projeto Educacional

Este projeto foi desenvolvido para fins de aprendizado em back-end com Node.js, focado em resolver problemas reais de gestão de dados.# GESTAO-CUIDADORA-API
