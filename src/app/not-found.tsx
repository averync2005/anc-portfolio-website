import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <p className="text-[10rem] font-display font-bold leading-none tracking-tight text-foreground/8 select-none">
        404
      </p>
      <div className="space-y-2 -mt-4">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground text-sm">That URL doesn&apos;t exist.</p>
      </div>
      <Link
        href="/"
        className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        Go home
      </Link>
    </div>
  );
}
