import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('create')
    async createUser(@Body() createUserDto: { username: string; password: string }) {
        return this.userService.createUser(createUserDto.username, createUserDto.password);
    }

    @Get(':username')
    async getUser(@Param('username') username: string) {
        return this.userService.findByUsername(username);
    }
}
