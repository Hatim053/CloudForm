// unique Id : cf001dati
function DateAndTimeInput({ dateLabel, timeLabel , formData , setFormData }) {
  return (<div className="grid grid-cols-2 gap-3">
    <DateInput label={dateLabel} formData={formData} setFormData={setFormData}/>
    <TimeInput label={timeLabel} formData={formData} setFormData={setFormData}/>
  </div>)
}

export default DateAndTimeInput;