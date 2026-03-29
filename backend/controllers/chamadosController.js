// =============================================
// CONTROLLER DE CHAMADOS
// =============================================
// TODO (alunos): implementar cada função abaixo.
//
// Fluxo de status:
//   aberto -> em_atendimento -> resolvido
//                           -> cancelado

const { query } = require('../config/database');
// Vamos usar o model de Equipamento que fizemos para reaproveitar a função de status!
const EquipamentoModel = require('../model/EquipamentoModel');
const ChamadaModel = require('../model/chamadaModel');

class ChamadaController {

  static async list(req, res) {
    try {
      const { id, nivel_acesso } = req.usuario;

      const isClient = (nivel_acesso === "cliente");

      const chamados = await ChamadaModel.findByAccessLevel({ id, cliente: isClient });

      return res.status(200).json({ ok: true, chamados });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar chamados!" });
    }
  }

  // 2. GET /chamados/:id - Retorna detalhes de UM chamado específico
  static async findById(req, res) {
    try {
      const { id } = req.params;
      const chamado = await ChamadaModel.findById(id)

      if (!chamado) {
        return res.status(404).json({ erro: "Chamado não encontrado!" });
      }

      return res.status(200).json({ ok: true, chamado });
    } catch (erro) {
      console.error("Erro ao buscar chamado por ID:", erro);
      return res.status(500).json({ erro: "Erro ao buscar detalhes do chamado!" });
    }
  }

  static async create(req, res) {
    try {
      const { titulo, descricao, equipamento_id, prioridade } = req.body;

      const cliente_id = req.usuario.id;

      if (!titulo || !descricao || !equipamento_id) {
        return res.status(400).json({ erro: "Título, descrição e equipamento são obrigatórios." });
      }

      const novoChamado = await ChamadaModel.create({ titulo, descricao, cliente_id, equipamento_id, prioridade: prioridade || "media", status: "pendente" });

      await EquipamentoModel.updateStatus(equipamento_id, 'em_manutencao');

      return res.status(201).json({ ok: true, mensagem: "Chamado aberto com sucesso! O equipamento agora consta como 'em manutenção'!", chamado_id: novoChamado });
    } catch (erro) {
      console.error("Erro ao criar chamado:", erro);
      return res.status(500).json({ erro: "Erro interno ao abrir o chamado!" });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, tecnico_id } = req.body;

      if (!status) {
        return res.status(400).json({ erro: "O novo status é obrigatório!" });
      }

      const chamado = await ChamadaModel.findById(id);
      if (!chamado) {
        return res.status(404).json({ erro: "Chamado não encontrado!" });
      }

      if(tecnico_id){
        await ChamadaModel.setTecnico(id, tecnico_id);
      }

      await ChamadaModel.updateStatus({ id, status });

      if (status === 'resolvido' || status === 'cancelado') {
        await EquipamentoModel.updateStatus(chamado.equipamento_id, 'operacional');
      }

      return res.status(200).json({ ok: true, mensagem: "Status atualizado com sucesso!" });
    } catch (erro) {
      console.error("Erro ao atualizar status:", erro);
      return res.status(500).json({ erro: "Erro interno ao atualizar chamado!" });
    }
  }
}
module.exports = ChamadaController;