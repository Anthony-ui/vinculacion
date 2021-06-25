export interface Productos
{
  idProductos: number;
  fechaIngreso: Date;
  stock: number;
  precio: number;
  estado: boolean,
  proveedoresIdProveedores: number;
  categoriasIdCategorias: number;
  nombre: string;
}
/*
ARTESANOS
ID
NOMBREPRODUCTO
PRECIO ESTIMADO
STOCK ESTIMADO
PROVEEDOR ------ SELECT --- ARTESANOS
TALLAS

GANADEROS
ID
NOMBREPRODUCTO ---


*/