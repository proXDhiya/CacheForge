import RENAMENX from "../../app/commands/dataManipulation/RENAMENX";
import ICommand from "../../app/interfaces/command.interface";
import {setupSharedStorage} from "../__mock__/keys.mock";
import {describe, it, expect, beforeEach} from "bun:test";

describe('RENAMENX', () => {
    beforeEach(() => {
        setupSharedStorage();
    });

    it('should return a command object with type "integer" and data 1 when the key is renamed', () => {
        const result: ICommand = RENAMENX([
            {type: 'string', data: 'RENAMENX'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'new-key'}
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 1
        });
    });

    it('should return a command object with type "integer" and data 0 when the new key already exists', () => {
        const result: ICommand = RENAMENX([
            {type: 'string', data: 'RENAMENX'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'REQ_name'}
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 0
        });
    });

    it('should return a command object with type "error" and data "ERR" when the key does not exist', () => {
        const result: ICommand = RENAMENX([
            {type: 'string', data: 'RENAMENX'},
            {type: 'string', data: 'noKey'},
            {type: 'string', data: 'new-key'}
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR'
        });
    });

    it('should return a command object with type "error" and data "ERR" if the number of arguments is not 3', () => {
        const result: ICommand = RENAMENX([
            {type: 'string', data: 'RENAMENX'},
            {type: 'string', data: 'key'}
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR wrong number of arguments for \'RENAMENX\' command'
        });
    });
});
