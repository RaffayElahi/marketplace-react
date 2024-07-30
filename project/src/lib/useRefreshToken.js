import { useContext } from 'react';
import axiosConfig from './axiosConfig';
import { MyContext } from '../context/context';

const useRefreshToken = () => {
    const { auth ,setAuth } = useContext(MyContext);

    const refresh = async () => {
        try {
            const response = await axiosConfig.post('/api/auth/refresh');
            const { accessToken, roles, id, name } = response.data;

            setAuth(prev => ({
                ...prev,
                roles,
                accessToken,
                id,
                name,
            }));
            console.log(auth)
            return accessToken;
        } catch (err) {
            console.error('Error refreshing token:', err);
            return null;
        }
    };

    return refresh;
};

export default useRefreshToken;