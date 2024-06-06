import httpStatus from 'http-status';

export const prismaErrorMessages: { [key: string]: string } = {
  P2002:
    'Unique constraint violation error. A record with the same unique value already exists.',
  P2003: 'Foreign key constraint error. A related record does not exist.',
  P2013: 'Null constraint violation error. A required field was not provided.',
  P2014:
    'Check constraint violation error. A value does not meet the check constraint.',
  P2015: 'Not null violation error. A required field was not provided.',
  P2016:
    'String length constraint error. The value of a string field is too long.',
  P2025: 'Record not found error. The requested record does not exist.',
  P2030:
    'Data manipulation error. An error occurred during a data manipulation operation.',
  P2031:
    'Data truncation error. A value was truncated during a data manipulation operation.',
  P2032:
    'Arithmetic operation error. An error occurred during an arithmetic operation.',
  P2033:
    'Data type conversion error. An error occurred during a data type conversion.',
  P2034:
    'Unique index violation error. A unique index constraint was violated.',
  P2035:
    'Foreign key index violation error. A foreign key index constraint was violated.',
};

export const userPrismaErrorMessage: {
  [key: string]: { statusCode: number; description: string };
} = {
  P2002: {
    statusCode: httpStatus.FORBIDDEN,
    description: 'Пользователь с такой электронной почтой уже существует',
  },
  P2013: {
    statusCode: httpStatus.BAD_REQUEST,
    description: 'Пропущено одно из обязательных полей',
  },
  P2015: {
    statusCode: httpStatus.BAD_REQUEST,
    description: 'Обязательное поле не может быть null',
  },
  P2016: {
    statusCode: httpStatus.BAD_REQUEST,
    description: 'Превышено допустимое количество символов',
  },
  P2025: {
    statusCode: httpStatus.NOT_FOUND,
    description: 'Запрашиваемый пользователь не существует',
  },
};

export const photoPrismaErrorMessage: {
  [key: string]: { statusCode: number; description: string };
} = {
  P2002: {
    statusCode: httpStatus.FORBIDDEN,
    description: 'Загружаемое фото уже существует',
  },
  P2013: {
    statusCode: httpStatus.BAD_REQUEST,
    description: 'Пропущено одно из обязательных полей',
  },
  P2015: {
    statusCode: httpStatus.BAD_REQUEST,
    description: 'Обязательное поле не может быть null',
  },
  P2016: {
    statusCode: httpStatus.BAD_REQUEST,
    description: 'Превышено допустимое количество символов',
  },
  P2025: {
    statusCode: httpStatus.NOT_FOUND,
    description: 'Запрашиваемое фото не существует',
  },
};
