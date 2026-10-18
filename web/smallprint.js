// The fine print a real GBA cart carries under its label, where the page once had region pills.
// Game Boy carts print nothing: their headers carry no product code to print. A SNES cart prints
// its line's prefix and market: SNSP for the PAL carts sold in Germany and the rest of Europe,
// SNS for North America, SHVC for Japan.
// A GBA game code's last letter is the market it was made for.
const BY_LETTER = { E: 'USA', P: 'EUR', J: 'JPN', D: 'NOE', F: 'FRA', S: 'ESP', I: 'ITA', H: 'HOL', K: 'KOR', U: 'AUS', C: 'CHN' };
const BY_TAG = {
  USA: 'USA',
  Europe: 'EUR',
  Japan: 'JPN',
  World: 'World',
  Germany: 'NOE',
  France: 'FRA',
  Spain: 'ESP',
  Italy: 'ITA',
  Netherlands: 'HOL',
  Korea: 'KOR',
  Australia: 'AUS',
  China: 'CHN',
};

const SNES_LINE = { USA: 'SNS', JPN: 'SHVC' };

export function smallPrint(platform, code, tags) {
  if (platform === 'SNES') {
    const regions = [...new Set(tags.map((tag) => BY_TAG[tag]).filter(Boolean))];
    const line = SNES_LINE[regions[0]] ?? 'SNSP';
    const pal = regions.filter((r) => !SNES_LINE[r] && r !== 'World');
    return pal.length && line === 'SNSP' ? `SNSP · ${pal.join(', ')}` : line;
  }
  if (platform !== 'GBA') return '';
  if (/^[A-Z0-9]{4}$/.test(code)) {
    const region = BY_LETTER[code[3]];
    return region ? `AGB-${code}-${region}` : `AGB-${code}`;
  }
  const regions = [...new Set(tags.map((tag) => BY_TAG[tag]).filter(Boolean))];
  return regions.length ? `AGB · ${regions.join(', ')}` : 'AGB';
}
