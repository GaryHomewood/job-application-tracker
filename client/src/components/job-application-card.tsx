import { Link } from "react-router-dom"
import { Button } from '@/components/ui/button'
import { WeekNumber } from "@/components/week-number";

function formatDate(date) {
  const nthNumber = (number: number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dateObj = new Date(date)
  const dow = dateObj.toLocaleDateString('en-gb', { weekday:"long" })
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-gb", { month: "long" });
  return `${dow}, ${day}${nthNumber(day)} ${month}`
}

function getCardColours(status) {
  let bg, textColour
  switch (status) {
    case "Interviewing":
      bg = "bg-green-800 border-green-950"
      textColour = ""
      break
    case "Interviewed":
      bg = "bg-amber-600 border-amber-750"
      textColour = ""
      break
    case "Rejected":
      bg = "bg-red-600 border-red-750"
      textColour = ""
      break
    default:
      bg = "bg-slate-950 border-slate-700"
      textColour = "text-slate-500"
  }

  return {
    bg,
    textColour
  }
}

function getWeekNumber(i, arr, weekNumber) {
  let displayWeek = false
  let week;
  if (i < arr.length - 1) {
      const nextApp = arr[i + 1]
      if ((weekNumber != nextApp.attributes.weekNumber)) {
        displayWeek = true;
        week = weekNumber
      }  
  } else if (i == arr.length - 1) {
    displayWeek = true
    week = weekNumber
  }

  return {
    displayWeek,
    week
  }
}

function DaysAgo({daysAgo}) {
  if (daysAgo == 0) {
    return 'today'
  } else if (daysAgo == 1) {
    return `${daysAgo} day ago`
  } else {
    return `${daysAgo} days ago`
  }
}

function CompanyHeader({company, companyUrl}) {
  if (companyUrl) {
    return (
      <Button asChild variant="link" className="pl-0">
        <Link to={companyUrl}>
          <h2 className="text-3xl font-extra-bold mr-4">
          {company}
          </h2>
        </Link>
      </Button>
    )
  }

  return (
    <h2 className="text-3xl font-extra-bold mr-4">
      {company}
    </h2>
  )
}

export default function JobApplicationCard({jobApplication, i, arr}) {
  const week = getWeekNumber(i, arr, jobApplication.attributes.weekNumber)
  const colours = getCardColours(jobApplication.attributes.status)
  const jobAppDate = formatDate(jobApplication.attributes.applicationDate)

  return (
    <li 
    key={jobApplication.id}
    className="border-l border-slate-700">
      <div className={
          `${colours.bg} border border-solid ml-3 mb-2 p-2 rounded-md inline-block min-w-[285px]`
        }>
        <div className="flex justify-between">
          <CompanyHeader
            company={jobApplication.attributes.company}
            companyUrl={jobApplication.attributes.companyUrl}/>
          <p className="text-xs">
            <DaysAgo
              daysAgo={jobApplication.attributes.daysAgo}/>
          </p>
        </div>
        <p className={
          `${colours.textColour} text-sm`
        }>{ jobApplication.attributes.jobTitle}</p>
        <p className={
          `${colours.textColour} text-sm`}>{ jobAppDate}</p> 
        <hr className="mb-2 mt-4"/>
        <div className="flex justify-between">
          <Button variant="link" asChild className="pl-0">
            <a href={ jobApplication.attributes.jobUrl} target="_blank">Job Spec</a>  
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/job-applications/${jobApplication.id}/edit`}>
              Edit
            </Link>
          </Button>
        </div>
      </div>
      <WeekNumber
        displayWeek={week.displayWeek}
        week={week.week} />
    </li>
  )
}