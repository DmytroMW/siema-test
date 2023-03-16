import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { existedProducts, productTemplate } from './constants';

@Injectable()
export class ProductsService {
  private products: Product[] = existedProducts;

  create() {
    const newProduct: CreateProductDto = JSON.parse( JSON.stringify( productTemplate ) );
    const lastIndex = this.products.length - 1;
    let newProductId = this.products[lastIndex].id;
    
    newProductId++;
    newProduct.id = newProductId;
    this.products.push( newProduct );

    const response = { productId: newProduct.id};
    
    return response;
  }

  findAll() {
    return this.products;
  }

  remove( id: number ) {
    const productIndex = this.products.findIndex( ( product ) => product.id === id );
    
    if ( productIndex < 0 ) {
      throw new HttpException( `The product with id ${id} absent`, HttpStatus.NOT_FOUND );
    }

    this.products = this.products.filter( ( product ) => product.id !== id );
    
    return `The product with id ${id} removed`;
  }
}
