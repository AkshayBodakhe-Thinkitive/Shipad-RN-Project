
export interface Address {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

export interface FamilyMember {
    uuid: string;
    patientId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    relationship: string;
}

export interface Profile {
    userId: string,
    uuid:string,
    patientId: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    gender: string,
    birthDate: string,
    userType: string,
    status: string,
    role?: string,
    roleType?: string,
    address?: Address,
    language?: string,
    mobileNumber?:string;
    avatar?:string;
    nurseAvatar?:string;
    familyMembers?: FamilyMember[],
    mrn?: string,
    ssn?: string,
    providerId?: string,
    maritalStatus?: string,
    preferredCommunicationMethod?: string,
    deviceManagementOptions?: string,
    hasPortalAccess?: boolean,
    consentTypes?: string[],
    consentFormSigned?: boolean
}

export interface ProfileState {
    profileData: Profile,
    loading: boolean,
    patientByIdData: Profile | null,
}