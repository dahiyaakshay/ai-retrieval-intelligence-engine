import { useState } from "react";

interface Props {
  onSubmit: (url: string) => void;
}

export default function UrlInput({ onSubmit }: Props) {
  const [url, setUrl] = useState("");

  return (
    <div className="card">
      <input
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={() => onSubmit(url)}>Analyze</button>
    </div>
  );
}
