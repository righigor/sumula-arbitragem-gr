export const mapHTTPStatus = (status: string) => {
    const statusMap: {[key: string]: number} = {
        'OK': 200,
        'CREATED': 201,
        'BAD_REQUEST': 400,
        'UNAUTHORIZED': 401,
        'FORBIDDEN': 403,
        'NOT_FOUND': 404,
        'CONFLICT': 409,
        'INTERNAL_SERVER_ERROR': 500
    };

    return statusMap[status] || 500;
}