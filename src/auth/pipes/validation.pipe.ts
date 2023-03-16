import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { RollbarSngl } from '../rollbar.singleton';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor( private schema: ObjectSchema ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate( value );
    if ( error ) {
      RollbarSngl.error( error.message );
      throw new BadRequestException( error.message );
    }
    return value;
  }
}

