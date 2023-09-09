import http from "./http";

type JobApplication = {
  id: string;
  attributes: object
}

export async function getJobApplications() {
  const resp = await http.get("api/job-applications")
  const jobApplications = Object.values(resp.data.data)

  jobApplications.sort((a, b) => new Date(b.attributes.applicationDate).valueOf() - new Date(a.attributes.applicationDate).valueOf())

  jobApplications.map((jobApplication: JobApplication) => {
    
    // Calculate how many days ago application was made
    const d1 = new Date(jobApplication.attributes.applicationDate)
    const d2 = new Date(Date.now())
    d2.setHours(0, 0, 0, 0)
    const daysAgo = Math.ceil(
      (d2.valueOf() - d1.valueOf()) / 1000/ 60 / 60/ 24
    )

    // Calculate the week number for the application, 
    // where applications started at week 17
    const startDate = new Date(d1.getFullYear(), 0, 1);
    const days = Math.floor((d1.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000));
    const weekNumber = (Math.ceil(days / 7)) - 17;

    jobApplication.attributes = {
      ...jobApplication.attributes, 
      daysAgo,
      weekNumber
    }
    return jobApplication
  })

  return jobApplications
}

export async function getJobApplication(jobAppId: string) {
  const resp = await http.get(`api/job-applications/${jobAppId}`)
  return resp.data.data
}

export async function addJobApplication(data) {
  const json = JSON.stringify({
    "data": data
  })
  await http.post("api/job-applications", json)
}

export async function updateJobApplication(jobAppId: string, data) {
  const json = JSON.stringify({
    "data": data
  })
  await http.put(`api/job-applications/${jobAppId}`, json)
}

export async function deleteJobApplication(jobAppId: string) {
  await http.delete(`api/job-applications/${jobAppId}`)
}