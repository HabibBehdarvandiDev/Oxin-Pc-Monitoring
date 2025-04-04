import { PCSession } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const DATA: PCSession[] = [
    {
        pc_number: "PC001",
        pc_name: "4060TI",
        status: 0,
        location: "SALOON",
        ip_address: "172.16.1.1",
    },
    {
        pc_number: "PC002",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.2",
    },
    {
        pc_number: "PC003",
        pc_name: "4060TI",
        status: 2,
        location: "SALOON",
        ip_address: "172.16.1.3",
    },
    {
        pc_number: "PC004",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.4",
    },
    {
        pc_number: "PC005",
        pc_name: "4060TI",
        status: 2,
        location: "SALOON",
        ip_address: "172.16.1.5",
    },
    {
        pc_number: "PC006",
        pc_name: "4060TI",
        status: 2,
        location: "SALOON",
        ip_address: "172.16.1.6",
    },
    {
        pc_number: "PC007",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.7",
    },
    {
        pc_number: "PC008",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.8",
    },
    {
        pc_number: "PC009",
        pc_name: "4060TI",
        status: 2,
        location: "SALOON",
        ip_address: "172.16.1.9",
    },
    {
        pc_number: "PC010",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.10",
    },
    {
        pc_number: "PC011",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.11",
    },
    {
        pc_number: "PC012",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.12",
    },
    {
        pc_number: "PC013",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.13",
    },
    {
        pc_number: "PC014",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.14",
    },
    {
        pc_number: "PC015",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.15",
    },
    {
        pc_number: "PC016",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.16",
    },
    {
        pc_number: "PC017",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.17",
    },
    {
        pc_number: "PC018",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.18",
    },
    {
        pc_number: "PC019",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.19",
    },
    {
        pc_number: "PC020",
        pc_name: "4060TI",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.20",
    },
    {
        pc_number: "PC021",
        pc_name: "4070 SUPER",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.21",
    },
    {
        pc_number: "PC022",
        pc_name: "4070 SUPER",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.22",
    },
    {
        pc_number: "PC023",
        pc_name: "4070 SUPER",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.23",
    },
    {
        pc_number: "PC024",
        pc_name: "4070 SUPER",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.24",
    },
    {
        pc_number: "PC025",
        pc_name: "4070 SUPER",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.25",
    },
    {
        pc_number: "PC026",
        pc_name: "4070 SUPER",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.26",
    },
    {
        pc_number: "PC027",
        pc_name: "4070 SUPER",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.27",
    },
    {
        pc_number: "PC028",
        pc_name: "4070 SUPER",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.28",
    },
    {
        pc_number: "PC029",
        pc_name: "4070 SUPER",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.29",
    },
    {
        pc_number: "PC030",
        pc_name: "4070 SUPER",
        status: 1,
        location: "SALOON",
        ip_address: "172.16.1.30",
    },
    {
        pc_number: "PC071",
        pc_name: "4070 SUPER (VIP)",
        status: 1,
        location: "VIP",
        ip_address: "172.16.1.71",
    },
    {
        pc_number: "PC072",
        pc_name: "4070 SUPER (VIP)",
        status: 1,
        location: "VIP",
        ip_address: "172.16.1.72",
    },

    {
        pc_number: "PC081",
        pc_name: "4080",
        status: 1,
        location: "BOOTCAMP",
        ip_address: "172.16.1.81",
    },

    {
        pc_number: "PC091",
        pc_name: "5080",
        status: 1,
        location: "STAGE",
        ip_address: "172.16.1.91",
    },

    {
        pc_number: "PC100",
        pc_name: "5080",
        status: 1,
        location: "STAGE",
        ip_address: "172.16.1.100",
    },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
    try {
        // Return the data as JSON response
        return NextResponse.json(DATA, { status: 200 });
    } catch (error) {
        console.error("Error fetching session data:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
