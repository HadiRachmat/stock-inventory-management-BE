import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  BadRequestException,
} from '@nestjs/common';

import type { UserRepository } from '../../domain/repositories/user.repository.js';

import { USER_REPOSITORY } from '../../domain/repositories/user.repository.js';

import type { PasswordHasherPort } from '../../application/ports/password-hasher.port.js';

import { PASSWORD_HASHER_PORT } from '../../application/ports/password-hasher.port.js';

import { createUserUseCase } from '../../application/use-case/create-user.user-case.js';
import { findAllUsers } from '../../application/use-case/find-all-user.use-case.js';
import { findUserById } from '../../application/use-case/find-user-by-id.use-case.js';
import { updateUserUseCase } from '../../application/use-case/update-user.user-case.js';
// import { activateUser } from '../../application/use-case/activate-user.use-case.js';
// import { deactivateUser } from '../../application/use-cases/deactivate-user.use-case.js';
// import { deleteUser } from '../../application/use-cases/delete-user.use-case.js';

import { createUserSchema } from '../http/dto/create-user.dto.js';
import { updateUserSchema } from '../http/dto/update-user.dto.js';
import { userFilterSchema } from '../http/dto/user-filter.dto.js';

import {
  toUserResponse,
  toUserResponses,
} from '../http/mappers/user-response.mappers.js';

@Controller('users')
export class UsersController {
  private readonly createUser: ReturnType<typeof createUserUseCase>;
  private readonly findAllUsersUseCase: ReturnType<typeof findAllUsers>;
  private readonly findUserByIdUseCase: ReturnType<typeof findUserById>;
  private readonly updateUserUseCase: ReturnType<typeof updateUserUseCase>;
  // private readonly activateUserUseCase: ReturnType<typeof activateUser>;
  // private readonly deactivateUserUseCase: ReturnType<typeof deactivateUser>;
  // private readonly deleteUserUseCase: ReturnType<typeof deleteUser>;

  constructor(
    @Inject(USER_REPOSITORY)
    userRepository: UserRepository,

    @Inject(PASSWORD_HASHER_PORT)
    passwordHasher: PasswordHasherPort,
  ) {
    this.createUser = createUserUseCase({
      userRepository,
      passwordHasher,
    });

    this.findAllUsersUseCase = findAllUsers({
      userRepository,
    });

    this.findUserByIdUseCase = findUserById({
      userRepository,
    });

    this.updateUserUseCase = updateUserUseCase({
      userRepository,
    });

    // this.activateUserUseCase = activateUser({
    //   userRepository,
    // });

    // this.deactivateUserUseCase = deactivateUser({
    //   userRepository,
    // });

    // this.deleteUserUseCase = deleteUser({
    //   userRepository,
    // });
  }

  // CREATE USER
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: unknown) {
    const result = createUserSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.issues,
      });
    }

    const { password, ...userData } = result.data;

    const user = await this.createUser({
      ...userData,
      passwordHash: password,
    });

    console.log('[DEBUG] Create User Success:', user.id);

    return {
      message: 'User created successfully',
      data: toUserResponse(user),
    };
  }

  // FIND ALL USERS
  @Get()
  async findAll(@Query() query: unknown) {
    const result = userFilterSchema.safeParse(query);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.issues,
      });
    }

    const users = await this.findAllUsersUseCase(result.data);

    return {
      message: 'Users retrieved successfully',
      data: toUserResponses(users),
    };
  }

  // FIND USER BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.findUserByIdUseCase(id);

    return {
      message: 'User retrieved successfully',
      data: toUserResponse(user),
    };
  }

  // UPDATE USER
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: unknown) {
    const result = updateUserSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.issues,
      });
    }

    const user = await this.updateUserUseCase({
      id,
      ...result.data,
    });

    return {
      message: 'User updated successfully',
      data: toUserResponse(user),
    };
  }

  // // ACTIVATE USER
  // @Patch(':id/activate')
  // async activate(@Param('id', ParseIntPipe) id: number) {
  //   const user = await this.activateUserUseCase(id);

  //   return {
  //     message: 'User activated successfully',
  //     data: toUserResponse(user),
  //   };
  // }

  // // DEACTIVATE USER
  // @Patch(':id/deactivate')
  // async deactivate(@Param('id', ParseIntPipe) id: number) {
  //   const user = await this.deactivateUserUseCase(id);

  //   return {
  //     message: 'User deactivated successfully',
  //     data: toUserResponse(user),
  //   };
  // }

  // // DELETE USER
  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // async delete(@Param('id', ParseIntPipe) id: number) {
  //   await this.deleteUserUseCase(id);

  //   return {
  //     message: 'User deleted successfully',
  //   };
  // }
}
