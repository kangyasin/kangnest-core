import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

export class TransactionResponseEntity {

  id: number = 0;
  name: string = '';
}

export class AllTransactionResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => TransactionResponseEntity)
  data?: [] = []

  collectionName?: string = '';

  options?: {
    location: string,
    paginationParams: PaginationParamsInterface,
    totalCount: number,
  }
}

