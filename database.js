
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const criarBanco = async () => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  // Habilitar chaves estrangeiras no SQLite
  await db.exec('PRAGMA foreign_keys = ON;');

  // Tabela 1: Pacientes (Dados fixos)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS pacientes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        contato_familiar TEXT,
        condicao_principal TEXT
    );
  `);

  // Tabela 2: Diário de Evolução (Registros diários)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS diario_evolucao(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        paciente_id INTEGER,
        data_registro TEXT,
        pressao_arterial TEXT,
        alimentacao TEXT,
        observacoes TEXT,
        FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
    );
  `);

  console.log("Banco de dados configurado com entidade PACIENTES e DIARIO_EVOLUCAO!");

  // Povoando o banco para testes (Mock de dados)
  const checagem = await db.get(`SELECT COUNT(*) AS total FROM pacientes`);
  
  if (checagem.total === 0) {
    await db.exec(`
      INSERT INTO pacientes (nome, contato_familiar, condicao_principal) VALUES
      ("Dona Margarida", "Filha Ana - (11) 9999-9999", "Hipertensão e Mobilidade Reduzida"),
      ("Seu Tomé", "Filho Carlos - (11) 8888-8888", "Alzheimer estágio inicial");

      INSERT INTO diario_evolucao (paciente_id, data_registro, pressao_arterial, alimentacao, observacoes) VALUES
      (1, "2026-03-31", "13x8", "Boa", "Caminhou 10 min. Sem dores."),
      (2, "2026-03-31", "12x8", "Regular", "Recusou o café da manhã. Mais calmo à tarde.");
    `);
    console.log("Dados iniciais inseridos para demonstração.");
  }

  return db;
};

module.exports = { criarBanco };