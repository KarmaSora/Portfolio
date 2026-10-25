"use client";

import { useSkillCategories, useSkillsContent } from "./PortfolioProvider";

export function Skills() {
  const categories = useSkillCategories();
  const content = useSkillsContent();

  return (
    <section id="skills" aria-label="Skills" className="section-space">
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-10 md:mb-14">Skills &amp; tools</h2>
        <div className="divide-y divide-border border-y border-border">
          {categories.map((category) => (
            <div key={category.id} className="grid gap-4 py-5 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12">
              <h3 className="text-sm font-semibold leading-7">{category.name}</h3>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {category.skills.map((skill) => <span key={skill} className="text-sm leading-7 text-muted-foreground">{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
        {content.currentlyLearning.length > 0 && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-8">
            <p className="text-sm font-semibold leading-7">Currently exploring</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {content.currentlyLearning.map((item) => <span key={item} className="text-sm leading-7 text-muted-foreground">{item}</span>)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
