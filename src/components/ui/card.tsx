import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export function Card({ children, className, href }: CardProps) {
  const classes = cn(
    "rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow dark:border-zinc-800 dark:bg-zinc-900",
    href && "hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700",
    className,
  );

  if (href) {
    return (
      <a href={href} className={cn(classes, "block")}>
        {children}
      </a>
    );
  }

  return <div className={classes}>{children}</div>;
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-base font-semibold text-zinc-900 dark:text-zinc-100",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-1 text-sm text-zinc-500 dark:text-zinc-400", className)}>
      {children}
    </p>
  );
}
