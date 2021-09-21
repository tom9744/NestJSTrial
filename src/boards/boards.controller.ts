import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BoardStatus } from './board.type';
import { BoardsService } from './boards.service';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { CreateBoardDto } from './DTOs/create-board.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // Impacts all the route handlers
export class BoardsController {
  constructor(private boardsService: BoardsService) {} // Dependency Injection

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get()
  readAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/my-boards')
  readAllBoardsByUser(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getAllBoardsByUser(user);
  }

  @Get('/:id')
  readBoardById(@Param('id', ParseIntPipe) id): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoardById(id);
  }

  @Patch('/:id')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
