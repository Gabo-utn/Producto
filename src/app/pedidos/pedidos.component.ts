import { AfterViewInit, Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmarComponent } from '../confirmar/confirmar.component';
import { Cliente } from '../shared/cliente';
import { ClienteService } from '../shared/cliente.service';
import { Pedido } from '../shared/pedido';
import { PedidoService } from '../shared/pedido.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
//@NgModule(){
//  imports:[
//    MatPaginatorModule ]
//}

export class PedidosComponent implements OnInit, AfterViewInit {

  items: Pedido[] = [];
  seleccionado = new Pedido();

  columnas: string[] = ['pediId', 'pediFecha', 'cliNombre', 'acciones'];
  dataSource = new MatTableDataSource<Pedido>();


  form = new FormGroup({});
  mostrarFormulario = false;

  clientes: Cliente[] = [];

  minDate: Date = new Date();

  constructor(private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      pediId: [''],
      pediFecha: ['', Validators.required],
      pediCliId: ['', Validators.required],
      pediFechaAlta: [''],
      pediBorrado: [''],
      cliNombre:['']
    });

    this.pedidoService.get().subscribe(
      (pedidos) => {
        this.items = pedidos;
        this.actualizarTabla();
      }
    );

    this.clienteService.get().subscribe(
      (clientes)=>{
        this.clientes = clientes;
      }
    )
  }
  mostrar = false;
  mostrarDetalle():Boolean{
    if(this.seleccionado.pediId){
      return this.mostrar = true;
    }else{
      return this.mostrar = false;
    }
  }

  actualizarTabla() {
    this.dataSource.data = this.items;
    this.dataSource.sort = this.sort;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  agregar() {
    this.form.reset();
    this.seleccionado = new Pedido();
    this.mostrarFormulario = true;
  }

  delete(row: Pedido) {

    const dialogRef = this.dialog.open(ConfirmarComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.pedidoService.delete(row.pediId)
          .subscribe(() => {

            this.items = this.items.filter( x => x !== row);

            this.actualizarTabla();
          });
      }
    });
  }

  edit(seleccionado: Pedido) {
    this.mostrarFormulario = true;
    this.seleccionado = seleccionado;
    this.form.setValue(seleccionado);
  }

  guardar() {
    if (!this.form.valid) {
      return;
    }

    Object.assign(this.seleccionado, this.form.value);




    if (this.seleccionado.pediId) {
      this.pedidoService.put(this.seleccionado)
        .subscribe((pedido) => {
          this.mostrarFormulario = false;
        });

    } else {
      this.pedidoService.post(this.seleccionado)
        .subscribe((pedido: Pedido) => {
          pedido.cliNombre = this.clientes.find(c => c.cliId == pedido.pediCliId)!.cliNombre;
          this.items.push(pedido);
          this.mostrarFormulario = false;
          this.actualizarTabla();
        });

    }

  }
  cancelar() {
    this.mostrarFormulario = false;
  }


}
