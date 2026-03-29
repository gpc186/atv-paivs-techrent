const { query } = require('../config/database');

class ChamadaModel {
    static async create({ titulo, descricao, cliente_id, equipamento_id, tecnico_id, prioridade, status }) {
        const sql = `INSERT INTO chamados (titulo, descricao, cliente_id, equipamento_id, tecnico_id, prioridade, status) VALUES (?,?,?,?,?,?,?)`;
        const result = await query(sql, [titulo, descricao, cliente_id, equipamento_id, tecnico_id, prioridade, status]);
        return result.insertId;
    };

    static async findById(id) {
        const sql = `SELECT c.*, e.nome AS equipamento_nome, u.nome AS cliente_nome, t.nome AS tecnico_nome
                FROM chamados c
                JOIN equipamentos e ON c.equipamento_id = e.id
                JOIN usuarios u ON c.cliente_id = u.id
                LEFT JOIN usuarios t ON c.tecnico_id = t.id
                WHERE c.id = ?`;
        const result = await query(sql, [id]);
        return result[0] || null;
    }

    static async setTecnico({ id, tecnico_id }) {
        const sql = `UPDATE chamados SET tecnico_id = ?, status = 'em_atendimento' WHERE id = ?`;
        const result = await query(sql, [tecnico_id, id]);
        return result.affectedRows > 0;
    }

    static async updateStatus({ id, status }) {
        const sql = `UPDATE chamados SET status = ? WHERE id = ?`;
        const result = await query(sql, [status, id]);
        return result.affectedRows > 0;
    }

    static async findByAccessLevel({ id, cliente }) {
        let sql = `
                SELECT c.*, e.nome AS equipamento_nome, u.nome AS cliente_nome, t.nome AS tecnico_nome
                FROM chamados c
                JOIN equipamentos e ON c.equipamento_id = e.id
                JOIN usuarios u ON c.cliente_id = u.id
                LEFT JOIN usuarios t ON c.tecnico_id = t.id
            `;
        if (cliente) {
            sql += ` WHERE c.cliente_id = ? ORDER BY c.criado_em DESC`;
            return await query(sql, [id]);
        } else {
            sql += ` ORDER BY c.status ASC, c.criado_em DESC`; // Organiza por status para o técnico
            return await query(sql, []);
        }
    }

    static async viewTecnico() {
        const sql = `SELECT * FROM view_painel_tecnico ORDER BY prioridade_valor DESC`;
        return await query(sql, []);
    }

    static async viewChamadas() {
        const sql = `SELECT * FROM view_resumo_chamados`;
        return await query(sql, []);
    }

    static async update(id, { descricao, tecnico_id, prioridade, status }) {
        const sql = `UPDATE chamados SET descricao = ?, tecnico_id = ?, prioridade = ?, status = ? WHERE id = ?`;
        const result = await query(sql, [id, descricao, tecnico_id, prioridade, status]);
        return result.affectedRows > 0;
    }

    static async deleteById(id) {
        const sql = `DELETE FROM chamados WHERE id = ?`;
        const result = await query(sql, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = ChamadaModel;