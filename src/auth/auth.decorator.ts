import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'IS_PUBLIC';
export const AuthPublic = () => SetMetadata(PUBLIC_KEY, true);
