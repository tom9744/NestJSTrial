import { BoardStatus } from './board.model';

export class CreateBoardDto {
  title: string;
  desc: string;
  status?: BoardStatus;
}
