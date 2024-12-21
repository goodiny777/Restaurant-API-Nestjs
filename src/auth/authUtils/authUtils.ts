import { JwtService } from "@nestjs/jwt"

export class AuthUtlis {

    static async assignJWT(
        userId: string,
        jwtService: JwtService,
    ): Promise<string> {
        const payload = { id: userId };

        const token = jwtService.sign(payload);

        return token;
    }
}
