import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CommonModule],
  templateUrl: './carroslist.component.html',
  styleUrls: ['./carroslist.component.css']  // Corrigido para 'styleUrls'
})
export class CarroslistComponent {

  lista: Carro[] = [];
  
  modalService = inject(MdbModalModule);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroSelecionado: Carro | null = null;  

  constructor() { 
    this.lista.push(new Carro(
      1,
      'Paulo',
      1234567890,
      'email1@example.com',
      'Endereco 1',
      12345678000195,
      'Responsavel Nome 1',
      'Endereco Responsavel 1',
      9876543210,
      'email_responsavel1@example.com',
      'Pavimentacao'
    ));
    
    this.lista.push(new Carro(
      2,
      'Joao',
      2345678901,
      'email2@example.com',
      'Endereco 2',
      12345678000196,
      'Responsavel Nome 2',
      'Endereco Responsavel 2',
      8765432109,
      'email_responsavel2@example.com',
      'Ponte nova'
    ));
    
    this.lista.push(new Carro(
      3,
      'Marcio',
      3456789012,
      'email3@example.com',
      'Endereco 3',
      12345678000197,
      'Responsavel Nome 3',
      'Endereco Responsavel 3',
      7654321098,
      'email_responsavel3@example.com',
      'Saneamento av Brasil'
    ));
  }

  deleteById(carro: Carro) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        const indice = this.lista.findIndex(x => x.id === carro.id);
        if (indice !== -1) {
          this.lista.splice(indice, 1);
          Swal.fire({
            title: 'Deletado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }
      }
    });
  }

  generatePDF(carro: Carro) {
    const doc = new jsPDF();
  
    // Título do PDF
    doc.setFontSize(16);
    doc.text('Orçamento de Serviços', 10, 10);
    
    // Informações do Emissor
    doc.setFontSize(12);
    doc.text('Informações do Emissor:', 10, 20);
    doc.text(`Nome: ${carro.nomeEmissor || ''}`, 10, 30);
    doc.text(`Telefone: ${carro.telefoneEmissor || ''}`, 10, 40);
    doc.text(`Email: ${carro.emailEmissor || ''}`, 10, 50);
    doc.text(`Endereço: ${carro.enderecoEmissor || ''}`, 10, 60);
    doc.text(`CNPJ: ${carro.cnpjEmissor || ''}`, 10, 70);
  
    // Informações do Responsável
    doc.text('Informações do Responsável:', 10, 90);
    doc.text(`Nome: ${carro.nomeResponsavel || ''}`, 10, 100);
    doc.text(`Telefone: ${carro.telefoneResponsavel || ''}`, 10, 110);
    doc.text(`Email: ${carro.emailResponsavel || ''}`, 10, 120);
    doc.text(`Endereço: ${carro.enderecoResponsavel || ''}`, 10, 130);
  
    // Descrição do Orçamento
    doc.text('Descrição do Orçamento:', 10, 150);
    doc.text(carro.descricaoOrcamento || '', 10, 160);
  
    // Salva o PDF
    doc.save('orcamento.pdf');
  }
}
