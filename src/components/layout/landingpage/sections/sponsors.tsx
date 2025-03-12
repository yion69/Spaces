"use client";

import { Icon } from "../icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { Cookie, Crown, Drama, Ghost, icons, Puzzle, Squirrel, Vegan } from "lucide-react";
interface sponsorsProps {
  icon: React.ComponentType;
  name: string;
}

const sponsors: sponsorsProps[] = [
  {
    icon: Crown,
    name: "Acmebrand",
  },
  {
    icon: Vegan,
    name: "Acmelogo",
  },
  {
    icon: Ghost,
    name: "Acmesponsor",
  },
  {
    icon: Puzzle,
    name: "Acmeipsum",
  },
  {
    icon: Squirrel,
    name: "Acme",
  },
  {
    icon: Cookie,
    name: "Accmee",
  },
  {
    icon: Drama,
    name: "Acmetech",
  },
];

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6">
        Our Platinum Sponsors
      </h2>

      <div className="flex gap-3 mx-auto">
        {sponsors.map(({ icon: IconComponent, name }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium"
            >
              {/* <IconComponent size={32} color="white" className="mr-2" /> */}
              {name}
            </div>
          ))}
        {/* <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {sponsors.map(({ icon: IconComponent, name }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium"
            >
              <IconComponent size={32} color="white" className="mr-2" />
              {name}
            </div>
          ))}
        </Marquee> */}
      </div>
    </section>
  );
};
