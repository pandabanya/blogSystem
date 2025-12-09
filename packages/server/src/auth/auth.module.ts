import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';  // 新增
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';  // 新增

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    PassportModule,  // 新增
    JwtModule.register({
      secret: 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '7d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]  // 新增 JwtStrategy
})
export class AuthModule {}