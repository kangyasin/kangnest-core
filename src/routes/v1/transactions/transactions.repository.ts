import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm/index';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedTransactionsInterface } from '@interfaces/paginatedTransactionEntity.interface';
import PaginationUtils from '@utils/pagination.utils';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import TransactionEntity from './schemas/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export default class TransactionsRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionModel: Repository<TransactionEntity>,
  ) {}

  public create(transaction: CreateTransactionDto): Promise<TransactionEntity> {
    return this.transactionModel.save({
      ...transaction,
    });
  }


  public async getById(id: number): Promise<TransactionEntity | undefined> {
    return  this.transactionModel.findOne(id);
  }

  public async getName(name: string): Promise<TransactionEntity | undefined> {
    return this.transactionModel.findOne({
      where: [{ name: name }],
    });
  }

  
  public updateById(id: number, data: UpdateTransactionDto): Promise<UpdateResult> {
    return this.transactionModel.update(id, data);
  }

  public async getAllWithPagination(options: PaginationParamsInterface): Promise<PaginatedTransactionsInterface> {
    const [transaction, totalCount] = await Promise.all([
      this.transactionModel.find({
        skip: PaginationUtils.getSkipCount(options.page, options.limit),
        take: PaginationUtils.getLimitCount(options.limit),
      }),
      this.transactionModel.count({
      }),
    ]);

    return { paginatedResult: transaction, totalCount };
  }
}
