export class MissingEnvironmentVariable extends Error {
    constructor(envVarName: string) {
        super(`Missing Environment variable: ${envVarName}`);
        // https://stackoverflow.com/a/41429145/3963260
        Object.setPrototypeOf(this, MissingEnvironmentVariable.prototype);
        this.name = "MissingEnvironmentVariableError";
    }
}

export class InvalidArgument extends Error {
    constructor(msg: string) {
        super(`Invalid argument: ${msg}`);
        Object.setPrototypeOf(this, InvalidArgument.prototype);
        this.name = "InvalidArgumentError";
    }
}

export class FailedParsing extends Error {
    constructor(stringifiedObj: string) {
        super(`Parsing failed: ${stringifiedObj}`);
        Object.setPrototypeOf(this, FailedParsing.prototype);
        this.name = "ParsingFailedError";
    }
}
