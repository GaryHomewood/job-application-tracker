type WeekNumberProps = { displayWeek: boolean, week: number }

export function WeekNumber(props: WeekNumberProps) {
  if (!props.displayWeek) {
    return null
  }

  return (
    <div className="flex">
      <div className=" w-80 h-5 border-b border-slate-700 rounded-bl-lg">
      </div>
      <div className="flex justify-center items-center bg-red-800 w-20 h-10 rounded-full mb-2 text-sm">
        Week { props.week}
      </div>
    </div>
  )
}