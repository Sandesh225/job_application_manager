"use client"

import { useState } from "react"
import type { Board, Column, JobApplication } from "@/lib/models/models.types"
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  defaultDropAnimationSideEffects,
  MeasuringStrategy,
  type DragOverEvent,
} from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import MatrixZone from "./matrix-zone"
import JobApplicationCard from "./job-application-card"
import { useBoard } from "@/lib/hooks/useBoards"

export default function KanbanBoard({ board, userId }: { board: Board; userId: string }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const { columns, moveJob } = useBoard(board)
  const sortedColumns = [...(columns || [])].sort((a, b) => a.order - b.order)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  )

  const handleDragStart = (e: DragStartEvent) => setActiveId(e.active.id as string)

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return
  }

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e
    setActiveId(null)
    if (!over) return

    const activeJobId = active.id as string
    const overId = over.id as string

    const targetCol =
      sortedColumns.find((c) => c._id === overId) ||
      sortedColumns.find((c) => c.jobApplications.some((j) => j._id === overId))

    if (!targetCol) return

    const targetJobs = [...targetCol.jobApplications].filter((j) => j._id !== activeJobId)
    const overIndex = targetJobs.findIndex((j) => j._id === overId)
    const newIndex = overIndex >= 0 ? overIndex : targetJobs.length

    await moveJob(activeJobId, targetCol._id, newIndex)
  }

  const activeJob = sortedColumns.flatMap((c) => c.jobApplications).find((j) => j._id === activeId)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 h-[calc(100vh-280px)] md:h-[calc(100vh-240px)] min-h-[400px] md:min-h-[500px] w-full pb-2 md:pb-4 overflow-x-auto md:overflow-x-visible">
        {sortedColumns.map((col) => (
          <MatrixZone key={col._id} column={col} boardId={board._id} sortedColumns={sortedColumns} />
        ))}
      </div>

      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: { opacity: "0.3" },
            },
          }),
        }}
      >
        {activeJob ? (
          <div className="cursor-grabbing scale-105 rotate-2 z-50">
            <JobApplicationCard job={activeJob} columns={sortedColumns} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export function SortableJobCard({ job, columns }: { job: JobApplication; columns: Column[] }) {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef } = useSortable({
    id: job._id,
    data: {
      type: "Job",
      job,
    },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.3 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="touch-none mb-3">
      <JobApplicationCard job={job} columns={columns} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  )
}
