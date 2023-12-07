import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll()
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id)
  }

  @Post('search')
  getUsersByParams(@Body('name') name: string) {
    return this.userService.findByName(name)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id)
  }

  @Post()
  createUser(@Body() body: { name: string; description: string }) {
    return this.userService.createUser(body)
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string; description: string },
  ) {
    return this.userService.updateUser(id, body)
  }
}
