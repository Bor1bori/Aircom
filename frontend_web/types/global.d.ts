export {};

declare global {
    namespace NodeJS {
        interface Process {
            browser: boolean;
        }
    }
    namespace ObjectInterface {
        interface GraphData {
            month: number;
            date: number;
            hour: number;
        }
    }
}