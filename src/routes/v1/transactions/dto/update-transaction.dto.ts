import { CreateTransactionDto } from './create-transaction.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
      @IsOptional()
      @IsBoolean()
      readonly name: string = '';
}
