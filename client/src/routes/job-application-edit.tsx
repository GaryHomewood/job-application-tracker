import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { getJobApplication, updateJobApplication, deleteJobApplication } from "@/lib/job-applications";
import { Button } from "../components/ui/button"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect } from "react";

export async function action({ request, params }) {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const updates = Object.fromEntries(formData);
      await updateJobApplication(params.jobApplicationId, updates)
      return redirect("/");
    }
    case "DELETE": {
      await deleteJobApplication(params.jobApplicationId)
      return redirect("/");
    }
  }
}

export async function loader({ params }) {
  const jobApplication = await getJobApplication(params.jobApplicationId)
  return { jobApplication }

}

export default function EditJobApplication() {
  useEffect(() => {
    document.title = 'Edit application - Job Application Tracker'
  }, [])
  
  const { jobApplication } = useLoaderData()
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Application
        </h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline"
              size="icon">
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the job application details.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Form method="delete">
                <AlertDialogAction type="submit">
                  Continue
                </AlertDialogAction>
              </Form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Form method="post" id="job-application-form"
        className="flex flex-col space-y-4">
        <label>
          <span className="mb-1 block">Date:</span>
          <Input
            type="date"
            name="applicationDate"
            defaultValue={jobApplication.attributes.applicationDate}/>
        </label>
        
        <label>
          <span className="mb-1 block">Company:</span>
          <Input
            type="text"
            name="company"
            defaultValue={jobApplication.attributes.company}/>
        </label>
        <label>
          <span className="mb-1 block">Company URL:</span>
          <Input
            type="text"
            name="companyUrl"
            defaultValue={jobApplication.attributes.companyUrl}/>
        </label>
        <label>
          <span className="mb-1 block">Job title:</span>
          <Input
            type="text"
            name="jobTitle"
            defaultValue={jobApplication.attributes.jobTitle}/>
        </label>
        <label>
          <span className="mb-1 block">Agency:</span>
          <Input
            type="text"
            name="agency"
            defaultValue={jobApplication.attributes.agency}/>
        </label>
        <label>
          <span className="mb-1 block">Job spec URL:</span>
          <Input
            type="text"
            name="jobUrl"
            defaultValue={jobApplication.attributes.jobUrl}/>
        </label>
        <label>
          <span className="mb-1 block">Status:</span>
          <Select
            name="status"
            defaultValue={jobApplication.attributes.status}>
            <SelectTrigger>
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interviewing">Interviewing</SelectItem>
              <SelectItem value="Interviewed">Interviewed + rejected</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </label>
        <label>
          <span className="mb-1 block">Notes:</span>
          <Textarea
            name="notes"
            defaultValue={jobApplication.attributes.notes}/>
        </label>
        <div className="flex space-x-2 justify-end pt-4">
          <Button type="submit">
            Save
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              navigate(-1)
            }}>Cancel</Button>
        </div>
      </Form>
    </div>
  )
}