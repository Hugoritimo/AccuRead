export const setToken = (token: string, rememberMe: boolean) => {
    // Armazena o token no localStorage
    localStorage.setItem("token", token);

    // Se "lembrar-me" estiver habilitado, armazena essa preferência
    if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
    } else {
        localStorage.removeItem("rememberMe");
    }
};
