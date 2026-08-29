import { useEffect, useRef, useState } from "react";
import { searchCommanders, type ScryfallCard } from "../../utils/ScryfallAPI";
import type { Commander } from "../../utils/Game";

interface CommanderSearchProps {
  onSelect: (commander: Commander) => void;
}

export default function CommanderSearch({ onSelect }: CommanderSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ScryfallCard[]>([]);

  // handles when user selects Commander from drop down menu
  const handleSelect = (card: ScryfallCard) => {
    const selectedCommander: Commander = {
      name: card.name,
      id: card.id,
      img_url: card.image_uris?.art_crop,
      color_identity: card.color_identity.reverse(),
    };
    onSelect(selectedCommander);
    setQuery("");
    setResults([]);
  };

  // Searches after 300ms buffer
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const cards = await searchCommanders(query);
      console.log(cards);
      setResults(cards);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // Closes search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchRef = useRef<HTMLDivElement>(null);

  return (
    <div className="commander-search-container" ref={searchRef}>
      <input
        className="commander-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search commander..."
      />

      <div className="search-card-wrapper">
        {results.map((card) => (
          <div
            className="search-card"
            key={card.id}
            onClick={() => handleSelect(card)}
          >
            <div
              className="search-image"
              style={{
                backgroundImage: `url(${card.image_uris?.art_crop})`,
              }}
            ></div>
            <div>{card.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
