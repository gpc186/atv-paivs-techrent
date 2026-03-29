// =============================================
// ROTAS DE DASHBOARD
// =============================================

const express = require('express');
const router = express.Router();
const { autenticar, autorizar } = require('../middlewares/auth');
const DashboardController = require('../controllers/dashboardController');

router.get('/admin', autenticar, autorizar('admin'), DashboardController.viewAdmin);
router.get('/tecnico', autenticar, autorizar('admin', 'tecnico'), DashboardController.viewTecnico);

module.exports = router;