interface IRESP {
    type: 'string' | 'integer' | 'bulk' | 'array' | 'error';
    data: string | string[] | number | IRESP[];
    length?: number;
}

export default IRESP;
