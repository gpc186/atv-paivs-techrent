// =============================================
// CONTROLLER DE DASHBOARD
// =============================================
// Usa as VIEWS do banco para retornar dados agregados.
// TODO (alunos): implementar cada função abaixo.

const ChamadaModel = require("../model/chamadaModel");
const EquipamentoModel = require("../model/EquipamentoModel");

class DashboardController {
  static async viewAdmin(req, res) {
    try {
      const [chamados, equipamentos] = await Promise.all([
        ChamadaModel.viewChamadas(),
        EquipamentoModel.viewEquipament()
      ]);

      return res.status(200).json({ ok: true, estatisticas_chamados: chamados, estatisticas_equipamentos: equipamentos, gerado_em: new Date() });
    } catch (erro) {
      console.error("Erro ao gerar dashboard admin:", erro);
      return res.status(500).json({ erro: "Erro ao carregar dados do painel administrativo." });
    }
  }

  static async viewTecnico(req, res) {
    try {
      
      const painel = await ChamadaModel.viewTecnico();

      return res.status(200).json({ ok: true, painel});
    } catch (erro) {
      console.error("Erro ao carregar painel técnico:", erro);
      return res.status(500).json({ erro: "Erro ao carregar a fila de chamados!" });
    }
  }
}

module.exports = DashboardController;