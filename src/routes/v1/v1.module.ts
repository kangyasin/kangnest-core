import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
      { path: '/transactions', module: TransactionsModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    AuthModule,
    UsersModule,
    TransactionsModule,
  ],
})
export default class V1Module {}
