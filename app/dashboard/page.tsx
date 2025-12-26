import { getSession } from "@/lib/auth/auth"
import connectDB from "@/lib/db"
import { Board } from "@/lib/models"
import { redirect } from "next/navigation"
import KanbanBoard from "@/components/kanban-board"
import { Suspense } from "react"
import { Zap, Trophy, Briefcase, ShieldCheck, Clock, UserCircle } from "lucide-react"

// --- Server Data Fetching ---
async function getBoard(userId: string) {
  await connectDB()

  const boardDoc = await Board.findOne({
    userId: userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  })

  if (!boardDoc) return null
  return JSON.parse(JSON.stringify(boardDoc))
}

// --- Helper for Stats ---
const getQuadrantKey = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes("interview")) return "Interview"
  if (n.includes("offer") || n.includes("won")) return "Offer"
  return "Applied"
}

// --- Main Page Component ---
async function DashboardPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/sign-in")
  }

  const board = await getBoard(session.user.id)

  const displayName = session.user.name ? session.user.name.split(" ")[0].toUpperCase() : "USER"

  // Calculate Dynamic Stats
  const stats = board?.columns?.reduce(
    (acc: any, col: any) => {
      const key = getQuadrantKey(col.name)
      const count = col.jobApplications?.length || 0
      acc.total += count
      acc[key] = (acc[key] || 0) + count
      return acc
    },
    { total: 0, Applied: 0, Interview: 0, Offer: 0 },
  ) || { total: 0, Applied: 0, Interview: 0, Offer: 0 }

  return (
    <div className="h-screen w-full bg-stone-50 dark:bg-stone-950 flex flex-col relative overflow-hidden selection:bg-teal-500/30">
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* --- HEADER SECTION (Fixed Height) --- */}
      <header className="flex-none px-4 sm:px-6 pt-4 sm:pt-6 pb-2 z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-8">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 opacity-90 hover:opacity-100 transition-opacity cursor-default flex-wrap">
              <div className="flex items-center gap-2 px-2 sm:px-2.5 py-1 rounded-full bg-white/60 dark:bg-white/5 border border-stone-200 dark:border-white/10 backdrop-blur-md shadow-sm text-[8px] sm:text-[9px]">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="font-mono font-bold tracking-[0.15em] uppercase text-stone-500 dark:text-stone-400">
                  Online
                </span>
              </div>

              <span className="text-stone-300 dark:text-stone-700 text-[8px] hidden sm:inline">//</span>

              <div className="group relative flex items-center gap-2 pl-1 pr-2 sm:pr-3 py-0.5 rounded-full bg-gradient-to-r from-stone-100 to-white dark:from-stone-900 dark:to-stone-800 border border-teal-500/30 shadow-[0_0_15px_-5px_rgba(20,184,166,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(20,184,166,0.5)] hover:border-teal-500/50">
                <div className="p-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <UserCircle className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-mono text-[6px] sm:text-[7px] font-bold tracking-[0.1em] uppercase text-stone-400">
                    Commander
                  </span>
                  <span className="font-bold text-[8px] sm:text-[10px] tracking-wide text-stone-800 dark:text-stone-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {displayName}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-stone-900 dark:text-white leading-[0.9]">
              Job<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">Hunt.</span>
            </h1>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 lg:pb-1 hide-scrollbar">
            <div className="group relative flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 rounded-[1.25rem] glass-1 border border-stone-200/50 dark:border-white/5 hover:-translate-y-1 transition-transform duration-300 flex-shrink-0">
              <div className="absolute inset-0 bg-stone-100/50 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.25rem]" />
              <div className="relative p-1.5 sm:p-2.5 bg-stone-100 dark:bg-stone-800 rounded-xl">
                <Briefcase className="w-4 sm:w-5 h-4 sm:h-5 text-stone-500" />
              </div>
              <div className="relative">
                <p className="text-[7px] sm:text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">
                  Total
                </p>
                <p className="text-lg sm:text-2xl font-black text-stone-900 dark:text-white leading-none">
                  {stats.total}
                </p>
              </div>
            </div>

            <div className="group relative flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 rounded-[1.25rem] glass-1 border border-stone-200/50 dark:border-white/5 hover:-translate-y-1 transition-transform duration-300 flex-shrink-0">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.25rem]" />
              <div className="relative p-1.5 sm:p-2.5 bg-cyan-500/10 rounded-xl">
                <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="relative">
                <p className="text-[7px] sm:text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">
                  Interviews
                </p>
                <p className="text-lg sm:text-2xl font-black text-stone-900 dark:text-white leading-none">
                  {stats.Interview}
                </p>
              </div>
            </div>

            <div className="group relative flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 rounded-[1.25rem] bg-gradient-to-br from-teal-500/5 to-emerald-500/5 border border-teal-500/20 hover:-translate-y-1 transition-transform duration-300 shadow-glow-sm hover:shadow-glow-md flex-shrink-0">
              <div className="p-1.5 sm:p-2.5 bg-teal-500/20 rounded-xl">
                <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="text-[7px] sm:text-[9px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 mb-0.5">
                  Offers
                </p>
                <p className="text-lg sm:text-2xl font-black text-teal-800 dark:text-teal-200 leading-none">
                  {stats.Offer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- KANBAN BOARD AREA --- */}
      <main className="flex-1 min-h-0 px-4 sm:px-6 pb-2 w-full max-w-[1920px] mx-auto z-0">
        {board ? (
          <KanbanBoard board={board} userId={session.user.id} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Briefcase className="w-12 h-12 text-stone-300" />
            <p className="text-stone-500 font-medium">No board found. System initializing...</p>
          </div>
        )}
      </main>

      {/* --- FOOTER SECTION --- */}
      <footer className="flex-none px-4 sm:px-8 py-2 sm:py-3 bg-white/40 dark:bg-stone-900/40 backdrop-blur-xl border-t border-stone-200/50 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 z-10 text-[8px] sm:text-[9px]">
        <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
          <ShieldCheck className="w-3 h-3 text-teal-500 flex-shrink-0" />
          <span className="font-mono tracking-widest uppercase opacity-70 hidden sm:inline">Secure // AES-256</span>
          <span className="font-mono tracking-widest uppercase opacity-70 sm:hidden">Secure</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-stone-400">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="font-mono tracking-widest uppercase opacity-60">Active</span>
          </div>
          <div className="h-2 sm:h-3 w-[1px] bg-stone-300 dark:bg-stone-700 hidden sm:block" />
          <span className="font-mono font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400">v2.5</span>
        </div>
      </footer>
    </div>
  )
}

// --- Loading Wrapper ---
export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center gap-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-teal-500 animate-spin" />
            <div className="absolute inset-3 rounded-full border-b-2 border-purple-500 animate-spin-slow" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="font-black text-lg tracking-[0.2em] text-stone-400 animate-pulse">LOADING</h2>
            <p className="font-mono text-[9px] text-stone-300 opacity-50">Initializing...</p>
          </div>
        </div>
      }
    >
      <DashboardPage />
    </Suspense>
  )
}
