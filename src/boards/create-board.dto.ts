import { IsNotEmpty } from 'class-validator';
import { BoardStatus } from './board.model';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  desc: string;

  status?: BoardStatus;
}
