import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board.type';
import { CreateBoardDto } from './DTOs/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRespository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRespository.createBoard(createBoardDto);
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRespository.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const foundBoard = await this.boardRespository.findOne(id);

    if (!foundBoard) {
      throw new NotFoundException(`Could not found a board with ID, ${id}`); // Built-in Exception
    }

    return foundBoard;
  }

  async updateBoardStatus(id: number, nextStatus: BoardStatus): Promise<Board> {
    const targetBoard = await this.getBoardById(id);

    targetBoard.status = nextStatus;

    await this.boardRespository.save(targetBoard);

    return targetBoard;
  }

  async deleteBoardById(id: number): Promise<void> {
    const deletionResult = await this.boardRespository.delete(id); // Throws no exception even if is doesn't exist

    if (deletionResult.affected < 1) {
      throw new NotFoundException(`Could not found a board with ID, ${id}`); // Built-in Exception
    }

    return;
  }
}
