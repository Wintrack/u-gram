import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorator/user/user';
import { JwtGuard } from 'src/auth/guard/jwt/jwt.guard';
import { UserLogged } from 'src/auth/types/user-logged';
import { CommentService } from 'src/comment/domain/comment/comment.service';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';

@ApiTags('Comment')
@Controller('picture/:id/comment')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ description: 'Get all comments of a picture' })
  @Get()
  async getAll(@Param('id') id: string) {
    return await this.commentService.getAll(id);
  }

  @ApiOperation({ description: 'Create a comment on a picture' })
  @Post()
  async create(
    @User() userLogged: UserLogged,
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return await this.commentService.create(userLogged.id, id, dto);
  }
}
