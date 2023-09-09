import { useLoaderData, Form, redirect } from "react-router-dom"
import { getJobApplications } from "@/lib/job-applications"
import { Button } from '@/components/ui/button'
import Summary from "@/components/summary";
import JobApplicationCard from "@/components/job-application-card";
import { useEffect } from "react";

export interface JobApplication {}
export interface JobApplications extends Array<JobApplication>{}

export async function loader() {
  const jobApplications = await getJobApplications();
  return { jobApplications }
}

export async function action() {
  return redirect(`/job-applications/add`);
}

export default function Home() {
  useEffect(() => {
    document.title = 'Job Application Tracker'
  }, [])

  const { jobApplications } = useLoaderData()

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Applications
        </h1>
        <Form method="post">
          <Button variant="secondary" type="submit">New</Button>
        </Form>
      </div>
      <Summary
        jobApplications={jobApplications}/>
      <nav>
      { jobApplications.length ? (
        <ul>
          { jobApplications.map((jobApplication, i, arr) => {
            return (
              <JobApplicationCard
                jobApplication={jobApplication}
                i={i}
                arr={arr}
                key={jobApplication.id}/>
            )}
          )}
        </ul>
      ) : (
        <p>none</p>
      )}
      </nav>
    </div>
  )
}