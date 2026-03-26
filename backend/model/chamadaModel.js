const { query } = require('../config/database');

class ChamadaModel {
    static async create({ titulo, descricao, cliente_id, equipamento_id, tecnico_id, prioridade, status }){
        const sql = `INSERT INTO chamados (titulo, descricao, cliente_id, equipamento_id, tecnico_id, prioridade, status) VALUES (?,?,?,?,?,?,?)`;
        const result = await query(sql, [titulo, descricao, cliente_id, equipamento_id, tecnico_id, prioridade, status]);
        return result.insertId;
    };

    static async findByid(id){
        const sql = `SELECT * FROM chamados WHERE id = ?`;
        const result = await query(sql, [id]);
        return result[0] || null;
    }

    static async painelTecnico(){
        const sql = `SELECT * FROM view_painel_tecnico`;
        return await query(sql, []);
    }

    static async resumoChamadas(){
        const sql = `SELECT * FROM view_resumo_chamados`;
        return await query(sql, []);
    }

    static async update(id, {descricao, tecnico_id, prioridade, status}){
        const sql = `UPDATE FROM chamados SET descricao = ?, tecnico_id = ?, prioridade = ?, status = ? WHERE id = ?`;
        const result = await query(sql, [id, descricao, tecnico_id, prioridade, status]);
        return result.affectedRows > 0;
    }

    static async deleteById(id){
        const sql = `DELETE FROM chamados WHERE id = ?`;
        const result = await query(sql, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = ChamadaModel;