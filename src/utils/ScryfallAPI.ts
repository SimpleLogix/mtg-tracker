export interface ScryfallCard {
  id: string;
  name: string;
  color_identity: string[];
  image_uris?: {
    art_crop: string;
  };
}


export async function searchCommanders(query: string): Promise<ScryfallCard[]> {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    q: `is:commander format:paper name:${query}`,
  });

  const response = await fetch(
    `https://api.scryfall.com/cards/search?${params}`
  );

  if (!response.ok) {
    throw new Error("Failed to search Scryfall");
  }

  const data = await response.json();


  return data.data;
}