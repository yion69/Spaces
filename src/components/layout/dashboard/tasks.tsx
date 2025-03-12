
import { ListPlus, MoreHorizontal, Plus, PlusSquare, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React, { useEffect, useState } from "react"
import { TASK_STATUS } from "@/lib/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function TasksDashboard() {

  const [tasks, setTasks] = useState<Record<string, string>[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const handleTaskInput = (e:React.ChangeEvent<HTMLInputElement>) => { setTaskInput(prev => e.target.value) };
  const handleTaskAdd = () => {
    setTasks(prev => [...prev, {
      task_name: taskInput,
      status: TASK_STATUS.PROGRESS,
    }]);
  }

  const handleTaskUpdateStatus = (taskName: string, newStatus: TASK_STATUS) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.task_name === taskName ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleTaskRemove = (taskName: string) => {
    setTasks((prev) => prev.filter((task) => task.task_name !== taskName));
  };

  const handleFetch = () => {
    const storedData = JSON.parse(localStorage.getItem('tasks_data') || 'null');
    console.log(storedData);
    setTasks(prev => storedData);
  }

  useEffect(() => {
    handleFetch();
  },[])

  useEffect(() => {
    localStorage.setItem('tasks_data', JSON.stringify(tasks));
  },[tasks])


  return (
    <Card x-chunk="dashboard-06-chunk-0" className="relative flex flex-col h-full w-full">
      <CardHeader className="h-fit w-full">
        <CardTitle onClick={handleFetch}>Tasks</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, voluptatibus.
        </CardDescription>
        <Dialog>
          <DialogTrigger className="absolute right-4 bottom-4 size-14 flex gap-2 p-2 border bg-zinc-900 dark:bg-zinc-900 rounded-full items-center justify-center text-zinc-100"><Plus size={20} /></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <div className="flex flex-col gap-2 p-4">
                <label htmlFor="task" className="w-fit text-nowrap">Task Name</label>
                <div className="flex items-center gap-2">
                  <Input onChange={handleTaskInput} />
                  <Button className="w-fit px-4 ms-auto" onClick={handleTaskAdd}><ListPlus /></Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="flex-grow">
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead>Task Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-full max-h-[50dvh] overflow-y-scroll">
            {
              tasks.map((e,i) => (
                <Task 
                  key={i} 
                  task_name={e.task_name} 
                  status={e.status as TASK_STATUS} 
                  remove={handleTaskRemove}
                  update={handleTaskUpdateStatus} />
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="h-fit w-full">
        <div className="text-xs text-muted-foreground">
          Showing <strong>{tasks.length}</strong> tasks
        </div>
      </CardFooter>
    </Card>
  )
}

function Task ({ task_name, status, remove }: 
               { task_name:string, status: TASK_STATUS, remove: (taskName: string) => void, 
                 update: (taskName: string, newStatus: TASK_STATUS) => void }) {

  const [taskStatus, setTaskStatus] = useState(status);

  return (
    <TableRow className="w-full">
      <TableCell className="font-medium w-8/12">
        {task_name } 
      </TableCell>
      <TableCell className="w-2/12">
        { taskStatus == "completed" ? 
          <Badge variant="outline" className="bg-green-600">{taskStatus}</Badge> :
          taskStatus == "progress" ?
          <Badge variant="outline" className="bg-blue-600">{taskStatus}</Badge> :
          <Badge variant="outline" className="bg-yellow-400 text-zinc-950">{taskStatus}</Badge> 
        }
      </TableCell>
      <TableCell className="w-1/12">
        <Select onValueChange={(value) => setTaskStatus(prev => value as TASK_STATUS)}>
          <SelectTrigger className="">
            
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="completed">completed</SelectItem>
            <SelectItem value="progress">progress</SelectItem>
            <SelectItem value="hold">hold</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="w-1/12">
        <Button variant={"destructive"} className="" onClick={()=>remove(task_name)} ><Trash size={20} /> </Button>
      </TableCell>
    </TableRow>
  )
}