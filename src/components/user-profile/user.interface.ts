export interface User {
  fullName: string,
  accessGroup: AccessGroup,
  uuid: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
  photo: string,
  recentActivityTime: Date,
  lastLoggedTime: Date,
  registerTime: Date,
  createdAt: Date
}

export interface AccessGroup {
  mask: number,
  name: string
}