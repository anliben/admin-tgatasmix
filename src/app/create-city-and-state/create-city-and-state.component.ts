import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PoModalComponent,
  PoNotificationService,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { FirebaseService } from '../service/firebase.service';
import{ map } from 'rxjs/operators';

@Component({
  selector: 'app-create-city-and-state',
  templateUrl: './create-city-and-state.component.html',
  styleUrls: ['./create-city-and-state.component.css'],
})
export class CreateCityAndStateComponent implements OnInit {
  @ViewChild(PoModalComponent) modal!: PoModalComponent;
  estados: any[] = [];
  cidades: any[] = [];

  formEstados!: FormGroup;

  nameCity!: string;
  nameState!: string;
  descricaoCity!: string;

  readonly columnsEstados: Array<PoTableColumn> = [
    { property: 'nome', label: 'Nomes Estados' },
  ];

  readonly columnsCidades: Array<PoTableColumn> = [
    { property: 'nome', label: 'Nomes Cidades' },
  ];

  readonly actions: Array<PoTableAction> = [
    {
      action: this.adicionarCidades.bind(this),
      icon: 'po-icon-info',
      label: 'Cidades',
    },
    {
      action: this.deletarEstado.bind(this),
      icon: 'po-icon po-icon-delete',
      label: 'Excluir',
    },
  ];

  readonly actionsTableCidades: Array<PoTableAction> = [
    {
      icon: 'po-icon po-icon-delete',
      label: 'Excluir',
      action: this.deletarCidade.bind(this),
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private poNotify: PoNotificationService,
    private fire:FirebaseService,
    private db: AngularFirestore,

  ) {}

  ngOnInit(): void {
    this.fire.getAll('pais').snapshotChanges().forEach(snap => {
      snap.forEach(doc => {
        const data = doc.payload.doc.data() as object;
        const id = doc.payload.doc.id;
        this.estados.push({id:id, ...data });
      });
    });
    console.log(this.estados)
    this.creatFormEstados(); 
  }

  adicionarCidades(item: any) {
    this.fire.getWhere('estados', 'estado', '==', item.nome).snapshotChanges().pipe(
      map(change => 
        change.map (c => 
          ({id: c.payload.doc.id, ...c.payload.doc.data() as object})
              )
            )
          ).subscribe(data =>{ 
            this.cidades = data;
            this.nameState = (item.nome);
            this.modal.open();
          });
      console.log(this.cidades);
  }

  creatFormEstados() {
    this.formEstados = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      foto: ['', Validators.required],
    });
  }

  saveEstado() {
    if (this.formEstados.invalid) {
      this.poNotify.error('Preencha os campos corretamente!');
    } else {
      this.db.collection('pais').add({...this.formEstados.value});
      this.poNotify.success('Estado Adicionado com sucesso!');
      setTimeout(() => {
        location.reload();
      }, 1750);
    }
  }

  deletarEstado(estado: any) {
    console.log(estado);
    this.fire.deleteEstado(estado.id);          
    setTimeout(() => {
      this.poNotify.success('Estado Excluido com sucesso!');
      location.reload();
    }, 1750);
  }

  insertOneCity() {
    console.log(  this.nameCity, this.nameState);
    
    this.db.collection('estados').add({
      estado: this.nameState,
      nome: this.nameCity,
      descricao: this.descricaoCity,
    });
  }

  deletarCidade(cidade: any) {
    console.log(cidade.id);
    this.fire.deleteCidade(cidade.id);          
    this.poNotify.success('Cidade Excluido com sucesso!');
  }
}
