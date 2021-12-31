import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiParam,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import JwtAccessGuard from '@guards/jwt-access.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AllTransactionResponseEntity } from '@v1/transactions/entities/transaction-response.entity';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import PaginationUtils from '../../../utils/pagination.utils';
import ResponseUtils from '../../../utils/response.utils';
import { PaginatedTransactionsInterface } from '@interfaces/paginatedTransactionEntity.interface';
import Serialize from '@decorators/serialization.decorator';
import TransactionEntity from './schemas/transaction.entity';

@ApiBearerAuth()

@ApiTags('Transactions')
@ApiExtraModels(TransactionEntity)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(TransactionEntity),
        },
      },
    },
    description: '200. Success. Returns a user',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Transaction was not found',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiParam({ name: 'name', type: String })
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(TransactionEntity),
        },
      },
    },
    description: '200. Success. Returns all transaction',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Get()
  @UseGuards(JwtAccessGuard)
  @Serialize(AllTransactionResponseEntity)
  async findAll(@Query() query: any) {
    const paginationParams: PaginationParamsInterface | false = PaginationUtils.normalizeParams(query.page);
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedUsers: PaginatedTransactionsInterface = await this.transactionsService.findAllPagination(paginationParams);

    return ResponseUtils.success(
      'users',
      paginatedUsers.paginatedResult,
      {
        location: 'users',
        paginationParams,
        totalCount: paginatedUsers.totalCount,
      },
    );
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(TransactionEntity),
        },
      },
    },
    description: '200. Success. Returns all transaction',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Get()
  @Serialize(AllTransactionResponseEntity)
  async findAllPagination(@Query() query: any) {
    const paginationParams: PaginationParamsInterface | false = PaginationUtils.normalizeParams(query.page);
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedUsers: PaginatedTransactionsInterface = await this.transactionsService.findAllPagination(paginationParams);

    return ResponseUtils.success(
      'users',
      paginatedUsers.paginatedResult,
      {
        location: 'users',
        paginationParams,
        totalCount: paginatedUsers.totalCount,
      },
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
