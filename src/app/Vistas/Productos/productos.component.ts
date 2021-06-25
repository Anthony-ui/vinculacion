import { Component, OnInit } from '@angular/core';
import {Productos} from '../../Clases/productos';
import {Categorias} from '../../Clases/categorias';
import {Proveedores} from '../../Clases/proveedores';

import {ProductosService} from '../../Servicios/productos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productoObj: Productos[] = [];
  categoriaObj: Categorias[] = [];
  proveedorObj: Proveedores[] = [];

  //Nuevo
  NewNombre:string;
  NewStock:number=0;
  NewPrecio:number=0;
  NewFecha:Date;
  NewEstado:boolean=false;
  NewProveedor:number=0;
  NewCategoria:number=0;

  //Actualizar
  UpdateNombre:string;
  UpdateStock:number;
  UpdatePrecio:number;
  UpdateFecha;
  UpdateEstado:boolean=false;
  UpdateProveedor:number=0;
  UpdateCategoria:number=0;
  IDproducto:number;
  spinner:number=0;

  constructor(private productosService:ProductosService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.mostrar();
    this.llenarCategorias();
    this.llenarProveedores();
  }

  mostrar() {
    
    this.productosService.listarProductos().subscribe(res => {
      this.productoObj = res;
    }, error => alert("Error al listar Productos"));
  }

  llenarCategorias()
  {
    this.productosService.listarCategorias().subscribe(res => {
      this.categoriaObj = res;
    }, error => alert("Error al listar Categorias"));
  }

  llenarProveedores()
  {

    this.spinner=1;

    
    this.productosService.listarProveedores().subscribe(res => {
      this.proveedorObj = res;
      this.spinner=0;

    }, error => {
      alert("Error al conectar con el servidor");
      this.spinner=0;
    });
  }


  guardar()
  {
    let dato:Productos ={
      idProductos: undefined,
      fechaIngreso: this.NewFecha,
      stock: this.NewStock,
      precio: this.NewPrecio,
      estado: this.NewEstado,
      proveedoresIdProveedores: parseInt(this.NewProveedor.toString()),
      categoriasIdCategorias: parseInt(this.NewCategoria.toString()),
      nombre: this.NewNombre
    }
    this.productosService.nuevoProducto(dato).subscribe(res => {
      this.mostrar();
    }, error => alert("Error al insertar el registro"));
    this.limpiarNew();
  }


  llenarCampos(item:Productos)
  {
    this.UpdateFecha = this.obtenerFecha(item.fechaIngreso);
    this.UpdateStock = item.stock;
    this.UpdatePrecio = item.precio;
    this.UpdateEstado = item.estado;
    this.UpdateProveedor = item.proveedoresIdProveedores;
    this.UpdateCategoria = item.categoriasIdCategorias;
    this.UpdateNombre = item.nombre;
    this.IDproducto = item.idProductos;
  }


  actualizarProducto()
  {
    let dato:Productos = {
      idProductos: this.IDproducto,
      fechaIngreso: this.UpdateFecha,
      stock: this.UpdateStock,
      precio: this.UpdatePrecio,
      estado: this.UpdateEstado,
      proveedoresIdProveedores: parseInt(this.UpdateProveedor.toString()),
      categoriasIdCategorias: parseInt(this.UpdateCategoria.toString()),
      nombre: this.UpdateNombre
    }
    console.log(dato);
    this.productosService.editarProducto(this.IDproducto,dato).subscribe(res => {
      this.mostrar();
    }, error => alert("Error al actualizar el registro"));
  }


  eliminar(id)
  {
    Swal.fire({
      title: '¿Esta seguro que desea eliminar?',
      text: " este registro se eliminará permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.productosService.eliminarProducto(id).subscribe(res => {
          this.mostrar();
          Swal.fire('Clientes', 'Registro Eliminado exitosamente ', 'success');
        }, error => alert("error al eliminar el registro"));
      }
    });

  }








  limpiarNew(){
    this.NewFecha = undefined;
    this.NewStock = 0;
    this.NewPrecio = 0;
    this.NewEstado = false;
    this.NewProveedor = 0;
    this.NewCategoria = 0;
    this.NewNombre = '';
  }





  obtenerFecha(fecha:any)
  {
    let x = fecha.split("T",1);
    return x[0];
  }

    //MODAL
    openModal(content) {
      this.modalService.open(content);
    }

}
