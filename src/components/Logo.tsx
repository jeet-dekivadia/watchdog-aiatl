export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="https://pbs.twimg.com/profile_images/1555324907491319811/oso3XVR0_400x400.png"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="8" />
    </svg>
  );
}
