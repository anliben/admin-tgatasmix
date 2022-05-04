import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';

import { Service } from '../shared/service/service';


@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {

  formPlano!: FormGroup;
  planos: any[]=[];

  readonly columns: Array<PoTableColumn> = [
    { property: 'id', label: 'Name', visible: false},
    { property: 'name', label: 'Name' },
    { property: 'type', label: 'Tipo' },
    { property: 'descricao', label: 'Descrição'},
    { property: 'valor', label: 'Valor' },
  ];

  actions: Array<PoTableAction> = [
    {  icon: 'po-icon po-icon-delete', label: 'Deletar',action: this.deletarPlano.bind(this)}
  ];

  constructor(
    private service: Service,
    private formBuilder: FormBuilder,
    private poNotify: PoNotificationService,
    ) { }

  ngOnInit(): void {
    this.service.getPlanos().subscribe((res:any) => {
      this.planos = res
    });
    this.creatFormPlanos()
  }

  creatFormPlanos(){
    this.formPlano = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required]
    })
  }

  savePlano(){
    const { name, type, descricao, valor } = this.formPlano.value;

    if(this.formPlano.invalid){
      this.poNotify.error('Preencha os campos corretamente!');
    }else{
      this.service.setPlanos({
        name: name,
        type: type,
        descricao: descricao,
        valor: valor
      }).subscribe((res: any) => {
        console.log(res)
      });
      this.poNotify.success('Plano Adicionado com sucesso!');
      setTimeout(() => {
        location.reload();
      }, 1750);
    }
  }

  deletarPlano(plano:any){

    const { name } = plano;
    console.log(name)

    this.service.deletePlanos({name: name}).subscribe((res) => {
      this.poNotify.success('Plano Excluido com sucesso');
      setTimeout(() => {
        location.reload();
      }, 1750);
    })
  }


}

