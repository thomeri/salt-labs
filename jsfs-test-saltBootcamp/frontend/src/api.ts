import { Salty } from "./interfaces";

const baseUrl = 'http://localhost:3001';

export const getSalties = async (): Promise<Salty[]> => {
  const url = `${baseUrl}/api/salties`;
  const response = await fetch(url);
  const json = await response.json();
  return json.salties;
}

export const addNewSalty = async (salty: Partial<Salty>): Promise<Salty> => {
  const url = `${baseUrl}/api/salties`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(salty)
  });
  const json = await response.json();
  return json.developer;
}