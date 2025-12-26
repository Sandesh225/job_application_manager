"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableJobCard } from "./kanban-board"
import CreateJobApplicationDialog from "./create-job-dialog"
import { Hash, Sparkles, Plus, Zap, Trophy, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const getColumnConfig = (columnName: string) => {
  const n = columnName.toLowerCase()

  if (n.includes("interview")) {
    return {
      glow: "from-cyan-500/15 to-teal-500/10",
      border: "border-cyan-500/40",
      bg: "bg-cyan-500/5",
      headerBg: "bg-gradient-to-r from-cyan-500/10 to-teal-500/5",
      icon: Zap,
      color: "cyan",
    }
  }

  if (n.includes("offer") || n.includes("won")) {
    return {
      glow: "from-emerald-500/15 to-green-500/10",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/5",
      headerBg: "bg-gradient-to-r from-emerald-500/10 to-green-500/5",
      icon: Trophy,
      color: "emerald",
    }
  }

  if (n.includes("reject")) {
    return {
      glow: "from-red-500/15 to-rose-500/10",
      border: "border-red-500/40",
      bg: "bg-red-500/5",
      headerBg: "bg-gradient-to-r from-red-500/10 to-rose-500/5",
      icon: XCircle,
      color: "red",
    }
  }

  return {
    glow: "from-stone-400/10 to-stone-500/5",
    border: "border-stone-300 dark:border-white/10",
    bg: "bg-stone-50/50 dark:bg-white/5",
    headerBg: "bg-gradient-to-r from-stone-100/30 to-stone-200/20 dark:from-white/5 dark:to-white/3",
    icon: Plus,
    color: "stone",
  }
}

export default function MatrixZone({ column, boardId, sortedColumns }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
    data: { type: "Column", column },
  })

  const jobs = column.jobApplications || []
  const config = getColumnConfig(column.name)
  const IconComponent = config.icon

  return (
    <div
      className={cn(
        `
        flex flex-col rounded-[2rem] transition-all duration-300 h-auto md:h-full w-full md:flex-1
        border backdrop-blur-xl shadow-lg
        `,
        isOver
          ? `ring-2 ring-primary/50 scale-[1.01] bg-gradient-to-br ${config.glow} ${config.border}`
          : `${config.border} glass-1 ${config.bg}`,
      )}
    >
      {/* Enhanced Column Header (Fixed) --- */}
      <div
        className={cn(
          "flex-none p-3 sm:p-5 pb-2 sm:pb-3 border-b border-stone-200/50 dark:border-white/5 flex items-center justify-between gap-2 sm:gap-0",
          config.headerBg,
        )}
      >
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className={cn(
                "p-1 sm:p-1.5 rounded-lg transition-all flex-shrink-0",
                config.color === "cyan" && "bg-cyan-500/10",
                config.color === "emerald" && "bg-emerald-500/10",
                config.color === "red" && "bg-red-500/10",
                config.color === "stone" && "bg-stone-200/30 dark:bg-stone-700/30",
              )}
            >
              <IconComponent
                className={cn(
                  "w-3 h-3 sm:w-4 sm:h-4",
                  config.color === "cyan" && "text-cyan-600 dark:text-cyan-400",
                  config.color === "emerald" && "text-emerald-600 dark:text-emerald-400",
                  config.color === "red" && "text-red-600 dark:text-red-400",
                  config.color === "stone" && "text-stone-500",
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white uppercase tracking-tighter leading-none truncate">
                {column.name}
              </h3>
              <p className="font-mono text-[7px] sm:text-[8px] tracking-[0.15em] opacity-50 uppercase mt-0.5">Zone</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-white/60 dark:bg-black/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[9px] sm:text-[11px] font-black flex items-center gap-1.5 border border-stone-200 dark:border-white/10 backdrop-blur-sm whitespace-nowrap">
            <Hash className="w-2.5 sm:w-3 h-2.5 sm:h-3 opacity-50" />
            <span>{jobs.length}</span>
          </div>
          <CreateJobApplicationDialog columnId={column._id} boardId={boardId} variant="icon" />
        </div>
      </div>

      {/* --- Scrollable Drop Zone --- */}
      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-2 sm:p-3 space-y-2 sm:space-y-3"
      >
        <SortableContext items={jobs.map((j: any) => j._id)} strategy={verticalListSortingStrategy}>
          {jobs.map((job: any) => (
            <SortableJobCard key={job._id} job={job} columns={sortedColumns} />
          ))}
        </SortableContext>

        {jobs.length === 0 && (
          <div
            className={cn(
              `
            flex h-32 sm:h-40 flex-col items-center justify-center rounded-[1.5rem] 
            border-2 border-dashed transition-all duration-300 bg-gradient-to-br
            `,
              isOver
                ? `border-primary/50 ${config.glow} bg-opacity-30`
                : "border-stone-300 dark:border-stone-700 opacity-40",
            )}
          >
            {isOver ? (
              <Plus className="w-5 sm:w-6 h-5 sm:h-6 text-primary animate-bounce mb-2" />
            ) : (
              <>
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 mb-2 opacity-50" />
                <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-stone-400">
                  Empty Sector
                </p>
              </>
            )}
          </div>
        )}

        {/* Invisible padding at bottom for easier dropping at end of list */}
        <div className="h-10 w-full" />
      </div>
    </div>
  )
}
