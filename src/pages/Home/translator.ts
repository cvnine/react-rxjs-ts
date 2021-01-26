/**
 * 数据清洗
 */
import { User, UserEntity } from '@/domains/user'

export interface UserModel {
	user: User
	status: {
		isChecked: boolean
	}
	uuid: string
}

export function TranslatorUser(userEntity: UserEntity) {
	const user = new User(userEntity)
	return {
		user,
		status: {
			isChecked: false,
		},
		uuid: user.account,
	}
}
