"use client"
import { Plus, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { createJobApplication } from "@/lib/actions/job-applications"

interface CreateJobApplicationDialogProps {
  columnId: string
  boardId: string
  variant?: "default" | "icon"
}

const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  notes: "",
  salary: "",
  jobUrl: "",
  tags: "",
  description: "",
}

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
  variant = "default",
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)

  async function handleSubmit() {
    try {
      const result = await createJobApplication({
        ...formData,
        columnId,
        boardId,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      })
      if (!result.error) {
        setFormData(INITIAL_FORM_DATA)
        setOpen(false)
      } else {
        console.error("Failed to create job: ", result.error)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "icon" ? (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 transition-all duration-300 shadow-[0_0_10px_rgba(20,184,166,0.2)]"
          >
            <Plus className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full justify-start glass-1 border-dashed border-2 border-teal-500/30 hover:border-teal-500/60 hover:bg-teal-500/5 text-stone-600 dark:text-stone-300 transition-all duration-500 group rounded-2xl h-14 bg-transparent"
          >
            <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center mr-3 group-hover:bg-teal-500/20 transition-colors">
              <Plus className="h-4 w-4 text-teal-600 dark:text-teal-400 group-hover:rotate-90 transition-transform duration-500" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold text-stone-900 dark:text-white">Track Opportunity</span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Add new application
              </span>
            </div>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl glass-2 border-stone-200/50 dark:border-white/10 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Aesthetic Header */}
        <div className="p-8 pb-4 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -z-10" />
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                New Entry
              </span>
            </div>
            <DialogTitle className="text-4xl font-black tracking-tighter text-stone-900 dark:text-white">
              New Application
            </DialogTitle>
            <DialogDescription className="text-base text-stone-600 dark:text-stone-400 font-light">
              Initialize tracking for a new career opportunity.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 pt-2 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
          {/* Primary Info Group */}
          <div className="space-y-4 p-4 rounded-3xl bg-teal-500/5 border border-teal-500/20">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="company"
                  className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400 pl-1"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/50 dark:bg-black/20 border-stone-200 dark:border-stone-800 focus:border-teal-500 focus:ring-teal-500 rounded-xl h-11"
                  placeholder="e.g. Acme Corp"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="position"
                  className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400 pl-1"
                >
                  Position
                </Label>
                <Input
                  id="position"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="bg-white/50 dark:bg-black/20 border-stone-200 dark:border-stone-800 focus:border-teal-500 focus:ring-teal-500 rounded-xl h-11"
                  placeholder="e.g. Senior Architect"
                />
              </div>
            </div>
          </div>

          {/* Details Group */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800 focus:border-teal-500 focus:ring-teal-500 rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary" className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400">
                Salary
              </Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800 focus:border-teal-500 focus:ring-teal-500 rounded-xl h-11"
                placeholder="$"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobUrl" className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400">
              Job URL
            </Label>
            <Input
              id="jobUrl"
              type="url"
              value={formData.jobUrl}
              onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
              className="bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800 focus:border-teal-500 focus:ring-teal-500 rounded-xl h-11 font-mono text-xs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400">
              Tags
            </Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800 focus:border-teal-500 focus:ring-teal-500 rounded-xl h-11"
              placeholder="Comma separated..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400">
              Description
            </Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800 focus:border-teal-500 focus:ring-teal-500 rounded-xl resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400">
              Notes
            </Label>
            <Textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800 focus:border-teal-500 focus:ring-teal-500 rounded-xl resize-none"
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-md border-t border-stone-200/50 dark:border-white/5 gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(false)}
            className="rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 hover:scale-[1.02] transition-all duration-300 rounded-xl px-8 font-bold"
            onClick={handleSubmit}
          >
            Create Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
