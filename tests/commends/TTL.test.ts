import {setupSharedStorageWithTTL} from "../__mock__/keys.mock";
import ICommand from "../../app/interfaces/command.interface";
import TTL from "../../app/commands/dataManipulation/TTL";
import {describe, it, expect, beforeAll} from "bun:test";

describe("TTL", () => {
    beforeAll(() => {
        setupSharedStorageWithTTL();
    });

    it('should return a command object with type "integer" and data 10', () => {
        const result: ICommand = TTL([
            { type: 'string', data: 'TTL' },
            { type: 'string', data: 'key' }
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 10
        });
    });

    it('should return a command object with type "integer" and data 5', () => {
        const result: ICommand = TTL([
            { type: 'string', data: 'TTL' },
            { type: 'string', data: 'REQ_name' }
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 5
        });
    });

    it('should return a command object with type "integer" and data -1', () => {
        const result: ICommand = TTL([
            { type: 'string', data: 'TTL' },
            { type: 'string', data: 'REQ_age' }
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: -1
        });
    });

    it('should return a command object with type "integer" and data -2', () => {
        const result: ICommand = TTL([
            { type: 'string', data: 'TTL' },
            { type: 'string', data: 'noKey' }
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: -2
        });
    });

    it('should return a command object with type "error" and data "ERR wrong number of arguments for \'TTL\' command"', () => {
        const result: ICommand = TTL([
            { type: 'string', data: 'TTL' }
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR wrong number of arguments for \'TTL\' command'
        });
    });
});
