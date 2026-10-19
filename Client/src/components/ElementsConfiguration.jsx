
// import { Star } from "lucide-react";

// function ElementsConfiguration() {


//     return (
//            <div className="col-span-3 flex flex-col justify-between rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
//                   <div>
//                     <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
//                       Element settings
//                     </p>
//                     <div className="mb-4 flex items-center gap-2">
//                       <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2b21]">
//                         <Star size={12} className="text-[#f2a93b]" />
//                       </span>
//                       <span className="text-sm font-medium text-[#1a2b21]">
//                         Rating scale
//                       </span>
//                     </div>
        
//                     <div className="flex flex-col gap-4">
//                       <div>
//                         <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
//                           Question
//                         </label>
//                         <div className="rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#1a2b21]">
//                           How likely are you to recommend us to a friend?
//                         </div>
//                       </div>
        
//                       <div>
//                         <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
//                           Placeholder / helper text
//                         </label>
//                         <div className="rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#8a9690]">
//                           Optional helper text
//                         </div>
//                       </div>
        
//                       <div>
//                         <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
//                           Scale range
//                         </label>
//                         <div className="rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#1a2b21]">
//                           1 to 5
//                         </div>
//                       </div>
        
//                       <div className="flex items-center justify-between rounded-lg bg-[#f4f3ef] px-3 py-2.5">
//                         <span className="text-sm font-medium text-[#1a2b21]">
//                           Required
//                         </span>
//                         <span className="flex h-5 w-9 items-center rounded-full bg-[#1a2b21] p-0.5">
//                           <span className="h-4 w-4 translate-x-4 rounded-full bg-white" />
//                         </span>
//                       </div>
//                     </div>
//                   </div>
        
//                   <span className="mt-6 w-full rounded-full bg-[#f2a93b] py-2.5 text-center text-sm font-semibold text-[#2c4a3b]">
//                     Next
//                   </span>
//                 </div>
//     )
// }

// export default ElementsConfiguration;

import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Pencil, Plus, X, Globe, Link2, Lock, CheckCircle2 } from "lucide-react";
// adjust this path to wherever TemplateSlice.js lives in your project
import {
  HIDDEN_KEYS,
  formatKey,
  getItemTitle,
  selectEditing,
  selectField,
  selectItem,
  selectPreviewData,
  updateField,
  updateItemValue,
  addListEntry,
  removeListEntry,
} from "../app/TemplateSlice.js";

// TODO: set this to your real "My forms" route
const MY_FORMS_PATH = "/my-forms";

// TODO: return the user's current access token from wherever your app keeps it.
// (If you use an axios instance with an interceptor, call it instead of fetch in handlePublish and delete this.)
const getAccessToken = () => "";

const labelClass = "mb-1.5 block text-xs font-medium text-[#5c6b60]";
const inputClass =
  "w-full rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#1a2b21] outline-none focus:ring-2 focus:ring-[#f2a93b]/40";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STATUS_OPTIONS = [
  { value: "public", label: "Public", description: "Anyone can open and fill this form", icon: Globe },
  { value: "unlisted", label: "Unlisted", description: "Only people with the link can open it", icon: Link2 },
  { value: "restricted", label: "Restricted", description: "Only the emails you add can open it", icon: Lock },
];

const isStringArray = (v) => Array.isArray(v) && v.every((x) => typeof x === "string");
const isStringRecord = (v) =>
  v !== null &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  Object.keys(v).length > 0 &&
  Object.values(v).every((x) => typeof x === "string");

function PanelTitle({ title }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2b21]">
        <Pencil size={12} className="text-[#f2a93b]" />
      </span>
      <span className="text-sm font-medium text-[#1a2b21]">{title}</span>
    </div>
  );
}

// Renders an editor based on the VALUE's type, so it works for any template shape:
// string -> input | boolean -> toggle | {a: "x", b: "y"} -> one input per key | ["x", "y"] -> editable list
function ValueEditor({ label, path, value, onChange, onAdd, onRemove }) {
  if (typeof value === "boolean") {
    return (
      <div className="flex items-center justify-between rounded-lg bg-[#f4f3ef] px-3 py-2.5">
        <span className="text-sm font-medium text-[#1a2b21]">{label}</span>
        <button
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => onChange(path, !value)}
          className={`flex h-5 w-9 cursor-pointer items-center rounded-full p-0.5 transition-colors ${
            value ? "bg-[#1a2b21]" : "bg-[#c3cbc4]"
          }`}
        >
          <span
            className={`h-4 w-4 rounded-full bg-white transition-transform ${
              value ? "translate-x-4" : ""
            }`}
          />
        </button>
      </div>
    );
  }

  if (typeof value === "string") {
    return (
      <label className="block">
        <span className={labelClass}>{label}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          className={inputClass}
        />
      </label>
    );
  }

  if (isStringRecord(value)) {
    return (
      <div className="flex flex-col gap-3">
        {Object.entries(value).map(([key, nested]) => (
          <ValueEditor
            key={key}
            label={`${label} · ${key}`}
            path={[...path, key]}
            value={nested}
            onChange={onChange}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
      </div>
    );
  }

  if (isStringArray(value)) {
    return (
      <div>
        <span className={labelClass}>{label}</span>
        <div className="flex flex-col gap-2">
          {value.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => onChange([...path, index], e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                aria-label="Remove option"
                onClick={() => onRemove(path, index)}
                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8a9690] hover:bg-black/5 hover:text-[#1a2b21]"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onAdd(path)}
            className="flex w-fit cursor-pointer items-center gap-1 rounded-full bg-[#f4f3ef] px-3 py-1.5 text-xs font-medium text-[#5c6b60] hover:bg-[#e8e6e0]"
          >
            <Plus size={12} />
            Add option
          </button>
        </div>
      </div>
    );
  }

  return null; // numbers, object arrays, etc. are not editable here
}

// element inside a section (inputElements / links / socialHandles ...)
function ItemEditor({ section, itemKey }) {
  const dispatch = useDispatch();
  const item = useSelector((state) => selectItem(state, section, itemKey));
  if (!item) return null;

  const entries = Object.entries(item).filter(([key]) => !HIDDEN_KEYS.includes(key));

  return (
    <>
      <PanelTitle title={getItemTitle(item)} />
      <div className="flex flex-col gap-4">
        {entries.map(([key, value]) => (
          <ValueEditor
            key={key}
            label={formatKey(key)}
            path={[key]}
            value={value}
            onChange={(path, next) =>
              dispatch(updateItemValue({ section, key: itemKey, path, value: next }))
            }
            onAdd={(path) => dispatch(addListEntry({ section, key: itemKey, path }))}
            onRemove={(path, index) =>
              dispatch(removeListEntry({ section, key: itemKey, path, index }))
            }
          />
        ))}
      </div>
    </>
  );
}

// top-level text field (heading, subHeading, ...)
function FieldEditor({ field }) {
  const dispatch = useDispatch();
  const value = useSelector((state) => selectField(state, field));
  if (typeof value !== "string") return null;

  return (
    <>
      <PanelTitle title={formatKey(field)} />
      <ValueEditor
        label={formatKey(field)}
        path={[field]}
        value={value}
        onChange={(path, next) => dispatch(updateField({ field, value: next }))}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Publish popup: form status (+ authorized emails) -> API -> success */
/*  Its state is local on purpose: it's UI-only and resets on each open */
/* ------------------------------------------------------------------ */

function PublishModal({ templateId, onClose }) {
  const navigate = useNavigate();
  const store = useStore();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("public");
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [published, setPublished] = useState(false);
  const [liveLink, setLiveLink] = useState("");

  const canPublish =
    name.trim().length > 0 && (status !== "restricted" || emails.length > 0) && !submitting;

  const addEmail = () => {
    const value = emailInput.trim().toLowerCase();
    if (!value) return;
    if (!EMAIL_REGEX.test(value)) {
      setEmailError("Enter a valid email address");
      return;
    }
    if (emails.includes(value)) {
      setEmailError("This email is already added");
      return;
    }
    setEmails((prev) => [...prev, value]);
    setEmailInput("");
    setEmailError("");
  };

  const handlePublish = async () => {
    setSubmitting(true);
    setError("");
    try {
      // read at click time -> exactly what the live preview shows (selected elements, edited values)
      const previewData = selectPreviewData(store.getState());
      if (!previewData) throw new Error("Nothing to publish yet");

      const formName = name.trim();
      const token = getAccessToken();

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/liveform/create`, {
        method: "POST",
        credentials : "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: formName,
          form_id: templateId, // template id: tells the live page which template to render
          form_status: status,
          authorize_users: status === "restricted" ? emails : [],
          elements_data: { ...previewData, name: formName },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error ?? errorBody?.message ?? "Could not publish the form");
      }

      // the form already exists at this point, so a bad body must not turn into a "failed" popup
      const successBody = await response.json().catch(() => null);
      setLiveLink(successBody?.live_link ?? "");
      setPublished(true);
    } catch (err) {
      setError(err.message || "Could not publish the form");
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2b21]/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
      >
        {published ? (
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fdf6e8]">
              <CheckCircle2 size={24} className="text-[#2c4a3b]" />
            </span>
            <p className="text-lg font-semibold text-[#1a2b21]">Your form is live</p>
            <p className="mt-1 text-sm text-[#5c6b60]">
              You can find it, along with your other forms, in My forms.
            </p>

            {liveLink && (
              <div className="mt-4 w-full text-left">
                <p className="mb-1.5 text-xs font-medium text-[#5c6b60]">Live link</p>
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block break-all rounded-lg bg-[#f4f3ef] px-3 py-2 text-xs font-medium text-[#2c4a3b] underline"
                >
                  {liveLink}
                </a>
              </div>
            )}

            <button
              type="button"
              onClick={() => navigate(MY_FORMS_PATH)}
              className="mt-6 w-full cursor-pointer rounded-full bg-[#f2a93b] py-2.5 text-sm font-semibold text-[#2c4a3b]"
            >
              See my forms
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-[#1a2b21]">Publish your form</p>
                <p className="text-sm text-[#5c6b60]">Choose who can open it</p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                disabled={submitting}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[#8a9690] hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={16} />
              </button>
            </div>

            <label className="mb-4 block">
              <span className={labelClass}>Form name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Event registration"
                className={inputClass}
              />
            </label>

            <div role="radiogroup" aria-label="Form status" className="mb-4 flex flex-col gap-2">
              {STATUS_OPTIONS.map(({ value, label, description, icon: Icon }) => {
                const selected = status === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setStatus(value)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left ${
                      selected ? "bg-[#fdf6e8] ring-2 ring-[#f2a93b]" : "bg-[#f4f3ef] hover:bg-[#ecebe5]"
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a2b21]">
                      <Icon size={14} className="text-[#f2a93b]" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-[#1a2b21]">{label}</span>
                      <span className="block text-xs text-[#5c6b60]">{description}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {status === "restricted" && (
              <div className="mb-4">
                <span className={labelClass}>Authorized emails</span>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setEmailError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addEmail();
                      }
                    }}
                    placeholder="name@example.com"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={addEmail}
                    className="shrink-0 cursor-pointer rounded-full bg-[#1a2b21] px-4 py-2 text-xs font-semibold text-white"
                  >
                    Add
                  </button>
                </div>
                {emailError && <p className="mt-1.5 text-xs text-[#c96a4e]">{emailError}</p>}

                {emails.length > 0 ? (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {emails.map((email) => (
                      <span
                        key={email}
                        className="flex items-center gap-1 rounded-full bg-[#f4f3ef] py-1 pl-3 pr-1.5 text-xs font-medium text-[#1a2b21]"
                      >
                        {email}
                        <button
                          type="button"
                          aria-label={`Remove ${email}`}
                          onClick={() => setEmails((prev) => prev.filter((e) => e !== email))}
                          className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-[#8a9690] hover:bg-black/10"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1.5 text-xs text-[#8a9690]">
                    Press Enter or Add. At least one email is required.
                  </p>
                )}
              </div>
            )}

            {error && (
              <p className="mb-3 rounded-lg bg-[#fbeeea] px-3 py-2 text-xs text-[#c96a4e]">{error}</p>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="flex-1 cursor-pointer rounded-full bg-[#f4f3ef] py-2.5 text-sm font-medium text-[#5c6b60] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={!canPublish}
                className="flex-1 cursor-pointer rounded-full bg-[#f2a93b] py-2.5 text-sm font-semibold text-[#2c4a3b] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Publishing..." : "Publish form"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

function ElementsConfiguration() {
  const editing = useSelector(selectEditing);
  const { id: templateId } = useParams();
  const [isPublishOpen, setIsPublishOpen] = useState(false);

  return (
    <div className="col-span-3 flex max-h-screen flex-col justify-between overflow-y-auto rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
          Element settings
        </p>

        {!editing && (
          <p className="mt-3 text-sm text-[#8a9690]">
            Click the edit icon on an element to configure it
          </p>
        )}
        {editing?.kind === "field" && <FieldEditor field={editing.field} />}
        {editing?.kind === "item" && (
          <ItemEditor section={editing.section} itemKey={editing.key} />
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsPublishOpen(true)}
        className="mt-6 w-full cursor-pointer rounded-full bg-[#f2a93b] py-2.5 text-center text-sm font-semibold text-[#2c4a3b]"
      >
        Next
      </button>

      {isPublishOpen && (
        <PublishModal templateId={templateId} onClose={() => setIsPublishOpen(false)} />
      )}
    </div>
  );
}

export default ElementsConfiguration;