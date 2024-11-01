import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Servico } from '../../../models/servico';
import { CommonModule , Location} from '@angular/common';
import { OrcamentoService } from '../../../servicies/orcamento.service';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './marcaslist.component.html',
  styleUrls: ['./marcaslist.component.css'] 
})
export class MarcaslistComponent implements OnInit {

  listaServicos: Servico[] = [];
  servicoSelecionado: Servico | null = null;
  // exibirBotaoContinuarOrcamento = true;


  constructor(private orcamentoService: OrcamentoService, private router: Router, private location: Location) { // Injetando o serviço
    // Inicializa a lista de serviços
    this.listaServicos.push(new Servico(1, 'Ponte Nova', '2', 200, 'turismo',400));
    this.listaServicos.push(new Servico(2, 'Muro', '2', 280, 'turismo',560));
  }

  selectServico(servico: Servico): void {
    this.servicoSelecionado = servico;
    this.orcamentoService.setServico(servico); 
    localStorage.setItem('servicoSelecionado', JSON.stringify(servico)); 
    this.router.navigate(['/admin/orcamento']); 
  }

  deleteById(servico: Servico): void {
    const index = this.listaServicos.indexOf(servico);
    if (index > -1) {
      this.listaServicos.splice(index, 1);
      console.log(`Serviço ${servico.nome} deletado.`);
    }
  }

  trackById(index: number, servico: Servico): number {
    return servico.id;
  }

  ngOnInit(): void {
    this.servicoSelecionado = this.orcamentoService.getServico();
  }

  // ngOnInit(): void {
  //   // Verifica a URL anterior para definir a visibilidade do botão
  //   const previousUrl = this.location.path();
  //   this.exibirBotaoContinuarOrcamento = previousUrl === '/admin/carros/new';
  // }
}
