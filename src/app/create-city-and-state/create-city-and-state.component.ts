import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  PoModalComponent,
  PoNotificationService,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';

import { Service } from '../shared/service/service';

@Component({
  selector: 'app-create-city-and-state',
  templateUrl: './create-city-and-state.component.html',
  styleUrls: ['./create-city-and-state.component.css'],
})
export class CreateCityAndStateComponent implements OnInit {
  @ViewChild(PoModalComponent) modal!: PoModalComponent;
  estados: [] = [];
  cidades: any[] = [];
  formEstados!: FormGroup;
  nameCity!: string;
  nameState!: string;

  readonly columnsEstados: Array<PoTableColumn> = [
    { property: 'name', label: 'Nomes Estados' },
  ];

  readonly columnsCidades: Array<PoTableColumn> = [
    { property: 'name', label: 'Nomes Cidades' },
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
    private service: Service,
    private formBuilder: FormBuilder,
    private poNotify: PoNotificationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.service.getEstados().subscribe((res: any) => {
      this.estados = res;
    });
    this.creatFormEstados();
  }

  adicionarCidades(item: any) {
    const { name } = item;
    this.service.getOneEstados({ name: name }).subscribe((res: any) => {
      this.cidades = res.cidades;
      this.nameState = name;
      this.modal.open();
    });
  }

  creatFormEstados() {
    this.formEstados = this.formBuilder.group({
      name: ['', Validators.required],
      cidades: [[]],
    });
  }

  saveEstado() {
    const { name, cidades } = this.formEstados.value;

    if (this.formEstados.invalid) {
      this.poNotify.error('Preencha os campos corretamente!');
    } else {
      this.service
        .setEstados({
          name: name,
        })
        .subscribe((res: any) => {
          this.poNotify.success('Estado Adicionado com sucesso!');
        });
      location.reload();
    }
  }

  deletarEstado(estado: any) {
    const { name } = estado;
    this.service
      .deleteEstados({
        name: name,
      })
      .subscribe((res) => {
        this.poNotify.success('Estado Excluido com sucesso!');
        setTimeout(() => {
          location.reload();
        }, 1750);
      });
  }

  insertOneCity() {
    this.service
      .inserOneCidades({ nameState: this.nameState, nameCity: this.nameCity })
      .subscribe((res: any) => {});
  }

  deletarCidade(cidade: any) {
    const { name } = cidade;
    this.service
      .deleteCidades({
        nameState: this.nameState,
        nameCity: name,
      })
      .subscribe((res) => {
        this.poNotify.success('Cidade Excluida com sucesso!');
        location.reload();
      });
  }
}
