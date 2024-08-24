import FLUSHALL from "../../app/commands/dataManipulation/FLUSHALL";
import ICommand from "../../app/interfaces/command.interface";
import {setupSharedStorage} from "../__mock__/keys.mock";
import {describe, it, expect, beforeAll} from "bun:test";

describe('FLUSHALL', () => {
    beforeAll(() => {
        setupSharedStorage();
    });

    it('should return a command object with type "string" and data "OK" when the command is successful', () => {
        const result: ICommand = FLUSHALL();

        expect(result).toEqual({
            type: 'string',
            data: 'OK'
        });
    });
});
