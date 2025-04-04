"use client";

import { PCSession } from "@/types";
import { motion } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

const getStatusBadge = (status: number) => {
    switch (status) {
        case 0:
            return (
                <Badge className="bg-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-500/30">
                    <XCircle className="h-3.5 w-3.5 mr-1" />
                    Offline
                </Badge>
            );
            break;
        case 1:
            return (
                <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    Online
                </Badge>
            );
            break;
        case 2:
            return (
                <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/30">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    StandBy
                </Badge>
            );
            break;

        default:
            return (
                <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/30">
                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                    Unknown
                </Badge>
            );
            break;
    }
};

const PCTable = ({ pcStatuses }: { pcStatuses: PCSession[] }) => {// Ensure pcStatuses is an array of PCSession

    return (
        <div className="space-y-4">
            {/* Responsive Table */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="overflow-x-auto -mx-3 sm:mx-0"
            >
                <div className="inline-block min-w-full align-middle px-3 sm:px-0">
                    <div className="overflow-hidden border border-muted/30 rounded-md shadow-sm bg-card/50 backdrop-blur-sm">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>PCID</TableHead>
                                    <TableHead>PC NAME</TableHead>
                                    <TableHead>STATUS</TableHead>
                                    <TableHead>LOCATION</TableHead>
                                    <TableHead>IP ADDRESS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pcStatuses.length > 0 ? (
                                    pcStatuses.map((pc, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="w-[100px]">
                                                {pc.pc_number}
                                            </TableCell>
                                            <TableCell>{pc.pc_name}</TableCell>
                                            <TableCell>
                                                {getStatusBadge(pc.status)}
                                            </TableCell>
                                            <TableCell>{pc.location}</TableCell>
                                            <TableCell>
                                                {pc.ip_address}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableHead
                                            colSpan={5}
                                            className="text-center"
                                        >
                                            No PCs found
                                        </TableHead>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PCTable;
