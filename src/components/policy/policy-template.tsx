import { ReactNode } from 'react';

interface PolicySection {
  title: string;
  content: ReactNode;
}

interface PolicyTemplateProps {
  title: string;
  description: string;
  sections: PolicySection[];
}

export function PolicyTemplate({ title, description, sections }: PolicyTemplateProps) {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-8 flex flex-col gap-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm">{description}</p>

      <div className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <PolicySection key={index} section={section} />
        ))}
      </div>
    </div>
  );
}

function PolicySection({ section }: { section: PolicySection }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-bold">{section.title}</h2>
      <div className="text-sm whitespace-pre-line">{section.content}</div>
    </section>
  );
}
