// HELPERS
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const handleResponse = async (response) => {
    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "An unexpected error occurred.");
    }
    return response.json();
};

// AuthController
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

    return handleResponse(response);
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

    return handleResponse(response);
}

export const updateUserApi = async (id, email, password = "", firstName, lastName) => {
    const response = await fetch(`/api/Auth/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
            Email: email,
            Password: password,
            FirstName: firstName,
            LastName: lastName
        }),
    });

    return handleResponse(response);
}

export const deleteUserApi = async (id) => {
    const response = await fetch(`/api/Auth/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });

    return handleResponse(response);
}

// UserController
export const getUserApi = async () => {
    const response = await fetch('/api/User', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    return handleResponse(response);
}

export const searchUsersApi = async (searchTerm) => {
    const encodedTerm = encodeURIComponent(searchTerm);
    const response = await fetch(`/api/User/${encodedTerm}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    return handleResponse(response);
}

