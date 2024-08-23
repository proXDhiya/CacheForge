interface ICommand {
    type: 'string' | 'integer' | 'bulk',
    data: string,
    isErr: boolean
}

export default ICommand;
