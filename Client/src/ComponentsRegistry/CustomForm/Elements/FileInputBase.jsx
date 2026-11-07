import { useState } from "react";
import FieldShell from "./FieldShell.jsx";
import { isObject } from "../fieldHelpers.js";
import { getSafeUrl } from "../../../utils/safeUrl.js";

// the shared body of MultiFileInput and SingleFileInput.
// A file can't travel inside the JSON answer , so it is first handed to uploadFile(file) (provided by the page , it stores the file
// and returns { url }) and the answer then holds { name , size , type , url } for each file.
// Without uploadFile the form doesn't show file fields on a live page at all (see CustomForm) , they only appear in the builder preview
function FileInputBase({ element , id , value , onChange , theme , readOnly , error , uploadFile , multiple , maxFiles , maxSizeMb , extensions , helpText }) {
  const [isUploading, setIsUploading] = useState(false);
  const [problem, setProblem] = useState("");

  const files = multiple ? (Array.isArray(value) ? value : []) : (isObject(value) ? [value] : []);

  const commit = (next) => onChange(multiple ? next : (next[0] ?? null));
  const remove = (index) => {
    setProblem("");
    commit(files.filter((_ , position) => position !== index));
  };

  const handleSelect = async (event) => {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = ""; // lets the same file be chosen again
    if(picked.length === 0 || !uploadFile) return;

    const messages = new Set();
    const room = multiple ? maxFiles - files.length : 1;
    const accepted = [];

    for(const file of picked) {
      const extension = `.${file.name.split(".").pop()}`.toLowerCase();
      if(!extensions.includes(extension)) messages.add(`${file.name}: this type of file isn't allowed`);
      else if(file.size > maxSizeMb * 1024 * 1024) messages.add(`${file.name} is larger than ${maxSizeMb}MB`);
      else if(accepted.length >= room) messages.add(`Only ${maxFiles} file${maxFiles === 1 ? "" : "s"} can be added`);
      else accepted.push(file);
    }

    if(accepted.length > 0) {
      setIsUploading(true);
      try {
        const uploaded = [];
        for(const file of accepted) {
          const result = await uploadFile(file);
          const url = getSafeUrl(result?.url , ["https:"]);
          if(!url) throw new Error("the upload did not return a usable link");
          uploaded.push({ name : file.name , size : file.size , type : file.type , url });
        }
        commit(multiple ? [...files , ...uploaded] : uploaded);
      } catch {
        messages.add("The upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }

    setProblem([...messages].join(" "));
  };

  const shownError = error || problem || undefined;

  return (
    <FieldShell id={id} label={element.label} required={element.isRequired === true} hint={multiple ? `(up to ${maxFiles})` : undefined} theme={theme} error={shownError}>
      <label
        htmlFor={id}
        className={`flex cursor-pointer flex-col items-center gap-1 border-dashed px-4 py-5 text-center transition-all focus-within:ring-2 focus-within:ring-amber-400/60 hover:brightness-110 ${theme.panel} ${readOnly || isUploading ? "opacity-60" : ""}`}
      >
        <span aria-hidden="true" className="text-2xl text-amber-500/70">⊕</span>
        <span className={`text-sm font-semibold ${theme.muted}`}>{isUploading ? "Uploading..." : (element.placeholder || "Choose a file")}</span>
        <span className={`text-xs ${theme.faint}`}>{helpText}</span>
        <input
          id={id}
          type="file"
          multiple={multiple}
          accept={extensions.join(",")}
          disabled={readOnly || isUploading}
          aria-invalid={Boolean(shownError)}
          onChange={handleSelect}
          className="sr-only"
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-2 space-y-2">
          {files.map((file , index) => (
            <li key={`${file.url ?? file.name}-${index}`} className={`flex items-center gap-3 px-3 py-2 ${theme.panel}`}>
              <span aria-hidden="true" className={`text-xs ${theme.faint}`}>◫</span>
              <span className={`min-w-0 flex-1 truncate text-xs ${theme.muted}`}>{file.name}</span>
              <span className={`shrink-0 text-[10px] ${theme.faint}`}>{Math.max(1 , Math.round((file.size ?? 0) / 1024))}KB</span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                disabled={readOnly}
                onClick={() => remove(index)}
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm transition-colors hover:text-red-500 disabled:cursor-default ${theme.faint}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </FieldShell>
  );
}

export default FileInputBase;