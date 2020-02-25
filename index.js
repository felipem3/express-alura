const custonExpress = require("./config/customExpress")
const conexao = require("./infraestrutura/conexao")
const Tabelas = require("./infraestrutura/tabelas")

conexao.connect(erro => {
	if (erro) {
		console.log(erro)
	} else {
		console.log("sucesso")

		Tabelas.init(conexao)

		const app = custonExpress()
		app.listen(3000, () => console.log("servidor rodando na porta 3000"))
	}
})
