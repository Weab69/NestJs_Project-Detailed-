import { Controller, Get, Param, Post, Body, Patch, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    findAll(@Query('role') role?: 'INTERN'| 'ADMIN' | 'ENGINEER' ){
        return this.usersService.findAll(role)
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOne(id)
    }
    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUsersDto){
        return this.usersService.create(createUserDto)
    }
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto:UpdateUsersDto ){
        return this.usersService.update(id, updateUserDto)
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.usersService.remove(id)
    }

}
