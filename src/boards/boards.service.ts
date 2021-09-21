import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateBoardDto } from './DTOs/create-board.dto';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board.type';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRespository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRespository.createBoard(createBoardDto, user);
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRespository.find();
  }

  async getAllBoardsByUser(user: User): Promise<Board[]> {
    // Using a raw SQL query syntex
    const query = this.boardRespository
      .createQueryBuilder('board')
      .where('board.userId = :userId', { userId: user.id });

    return await query.getMany();
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

  async deleteBoardById(id: number, user: User): Promise<void> {
    // Throws no exception even if is doesn't exist
    const deletionResult = await this.boardRespository.delete({ id, user });

    if (deletionResult.affected < 1) {
      // Built-in Exception
      throw new NotFoundException(
        `Could not found a board with ID ${id} and owned by ${user.username} `,
      );
    }

    return;
  }
}
