import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException,  } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'g3pMx@example.com',
            role: 'ADMIN',
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'g3pMx@example.com',
            role: 'ADMIN',
        },
        {
            id: 3,
            name: 'Ikem Iro',
            email: 'ikemiro@mainModule.com',
            role: 'INTERN',
        },
        {
            id: 4,
            name: 'Mimi Okoli',
            email: 'mimiokoli@mainModule.com',
            role: 'ENGINEER',
        },
        {
            id: 5,
            name: 'Chidi Obi',
            email: 'chidiobi@mainModule.com',
            role: 'ENGINEER',
        },
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter((user) => user.role === role);
            if (rolesArray.length === 0) throw new NotFoundException("User role not found");
            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find((user) => user.id === id);
        if (!user) throw new NotFoundException("User doesn't exist");
        return user;
    }

    create(createUser: CreateUserDto) {
        const id = this.users.length + 1;
        const newUser = { id, ...createUser };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map((user) => {
            if (user.id === id) {
                return { ...user, ...updateUserDto };
            }
            return user;
        });
        return this.findOne(id);
    }

    remove(id: number) {
        const removedUser = this.findOne(id);
        if (!removedUser) return "User doesn't exist";
        this.users = this.users.filter((user) => user.id !== id);
        return removedUser;
    }
}
