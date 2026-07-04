import Link from "next/link";

export function PageClosing({
  text,
  href,
  label,
  lifelongNote,
}: {
  text: string;
  href: string;
  label: string;
  lifelongNote?: string;
}) {
  return (
    <div className="max-w-read space-y-3 pt-4">
      <p className="text-[16px] text-graphite">
        {text}{" "}
        <Link
          href={href}
          className="font-medium text-cobalt underline-offset-2 hover:underline focus-ring rounded-sm"
        >
          {label}
        </Link>
      </p>
      {lifelongNote && (
        <p className="text-[15px] leading-relaxed text-graphite italic">
          {lifelongNote}
        </p>
      )}
    </div>
  );
}
