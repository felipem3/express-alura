const moment = require("moment")
const conexao = require("../infraestrutura/conexao")

class Atendimento {
	adiciona(atendimento, res) {
		const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS")
		const data = moment(atendimento.data, "DD/MM/YYYY").format(
			"YYYY-MM-DD HH:MM:SS"
		)
		const dataValida = moment(data).isSameOrAfter(dataCriacao)
		const clienteValido = atendimento.cliente.length >= 5

		const validacoes = [
			{
				nome: "data",
				valido: dataValida,
				mensagem: "Data deve ser maior que data atual"
			},
			{
				nome: "cliente",
				valido: clienteValido,
				mensagem: "Nome do cliente deve ter mais de 5 caracteres"
			}
		]

		const erros = validacoes.filter(campo => !campo.valido)
		const existeErro = erros.length
		if (existeErro) {
			res.status(400).json(erros)
		} else {
			const atendimentoDatado = { ...atendimento, dataCriacao, data }
			const sql = "INSERT INTO Atendimentos SET ?"

			conexao.query(sql, atendimentoDatado, (erro, resultados) => {
				if (erro) {
					res.status(400).json(erro)
				} else {
					res.status(201).json(resultados)
				}
			})
		}
	}

	lista(res) {
		const sql = "select * from atendimentos"
		conexao.query(sql, (erro, resultados) => {
			if (erro) {
				res.status(400).json(erro)
			} else {
				res.status(200).json(resultados)
			}
		})
	}

	buscaPorId(id, res) {
		const sql = `select * from atendimentos where id = ${id}`
		conexao.query(sql, (erro, resultados) => {
			const atendimento = resultados[0]
			if (erro) {
				res.status(400).json(erro)
			} else {
				res.status(200).json(atendimento)
			}
		})
	}

	alterar(id, valores, res) {
		if (valores.data) {
			valores.data = moment(valores.data, "DD/MM/YYYY").format(
				"YYYY-MM-DD HH:MM:SS"
			)
		}
		const sql = "UPDATE Atendimentos SET ? WHERE id = ?"

		conexao.query(sql, [valores, id], (erro, resultados) => {
			if (erro) {
				res.status(400).json(erro)
			} else {
				// res.status(200).json(resultados)
				res.status(200).json({ ...valores, id })
			}
		})
	}

	deletar(id, res) {
		const sql = "DELETE FROM Atendimentos where id = ?"

		conexao.query(sql, id, (erro, resultados) => {
			if (erro) {
				res.status(400).json(erro)
			} else {
				res.status(200).json({ id })
			}
		})
	}
}

module.exports = new Atendimento()
