// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PCProvider } from '@src/db/models/pc_provider';
export {};

declare global {
  namespace Express {
    export interface Request {
//    user?: User;
      pcProvider?: PCProvider
    }
  }
}
