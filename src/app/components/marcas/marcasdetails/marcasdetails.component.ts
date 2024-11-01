import { Component, inject } from '@angular/core';
import { Servico } from '../../../models/servico';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-marcasdetails',
  standalone: true,
  imports: [RouterLink , CommonModule, MdbFormsModule, FormsModule],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.css'
})
export class MarcasdetailsComponent {

  servico: Servico = new Servico(0, '', '', 0, '', 0);
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  private nextId: number = 1;

  generateUniqueId() {
    return this.nextId++; // Retorna o próximo ID e incrementa o contadory
  }

  save() {
    if (this.servico.id > 0) {
      Swal.fire({
        title: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/marcas'], { state: { carroEditado: this.servico } });
    } else {

      this.servico.id = this.generateUniqueId();
      Swal.fire({
        title: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/marcas'], { state: { carroNovo: this.servico } });
    }
  }
}
