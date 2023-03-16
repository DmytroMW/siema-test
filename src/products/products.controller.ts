import { Controller, Get, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer access_token'
})
@Controller('products')
@UseGuards( JwtAuthGuard )
export class ProductsController {
  constructor( private readonly productsService: ProductsService ) {}

  @Post()
  @ApiCreatedResponse({ description: JSON.stringify({ "productId": "number" }) })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  create() {
    return this.productsService.create();
  }

  @Get()
  @ApiOkResponse({
    description: `[
    ...
    ${ JSON.stringify({
      "id": "number",
      "name": "string",
      "price": "number"
    }) }
    ...
    ]`
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOkResponse({ description: 'The product with id # removed' })
  @ApiNotFoundResponse({ description: 'The current user absent' })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Delete(':id')
  remove( @Param( 'id' ) id: string ) {
    return this.productsService.remove( +id );
  }
}
