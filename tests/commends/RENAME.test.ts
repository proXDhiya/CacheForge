import RENAME from "../../app/commands/dataManipulation/RENAME";
import ICommand from "../../app/interfaces/command.interface";
import {setupSharedStorage} from "../__mock__/keys.mock";
import {describe, it, expect, beforeAll} from "bun:test";

describe('RENAME', () => {
    beforeAll(() => {
        setupSharedStorage();
    });

    it('should return a command object with type "string" and data "Ok" when the key is renamed', () => {
        const result: ICommand = RENAME([
            {type: 'string', data: 'RENAME'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'new-key'}
        ]);

        expect(result).toEqual({
            type: 'string',
            data: 'Ok'
        });
    });

    it('should return a command object with type "error" and data "ERR" when the key does not exist', () => {
        const result: ICommand = RENAME([
            {type: 'string', data: 'RENAME'},
            {type: 'string', data: 'noKey'},
            {type: 'string', data: 'new-key'}
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR'
        });
    });

    it('should return a command object with type "error" and data "ERR" if the number of arguments is not 3', () => {
        const result: ICommand = RENAME([
            {type: 'string', data: 'RENAME'},
            {type: 'string', data: 'key'}
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR wrong number of arguments for \'RENAME\' command'
        });
    });
});
