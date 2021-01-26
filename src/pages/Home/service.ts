import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { map, scan, shareReplay } from 'rxjs/operators'
import { UserModel } from './translator'

type UpdateObservable = (list: UserModel[]) => UserModel[]

class Service {
	/**
	 *  数据处理函数执行的更新入口
	 */
	update$ = new BehaviorSubject<UpdateObservable>((list: UserModel[]) => list)
	/**
	 *  批量添加到用户列表
	 */
	add$ = new Subject<UserModel>()
	/**
	 * 用户列表
	 */
	list$: Observable<UserModel[]>

	constructor() {
		this.list$ = this.update$.pipe(
			scan((list, operation) => operation(list), [] as UserModel[]),
			shareReplay(1)
		)

		this.add$
			.pipe(
				map((item) => (list: UserModel[]) => {
					return [...list, item]
				})
			)
			.subscribe(this.update$)
	}
}

export default new Service()
