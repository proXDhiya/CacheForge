interface IRESP {
    type: 'string' | 'integer' | 'bulk' | 'array';
    data: string | string[] | number | IRESP[];
    length?: number;
    isErr?: boolean;
}

export default IRESP;
