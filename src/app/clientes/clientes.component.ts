import { Component, OnInit } from '@angular/core';
import { Cliente} from '../shared/cliente';
import {ClienteService} from '../shared/cliente.service';
import{MatTable} from '@angular/material/table';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  editando = false;

  constructor(private clienteService: ClienteService ) { }


  ngOnInit(): void {
    this.getClientes()
  }
  delete( row : Cliente){
  }
  getClientes():void{
    this.clienteService.get().subscribe(
      (clientes) => {
        this.clientes = clientes
      }
    )
  }

  edit( row : Cliente){
    this.editando = true;
  }

  aceptar(){
    this.editando = false;
  }
  cancelar(){
    this.editando = false;
  }

}
