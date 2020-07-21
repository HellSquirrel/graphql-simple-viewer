import React, { useRef, useEffect } from "react";
import "./FileLoader.css";

const FileLoader = ({ onChange, onLoad }) => {
  const input = useRef(null);
  const reader = useRef(new FileReader());
  useEffect(() => {
    reader.current.onload = (event) => {
      onChange(event.target.result);
    };
  }, [onChange]);

  return (
    <div className="fileLoader">
      <form>
        <label for="file">Choose schema to upload ('.json')</label>
        <input
          id="file"
          type="file"
          accept=".json"
          ref={input}
          onChange={(event) => {
            const file = input.current.files[0];
            reader.current.readAsText(file);
          }}
        />
      </form>
    </div>
  );
};

export default FileLoader;
