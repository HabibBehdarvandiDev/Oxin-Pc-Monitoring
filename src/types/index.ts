export interface PCSession {
    pc_number: string;
    pc_name: string;
    status: number;
    location: string;
    ip_address: string;
}

export type StatusType = 0 | 1 | 2; // 0: Offline, 1: Online, 2: Busy
