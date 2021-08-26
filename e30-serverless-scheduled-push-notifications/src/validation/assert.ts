import { Expo } from "expo-server-sdk";
export const assertToken = (expoPushToken: string) => {
    if (!Expo.isExpoPushToken(expoPushToken)) {
        throw new Error(
            `Not a valid push token. Got ${JSON.stringify(expoPushToken)}`
        );
    }
};

export function assertEnvVar(
    value: string | undefined,
    name: string
): asserts value is string {
    if (!value) {
        throw new Error(`Missing Env var: ${name}`);
    }
}
