import { useApi } from "service/api";

const usePublicApi = () => useApi('http://localhost:8081/', false);

export const studentService = {
    getStudentList: () => {
        return usePublicApi().get(`students`)
    },
    updateStudentInfo: (currentStudent) => {
        return usePublicApi().put(`student`, currentStudent);
    },
    createNewStudent: (newStudent) => {
        return usePublicApi().post(`student`, newStudent);
    },
    deleteStudent:  (idList) => {
        return usePublicApi().delete(`student/list`, {data: {listId: idList}})
    },
    deleteOneStudent: (id) => {
        return usePublicApi().delete(`student`, {data: {id: id}})
    }
}