import { useApi } from "service/api";

const usePublicApi = () => useApi('http://localhost:8081/', false);

export const loginService = {
    Login: (data) => {
        return usePublicApi().post(`login`, data)
    },
}