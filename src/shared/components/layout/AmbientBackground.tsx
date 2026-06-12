export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/18 blur-3xl dark:bg-primary/10" />
      <div className="absolute -right-20 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/14 blur-3xl dark:-right-24 dark:h-96 dark:w-96 dark:bg-accent/10" />
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl dark:hidden" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/5" />
    </div>
  );
}
