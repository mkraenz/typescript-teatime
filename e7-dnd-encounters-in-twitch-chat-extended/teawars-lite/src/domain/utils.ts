import { pick as _pick } from "lodash";
export const pick = <T extends Record<string, any>>(
    obj: T,
    keys: Array<keyof T>
) => _pick(obj, keys);
