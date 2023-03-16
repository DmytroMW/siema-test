import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  price: number;
}
