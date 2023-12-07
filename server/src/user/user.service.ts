import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

interface createUserParams {
  name: string
  description: string
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const users = await this.prisma.user.findMany()
    return users
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async findByName(name: string) {
    const users = await this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })
    return users
  }

  async createUser({ name, description }: createUserParams) {
    const userExit = await this.prisma.user.findMany({
      where: {
        name,
      },
    })

    if (userExit.length > 0) {
      throw new ConflictException('User already exists')
    }
    const user = await this.prisma.user.create({
      data: {
        name,
        description,
      },
    })
    return user
  }

  async updateUser(id: number, body: { name: string; description: string }) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        description: body.description,
      },
    })
    return user
  }

  async deleteUser(id: number) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
