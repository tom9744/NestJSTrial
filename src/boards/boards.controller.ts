import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private logger = new Logger('BoardController'); // Add a logger

  constructor(private boardsService: BoardsService) {} // Dependency Injection

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    const serialized = JSON.stringify(createBoardDto);
    this.logger.verbose(
      `User "${user.username}" has tried to create a new board with the following payload: ${serialized}`,
    );

    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get()
  readAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User "${user.username}" has tried to read all boards`);

    return this.boardsService.getAllBoards();
  }

  @Get('/my-boards')
  readAllBoardsByUser(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(
      `User "${user.username}" has tried to read all boards owned by itself`,
    );

    return this.boardsService.getAllBoardsByUser(user);
  }

  @Get('/:id')
  readBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User "${user.username}" has tried to read the board with ID ${id}`,
    );

    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" has tried to delete the board with ID ${id}`,
    );

    return this.boardsService.deleteBoardById(id, user);
  }

  @Patch('/:id')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User "${user.username}" has tried to update the board with ID ${id}`,
    );

    return this.boardsService.updateBoardStatus(id, status);
  }
}
