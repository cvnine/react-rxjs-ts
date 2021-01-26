import { Observable, Subscriber } from 'rxjs'

export function fromPromise<T>(promise: PromiseLike<T>) {
	return new Observable((subscriber: Subscriber<T>) => {
		promise.then(
			(value) => {
				if (!subscriber.closed) {
					subscriber.next(value)
					// subscriber.complete()
				}
			},
			(err: any) => subscriber.error(err)
		)
		// .then(null, reportUnhandledError)
	})
}
