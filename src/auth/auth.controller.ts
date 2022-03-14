import {Body, Controller, Post} from '@nestjs/common';
import {AuthDto} from "../dto/auth.dto";

@Controller('auth')
export class AuthController {

    @Post()
    auth(@Body() authDto: AuthDto): string {
        return "success"
    }


}
