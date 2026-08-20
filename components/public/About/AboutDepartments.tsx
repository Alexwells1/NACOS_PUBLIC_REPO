"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { departments } from "@/constants/about";
import { DepartmentTab } from "@/components/learnmore/DepartmentTab";
import { DepartmentKey } from "@/constants/types";


export function AboutDepartments() {
  // 1. Set state to the strict union type
  const [activeDept, setActiveDept] = useState<DepartmentKey>("software");
  
  // 2. Data is now automatically typed correctly
  const data = departments[activeDept];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <h2 className="text-center text-[#082F02] text-4xl font-black tracking-tighter mb-16 uppercase">
        Our Programmes
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {/* 
           3. Cast Object.keys to DepartmentKey[] 
           This is the "Magic Fix" for the string | number error.
        */}
        {(Object.keys(departments) as DepartmentKey[]).map((key) => {
          const department = departments[key];
          return (
            <DepartmentTab
              key={key}
              deptKey={key} 
              department={department}
              isActive={activeDept === key}
              onClick={(val) => setActiveDept(val as DepartmentKey)}
            />
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDept}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-100"
          >
            <Image 
              src={data.image} 
              alt={data.name} 
              fill 
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="space-y-6">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#168706]">
            Departmental Spec
          </span>
          <h3 className="text-4xl font-bold text-[#082F02] tracking-tight">
            {data.name}
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}