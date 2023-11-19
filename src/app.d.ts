import { CookieSerializeOptions } from 'cookie';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			code: string;
		}
		interface Locals {}
		interface PageData {}
		interface Platform {}
		interface Event {
			cookies: {
        [x: string]: any;
			  get: (name: string) => string | undefined;
			  delete: (name: string, opts?: CookieSerializeOptions) => void;
			};
			locals: {
        [x: string]: any;
			  getSession: () => Promise<Session | null>;
			};
			url: {
			  pathname: string;
			};
			request: {
			  url: string;
			};
		  }
	}
}

export {};
