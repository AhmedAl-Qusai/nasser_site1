export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })) };
  return (<div className="divide-y divide-line border-y border-line">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    {items.map((i) => (<details key={i.q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">{i.q}<span aria-hidden className="text-2xl text-gold transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-muted">{i.a}</p></details>))}
  </div>);
}
