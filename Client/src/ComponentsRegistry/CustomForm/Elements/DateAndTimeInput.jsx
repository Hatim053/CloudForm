import { DateControl } from "./DateInput.jsx";
import { TimeControl } from "./TimeInput.jsx";
import { isObject } from "../fieldHelpers.js";

// unique Id : cf001dati
// label is {"01" : "Date" , "02" : "Time"} , the answer is {"01" : "2026-09-01" , "02" : "10:30"}
function DateAndTimeInput({ element , id , value , onChange , theme , readOnly , error }) {
  const labels = isObject(element.label) ? element.label : {};
  const current = isObject(value) ? value : {};
  const required = element.isRequired === true;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <DateControl id={`${id}-01`} label={labels["01"] || "Date"} required={required} value={current["01"]} onChange={(next) => onChange({ ...current , "01" : next })} theme={theme} readOnly={readOnly} error={error} />
      <TimeControl id={`${id}-02`} label={labels["02"] || "Time"} required={required} value={current["02"]} onChange={(next) => onChange({ ...current , "02" : next })} theme={theme} readOnly={readOnly} />
    </div>
  );
}

export default DateAndTimeInput;