import Image from "next/image";
import Link from "next/link";
import profilePic from "./images/profile.jpg";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import bgImage from "./images/bg.jpg";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <Image
        src={bgImage}
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center relative z-20">
        {/* Profile Section */}
        <div className="mb-6">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image
              src={profilePic}
              alt="Profile Picture"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">Alain St Pierre, B.Sc</h1>
          <p className="text-gray-600">AI Consultant & Software Architect</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <Link
            href="https://www.instagram.com/aspcanada/"
            className="text-gray-700 hover:text-gray-900 text-2xl"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.facebook.com/alain.j.stpierre"
            className="text-blue-400 hover:text-blue-600 text-2xl"
          >
            <FaFacebook />
          </Link>
          <Link
            href="http://www.linkedin.com/in/aspcanada"
            className="text-blue-500 hover:text-blue-700 text-2xl"
          >
            <FaLinkedin />
          </Link>
        </div>

        {/* HubSpot Embed Code */}
        {/* <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/44668860.js"
          dangerouslySetInnerHTML={{
            __html: `
              window.onload = function() {
                const script = document.createElement('script');
                script.src = "//js.hs-scripts.com/44668860.js";
                script.async = true;
                script.defer = true;
                script.id = "hs-script-loader";
                document.body.appendChild(script);
              }
            `
          }}
        /> */}

        {/* About Section */}
        {/* <div className="text-left">
          <p className="text-gray-700 mb-4">
            Welcome to my personal website. I'm a [your profession] passionate about
            [your interests]. Feel free to connect with me through social media or
            email.
          </p>
        </div> */}
      </div>
    </main>
  );
}
