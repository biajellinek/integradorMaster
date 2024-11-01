export class Servico {
    id!: number;
    nome!: string;
    unidade!: string;
    preco!: number;
    tipo!: string;
    total!: number;

    constructor(id: number, nome: string, unidade: string, preco: number, tipo: string, total: number) {
        this.id = id;
        this.nome = nome;
        this.unidade = unidade;
        this.preco = preco;
        this.tipo = tipo;
        this.total = total;
    }
}
