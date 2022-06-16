import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { FirebaseService } from '../service/firebase.service';


@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {

  formPlano!: FormGroup;
  planos: any[]=[];
  
  anunciantes: any[] = [];

  cidade?: string;

  readonly columns: Array<PoTableColumn> = [
    { property: 'id', label: 'Name', visible: false},
    { property: 'nome', label: 'Name' },
    { property: 'ganhos', label: 'Ganhos',  },
    { property: 'descricao', label: 'Descrição'},
    { property: 'valor', label: 'Valor' },
    { property: 'link', label: 'Link para paramento'}
  ];

  actions: Array<PoTableAction> = [
    {  icon: 'po-icon po-icon-delete', label: 'Deletar',action: this.deletarPlano.bind(this)}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private poNotify: PoNotificationService,
    private db: AngularFirestore,
    private fire:FirebaseService
    ) { }

  ngOnInit(): void {
    
    this.fire.getAll('planos').snapshotChanges().forEach(snap => {
      snap.forEach(doc => {
        const data = doc.payload.doc.data() as object;
        const id = doc.payload.doc.id;
        this.planos.push({id:id, ...data });
      });
    });
    console.log(this.planos)
    this.creatFormPlanos()
  }

  creatFormPlanos(){
    this.formPlano = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required]
    })
  }

  savePlano(){
    if(this.formPlano.invalid){
      this.poNotify.error('Preencha os campos corretamente!');
    }else{
      this.db.collection('planos').add({...this.formPlano.value});
      this.poNotify.success('Plano Adicionado com sucesso!');
      setTimeout(() => {
        location.reload();
      }, 1750);
    }
  }

  deletarPlano(plano:any){
    console.log(plano.id);
    this.poNotify.success('Plano Deletado com sucesso!');
    this.fire.deletePlanos(plano.id);          
      setTimeout(() => {
        location.reload();
      }, 1750);
  }

}

