export class Pedido {
  pediId : number = 0;
  pediFecha: Date = new Date();
  pediCliId: number = 0;
  pediFechaAlta: Date = new Date();
  pediBorrado: boolean = false;

  cliNombre: string = '';
}
