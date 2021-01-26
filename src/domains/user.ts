export interface UserEntity {
	num: string
}

export interface IUser {
	account: string
}

export class User implements IUser {
	account: string

	constructor(user: UserEntity) {
		this.account = user.num
	}
}
