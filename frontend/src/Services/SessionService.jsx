import api from './Services/api';

export const createSession = async () => {
    try {
        const response = await api.post('/session/create');
        console.log('Session created', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating session', error);
        throw error;
    }
};

export const viewSession = async () => {
    try {
        const response = await api.get('/session/view');
        console.log('Session data', response.data);
        return response.data;
    } catch (error) {
        console.error('Error retrieving session data', error);
        throw error;
    }
};

export const invalidateSession = async () => {
    try {
        const response = await api.get('/session/invalidate');
        console.log('Session invalidated', response.data);
        return response.data;
    } catch (error) {
        console.error('Error invalidating session', error);
        throw error;
    }
};
