import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService  // JWT 服务
  ) {}

  // 注册
  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    // 1. 检查用户名是否已存在
    const existUser = await this.userModel.findOne({ username }).exec();
    if (existUser) {
      return {
        code: 400,
        message: '用户名已存在',
        data: null
      };
    }

    // 2. 加密密码（使用 bcrypt，加盐 10 轮）
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. 创建用户
    const newUser = new this.userModel({
      username,
      password: hashedPassword
    });
    await newUser.save();

    return {
      code: 201,
      message: '注册成功',
      data: {
        username: newUser.username,
        id: newUser._id
      }
    };
  }

  // 登录
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // 1. 查找用户
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // 2. 验证密码（比对明文密码和加密密码）
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // 3. 生成 JWT Token
    const payload = { 
      userId: user._id, 
      username: user.username,
      role: user.role
    };
    const token = this.jwtService.sign(payload);

    return {
      code: 200,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role
        }
      }
    };
  }
}