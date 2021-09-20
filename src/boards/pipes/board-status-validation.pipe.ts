import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly validStatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  private isValidOption(value: any): boolean {
    return this.validStatusOptions.includes(value);
  }

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isValidOption(value)) {
      throw new BadRequestException(
        `${value} is not a supported value for Board Status.`,
      );
    }

    return value;
  }
}
