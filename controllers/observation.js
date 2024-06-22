const ObservationModel = require('../models/observation')
const express = require('express')

const observationsController = express.Router()

observationsController.get('/', async (req, res) => {
    try {
        let countObservations = await ObservationModel.aggregate([{
            $group: {
                _id: '$tipo',
                count: { $sum: 1 }
            }
        }]);
        res.status(201).json(countObservations);
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

observationsController.get('/observacao', async (req, res) => {
    try {
        let observationsTotal = await ObservationModel.find()
        return res.status(200).json(observationsTotal)
    } catch (error) {
        console.log(`Um erro ocorreu ao buscar todas observações. ${err}`)
        return res.status(500).json({ error: err })
    }
})

observationsController.post('/registrar', async (req, res) => {
    const { nome, tipo, data, descricao } = req.body
    var registrar = {
        nome: nome,
        tipo: tipo,
        data: data,
        descrcao: descricao
    }
    try {
        await ObservationModel.create(registrar)
        res.status(201).json({
            mensagem: "Usuário criado com sucesso!",
            user: user
        })
    } catch (error) {
        console.log(`Erro na criação de Observação.  ${error}`)
        res.status(500).json({ error: error })
    }

})

module.exports = observationsController