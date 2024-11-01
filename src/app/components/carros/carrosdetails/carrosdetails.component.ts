import { Component, inject , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { OrcamentoService } from '../../../servicies/orcamento.service';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, RouterLink],
  templateUrl: './carrosdetails.component.html',
  styleUrls: ['./carrosdetails.component.css'] // Corrigido para 'styleUrls'
})
export class CarrosdetailsComponent implements OnInit {
  carro: Carro = new Carro(
    1, '', 0, '', '', 0, '', '', 0, '', ''
  );
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  private nextId: number = 1;

  constructor(private orcamentoService: OrcamentoService) {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    // Busca no back-end
    let carroRetornado: Carro = new Carro(
      1, 'Nome Emissor', 1234567890, 'email@example.com', 
      'Endereco do Emissor', 12345678000195, 'Nome Responsavel', 
      'Endereco Responsavel', 9876543210, 'email_responsavel@example.com', 
      'Pavimentação'
    );
    this.carro = carroRetornado;
  }

  generateUniqueId() {
    return this.nextId++; // Retorna o próximo ID e incrementa o contador
  }


  save() {
    if (this.carro.id > 0) {
      Swal.fire({
        title: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      // Atualiza o localStorage após a edição
      localStorage.setItem('orcamentoEmProgresso', JSON.stringify(this.carro));
      this.router2.navigate(['admin/carros'], { state: { carroEditado: this.carro } });
    } else {
      // Define um ID único para o novo carro
      this.carro.id = this.generateUniqueId();
      Swal.fire({
        title: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      // Salva o carro novo no localStorage
      localStorage.setItem('orcamentoEmProgresso', JSON.stringify(this.carro));
      this.router2.navigate(['admin/carros'], { state: { carroNovo: this.carro } });
    }
}
  

  selectedImage: File | null = null;
  selectedImageUrl: string | null = null;

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  ngOnInit() {
    const orcamentoSalvo = localStorage.getItem('orcamentoEmProgresso');
    if (orcamentoSalvo) {
      this.carro = JSON.parse(orcamentoSalvo);
    }
  }
}
