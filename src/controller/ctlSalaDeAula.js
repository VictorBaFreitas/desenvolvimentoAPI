const pool = require('../db/db');

// Função para buscar todas as salas de aula
async function GetAllSalasDeAula(req, res) {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM salasdeaula WHERE removido = false
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para buscar sala de aula por ID
async function GetSalasDeAulaByID(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT * FROM salasdeaula WHERE id = ? AND removido = false
        `, [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: "Sala de aula não encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para inserir nova sala de aula
async function InsertSalasDeAula(req, res) {
    const { descricao, localizacao, capacidade } = req.body;
    try {
        const [result] = await pool.query(`
            INSERT INTO salasdeaula (descricao, localizacao, capacidade, removido)
            VALUES (?, ?, ?, false)
        `, [descricao, localizacao, capacidade]);
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para atualizar uma sala de aula existente
async function UpdateSalasDeAula(req, res) {
    const { id } = req.params;
    const { descricao, localizacao, capacidade } = req.body;
    try {
        const [result] = await pool.query(`
            UPDATE salasdeaula
            SET descricao = ?, localizacao = ?, capacidade = ?
            WHERE id = ? AND removido = false
        `, [descricao, localizacao, capacidade, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Sala de aula atualizada com sucesso" });
        } else {
            res.status(404).json({ error: "Sala de aula não encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para remover uma sala de aula (remoção lógica)
async function DeleteSalasDeAula(req, res) {
    const { id } = req.params;
    try {
        const [result] = await pool.query(`
            UPDATE salasdeaula SET removido = true WHERE id = ?
        `, [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Sala de aula removida com sucesso" });
        } else {
            res.status(404).json({ error: "Sala de aula não encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    GetAllSalasDeAula,
    GetSalasDeAulaByID,
    InsertSalasDeAula,
    UpdateSalasDeAula,
    DeleteSalasDeAula
};
