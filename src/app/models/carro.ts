export class Carro {
    id!: number;
    nomeEmissor?: string;            // Nome do emissor
    telefoneEmissor?: number;        // Telefone do emissor
    emailEmissor?: string;           // Email do emissor
    enderecoEmissor?: string;        // Endereço do emissor
    cnpjEmissor?: number;            // CNPJ do emissor
    
    nomeResponsavel?: string;        // Nome do responsável
    enderecoResponsavel?: string;    // Endereço do responsável
    telefoneResponsavel?: number;    // Telefone do responsável
    emailResponsavel?: string;       // Email do responsável
    
    descricaoOrcamento?: string;     // Descrição do orçamento

    constructor(
        id: number = 0,
        nomeEmissor?: string,
        telefoneEmissor?: number,
        emailEmissor?: string,
        enderecoEmissor?: string,
        cnpjEmissor?: number,
        
        nomeResponsavel?: string,
        enderecoResponsavel?: string,
        telefoneResponsavel?: number,
        emailResponsavel?: string,
        
        descricaoOrcamento?: string
    ) {
        this.id = id;
        this.nomeEmissor = nomeEmissor;
        this.telefoneEmissor = telefoneEmissor;
        this.emailEmissor = emailEmissor;
        this.enderecoEmissor = enderecoEmissor;
        this.cnpjEmissor = cnpjEmissor;
        
        this.nomeResponsavel = nomeResponsavel;
        this.enderecoResponsavel = enderecoResponsavel;
        this.telefoneResponsavel = telefoneResponsavel;
        this.emailResponsavel = emailResponsavel;
        
        this.descricaoOrcamento = descricaoOrcamento;
    }
}
