"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardContent as CardBody } from "./ui/card";
import { ModeToggle } from "./mode-toggle";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { PCSession } from "@/types";
import axios from "axios";
import PCTable from "./PCTable";

const PCDashboard = () => {
    const [pcStatuses, setPCStatuses] = useState<PCSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null);
                const response = await axios.get<PCSession[]>(`/api/sessions`);
                setPCStatuses(response.data); // Ensure the data is in the correct format
                setLoading(false);
                setLastUpdated(new Date());
            } catch (err) {
                console.error("Error fetching PC statuses:", err);
                setError(
                    "Failed to fetch PC statuses. Please try again later."
                );
                setLoading(false);
            }
        };

        // Initial fetch
        fetchData();

        // Set up interval for real-time updates
        const intervalId = setInterval(fetchData, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const statusCounts = Array.isArray(pcStatuses)
        ? pcStatuses.reduce(
              (acc, pc) => {
                  const statusNum = Number(pc.status); // Convert status to a number
                  let key = "";
                  if (statusNum === 0) key = "Offline";
                  else if (statusNum === 1) key = "Online";
                  else if (statusNum === 2) key = "Standby";
                  acc[key] = (acc[key] || 0) + 1;
                  return acc;
              },
              { Offline: 0, Online: 0, Standby: 0 } as Record<string, number>
          )
        : { Offline: 0, Online: 0, Standby: 0 };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="w-full backdrop-blur-sm bg-card/95 border-muted/40 shadow-xl">
                <CardHeader className="px-4 sm:px-6 flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            <span className="text-orange-400">OXIN</span>GAME PC
                            STATUSES
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Real-time monitoring of PC statuses
                        </p>
                    </div>
                    <ModeToggle />
                </CardHeader>

                <CardBody className="p-3 sm:p-4 md:p-6 space-y-6">
                    {/* Status Summary Cards */}
                    <AnimatePresence>
                        {!loading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                            >
                                <Card className="bg-card/50 border-primary/10 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-card/80">
                                    <CardBody className="p-3 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Total PCs
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {pcStatuses.length || 0}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={"outline"}
                                            className="text-primary border-primary/30"
                                        >
                                            100%
                                        </Badge>
                                    </CardBody>
                                </Card>

                                <Card className="bg-card/50 border-green-500/20 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-card/80">
                                    <CardBody className="p-3 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Online
                                            </p>
                                            <p className="text-2xl font-bold text-green-500">
                                                {statusCounts.Online || 0}
                                            </p>
                                        </div>
                                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30">
                                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                            {Math.round(
                                                ((statusCounts.Online || 0) /
                                                    pcStatuses.length) *
                                                    100
                                            )}
                                            %
                                        </Badge>
                                    </CardBody>
                                </Card>

                                <Card className="bg-card/50 border-yellow-500/20 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-card/80">
                                    <CardBody className="p-3 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Standby
                                            </p>
                                            <p className="text-2xl font-bold text-yellow-500">
                                                {statusCounts.Standby || 0}
                                            </p>
                                        </div>
                                        <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/30">
                                            <Clock className="h-3.5 w-3.5 mr-1" />
                                            {Math.round(
                                                ((statusCounts.Standby || 0) /
                                                    pcStatuses.length) *
                                                    100
                                            )}
                                            %
                                        </Badge>
                                    </CardBody>
                                </Card>

                                <Card className="bg-card/50 border-red-500/20 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-card/80">
                                    <CardBody className="p-3 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Offline
                                            </p>
                                            <p className="text-2xl font-bold text-red-500">
                                                {statusCounts.Offline || 0}
                                            </p>
                                        </div>
                                        <Badge className="bg-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-500/30">
                                            <XCircle className="h-3.5 w-3.5 mr-1" />
                                            {Math.round(
                                                ((statusCounts.Offline || 0) /
                                                    pcStatuses.length) *
                                                    100
                                            )}
                                            %
                                        </Badge>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-2"
                            >
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PCTable pcStatuses={pcStatuses} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="mt-4 text-xs sm:text-sm text-muted-foreground text-right"
                    >
                        Last updated: {lastUpdated.toLocaleTimeString()}
                    </motion.div>
                </CardBody>
            </Card>
        </motion.div>
    );
};

export default PCDashboard;
