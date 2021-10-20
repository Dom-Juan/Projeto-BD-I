
// Tokens para validação.
export const TOKEN_KEY = "my_secret";
export const USER_ID = null;

// Métodos de autenticação.
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(USER_ID);

// Métodos de Login.
export const login = token => {
	localStorage.setItem(TOKEN_KEY,token);
};

export const loginError = token => {
  localStorage.setItem(TOKEN_KEY,token);
}

export const logout = () => {
	alert("Realizando logout...");
  localStorage.removeItem(TOKEN_KEY);
};