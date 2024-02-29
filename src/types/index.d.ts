export type tokenData = {
    userId: number;
    roleName: string;
};

declare global {
    // Express
    namespace Express {
        export interface Request {
            tokenData: tokenData;
        }
    }
}