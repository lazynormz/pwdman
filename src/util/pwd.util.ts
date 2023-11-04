import { PwdDTO } from "../DTO/pwd.dto";

const ValidatePwd = (pass: PwdDTO): boolean => {
    return (
        pass.OwnerID != null && pass.OwnerID != undefined && pass.OwnerID != "" &&
        pass.pwd != null && pass.pwd != undefined && pass.pwd != "" &&
        pass.source != null && pass.source != undefined && pass.source != ""
    )
}

export {
    ValidatePwd
}