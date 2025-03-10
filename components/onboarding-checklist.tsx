"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  link: string;
};

const initialTasks: Task[] = [
  {
    id: "connect-bank",
    title: "Connect your Bank Account",
    completed: false,
    link: "/settings",
  },
  {
    id: "select-agents",
    title: "Select which Agents you want",
    completed: false,
    link: "/ai-insights",
  },
  {
    id: "invite-users",
    title: "Invite Users",
    completed: false,
    link: "/settings",
  },
];

export function OnboardingChecklist() {
  const [tasks, setTasks] = useState(initialTasks);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Onboarding ({completedTasks}/{totalTasks})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Onboarding Checklist</DialogTitle>
          <DialogDescription>
            Complete these tasks to get started with your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center">
              <Button
                variant="ghost"
                className="p-0 h-auto mr-2"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </Button>
              <Link href={task.link} className="flex-grow hover:underline">
                {task.title}
              </Link>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
