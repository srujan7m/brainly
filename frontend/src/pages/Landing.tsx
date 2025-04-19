import { Button } from "../component/Button";
import { Logo } from "../icons/Logo";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import demo from "../assets/images/demo.png";

export const LandingPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center text-2xl pt-2 p-2">
          <div className="pr-2 text-purple-600">
            <Logo />
          </div>
          Brainly
        </div>
        <div className="flex gap-6 justify-center py-4">
          <a href="#home" className="text-black hover:text-purple-600 transition">
            Home
          </a>
          <a href="#features" className="text-black hover:text-purple-600 transition">
            Features
          </a>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="md" text="Sign In" onClick={Signin} />
          <Button variant="primary" size="md" text="Sign Up" onClick={Signup} />
        </div>
      </div>
      <div className="justify-items-center">
        <section className="w-full h-screen bg-gray-900 text-blue-112 px-4">
          <div className="flex">
            <h1 className="text-center font-semibold tracking-[-0.04em] text-balance text-[clamp(3.625rem,1.625rem+8.3333vw,9.625rem)] leading-[0.85] md:leading-[1]">
              Bookmark So_Brainly It
            </h1>
          </div>
          <div className="pt-8 justify-items-center">
            <p>
              Brainly provides you an interactive way of bookmarking content from YouTube and X, and you can save it for FREE.
            </p>
            <p>
              Just share the link of the content, select the type of the content, and that's it. See how it LOOKS!
            </p>
          </div>
          <div className="p-4 justify-items-center">
            <Button text="SIGN UP" size="lg" variant="primary" onClick={Signup} />
          </div>
          <div className="h-1/2 flex justify-center items-center">
      <img
        src={demo}
        alt="Bookmark Preview"
        className="h-full w-full object-contain"
      />
    </div>
        </section>
      </div>
    </div>
  );
};