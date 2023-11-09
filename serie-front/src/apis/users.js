export async function signin(credentials) {
  console.log(credentials);
  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      if (user) {
        throw user;
      } else {
        throw new Error("Error connection");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function signup(values) {
  try {
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      body: values,
    });
    const body = await response.json();
    if (response.ok) {
      return body;
    } else {
      if (body) {
        throw body;
      } else {
        throw new Error("Error register");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(id) {
  const response = await fetch(`http://localhost:8000/getUser/${id}`);
  return response.json();
}
