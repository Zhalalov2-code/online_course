import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost/school/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.get(API_URL, { params: { email, password } });
            const data = response.data;

            // Поддерживаем несколько возможных форматов ответа от бэка
            // 1) массив пользователей (старый формат) -> [ { ... } ]
            // 2) объект { status: 200, user: { ... } }
            let loggedInUser = null;

            if (Array.isArray(data) && data.length > 0) {
                loggedInUser = data[0];
            } else if (data && data.status === 200 && data.user) {
                loggedInUser = data.user;
            }

            if (loggedInUser) {
                setUser(loggedInUser);
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                return { success: true, user: loggedInUser };
            }

            return { success: false, message: data?.error || data?.message || 'Неверный email или пароль' };
        } catch (error) {
            console.error('Ошибка при попытке входа:', error);
            return { success: false, message: 'Ошибка сервера' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};