import ICommand from "../../app/interfaces/command.interface";
import PING from "../../app/commands/basicUtility/PING";
import {describe, it, expect} from "bun:test";

describe("PING", () => {
    it('should return a command object with type "string" and data "PONG"', () => {
        const result: ICommand = PING();

        expect(result).toEqual({
            type: 'string',
            data: 'PONG'
        });
    });
});
