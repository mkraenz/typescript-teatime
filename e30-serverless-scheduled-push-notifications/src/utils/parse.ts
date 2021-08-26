import { FailedParsing } from "../util/custom.error";

export const parse = <T>(stringifiedObj: string): T => {
    try {
        return JSON.parse(stringifiedObj);
    } catch (error) {
        throw new FailedParsing(stringifiedObj);
    }
};
