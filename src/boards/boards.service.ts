import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // In-Memory Database

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoard(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  createBoard(ceateBoardDto: CreateBoardDto): Board {
    const { title, desc, status } = ceateBoardDto;
    const newBoard = status
      ? new Board(title, desc, status)
      : new Board(title, desc);

    this.boards.push(newBoard);

    return newBoard;
  }

  modifyBoardStatus(id: string, newStatus: BoardStatus): Board {
    const targetBoardIndex = this.boards.findIndex((board) => board.id === id);
    const targetBoard = this.boards[targetBoardIndex];
    const updatedBoard = { ...targetBoard, status: newStatus };

    this.boards[targetBoardIndex] = updatedBoard;

    return updatedBoard;
  }

  removeBoard(id: string): void {
    this.boards.filter((board) => board.id !== id);
  }
}
