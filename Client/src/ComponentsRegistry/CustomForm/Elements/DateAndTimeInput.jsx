import DateInput from "./DateInput.jsx";
import TimeInput from "./TimeInput.jsx";

// unique Id : cf001dati
function DateAndTimeInput({ LABEL_CLS , INPUT_CLS , GLASS , dateLabel, timeLabel , formData , setFormData }) {
  return (<div className="grid grid-cols-2 gap-3">
    <DateInput LABEL_CLS={LABEL_CLS} INPUT_CLS={INPUT_CLS} GLASS={GLASS} label={dateLabel} formData={formData} setFormData={setFormData}/>
    <TimeInput GLASS={GLASS} LABEL_CLS={LABEL_CLS} INPUT_CLS={INPUT_CLS} label={timeLabel} formData={formData} setFormData={setFormData}/>
  </div>)
}

export default DateAndTimeInput;