import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import TransactionsRepository from './transactions.repository';
import TransactionEntity from './schemas/transaction.entity';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedTransactionsInterface } from '@interfaces/paginatedTransactionEntity.interface';
@Injectable()
export class TransactionsService {

  constructor(private readonly transactionRepository: TransactionsRepository) {
  }
  

  public async create(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity> {
    return this.transactionRepository.create({
      ...createTransactionDto,
    });
  }

  findAll(options: PaginationParamsInterface) : Promise<PaginatedTransactionsInterface> {
    return this.transactionRepository.getAllWithPagination(options);
  }

  findAllPagination(options: PaginationParamsInterface) : Promise<PaginatedTransactionsInterface> {
    return this.transactionRepository.getAllWithPagination(options);
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
