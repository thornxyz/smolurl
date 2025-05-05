import axios from "axios";
import { useState } from "react";

type ShortenedData = {
  url: string;
  short: string;
};

function App() {
  const [url, setUrl] = useState("");
  const [customShort, setCustomShort] = useState("");
  const [shortenedData, setShortenedData] = useState<ShortenedData | null>(
    null
  );

  const handleShorten = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/shorten`,
        {
          url,
          short: customShort,
        }
      );
      setShortenedData(response.data);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";
      alert(errorMessage);
    }
  };

  const handleCopy = () => {
    if (shortenedData) {
      navigator.clipboard.writeText(shortenedData.short);
      alert("Shortened URL copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl space-y-6">
        <h1 className="text-4xl font-bold text-center text-blue-700">
          SmolURL
        </h1>

        <div className="space-y-4">
          <input
            type="url"
            placeholder="Paste a long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Enter custom short (optional)"
            value={customShort}
            onChange={(e) => setCustomShort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleShorten}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out"
          >
            Shorten URL
          </button>
        </div>

        {shortenedData && (
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm space-y-4 transition-all">
            <div className="text-center space-y-1">
              <p className="text-gray-600 text-sm">Original URL</p>
              <a
                href={shortenedData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline break-words font-medium"
              >
                {shortenedData.url.length > 60
                  ? shortenedData.url.slice(0, 60) + "..."
                  : shortenedData.url}
              </a>
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-800 font-semibold">Shortened URL</p>
              <div className="flex justify-center items-center gap-3">
                <a
                  href={`http://${shortenedData.short}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 font-bold underline break-words"
                >
                  {shortenedData.short}
                </a>
                <button
                  onClick={handleCopy}
                  className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 px-3 py-1.5 rounded transition"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
