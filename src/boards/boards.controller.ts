import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { CreateBoardDto } from './DTOs/create-board.dto';

@Controller('boards')
export class BoardsController {
  // Dependency Injection
  constructor(private boardsService: BoardsService) {}

  @Get()
  readAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  readBoard(@Param('id') id: string): Board {
    return this.boardsService.getBoard(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch('/:id')
  updateBoard(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.boardsService.modifyBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.removeBoard(id);
  }
}
