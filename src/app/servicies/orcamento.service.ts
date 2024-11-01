import { Injectable } from '@angular/core';
import { Servico } from '../models/servico';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  private servicoSelecionado: Servico | null = null;

  setServico(servico: Servico) {
    this.servicoSelecionado = servico;
  }

  getServico(): Servico | null {
    return this.servicoSelecionado;
  }

  clearServico() {
    this.servicoSelecionado = null;
  }
  constructor() { }
}
