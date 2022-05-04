import { Component, OnInit } from '@angular/core';
import { PoSelectOption, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Service } from '../shared/service/service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  anunciantes: any[]=[];

  readonly actions: Array<PoTableAction> = [
    { label: 'Ativar',action: this.ativarConta.bind(this) },
  ];

  readonly columns: Array<PoTableColumn> = [
    {
      property: 'activated',
      label: 'Status',
      type: 'label',
      width: '8%',
      labels: [
        { value: 'true', color: 'color-11', label: 'Ativado' },
        { value: 'false', color: 'color-08', label: 'Desativado' }
      ]
    },
    { property: 'id', label: 'ID', visible: false},
      { property: 'name', label: 'Nome' },
      { property: 'email', label: 'Email' },
      { property: 'idade', label: 'Idade' },
      { property: 'city', label: 'Cidade' },

  ];
  constructor(private activateService: Service) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(){
     this.activateService.getAnunciantes().subscribe((res:any) => {
      this.anunciantes = res;
    });
  }
  ativarConta(anunciante:any){
    anunciante.activated = true.toString();
    this.activateService
      .updateAnunciante(anunciante)
      .subscribe((res: any) => {
        console.log('Ativado com sucesso!');
    })
   }
}
