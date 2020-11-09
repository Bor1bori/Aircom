/* eslint-disable @typescript-eslint/no-unused-vars */
import { PcProvider } from '@src/db/models/pc_provider';
import { User } from '@src/db/models/user';
export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
      pcProvider?: PcProvider;
    }
  }
}
