import EXISTS from "../../app/commands/dataManipulation/EXISTS";
import ICommand from "../../app/interfaces/command.interface";
import {setupSharedStorage} from "../__mock__/keys.mock";
import {describe, it, expect, beforeAll} from "bun:test";

describe('EXISTS', () => {
    beforeAll(() => {
        setupSharedStorage();
    });

    it('should return a command object with type "integer" and data 1 when the key exists', () => {
        const result: ICommand = EXISTS([
            {type: 'string', data: 'EXISTS'},
            {type: 'string', data: 'key'}
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 1
        });
    });

    it('should return a command object with type "integer" and data 0 when the key does not exist', () => {
        const result: ICommand = EXISTS([
            {type: 'string', data: 'EXISTS'},
            {type: 'string', data: 'noKey'}
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 0
        });
    });

    it('should return a command object with type "integer" and data 2 when two keys exist', () => {
        const result: ICommand = EXISTS([
            {type: 'string', data: 'EXISTS'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'REQ_name'}
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 2
        });
    });

    it('should return a command object with type "integer" and data 1 when one key exists', () => {
        const result: ICommand = EXISTS([
            {type: 'string', data: 'EXISTS'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'noKey'}
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 1
        });
    });
});
