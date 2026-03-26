export const registerApi = async (email, password, firstName, lastName) => {
    const response = await fetch('/api/Auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Email: email,
            Password: password,
            FirstName: firstName,
            LastName: lastName
        }),
    });
    if (!response.ok) throw new Error("Failed to register.");

    return await response.json();
};

export const loginApi = async (email, password) => {
    const response = await fetch('/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Email: email,
            Password: password
        }),
    });

    if (!response.ok) throw new Error("Failed to login.");

    const data = await response.json();

    return data;
}