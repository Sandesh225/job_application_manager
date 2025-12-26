"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";
import { LayoutGrid, Award, Briefcase } from "lucide-react";

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState("organize");

  return (
    <section className="py-16 lg:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Tabs - Organic button group */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Button
              onClick={() => setActiveTab("organize")}
              className={`rounded-2xl px-6 py-3.5 text-sm font-medium transition-all duration-500 ${
                activeTab === "organize"
                  ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/25 scale-105"
                  : "glass-1 text-stone-600 dark:text-stone-300 hover:scale-105"
              }`}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              Organize
            </Button>
            <Button
              onClick={() => setActiveTab("hired")}
              className={`rounded-2xl px-6 py-3.5 text-sm font-medium transition-all duration-500 ${
                activeTab === "hired"
                  ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/25 scale-105"
                  : "glass-1 text-stone-600 dark:text-stone-300 hover:scale-105"
              }`}
            >
              <Award className="mr-2 h-4 w-4" />
              Get Hired
            </Button>
            <Button
              onClick={() => setActiveTab("boards")}
              className={`rounded-2xl px-6 py-3.5 text-sm font-medium transition-all duration-500 ${
                activeTab === "boards"
                  ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/25 scale-105"
                  : "glass-1 text-stone-600 dark:text-stone-300 hover:scale-105"
              }`}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Manage Boards
            </Button>
          </div>

          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] glass-1 shadow-2xl p-3">
            <div className="rounded-[1.5rem] overflow-hidden">
              {activeTab === "organize" && (
                <Image
                  src="/hero-images/hero1.png"
                  alt="Organize Applications"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              )}
              {activeTab === "hired" && (
                <Image
                  src="/hero-images/hero1.png"
                  alt="Get Hired"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              )}
              {activeTab === "boards" && (
                <Image
                  src="/hero-images/hero1.png"
                  alt="Manage Boards"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
