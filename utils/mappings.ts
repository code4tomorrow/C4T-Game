import { EUserRole } from "~~/enums/userRole";

export const userRoleMappings : { [ Key in EUserRole ]: string } = {
    [ EUserRole.VOLUNTEER ]: "Volunteer",
    [ EUserRole.PROJECT_LEAD ]: "Project Lead"
}