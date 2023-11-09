export async function getSeries(id) {
    const response = await fetch(`http://localhost:8000/getSeries`);
    return response.json();
  }