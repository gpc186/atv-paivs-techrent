// =============================================
// CONTROLLER DE HISTÓRICO DE MANUTENÇÃO
// =============================================
// TODO (alunos): implementar cada função abaixo.

const ManutencaoModel = require('../model/manutencaoModel');
const EquipamentoModel = require('../model/equipamentModel');
const ChamadaModel = require('../model/chamadaModel');

class ManutencaoController {
  static async list(req, res) {
    try {
      const { chamado_id } = req.query;

      if (chamado_id) {
        const historico = await ManutencaoModel.findByChamadoId(chamado_id);
        return res.status(200).json(historico);
      }

      const manutencoes = await ManutencaoModel.findAll()

      return res.status(200).json({ ok: true, manutencoes });
    } catch (erro) {
      console.error("Erro ao listar manutenções:", erro);
      return res.status(500).json({ erro: "Erro interno ao buscar as manutenções!" });
    }
  }

  static async register(req, res) {
    try {
      const { chamado_id, equipamento_id, descricao, status_equipamento } = req.body;

      if (!chamado_id || !equipamento_id || !descricao) {
        return res.status(400).json({ erro: "Chamado, equipamento e descrição são obrigatórios." });
      }

      // Validar se o chamado existe e está em atendimento
      const chamado = await ChamadaModel.findById(chamado_id);
      if (!chamado) {
        return res.status(404).json({ erro: "Chamado não encontrado." });
      }

      if (chamado.status !== 'em_atendimento' && chamado.status !== 'aberto') {
        return res.status(400).json({ erro: "Apenas chamados abertos ou em atendimento podem ter manutenção registrada." });
      }

      // Validar se o equipamento existe
      const equipamento = await EquipamentoModel.findById(equipamento_id);
      if (!equipamento) {
        return res.status(404).json({ erro: "Equipamento não encontrado." });
      }

      const tecnico_id = req.usuario.id;

      const novaManutencaoId = await ManutencaoModel.create({ chamado_id, equipamento_id, tecnico_id, descricao });

      await ChamadaModel.updateStatus({ id: chamado_id, status: 'resolvido'});

      const novoStatusEquipamento = status_equipamento || 'operacional';
      
      await EquipamentoModel.updateStatus({id: equipamento_id, status: novoStatusEquipamento});

      return res.status(201).json({ ok: true, mensagem: `Manutenção registrada! Chamado resolvido. Máquina: ${novoStatusEquipamento}!`, manutencao_id: novaManutencaoId });

    } catch (erro) {
      console.error("Erro ao registrar manutenção:", erro);
      return res.status(500).json({ erro: "Erro interno ao registrar a manutenção." });
    }
  }

  static async updateDescription(req, res) {
    try {
      const { id } = req.params;
      const { descricao } = req.body;

      if (!descricao) {
        return res.status(400).json({ erro: "A nova descrição é obrigatória!" });
      }

      const atualizado = await ManutencaoModel.update(id, descricao);

      if (!atualizado) {
        return res.status(404).json({ erro: "Registro de manutenção não encontrado!" });
      }

      return res.status(200).json({ ok: true, mensagem: "Descrição atualizada com sucesso!" });
    } catch (erro) {
      console.error("Erro ao atualizar manutenção:", erro);
      return res.status(500).json({ erro: "Erro ao atualizar a manutenção!" });
    }
  }
}

module.exports = ManutencaoController;
