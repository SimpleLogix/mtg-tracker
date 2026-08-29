interface CommanderColorsProps {
  color_identity: string[];
}

const commanderColorIdentity: Record<string, string> = {
  W: "white",
  U: "blue",
  B: "black",
  R: "red",
  G: "green",
};

export default function CommanderColors({
  color_identity,
}: CommanderColorsProps) {
  return (
    <div className="game-card-colors">
      {color_identity.map((color) => (
        <div key={color} className={commanderColorIdentity[color]}></div>
      ))}
    </div>
  );
}
