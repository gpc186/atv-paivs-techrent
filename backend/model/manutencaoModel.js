const { query } = require("../config/database");

class ManutencaoModel {
    static async create({ chamado_id, equipamento_id, tecnico_id, descricao }){
        const sql = `INSERT INTO historico_manutencao (chamado_id, equipamento_id, tecnico_id, descricao) VALUES (?,?,?,?)`;
        const result = await query(sql, [chamado_id, equipamento_id, tecnico_id, descricao]);
        return result.insertId;
    };
}