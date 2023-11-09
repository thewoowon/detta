import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full border-b sm:px-4 px-2 pt-3 pb-5 border-gray-500 gap-2">
      <div className="flex items-end justify-center gap-4">
        <Link href="/" className="flex space-x-2 items-center pt-1 pb-1">
          <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight text-gray-900">
            Checky
          </h1>
        </Link>
        <Link
          href="/playground"
          className="flex space-x-2 items-center pt-1 pb-1"
        >
          <div className="sm:text-lg text-sm ml-2 tracking-tight text-blue-600 hover:text-blue-700">
            Playground
          </div>
        </Link>
        <Link href="/" className="flex space-x-2 items-center pt-1 pb-1">
          <div className="sm:text-lg text-sm ml-1 tracking-tight text-blue-600 hover:text-blue-700">
            Docs
          </div>
        </Link>
        <Link href="/" className="flex space-x-2 items-center pt-1 pb-1">
          <div className="sm:text-lg text-sm ml-1 tracking-tight text-blue-600 hover:text-blue-700">
            Pricing
          </div>
        </Link>
        <Link href="/" className="flex space-x-2 items-center pt-1 pb-1">
          <div className="sm:text-lg text-sm ml-1 tracking-tight text-blue-600 hover:text-blue-700">
            About
          </div>
        </Link>
        <Link href="/privacy" className="flex space-x-2 items-center pt-1 pb-1">
          <div className="sm:text-lg text-sm ml-1 tracking-tight text-blue-600 hover:text-blue-700">
            Privacy
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <a
          className="flex items-center justify-center space-x-2 rounded-full border border-[#74aa9c] text-white px-3 py-1 text-sm shadow-md hover:opacity-80 bg-[#74aa9c] font-medium transition"
          href="https://chat.openai.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>chat with GPT</p>
        </a>
        <Link
          className="text-blue-600 hover:text-blue-500 transition hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href="/dist.zip"
        >
          .zip download
        </Link>
      </div>
    </header>
  );
}

function Github({ className }: { className?: string }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2406 2406">
        <path
          d="M1 578.4C1 259.5 259.5 1 578.4 1h1249.1c319 0 577.5 258.5 577.5 577.4V2406H578.4C259.5 2406 1 2147.5 1 1828.6V578.4z"
          fill="#74aa9c"
        />
        <path
          d="M1107.3 299.1c-198 0-373.9 127.3-435.2 315.3C544.8 640.6 434.9 720.2 370.5 833c-99.3 171.4-76.6 386.9 56.4 533.8-41.1 123.1-27 257.7 38.6 369.2 98.7 172 297.3 260.2 491.6 219.2 86.1 97 209.8 152.3 339.6 151.8 198 0 373.9-127.3 435.3-315.3 127.5-26.3 237.2-105.9 301-218.5 99.9-171.4 77.2-386.9-55.8-533.9v-.6c41.1-123.1 27-257.8-38.6-369.8-98.7-171.4-297.3-259.6-491-218.6-86.6-96.8-210.5-151.8-340.3-151.2zm0 117.5-.6.6c79.7 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.1 151.6-338.9 339-339.2zm434.2 141.9c121.6-.2 234 64.5 294.7 169.8 39.2 68.6 53.9 148.8 40.4 226.5-2.5-1.8-7.3-4.3-10.4-6.1l-360.4-208.2c-18.4-10.4-41-10.4-59.4 0L1024 984.2V805.4L1372.7 604c51.3-29.7 109.5-45.4 168.8-45.5zM650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l421.7 243-155.7 90L597.2 1355c-162-93.8-217.4-300.9-123.8-462.8C513.1 823.6 575.5 771 650 743.5zm807.9 106 348.8 200.8c162.5 93.7 217.6 300.6 123.8 462.8l.6.6c-39.8 68.6-102.4 121.2-176.5 148.2v-428c0-21.4-11-41-29.4-51.4l-422.3-243.7 155-89.3zM1201.7 997l177.8 102.8v205.1l-177.8 102.8-177.8-102.8v-205.1L1201.7 997zm279.5 161.6 155.1 89.4v402.2c0 187.3-152 339.2-339 339.2v-.6c-79.1 0-156.3-27.6-217-78.4 2.5-1.2 8-4.3 11-6.1l360.4-207.5c18.4-10.4 30-30 29.4-51.4l.1-486.8zM1380 1421.9v178.8l-348.8 200.8c-162.5 93.1-369.6 38-463.4-123.7h.6c-39.8-68-54-148.8-40.5-226.5 2.5 1.8 7.4 4.3 10.4 6.1l360.4 208.2c18.4 10.4 41 10.4 59.4 0l421.9-243.7z"
          fill="white"
        />
      </svg>
    </div>
  );
}
