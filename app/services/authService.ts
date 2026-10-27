const AUTH_URL = "https://dummyjson.com/auth/login";

export interface loginCredentials {
  username: string;
  password: string;
}
export interface LoginResponse {
  id: number;
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}
export async function loginUser(
  credentials: loginCredentials,
): Promise<LoginResponse> {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error("Login Failed");
  }
  const data = await response.json();
  return data ;
}
