import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor( 
      private userService: UsersService,
      private jwtService: JwtService
    ) {}

    async validateUser( username: string, pass: string ): Promise< any > {
      const user = await this.userService.findOne( username, pass );
      if ( !user ) {
        throw new HttpException('The current user absent', HttpStatus.NOT_FOUND);
      }
      
      const { password, ...result } = user;
        
      return result;
    }

    async login( authData: any ) {
      try {
        const user = await this.validateUser( authData.username, authData.password );
        const payload = { username: user.username, sub: user.id };
        const access_token = this.jwtService.sign( payload );
        const response = { access_token };
        
        return response;
      } catch ( error ) {
        throw error;
      }
    }
}
