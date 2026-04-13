import SectionBadge from "./SectionBadge";

interface SectionHeadingProps {
  badge: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  badge,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <div className={alignment}>
      <SectionBadge text={badge} />

      <h2 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">
        {description}
      </p>
    </div>
  );
}