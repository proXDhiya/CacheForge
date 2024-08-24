import ICommand from "../../app/interfaces/command.interface";
import DEL from "../../app/commands/dataManipulation/DEL";
import {setupSharedStorage} from "../__mock__/keys.mock";
import {describe, it, expect, beforeAll} from "bun:test";

describe("DEL", () => {
    beforeAll(() => {
        setupSharedStorage();
    });

    it('should return a command object with type "integer" and data 1', () => {
        const result: ICommand = DEL([
            { type: 'string', data: 'DEL' },
            { type: 'string', data: 'key' }
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 1
        });
    });

    it('should return a command object with type "integer" and data 2', () => {
        const result: ICommand = DEL([
            { type: 'string', data: 'DEL' },
            { type: 'string', data: 'REQ_name' },
            { type: 'string', data: 'REQ_age' },
            { type: 'string', data: 'noKey' }
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 2
        });
    });
});
