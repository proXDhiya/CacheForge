import ICommand from "../../app/interfaces/command.interface";
import KEYS from "../../app/commands/dataManipulation/KEYS";
import {describe, it, expect, beforeAll} from "bun:test";
import {setupSharedStorage} from "../__mock__/keys.mock";

describe('KEYS', () => {
    beforeAll(() => {
        setupSharedStorage();
    });

    it('should return a command object with type "array" and data when we pass "*" as argument', () => {
        const result: ICommand = KEYS([
            {type: 'string', data: 'KEYS'},
            {type: 'string', data: '*'}
        ]);

        expect(result).toStrictEqual({
            type: 'array',
            data: ['key', 'REQ_name', 'REQ_country', 'REQ_age']
        });
    });

    it('should return a command object with type "array" and data when we pass "REQ_*" as argument', () => {
        const result: ICommand = KEYS([
            {type: 'string', data: 'KEYS'},
            {type: 'string', data: 'REQ_*'}
        ]);

        expect(result).toStrictEqual({
            type: 'array',
            data: ['REQ_name', 'REQ_country', 'REQ_age']
        });
    });

    it('should return a command object with type "array" with empty data when we pass "name" as argument', () => {
        const result: ICommand = KEYS([
            {type: 'string', data: 'KEYS'},
            {type: 'string', data: 'name'}
        ]);

        expect(result).toStrictEqual({
            type: 'array',
            data: []
        });
    });

    it('should return a command object with type "error" when we pass no arguments', () => {
        const result: ICommand = KEYS([
            {type: 'string', data: 'KEYS'}
        ]);

        expect(result).toStrictEqual({
            type: 'error',
            data: 'ERR wrong number of arguments for \'KEYS\' command'
        });
    });
});
