import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { FirebaseService } from '../service/firebase.service';

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
      property: 'verified',
      label: 'Status',
      type: 'label',
      width: '8%',
      labels: [
        { value: 'true', color: 'color-11', label: 'Ativado' },
        { value: 'false', color: 'color-08', label: 'Desativado' }
      ]
    },
    { property: 'id', label: 'ID', visible: false},
      { property: 'nome', label: 'Nome' },
      { property: 'user', label: 'Email' },
      { property: 'idade', label: 'Idade' },
      { property: 'cidade', label: 'Cidade' },

  ];
  constructor(
    private fire:FirebaseService,
    private poNotify: PoNotificationService,

    ) {}

  ngOnInit() {
    this.fire.getAll('anunciantes').snapshotChanges().forEach(snap => {
      snap.forEach(doc => {
        const data = doc.payload.doc.data() as object;
        const id = doc.payload.doc.id;
        this.anunciantes.push({id:id, ...data });
      });
    });
    
    console.log(this.anunciantes)  
  }

  ativarConta(anunciante:any){
    console.log(this.anunciantes);
    anunciante.verified = true.toString();
    this.fire.update(anunciante);
    setTimeout(() => {
      location.reload();
    }, 400);  }
}
