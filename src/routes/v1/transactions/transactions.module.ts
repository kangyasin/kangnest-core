import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import TransactionEntity from './schemas/transaction.entity';
import TransactionRepository from './transactions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionRepository],
  exports: [TransactionsService, TransactionRepository],

})
export class TransactionsModule {}
