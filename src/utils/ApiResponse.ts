class ApiResponse {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;

    constructor(statusCode: number, message: string = 'Success', data?: any) {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        if (data !== undefined || data !== null || data !== '' || data !== 0) {
            this.data = data;
        }
    }
}

export default ApiResponse;
