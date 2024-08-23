interface ICommand {
    type: 'string' | 'integer' | 'bulk' | 'array',
    data: string,
    isErr: boolean
}

export default ICommand;
