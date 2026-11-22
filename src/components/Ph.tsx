import ServiceIcon from './ServiceIcon';
// مكان صورة مؤقت إلى أن تتوفر صور المشاريع
export default function Ph({ icon, className = '' }: { icon: string; className?: string }) {
  return (<div aria-hidden className={`grid place-items-center bg-sand ${className}`} style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 22px, color-mix(in srgb, var(--gold) 14%, transparent) 22px 23px)' }}><ServiceIcon name={icon} size={44} /></div>);
}
