import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class PrismaWrapper {
  constructor(private readonly collectionName: string) {}

  async execute<U>(callback: () => Promise<U>): Promise<U> {
    try {
      return await callback();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`${error.meta.target} already used`);
        }
        if (error.code === 'P2025') {
          throw new NotFoundException(`${this.collectionName} not found`);
        }
        if (error.code === 'P2014') {
          throw new ConflictException(
            `${error.meta.model_b_name} already used`,
          );
        }
      }
      throw error;
    }
  }
}
