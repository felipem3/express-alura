const Atendimento = require("../models/atendimento")

module.exports = app => {
	app.get("/atendimento", (req, res) =>
		res.send("servidor rodando ok atendimento")
	)

	app.post("/atendimento", (req, res) => {
		const atendimento = req.body
		Atendimento.adiciona(atendimento)
		res.send("rota de atendimento post")
	})
}
