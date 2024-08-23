interface IRESP {
    type: 'string' | 'integer' | 'bulk';
    data: string | string[] | number | IRESP[];
    length?: number;
    isErr?: boolean;
}

export default IRESP;
