const mongoose = require('mongoose')

const ObservationModel = mongoose.model('Observation', {
    tipo: String,
    nome: String,
    detalhe: String,
    data: Date
})

module.exports = ObservationModel