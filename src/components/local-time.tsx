"use client";

import { useEffect, useState } from "react";

/** Shows the current time in the given zone. Renders nothing until mounted to avoid hydration mismatch. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  if (!time) return <span className="tabular-nums">--:--</span>;
  return (
    <time className="tabular-nums" suppressHydrationWarning>
      {time}
    </time>
  );
}
