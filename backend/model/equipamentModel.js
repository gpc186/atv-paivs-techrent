const { query } = require('../config/database');

class EquipamentModel {
    static async create({nome, categoria, patrimonio, status, descricao}){
        const sql = `INSERT INTO equipamentos (nome, categoria, patrimonio, status,descricao) values (?,?,?,?,?)`
        const result = await query(sql, [nome, categoria, patrimonio, status, descricao]);
        return result.insertId;
    }

    static async findById(id){
        const sql = `SELECT * FROM equipamentos WHERE id = ?`;
        const result = await query(sql, [id]);
        return result[0] || null;
    }

    static async findByPatrimonio(patrimonio){
        const sql = `SELECT * FROM equipamentos WHERE patrimonio = ?`;
        const result = await query(sql, [patrimonio]);
        return result[0] || null;
    }

    static async equipamentosOperacionais(){
        const sql = `SELECT * FROM view_equipamentos_operacionais`
        return await query(sql, []);
    }

    static async resumoEquipamentos(){
        const sql = `SELECT * FROM view_resumo_equipamentos`
        return await query(sql, []);
    }

    static async update(id, {nome, categoria, status}){
        const sql = `UPDATE FROM equipamentos SET nome = ?, categoria = ?, status = ?, descricao = ? WHERE id = ?`;
        const result = await query(sql, [nome, categoria, status, descricao, id]);
        return result.affectedRows > 0;
    }

    static async deleteById(id){
        const sql = `DELETE FROM equipamentos WHERE id = ?`;
        const result = await query(sql, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = EquipamentModel;