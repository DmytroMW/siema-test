import { Controller, Body, Post, UsePipes } from '@nestjs/common';
import { AuthSchema } from './pipes/schemas/auth.schema';
import { JoiValidationPipe } from './pipes/validation.pipe';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RollbarSngl } from './rollbar.singleton';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService ) {}

  @Post('login')
  @ApiCreatedResponse({ description: JSON.stringify( { "access_token": "jwt" } ) })
  @ApiBadRequestResponse({ description: 'field is required' })
  @ApiNotFoundResponse({ description: 'The current user absent' })
  @UsePipes( new JoiValidationPipe( AuthSchema ) )
  async login( @Body() authBody: AuthDto ) {
    try {
      const response = await this.authService.login( authBody );

      return response;
    } catch ( error ) {
      RollbarSngl.error( error );
      throw error;
    }
  }
}
