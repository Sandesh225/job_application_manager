"use client"

import type React from "react"
import { useState } from "react"
import type { JobApplication, Column } from "@/lib/models/models.types"
import { Card, CardContent } from "./ui/card"
import {
  MoreHorizontal,
  MapPin,
  Building2,
  CalendarClock,
  Trash2,
  Edit,
  XCircle,
  Trophy,
  MessageSquare,
  CheckCircle2,
} from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./ui/dialog"
import { deleteJobApplication, updateJobApplication } from "@/lib/actions/job-applications"
import { cn } from "@/lib/utils"

interface JobApplicationCardProps {
  job: JobApplication
  columns: Column[]
  dragHandleProps?: React.HTMLAttributes<HTMLElement>
  isOverlay?: boolean
}

export default function JobApplicationCard({ job, columns, dragHandleProps, isOverlay }: JobApplicationCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location || "",
    salary: job.salary || "",
    description: job.description || "",
  })

  // Check if job is "fresh" (updated in last 3 days)
  const isFresh = new Date(job.updatedAt || new Date()).getTime() > Date.now() - 86400000 * 3

  const handleSave = async () => {
    setLoading(true)
    try {
      await updateJobApplication(job._id, formData)
      setIsEditOpen(false)
    } catch (error) {
      console.error("Failed to update", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMoveToApplied = async () => {
    setLoading(true)
    try {
      const appliedColumn = columns.find(
        (c) =>
          !c.name.toLowerCase().includes("interview") &&
          !c.name.toLowerCase().includes("offer") &&
          !c.name.toLowerCase().includes("rejected"),
      )
      if (appliedColumn) {
        await updateJobApplication(job._id, { columnId: appliedColumn._id })
      }
    } catch (error) {
      console.error("Failed to move", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMoveToInterview = async () => {
    setLoading(true)
    try {
      const interviewColumn = columns.find((c) => c.name.toLowerCase().includes("interview"))
      if (interviewColumn) {
        await updateJobApplication(job._id, { columnId: interviewColumn._id })
      }
    } catch (error) {
      console.error("Failed to move", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMoveToOffer = async () => {
    setLoading(true)
    try {
      const offerColumn = columns.find(
        (c) => c.name.toLowerCase().includes("offer") || c.name.toLowerCase().includes("won"),
      )
      if (offerColumn) {
        await updateJobApplication(job._id, { columnId: offerColumn._id })
      }
    } catch (error) {
      console.error("Failed to move", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async () => {
    setLoading(true)
    try {
      const rejectedColumn = columns.find((c) => c.name.toLowerCase().includes("rejected"))
      if (rejectedColumn) {
        await updateJobApplication(job._id, { columnId: rejectedColumn._id })
      }
    } catch (error) {
      console.error("Failed to move", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className={cn("relative group touch-none outline-none", isOverlay ? "cursor-grabbing z-50" : "cursor-grab")}
        {...dragHandleProps}
      >
        <Card
          className={cn(
            "relative overflow-hidden rounded-[1.25rem] border transition-all duration-300",
            isOverlay
              ? "bg-white dark:bg-stone-900 shadow-2xl ring-2 ring-teal-500 border-teal-500/50 scale-105 rotate-2"
              : "glass-card hover:border-teal-500/30 border-stone-200/60 dark:border-white/10 hover:shadow-glow-md hover:-translate-y-1",
          )}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <CardContent className="p-3 sm:p-4 lg:p-5">
            {/* --- Header: Position & Action Button --- */}
            <div className="flex justify-between items-start gap-2 sm:gap-3 mb-3">
              {/* Title Section */}
              <div className="min-w-0 flex-1 space-y-1">
                <h4 className="font-bold text-sm sm:text-[15px] text-stone-900 dark:text-white leading-tight truncate pr-2">
                  {job.position}
                </h4>
                <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
                  <div className="p-1 rounded-md bg-stone-100 dark:bg-stone-800">
                    <Building2 className="w-3 h-3" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate">
                    {job.company}
                  </p>
                </div>
              </div>

              {/* --- ACTION BUTTON --- */}
              <div
                onPointerDown={(e) => e.stopPropagation()}
                className={cn(
                  "transition-all duration-200 ease-in-out shrink-0",
                  isOverlay ? "opacity-0 scale-90" : "opacity-100",
                )}
              >
                <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-xl bg-stone-50/50 dark:bg-stone-800/50 border border-stone-200/50 dark:border-white/5 text-stone-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-500/20 transition-all duration-300 shadow-sm"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="glass-2 rounded-xl border-stone-200/50 dark:border-white/10 p-1.5 min-w-[180px]"
                  >
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsEditOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="rounded-lg text-[11px] font-bold text-stone-600 dark:text-stone-300 focus:bg-stone-100 dark:focus:bg-stone-800 cursor-pointer px-3 py-2"
                    >
                      <Edit className="mr-2 h-3.5 w-3.5 opacity-70" />
                      Edit Details
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-stone-200 dark:bg-stone-800 my-1" />

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteJobApplication(job._id)
                      }}
                      className="rounded-lg text-[11px] font-bold text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer px-3 py-2"
                    >
                      <Trash2 className="mr-2 h-3.5 w-3.5" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* --- Tags & Metadata --- */}
            <div className="flex flex-wrap gap-2 mb-4">
              {job.location && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200 dark:border-white/5 text-[9px] sm:text-[10px] font-bold text-stone-500 dark:text-stone-400">
                  <MapPin className="w-3 h-3 opacity-70 flex-shrink-0" />
                  <span className="truncate max-w-[70px] sm:max-w-[80px]">{job.location}</span>
                </div>
              )}

              {job.salary && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] sm:text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                  <span className="text-[9px] sm:text-[10px]">$</span> {job.salary}
                </div>
              )}

              {isFresh && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[9px] sm:text-[10px] font-bold text-blue-600 dark:text-blue-400 ml-auto sm:ml-auto">
                  <CalendarClock className="w-3 h-3 flex-shrink-0" /> New
                </div>
              )}
            </div>

            <div
              className={cn(
                "grid grid-cols-2 sm:grid-cols-4 gap-2 transition-all duration-300 pt-3 border-t border-stone-200/30 dark:border-white/5",
                showActions
                  ? "opacity-100 visible"
                  : "sm:opacity-0 sm:invisible sm:h-0 sm:py-0 sm:pt-0 opacity-100 visible",
              )}
            >
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleMoveToApplied()
                }}
                disabled={loading}
                className="h-7 text-[9px] sm:text-[10px] font-bold rounded-lg bg-stone-500/10 text-stone-600 dark:text-stone-400 hover:bg-stone-500/20 border border-stone-500/20 transition-all whitespace-nowrap"
              >
                <CheckCircle2 className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Applied</span>
              </Button>

              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleMoveToInterview()
                }}
                disabled={loading}
                className="h-7 text-[9px] sm:text-[10px] font-bold rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all whitespace-nowrap"
              >
                <MessageSquare className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Interview</span>
              </Button>

              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleReject()
                }}
                disabled={loading}
                className="h-7 text-[9px] sm:text-[10px] font-bold rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all whitespace-nowrap"
              >
                <XCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Reject</span>
              </Button>

              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleMoveToOffer()
                }}
                disabled={loading}
                className="h-7 text-[9px] sm:text-[10px] font-bold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all whitespace-nowrap"
              >
                <Trophy className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Offer</span>
              </Button>
            </div>
          </CardContent>

          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </Card>
      </div>

      {/* --- ENHANCED EDIT DIALOG --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md glass-3 border-stone-200/50 dark:border-white/10 rounded-[2rem] p-0 overflow-hidden shadow-2xl max-h-[90vh]">
          <div className="px-4 sm:px-6 pt-6 pb-0">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-lg sm:text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                <Edit className="w-4 sm:w-5 h-4 sm:h-5 text-teal-500 flex-shrink-0" />
                Edit Details
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2 max-h-[calc(90vh-180px)] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] sm:text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Position
                  </Label>
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="rounded-xl border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/20 focus:ring-teal-500 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] sm:text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Company
                  </Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="rounded-xl border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/20 focus:ring-teal-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] sm:text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Location
                  </Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="rounded-xl border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/20 focus:ring-teal-500 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] sm:text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Salary
                  </Label>
                  <Input
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g. 120k - 150k"
                    className="rounded-xl border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/20 focus:ring-teal-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[9px] sm:text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Notes / Description
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="rounded-xl border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/20 focus:ring-teal-500 resize-none min-h-[100px] text-sm"
                  placeholder="Add any notes or details..."
                />
              </div>
            </div>
          </div>

          <DialogFooter className="p-4 sm:p-6 bg-stone-50/50 dark:bg-stone-900/50 mt-4 border-t border-stone-100 dark:border-white/5 flex gap-3">
            <DialogClose asChild>
              <Button variant="ghost" className="rounded-xl font-bold text-stone-500 text-sm">
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={handleSave}
              disabled={loading}
              className="rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-lg shadow-teal-500/20 px-4 sm:px-6 transition-all active:scale-95 text-sm"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
