import { Form, redirect, useNavigate } from "react-router-dom";
import { addJobApplication } from "@/lib/job-applications";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  // console.log(updates)
  await addJobApplication(updates)
  return redirect("/");
}

export default function AddJobApplication() {
  useEffect(() => {
    document.title = 'New application - Job Application Tracker'
  }, [])
  
  const navigate = useNavigate()

  // Default to today
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const year = d.getFullYear()
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  const today = `${year}-${month}-${day}`

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Application
        </h1>
      </div>
      <Form method="post" id="job-application-form" 
        className="flex flex-col space-y-4">
        <label>
          <span className="mb-1 block">Date:</span>
          <Input
            type="date"
            name="applicationDate"
            defaultValue={today}/>
        </label>
        <label>
          <span className="mb-1 block">Company:</span>
          <Input
            type="text"
            name="company"/>
        </label>
        <label>
          <span className="mb-1 block">Company URL:</span>
          <Input
            type="text"
            name="companyUrl"/>
        </label>
        <label>
          <span className="mb-1 block">Job title:</span>
          <Input
            type="text"
            name="jobTitle"/>
        </label>
        <label>
          <span className="mb-1 block">Agency:</span>
          <Input
            type="text"
            name="agency"/>
        </label>
        <label>
          <span className="mb-1 block">Job Spec URL:</span>
          <Input
            type="text"
            name="jobUrl"/>
        </label>
        <label>
          <span className="mb-1 block">Notes:</span>
          <Textarea
            name="notes"/>
        </label>
        <input type="hidden" name="status" value="Applied"/>
        <input type="hidden" name="interviewed" value="false"/>
        <div className="flex space-x-2 justify-end pt-4">
          <Button type="submit">
            Save
          </Button>
          <Button
            variant="secondary" 
            onClick={() => {
              navigate(-1)
            }}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}