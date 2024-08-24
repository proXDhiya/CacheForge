import ICommand from "../../app/interfaces/command.interface";
import GET from "../../app/commands/dataManipulation/GET";
import {setupSharedStorage} from "../__mock__/keys.mock";
import {describe, it, expect, beforeAll} from "bun:test";

describe("GET", () => {
    beforeAll(() => {
        setupSharedStorage();
    });

    it('should return a command object with type "string" and data "Hello World!"', () => {
        const result: ICommand = GET([
            { type: 'string', data: 'GET' },
            { type: 'string', data: 'key' }
        ]);

        expect(result).toEqual({
            type: 'string',
            data: 'Hello World!'
        });
    });

    it('should return a command object with type "bulk" if no key is found', () => {
        const result: ICommand = GET([
            { type: 'string', data: 'GET' },
            { type: 'string', data: 'noKey' }
        ]);

        expect(result).toEqual({
            type: 'bulk'
        });
    });
});
