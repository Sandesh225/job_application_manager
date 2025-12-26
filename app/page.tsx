import ImageTabs from "@/components/image-tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
      {/* Organic background blobs */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 organic-blob blur-3xl"></div>
      <div className="absolute bottom-40 -right-40 w-[30rem] h-[30rem] bg-orange-500/10 dark:bg-orange-500/5 organic-blob-2 blur-3xl"></div>

      <main className="flex-1 relative z-10">
        {/* Hero Section - Anti-Grid Layout */}
        <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left side - asymmetric 7 columns */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-medium text-teal-700 dark:text-teal-300 annotation">
                    2026 Future-Core
                  </span>
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
                  <span className="text-stone-900 dark:text-stone-50">
                    A better
                  </span>
                  <br />
                  <span className="text-stone-900 dark:text-stone-50">
                    way to
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400">
                    track jobs
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed font-light">
                  Capture, organize, and manage your job search in one
                  beautiful, intuitive space.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      className="h-14 px-8 text-lg font-medium bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-lg shadow-teal-500/25 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/40 hover:scale-105 rounded-2xl group"
                    >
                      Start for free
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 annotation">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    Free forever · No credit card
                  </div>
                </div>
              </div>

              {/* Right side - asymmetric 5 columns with floating card */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-orange-500/20 dark:from-teal-500/10 dark:to-orange-500/10 organic-blob"></div>
                  <div className="absolute inset-8 glass-1 rounded-3xl flex items-center justify-center">
                    <Briefcase
                      className="w-24 h-24 text-teal-600 dark:text-teal-400"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Images Section with Tabs */}
        <ImageTabs />

        {/* Features Section - Anti-Grid */}
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
                  Everything you need
                </h2>
                <p className="text-xl text-stone-600 dark:text-stone-400 font-light annotation">
                  Powerful features designed to streamline your journey
                </p>
              </div>

              {/* Anti-grid feature cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Card 1 - Larger */}
                <div className="md:col-span-1 lg:col-span-2 md:row-span-1 group">
                  <div className="h-full p-10 rounded-[2rem] glass-1 hover:glass-2 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                      <Briefcase
                        className="h-8 w-8 text-teal-600 dark:text-teal-400"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="mb-4 text-3xl font-bold text-stone-900 dark:text-stone-50">
                      Organize Applications
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-lg font-light">
                      Create custom boards and columns to track your job
                      applications at every stage of the process with beautiful
                      drag-and-drop interactions.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group">
                  <div className="h-full p-10 rounded-[2rem] glass-1 hover:glass-2 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 group-hover:scale-110 transition-transform duration-500">
                      <TrendingUp
                        className="h-8 w-8 text-orange-600 dark:text-orange-400"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="mb-4 text-3xl font-bold text-stone-900 dark:text-stone-50">
                      Track Progress
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-lg font-light">
                      Monitor your application status from applied to offer with
                      visual boards.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group">
                  <div className="h-full p-10 rounded-[2rem] glass-1 hover:glass-2 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                      <Target
                        className="h-8 w-8 text-cyan-600 dark:text-cyan-400"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="mb-4 text-3xl font-bold text-stone-900 dark:text-stone-50">
                      Stay Organized
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-lg font-light">
                      Never lose track of an application in one place.
                    </p>
                  </div>
                </div>

                {/* Card 4 - Wider */}
                <div className="md:col-span-2 group">
                  <div className="h-full p-10 rounded-[2rem] bg-gradient-to-br from-teal-500 to-cyan-500 text-white hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-4 text-3xl font-bold">
                          Ready to get started?
                        </h3>
                        <p className="text-white/90 leading-relaxed text-lg font-light mb-6">
                          Join thousands of job seekers organizing their search
                        </p>
                        <Link href="/sign-up">
                          <Button
                            size="lg"
                            className="h-12 px-6 bg-white text-teal-600 hover:bg-stone-50 rounded-xl font-medium"
                          >
                            Get Started
                            <ArrowRight className="ml-2" />
                          </Button>
                        </Link>
                      </div>
                      <Zap
                        className="h-32 w-32 text-white/10"
                        strokeWidth={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
