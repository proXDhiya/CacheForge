import ICommand from "../../app/interfaces/command.interface";
import ECHO from "../../app/commands/basicUtility/ECHO";
import {describe, it, expect} from "bun:test";

describe("ECHO", () => {
    it('should return a command object with type "string" and data "Hello World!"', () => {
        const result: ICommand = ECHO([
            { type: 'string', data: 'ECHO' },
            { type: 'string', data: 'Hello World!' }
        ]);

        expect(result).toEqual({
            type: 'string',
            data: 'Hello World!'
        });
    });

    it('should return error object with type "error" and data "ERR: wrong number of arguments"', () => {
        const result: ICommand = ECHO([
            { type: 'string', data: 'ECHO' }
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR wrong number of arguments for \'ECHO\' command'
        });
    });
});
