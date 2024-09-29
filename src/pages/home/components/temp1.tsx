import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "@/components/global/sparklesm-2";

export default function Component() {
  return (
    <div className="relative flex flex-col items-center justify-end min-h-screen bg-radial-gradient  text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Innovate for a <span className="text-blue-300">Better</span>
        </h1>
        <h2 className="text-4xl font-bold">
          Grow your <span className="text-blue-300">Future Business</span>
        </h2>
        <p className="mt-4 text-lg">
          Leverage cutting-edge IT solutions tailored to your business needs.
          Embrace a future where technology fuels your success.
        </p>
        <div className="mt-6 space-x-4">
          <Button className="bg-red-500 hover:bg-red-600">Get in Touch</Button>
          <Button className="bg-blue-500 hover:bg-blue-600">Learn more</Button>
        </div>
      </div>
      <div className="relative mt-12 half-circle-container z-50 w-full flex items-center justify-center">
        <img
          src="./hero-two-thumb.png"
          alt="Team meeting"
          width="800"
          height="400"
          style={{ aspectRatio: "800/400", objectFit: "cover" }}
          className="rounded-full absolute bottom-0 !h-full md:max-w-[75vw]"
        />
      </div>
      <div className="absolute bottom-0 left-0 mb-8 ml-8">
        <Card className="flex items-center space-x-2 p-2 bg-white text-black rounded-lg shadow-lg">
          <CircleCheckIcon className="w-6 h-6 text-red-500" />
          <span>A++ Performance</span>
        </Card>
      </div>
      <div className="absolute bottom-0 right-0 mb-8 mr-8">
        <Card className="flex items-center space-x-2 p-2 bg-white text-black rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <MergeIcon className="w-6 h-6 text-red-500" />
            <span>Integrations</span>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">Active</Button>
        </Card>
      </div>
      <div className="absolute -mt-32 h-[500px] w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-[100%] after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-[#163474] after:bg-[#08132b]">
        <Sparkles
          density={800}
          speed={1.2}
          size={1.2}
          direction="top"
          opacitySpeed={2}
          color="#32A7FF"
          className="absolute inset-x-0 bottom-0 h-full w-full "
        />
      </div>
    </div>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MergeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 6 4-4 4 4" />
      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
      <path d="m20 22-5-5" />
    </svg>
  );
}
