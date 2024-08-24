interface ICommand {
    type: 'string' | 'integer' | 'bulk' | 'array' | 'error',
    data: string,
}

export default ICommand;
