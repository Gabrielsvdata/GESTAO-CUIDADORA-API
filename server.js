// server.js
const express = require('express');
const { criarBanco } = require('./database.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// ROTAS DE PACIENTES
// ==========================================

// Listar todos os pacientes
app.get("/pacientes", async (req, res) => {
    const db = await criarBanco();
    const pacientes = await db.all(`SELECT * FROM pacientes`);
    res.json(pacientes);
});

// Cadastrar novo paciente
app.post("/pacientes", async (req, res) => {
    const { nome, contato_familiar, condicao_principal } = req.body;
    const db = await criarBanco();
    const result = await db.run(
        `INSERT INTO pacientes (nome, contato_familiar, condicao_principal) VALUES (?, ?, ?)`,
        [nome, contato_familiar, condicao_principal]
    );
    res.status(201).json({ mensagem: "Paciente cadastrado!", id: result.lastID });
});

// Atualizar os dados de um paciente existente (PUT)
app.put("/pacientes/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, contato_familiar, condicao_principal } = req.body;
    
    const db = await criarBanco();
    
    await db.run(
        `UPDATE pacientes SET nome = ?, contato_familiar = ?, condicao_principal = ? WHERE id = ?`,
        [nome, contato_familiar, condicao_principal, id]
    );
    
    res.json({ mensagem: `Dados do paciente de ID ${id} atualizados com sucesso!` });
});

// Remover um paciente do sistema (DELETE)
app.delete("/pacientes/:id", async (req, res) => {
    const { id } = req.params;
    
    const db = await criarBanco();
    
    await db.run(`DELETE FROM pacientes WHERE id = ?`, [id]);
    
    res.json({ mensagem: `Paciente de ID ${id} removido com sucesso!` });
});

// ==========================================
// ROTAS DO DIÁRIO DE EVOLUÇÃO
// ==========================================

// Cadastrar rotina diária para um paciente
app.post("/diario", async (req, res) => {
    const { paciente_id, data_registro, pressao_arterial, alimentacao, observacoes } = req.body;
    const db = await criarBanco();
    await db.run(
        `INSERT INTO diario_evolucao (paciente_id, data_registro, pressao_arterial, alimentacao, observacoes) VALUES (?, ?, ?, ?, ?)`,
        [paciente_id, data_registro, pressao_arterial, alimentacao, observacoes]
    );
    res.status(201).json({ mensagem: "Registro diário salvo com sucesso!" });
});

// Buscar histórico completo de um paciente específico (com INNER JOIN)
app.get("/pacientes/:id/historico", async (req, res) => {
    const { id } = req.params;
    const db = await criarBanco();
    
    const historico = await db.all(`
        SELECT p.nome, d.data_registro, d.pressao_arterial, d.alimentacao, d.observacoes 
        FROM diario_evolucao d
        INNER JOIN pacientes p ON d.paciente_id = p.id
        WHERE p.id = ?
        ORDER BY d.data_registro DESC
    `, [id]);

    res.json(historico);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Servidor rodando na porta ${PORT}`));