import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from "../schema/user.schema";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        privateuserModel: Model<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }
}