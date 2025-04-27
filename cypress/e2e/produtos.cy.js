/// <reference types="cypress" />
import contrato from '../contracts/produtos.contracts'

describe('Testes da funcionalidade Produtos', () => {
    let token

    before(() => {
        cy.token('paulo@qa.com.br', 'teste').then(tkn => {
            token = tkn
        })
    });

    it.only('Deve validar contrato de produtos', () => {
        cy.request('produtos').then(response => {
            return contrato.validateAsync(response.body)
        })
    });

    it('Listar Produtos', () => {
        cy.request({
            method: 'GET',
            url: '/produtos'
        }).then((response => {
            expect(response.body.produtos[3].nome).to.equal('Produto Teste 75209631')
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(20)
        }))
    });
    it('Cadastrar Produto', () => {
        const produto = `Produto Teste ${Math.floor(Math.random() * 123456789)}`
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": produto,
                "preco": 125,
                "descricao": "Produto novo",
                "quantidade": 100
            },
            headers: { authorization: token }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        })
    });
    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.cadastrarProduto(token, 'Play 2', 250, 'Descrição', 180)
            .then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.eq('Já existe produto com esse nome')
            })
    });
    it('Deve editar um produto já cadastrado', () => {
        cy.request('produtos').then(response => {
            let id = response.body.produtos[0]._id
            cy.request({
                method: 'PUT',
                url: `/produtos/${id}`,
                headers: { authorization: token },
                body: {
                    "nome": "Produto Editado 8888888",
                    "preco": 100,
                    "descricao": "Produto editado",
                    "quantidade": 100
                }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
    });
    it('Deve editar um produto cadastrado previamente', () => {
        let produto = `Produto Teste ${Math.floor(Math.random() * 123456789)}`
        cy.cadastrarProduto(token, produto, 250, 'Descrição2', 180)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'PUT',
                    url: `/produtos/${id}`,
                    headers: { authorization: token },
                    body: {
                        "nome": produto,
                        "preco": 200,
                        "descricao": "Produto editado2",
                        "quantidade": 300
                    }
                }).then(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                })
            })
    });
    it('Deve deletar um produto previamente cadastrado', () => {
        let produto = `Produto Teste ${Math.floor(Math.random() * 123456789)}`
        cy.cadastrarProduto(token, produto, 250, 'Descrição2', 180)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `/produtos/${id}`,
                    headers: { authorization: token }
                }).then(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                    expect(response.status).to.equal(200)
                })
            })
    });

});
