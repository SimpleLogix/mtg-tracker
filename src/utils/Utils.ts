import type { Commander } from "../types/Game";

export function loadCommanders(): Commander[] {
    const saved = localStorage.getItem("commanders");

    return saved ? JSON.parse(saved) : [];
}

export
    function addCommander(commander: Commander) {
    const saved = localStorage.getItem("commanders");
    const commanders: Commander[] = saved ? JSON.parse(saved) : [];

    commanders.unshift(commander);

    localStorage.setItem("commanders", JSON.stringify(commanders));
}

export function removeCommander(commander: Commander) {
  const saved = localStorage.getItem("commanders");
  const commanders: Commander[] = saved ? JSON.parse(saved) : [];

  const updated = commanders.filter((c) => c.id !== commander.id);

  localStorage.setItem("commanders", JSON.stringify(updated));
}