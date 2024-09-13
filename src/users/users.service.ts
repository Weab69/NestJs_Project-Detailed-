import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user.dto'
import { UpdateUsersDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        { "id": 1, name: 'John Doe', email: 'john.doe@example.com', role: 'ADMIN' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'INTERN' },
        { id: 3, name: 'Peter Pan', email: 'peter.pan@example.com', role: 'ENGINEER' },
        { id: 4, name: 'Wendy Darling', email: 'wendy.darling@example.com', role: 'ADMIN' },
        { id: 5, name: 'Captain Hook', email: 'captain.hook@example.com', role: 'INTERN' }
    ];
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        if(role){
            const rolesArray = this.users.filter(user => user.role === role)
            if(!rolesArray.length){
                throw new NotFoundException(`No users with role ${role} found`)
            }
            return rolesArray
        }
        
        return this.users
    }
    findOne(id: number){
        const user = this.users.find(user => user.id === id)
        if(!user){
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return user
    }
    create(createUserDto: CreateUsersDto){
        const userByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }
    update(id: number, updateUserDto:UpdateUsersDto){
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user, ...updateUserDto}
            }
            return user
        })
        return this.findOne(id)
    }
    remove(id: number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser 
    }
}
  
