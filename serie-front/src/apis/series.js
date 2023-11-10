export async function addSerie(formData) {
  try {
    const response = await fetch("http://localhost:8000/addSerie", {
      method: "POST",
      body: formData,
    });
    const body = await response.json();
    if (response.ok) {
      return body;
    } else {
      if (body) {
        throw body;
      } else {
        throw new Error("Error add");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getSeries(id) {
    const response = await fetch(`http://localhost:8000/getSeries`);
    return response.json();
  }