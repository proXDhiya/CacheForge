import ICommand from "../../app/interfaces/command.interface";
import SET from "../../app/commands/dataManipulation/SET";
import {describe, it, expect} from "bun:test";

describe("SET", () => {
    it('should return a command object with type "string" and data "OK"', () => {
        const result: ICommand = SET([
            {type: 'string', data: 'SET'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'value'}
        ]);

        expect(result).toEqual({
            type: 'string',
            data: 'OK'
        });
    });

    it('should return a command object with type "string" and data "OK" when expiration is setKey with EX', () => {
        const result: ICommand = SET([
            {type: 'string', data: 'SET'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'value'},
            {type: 'string', data: 'EX'},
            {type: 'string', data: '10'}
        ]);

        expect(result).toEqual({
            type: 'string',
            data: 'OK'
        });
    });

    it('should return a command object with type "string" and data "OK" when expiration is setKey with PX', () => {
        const result: ICommand = SET([
            {type: 'string', data: 'SET'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'value'},
            {type: 'string', data: 'PX'},
            {type: 'string', data: '10000'}
        ]);

        expect(result).toEqual({
            type: 'string',
            data: 'OK'
        });
    });

    it('should return a command object with type "error" and data "ERR" when expiration is setKey with EX but duration is not a number', () => {
        const result: ICommand = SET([
            {type: 'string', data: 'SET'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'value'},
            {type: 'string', data: 'EX'},
            {type: 'string', data: 'abc'}
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR'
        });
    });

    it('should return a command object with type "error" and data "ERR" when expiration is setKey with PX but duration is not a number', () => {
        const result: ICommand = SET([
            {type: 'string', data: 'SET'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'value'},
            {type: 'string', data: 'PX'},
            {type: 'string', data: 'abc'}
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR'
        });
    });

    it('should return a command object with type "error" and data "ERR" when expiration is setKey with EX but duration is not provided', () => {
        const result: ICommand = SET([
            {type: 'string', data: 'SET'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'value'},
            {type: 'string', data: 'EX'}
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR'
        });
    });

    it('should return a command object with type "error" and data "ERR" when expiration is setKey with PX but duration is not provided', () => {
        const result: ICommand = SET([
            {type: 'string', data: 'SET'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'value'},
            {type: 'string', data: 'PX'}
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR'
        });
    });

    it('should return a command object with type "error" and data "ERR" when expiration is setKey with an invalid option', () => {
        const result: ICommand = SET([
            {type: 'string', data: 'SET'},
            {type: 'string', data: 'key'},
            {type: 'string', data: 'value'},
            {type: 'string', data: 'INVALID'},
            {type: 'string', data: '10'}
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR'
        });
    });

    it('should return a command object with type "error" and data "ERR" when value is not provided', () => {
        const result: ICommand = SET([
            {type: 'string', data: 'SET'},
            {type: 'string', data: 'key'}
        ]);

        expect(result).toEqual({
            type: 'error',
            data: 'ERR wrong number of arguments for \'SET\' command'
        });
    });
});
