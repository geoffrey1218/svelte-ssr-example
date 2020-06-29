import Sass from './Sass.svelte';

const app = new Sass({
	target: document.body,
	props: {
		name: 'world'
	},
	hydrate: true
});

export default app;