import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.type';
import { CreateBoardDto } from './DTOs/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard = this.create({
      ...createBoardDto,
      status: BoardStatus.PUBLIC, // Default Value
    });

    await this.save(createdBoard); // Save to the database

    return createdBoard;
  }
}
