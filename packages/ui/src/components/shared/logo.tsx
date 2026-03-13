import { cn } from '../../lib/utils';

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export function Logo({ collapsed, className }: LogoProps) {
  if (collapsed) {
    // Sadece "S" harfi + kırmızı nokta (sidebar collapsed)
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className={cn('shrink-0', className)}
      >
        <text
          x="2"
          y="24"
          fill="currentColor"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="26"
        >
          S
        </text>
        <circle cx="24" cy="8" r="4" fill="#FF3B30" />
        <circle cx="28" cy="24" r="2.5" fill="#007AFF" />
      </svg>
    );
  }

  return (
    <svg
      width="140"
      height="32"
      viewBox="0 0 140 32"
      fill="none"
      className={cn('shrink-0', className)}
    >
      {/* STK */}
      <text
        x="0"
        y="24"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="26"
        letterSpacing="-0.5"
      >
        STK
      </text>
      {/* Kırmızı nokta */}
      <circle cx="72" cy="10" r="5.5" fill="#FF3B30" />
      {/* Dijital */}
      <text
        x="48"
        y="24"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="26"
        letterSpacing="-0.5"
      >
        Dijital
      </text>
      {/* Mavi nokta */}
      <circle cx="130" cy="22" r="3.5" fill="#007AFF" />
    </svg>
  );
}
