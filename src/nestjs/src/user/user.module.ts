import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserProviders } from "src/auth/entities/user.provider";
import { DatabaseModule } from "src/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, ...UserProviders],
})
export class UserModule {}