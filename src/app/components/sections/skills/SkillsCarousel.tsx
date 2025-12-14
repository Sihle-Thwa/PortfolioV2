"use client";
import { skillsdata } from "@/data/skillsdata";
import Image from "next/image";
import { useMemo } from "react";
import "./skillscarousel.css";

const icon_overrides: Record<string, string> = {
  "Next.js": "/icons/nextjs.svg",
  "React.js": "/icons/react.svg",
  "React Router": "/icons/reactrouter.svg",
  "Vite.js": "/icons/vite.svg",
  "Vue.js": "/icons/vue.svg",
  "ASP.NET Core": "/icons/dotnet.svg",
  Blazor: "/icons/blazor.svg",
  TailwindCSS: "/icons/tailwindcss.svg",
  MaterialUI: "/icons/materialui.svg",
  "Radix UI": "/icons/radixui.svg",
  "Styled Components": "/icons/styledcomponents.svg",
  "Vanilla CSS": "/icons/css.svg",
  Bootstrap: "/icons/bootstrap.svg",
  GraphQL: "/icons/graphsql.svg",
  "REST API": "",
  "Swagger.io": "/icons/swagger.svg",
  Postman: "/icons/postman.svg",
  Express: "/icons/express.svg",
  AuthO: "/icons/auth0.svg",
  "Firebase Auth": "/icons/firebase.svg",
  "Supabase Auth": "/icons/supabase.svg",
  NextAuth: "/icons/nextjs.svg",
  "Azure MySQL": "/icons/azure.svg",
  Firebase: "/icons/firebase.svg",
  MongoDB: "/icons/mongodb.svg",
  MySQL: "/icons/mysql.svg",
  Postgres: "/icons/postgresql.svg",
  Cypress: "/icons/cypress.svg",
  Jest: "/icons/jest.svg",
  Vitest: "/icons/vitest.svg",
  "Azure DevOps": "/icons/azuredevops.svg",
  Figma: "/icons/figma.svg",
  Git: "/icons/git.svg",
  Github: "/icons/github.svg",
  "Github Actions": "/icons/githubactions.svg",
  Notion: "/icons/notion.svg",
  Trello: "/icons/trello.svg",
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/(\.js|\sui|\sio)$/g, "")
    .replace(/[+]/g, "plus")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function resolveIcon(skill: string): { src: string; alt: string } {
  if (icon_overrides[skill]) {
    return { src: icon_overrides[skill], alt: `${skill} icon` };
  }
  const slug = slugify(skill);
  return { src: `/icons/${slug}.svg`, alt: `${skill} icon` };
}

export default function SkillsCarousel() {
  const rows = useMemo(() => {
    return [
      {
        key: cryptoRandom(),
        items: skillsdata.map((s: { skill: string; icon: string }) => ({
          skill: s.skill,
          icon: resolveIcon(s.skill),
        })),
      },
    ];
  }, []);

  return (
    <section className="c-skillscarousel" aria-label="Skills carousel">
      {rows.map((row) => (
        <div key={row.key} className="c-row" aria-label="skills">
          <div className="c-track" role="list">
            {row.items.concat(row.items).map(({ skill, icon }, idx) => (
              <div
                className="c-item"
                role="listitem"
                key={`${row.key}-${idx}-${skill}`}
              >
                <span className="c-item-icon" aria-hidden="true">
                  {icon.src ? (
                    <Image
                      src={icon.src}
                      alt=""
                      width={20}
                      height={20}
                      className="c-item-iconimg"
                    />
                  ) : (
                    <span className="c-item-icon-placeholder" />
                  )}
                </span>
                <span className="c-item-label">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function cryptoRandom() {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return a[0].toString(16);
  }
  return Math.random().toString(16).slice(2);
}
