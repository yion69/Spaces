"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"

const formSchema = z.object({
  name_6023359364: z.string(),
  name_8558592447: z.string(),
  name_0559064952: z.string(),
  name_5668171094: z.string()
});

export default function FormBuilder() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-12">
            
        <FormField
          control={form.control}
          name="name_6023359364"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input 
                placeholder="Atomic Habits"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>This is for name of your reference book.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
        
        <FormField
          control={form.control}
          defaultValue=""
          name="name_8558592447"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Author(s)</FormLabel>
              <FormControl>
                <Input 
                placeholder="James Clear"
                
                type=""
                {...field} />
              </FormControl>
              <FormDescription>This is for the name of the author.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name_0559064952"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year </FormLabel>
              <FormControl>
                <Input 
                placeholder="2018"
                
                type=""
                {...field} />
              </FormControl>
              <FormDescription>This is the year the book is published. </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name_5668171094"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input 
                placeholder="https://books.google.co.th/books/about/Atomic_Habits"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>Place the url of your book.(e.g. google books)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}