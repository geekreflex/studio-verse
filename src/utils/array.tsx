export function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
}

interface FabricObject {
  type: string;
  fontFamily?: string;
}

interface FabricjJson {
  objects: FabricObject[];
}

export function extractFontFamiliesFromJson(json: string): string[] {
  try {
    const parsedJSON: FabricjJson = JSON.parse(json);
    const fontFamilies: string[] = parsedJSON.objects
      .filter((obj: FabricObject) => obj.type === 'textbox' && obj.fontFamily)
      .map((obj: FabricObject) => obj.fontFamily!);

    return fontFamilies.length > 0 ? fontFamilies : ['Lato'];
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
}
