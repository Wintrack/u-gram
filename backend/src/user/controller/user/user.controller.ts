import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorator/user/user';
import { JwtGuard } from 'src/auth/guard/jwt/jwt.guard';
import { UserLogged } from 'src/auth/types/user-logged';
import { UserService } from 'src/user/domain/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FindUserDto } from 'src/user/dto/find-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: 'Register an account' })
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ description: 'Register a user' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Put()
  async update(@User() user: UserLogged, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(user.id, updateUserDto);
  }

  @ApiOperation({ description: 'Get all users public infos' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  async getAll(
    @Query() findUserDto: FindUserDto
  ) {
    return await this.userService.getAll(findUserDto);
  }

  @ApiOperation({ description: 'Get current user logged info' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('/me')
  async getMyUser(@User() user: UserLogged) {
    return await this.userService.getByAuthId(user.id);
  }

  @ApiOperation({ description: 'Get user public info by id' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @ApiOperation({ description: 'Delete the user by id' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete()
  async delete(
    @User() user: UserLogged
  ) {
    await this.userService.deleteByAuthId(user.id);
  }
}
