import ICommand from "../../app/interfaces/command.interface";
import COPY from "../../app/commands/dataManipulation/COPY";
import {setupSharedStorage} from "../__mock__/keys.mock";
import {describe, it, expect, beforeAll} from "bun:test";

describe('COPY', () => {
    beforeAll(() => {
        setupSharedStorage();
    });

    it('should return a command object with type "integer" and data 1 when the destination key does not exist', () => {
        const result: ICommand = COPY([
            {type: 'string', data: 'COPY'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'cp-key'}
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 1
        });
    });

    it('should return a command object with type "integer" and data 0 when the destination key exists and the REPLACE flag is not setKey', () => {
        const result: ICommand = COPY([
            {type: 'string', data: 'COPY'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'REQ_name'}
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 0
        });
    });

    it('should return a command object with type "integer" and data 1 when the destination key exists and the REPLACE flag is setKey', () => {
        const result: ICommand = COPY([
            {type: 'string', data: 'COPY'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'REQ_name'},
            {type: 'string', data: 'REPLACE'}
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 1
        });
    });

    it('should return a command object with type "integer" and data 0 when the source key does not exist', () => {
        const result: ICommand = COPY([
            {type: 'string', data: 'COPY'},
            {type: 'string', data: 'noKey'},
            {type: 'string', data: 'cp-key'}
        ]);

        expect(result).toEqual({
            type: 'integer',
            data: 0
        });
    });
});
