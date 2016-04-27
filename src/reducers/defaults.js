//Default values for reducers
//Structure: reduce name => { default reducer data }
const defaults = {
    lang: {
        current: 'en',
    },
    projects: {
        items: [
            {
                key: 'adaptabi',
                name: 'Adaptabi',
                description: 'New company site',
                website: 'http://adaptabi.com',
                img: '/res/img/projects/adaptabi.png',
            },
            {
                key: 'safetybank',
                name: 'Safetybank',
                description: 'Best H&S system for construction companies',
                website: 'http://safetybank.co.uk',
                img: '/res/img/projects/safetybank.png',
            },
            {
                key: 'squires',
                name: 'Squires Kitchen',
                description: 'Largest kitchen supply store in UK',
                website: 'http://squires-shop.com',
                img: '/res/img/projects/squires.png',
            },
        ],
    },
    services: {
        items: [
            {
                key: 'innovation',
                name: 'Innovation',
                icon: 'cog',
                description: 'We boost startup recognition by creating unique, innovative apps!',
            },
            {
                key: 'maintenance',
                name: 'Maintenance',
                icon: 'save',
                description: 'We keep your project running at peak performance forever!',
            },
            {
                key: 'consulting',
                name: 'Consulting',
                icon: 'comments',
                description: 'Don\'t know how to make your dream idea come true? We do!',
            },
            {
                key: 'cooking',
                name: 'Cooking',
                icon: 'pie-chart',
                description: 'We\'ll slap you with the best pizza in town!',
            },
        ],
    },
};

export default defaults;
export let {lang, projects, services} = defaults;