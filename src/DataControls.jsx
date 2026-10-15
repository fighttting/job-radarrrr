import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { load, validate } from "./storage";
import { today } from "./dates";
import { useReplaceData } from "./useApplicationMutations";

function download(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `job-radar-${today()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function DataControls() {
  const queryClient = useQueryClient();
  const replaceData = useReplaceData();
  const [error, setError] = useState(null);

  // Shared by import and sample data: validate, warn before overwriting, replace
  function replaceWith(data) {
    try {
      validate(data);
    } catch (e) {
      setError(`Not a valid job-radar file: ${e.message}`);
      return;
    }
    const existing = queryClient.getQueryData(["applications"]) ?? [];
    if (
      existing.length > 0 &&
      !window.confirm(
        `This will overwrite your ${existing.length} applications. Continue?`,
      )
    ) {
      return;
    }
    setError(null);
    replaceData.mutate(data);
  }

  async function importFile(file) {
    let data;
    try {
      data = JSON.parse(await file.text());
    } catch {
      setError("That file isn't valid JSON.");
      return;
    }
    replaceWith(data);
  }

  async function loadSample() {
    const response = await fetch("/applications.json");
    if (!response.ok) {
      setError(`Could not load sample data: ${response.status}`);
      return;
    }
    replaceWith(await response.json());
  }

  return (
    <div className="data-controls">
      <button onClick={() => download(load())}>Export JSON</button>{" "}
      <label htmlFor="import-file">Import JSON</label>{" "}
      <input
        type="file"
        id="import-file"
        accept="application/json,.json"
        onChange={(e) => {
          const file = e.target.files[0];
          // Reset so picking the same file again still fires onChange
          e.target.value = "";
          if (file) importFile(file);
        }}
      />{" "}
      <button onClick={loadSample}>Load sample data</button>
      {error && <p className="form-errors">{error}</p>}
    </div>
  );
}
