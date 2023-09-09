export default function Summary({jobApplications}) {

  const interviewing = jobApplications.filter((j) => j.attributes.status === "Interviewing").length
  const interviewRejection = jobApplications.filter((j) => j.attributes.status === "Interviewed").length
  const rejected = jobApplications.filter((j) => j.attributes.status === "Rejected").length

  return (
    <div className="border border-slate-700 p-3.5 rounded-md mb-3">
      <table>
        <tbody>
          <tr>
            <td className="border border-slate-700 p-2">Applications</td>
            <td className="border border-slate-700 p-2">{jobApplications.length}</td>
          </tr>
          <tr>
            <td className="border border-green-800 p-2 bg-green-800">Interviewing</td>
            <td className="border border-slate-700 p-2">{interviewing}</td>
          </tr>
          <tr>
            <td className="border border-amber-600 p-2 bg-amber-600">Interviewed + rejected</td>
            <td className="border border-slate-700 p-2">{interviewRejection}</td>
          </tr>
          <tr>
            <td className="border border-red-600 p-2 bg-red-600">Rejected</td>
            <td className="border border-slate-700 p-2">{rejected}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}