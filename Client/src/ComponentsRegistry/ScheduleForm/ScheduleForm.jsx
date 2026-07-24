import {useState} from "react";
import { User , Mail , Phone , Calendar } from "lucide-react";




// unique Id : sf001
function ScheduleForm({ heading, subHeading , backgroundColorHexcode , submitButtonText , fieldsData}) {

    // fieldsData : {
    //     name : {
    //         label : "username",
    //         placeholder : "enter your username"
    //     }
    // }

  const [formData , setFormData] = useState({});
  const [isSubmitted , setIsSubmitted] = useState(false);
  const [requiredFieldsAlert , setRequiredFieldsAlert] = useState(false);

  const fields = [
    { icon: User, label: fieldsData[this.id].label, placeholder : fieldsData[this.id].placeholder,  type: "text", id: "name" },
    { icon: Mail, label: fieldsData[this.id].label, placeholder : fieldsData[this.id].placeholder , type: "email", id: "email" },
    { icon: Phone, label: fieldsData[this.id].label, placeholder : fieldsData[this.id].placeholder ,type: "tel", id: "phone" },
    { icon: Calendar, label: fieldsData[this.id].label, placeholder : fieldsData[this.id].placeholder ,type: "date", id: "date" },
  ];
 backgroundColorHexcode =   backgroundColorHexcode ? backgroundColorHexcode : "#FEF3C7";
  const handleSubmit = (e) => {
    e.preventDefault();
    for(const field of fields) {
      if(!formData[field]) {
        console.log('All Fields Are Required');
        return;
      }
    }
    setRequiredFieldsAlert(false);
    setIsSubmitted(true);
    // API CALL BE MADE HERE
    // AFTER API CALL CHNAGE ISSUBMITTED TO FALSE AGAIN
    console.log('Form submitted successfully' , formData);
    
  }
  return (
    <div className="flex items-center justify-center p-6 min-h-[100vh] " style={{backgroundColor : backgroundColorHexcode}}>
      <div className="w-full max-w-[420px] bg-white border border-neutral-200 rounded-xl p-8">
        <h2 className="text-xl font-medium text-neutral-900">{heading || "Book a demo"}</h2>
        <p className="text-sm text-neutral-400 mt-1">{subHeading || "30-minute walkthrough with our team."}</p>

        <form className="mt-6 space-y-4">
          {fields.map(({ icon: Icon, label, placeholder, type, id }) => (
            <div key={id} className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none z-10" />
              <input
                type={type}
                placeholder={placeholder}
                id={id}
                onChange={(e) => setFormData({...formData , [label] : e.target.value})}
                className="peer w-full rounded-lg border border-neutral-200 pl-9 pr-3 pt-5 pb-1.5 text-sm outline-none focus:border-neutral-400 bg-white text-neutral-900 transition-colors"
              />
              <label
                htmlFor={id}
                className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-neutral-400 pointer-events-none transition-all peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px]"
              >
                {label}
              </label>
            </div>
          ))}

          <button
          type='submit'
            className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-neutral-900 text-white py-2.5 text-sm font-medium hover:bg-neutral-700 active:scale-[0.98] transition-all border-2"
            onClick={handleSubmit}
          >
            <Calendar className="h-4 w-4" />
            {submitButtonText || "Schedule demo "}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </form>
        <div></div>
      </div>
    </div>
  );
}

export default ScheduleForm;