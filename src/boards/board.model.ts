import { v1 as uuid } from 'uuid';

export class Board {
  id: string;
  title: string;
  desc: string;
  status: BoardStatus;

  constructor(
    title: string,
    desc: string,
    status: BoardStatus = BoardStatus.PUBLIC,
  ) {
    this.id = uuid();
    this.title = title;
    this.desc = desc;
    this.status = status;
  }
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
