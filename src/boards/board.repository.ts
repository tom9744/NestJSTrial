import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Board } from './board.entity';
import { BoardStatus } from './board.type';
import { CreateBoardDto } from './DTOs/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const createdBoard = this.create({
      ...createBoardDto,
      status: BoardStatus.PUBLIC, // Default Value
      user,
    });

    await this.save(createdBoard); // Save to the database

    return createdBoard;
  }
}
