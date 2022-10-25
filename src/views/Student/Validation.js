function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

function isValid(string, type) {
    switch (type) {
        case 'name':
            let rename = /^[a-zA-Z !@#\$%\^\&*\)\(+=._-]{2,40}$/g;
            return rename.test(removeAscent(string));
        case 'email':
            let reemail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
            return reemail.test(string);
        case 'username':
            let reusername = /^[a-zA-Z0-9._-]{3,20}$/;
            return reusername.test(string);
        case 'phone':
            let rephone = /^[0-9]{10,11}$/;
            return rephone.test(string);
        default:
            return false;
    }
}

export default function Validation(form) {
    const newErrors = {}
    if (form.fullName == '') newErrors.fullName = '* Looks like you forgot something';

    if (form.dob == '') newErrors.dob = '* Looks like you forgot something';

    if (form.signupDate == '') newErrors.signupDate = '* Looks like you forgot something';
    
    if (!isValid(form.phoneNum, 'phone')) newErrors.phoneNum = '* Phone is not valid';

    if (form.phoneNum == '') newErrors.phoneNum = '* Looks like you forgot something';

    if (form.familyContact == '') newErrors.familyContact = '* Looks like you forgot something';

    if (!isValid(form.parentEmail, 'email')) newErrors.parentEmail = '* Email is not valid';

    if (form.parentEmail == '') newErrors.parentEmail = '* Looks like you forgot something';

    if (form.status == '') newErrors.status = '* Looks like you forgot something';

    return newErrors
}

const d = {
    fullName: "",
            dob: "",
            signupDate: "",
            phoneNum: "",
            familyContact: "",
            parentEmail: "",
            status: "",
            avatar: null,
}