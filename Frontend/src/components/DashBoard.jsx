import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import CompressSection from "./CompressSection";
import DecompressSection from "./DecompressSection";
import HistorySection from "./HistorySection";
// import { DecompressSection } from "@/components/dashboard/DecompressSection";
// import { HistorySection } from "@/components/dashboard/HistorySection";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white py-10 px-4 md:px-10">
      
      <div className="max-w-7xl flex flex-col h-full mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>

        <motion.p
          className="text-zinc-400 text-center mb-6 text-sm md:text-base"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Your compression toolkit, simplified.
        </motion.p>

        

        <Tabs
          defaultValue="compress"
          className="w-full flex-1  flex flex-col overflow-hidden justify-center items-center"
        >
          <TabsList className="bg-zinc-800 border border-zinc-700 rounded-xl p-1 gap-4 flex justify-center mb-8">
            <TabsTrigger
              value="compress"
              className="data-[state=active]:bg-green-600 text-white data-[state=active]:text-white text-sm md:text-base px-5 py-2 rounded-lg transition-all duration-300 hover:bg-zinc-700"
            >
              Compress
            </TabsTrigger>
            <TabsTrigger
              value="decompress"
              className="data-[state=active]:bg-green-600 text-white data-[state=active]:text-white text-sm md:text-base px-5 py-2 rounded-lg transition-all duration-300 hover:bg-zinc-700"
            >
              Decompress
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-green-600 text-white data-[state=active]:text-white text-sm md:text-base px-5 py-2 rounded-lg transition-all duration-300 hover:bg-zinc-700"
            >
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent
            className="flex-1 overflow-y-auto w-full y-scroll-hidden"
            value="compress"
          >
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CompressSection />
            </motion.div>
          </TabsContent>

          <TabsContent
            className="flex-1 overflow-y-auto w-full y-scroll-hidden"
            value="decompress"
          >
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <DecompressSection />
            </motion.div>
          </TabsContent>

          <TabsContent
            className="flex-1 overflow-y-auto w-full y-scroll-hidden"
            value="history"
          >
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <HistorySection />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}