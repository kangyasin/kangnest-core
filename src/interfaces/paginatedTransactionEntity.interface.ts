import TransactionEntity from '@v1/transactions/schemas/transaction.entity';

export interface PaginatedTransactionsInterface {
  readonly paginatedResult: TransactionEntity[] | [],
  readonly totalCount: number,
}
