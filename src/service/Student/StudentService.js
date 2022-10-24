import { useApi } from "service/api";

const usePublicApi = () => useApi('http://localhost:8081/', false);

export const studentService = {
    getStudentList: () => {
        return usePublicApi().get(`students`)
    },
    // updateStudentInfo: (currentStudent) => {
    //     return usePublicApi().put(`student`, currentStudent);
    // }
}