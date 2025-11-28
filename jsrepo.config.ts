import { defineConfig } from 'jsrepo';

export default defineConfig({
    // configure where stuff comes from here
    registries: [
        {
            name: 'reactbits',
            url: 'https://reactbits.dev/r'
        }
    ],
    // configure were stuff goes here
    paths: {
        components: './src/components/ui',
		component: './src/components'
    },
});