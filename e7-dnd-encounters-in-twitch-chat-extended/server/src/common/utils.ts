import { pick as _pick } from 'lodash';
export const pick = <T extends {}>(obj: T, keys: (keyof T)[]) =>
  _pick(obj, keys);
