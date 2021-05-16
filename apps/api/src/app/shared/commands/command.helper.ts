import { plainToClass, ClassConstructor } from 'class-transformer';
import { validateSync } from 'class-validator';

import { BadRequestException, flatten } from '@nestjs/common';

export class CommandHelper {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static create<T extends object>(command: ClassConstructor<T>, data: Record<string, unknown>): T {
    const convertedObject = plainToClass<T, Record<string, unknown>>(command, {
      ...data,
    });

    const errors = validateSync(convertedObject);
    if (errors?.length) {
      const mappedErrors = flatten(errors.map((item) => Object.values(item.constraints)));
      throw new BadRequestException(mappedErrors);
    }

    return convertedObject;
  }
}
