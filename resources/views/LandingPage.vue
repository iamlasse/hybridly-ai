<script setup lang="ts">

defineProps<{
  canLogin: boolean
  canRegister: boolean
  laravelVersion: string
  phpVersion: string
}>()

const user = useProperty('security.user')

const featuresSection = ref( null );
const testimonialCarousel = ref( null );
let currentTestimonial = ref( 0 );

const features = [
    { icon: 'fas fa-columns', title: 'Dynamic Boards', description: 'Create and customize boards for any project or workflow' },
    { icon: 'fas fa-tasks', title: 'Intuitive Task Management', description: 'Organize tasks effortlessly with our drag-and-drop interface' },
    { icon: 'fas fa-chart-line', title: 'Kanban Visualization', description: 'Visualize your workflow and optimize your process' },
    { icon: 'fas fa-users', title: 'Seamless Collaboration', description: 'Invite team members and collaborate in real-time' },
    { icon: 'fas fa-mobile-alt', title: 'Mobile Access', description: 'Manage your projects on-the-go with our mobile app' },
    { icon: 'fas fa-lock', title: 'Enhanced Security', description: 'Keep your data safe with our advanced security features' }
];

const demoBoard = ref( [
    { title: 'Backlog', cards: [ 'Define project scope', 'Create user stories', 'Estimate tasks' ] },
    { title: 'In Progress', cards: [ 'Design UI mockups', 'Implement login functionality' ] },
    { title: 'Review', cards: [ 'Code review: API integration', 'QA testing: User dashboard' ] },
    { title: 'Done', cards: [ 'Project kickoff meeting', 'Set up development environment' ] }
] );

const dragStart = ( event, columnIndex, cardIndex ) =>
{
    event.dataTransfer.setData( 'text/plain', JSON.stringify( { columnIndex, cardIndex } ) );
    event.target.classList.add( 'dragging' );
};

const drop = ( event, targetColumnIndex ) =>
{
    event.preventDefault();
    const { columnIndex, cardIndex } = JSON.parse( event.dataTransfer.getData( 'text' ) );
    if ( columnIndex !== targetColumnIndex )
    {
        const card = demoBoard.value[ columnIndex ].cards.splice( cardIndex, 1 )[ 0 ];
        demoBoard.value[ targetColumnIndex ].cards.push( card );
    }
    event.target.classList.remove( 'dragging' );
};

const addCard = ( columnIndex ) =>
{
    const newTask = prompt( 'Enter a new task:' );
    if ( newTask )
    {
        demoBoard.value[ columnIndex ].cards.push( newTask );
    }
};

const testimonials = [
    { quote: "TaskFlow Pro revolutionized our team's productivity. We can't imagine working without it now!", author: 'Sarah J.', position: 'Product Manager', avatar: 'path/to/sarah-avatar.jpg' },
    { quote: "The Kanban visualization feature has transformed how we track progress. It's a game-changer!", author: 'Mike T.', position: 'Tech Lead', avatar: 'path/to/mike-avatar.jpg' },
    { quote: "TaskFlow Pro's collaboration tools have made remote work feel seamless. Highly recommended!", author: 'Emily R.', position: 'Project Coordinator', avatar: 'path/to/emily-avatar.jpg' },
    { quote: "The mobile app keeps me connected to my team's progress wherever I go. Absolutely essential!", author: 'Alex M.', position: 'CEO', avatar: 'path/to/alex-avatar.jpg' }
];

const pricingPlans = [
    { name: 'Basic', price: '$9.99/mo', features: [ 'Up to 3 boards', 'Basic task management', '5 team members', 'Email support' ], buttonText: 'Start Free Trial' },
    { name: 'Pro', price: '$24.99/mo', features: [ 'Unlimited boards', 'Advanced task management', 'Unlimited team members', 'Analytics and reporting', 'Priority support' ], buttonText: 'Start Free Trial', featured: true },
    { name: 'Enterprise', price: 'Custom', features: [ 'All Pro features', 'Dedicated support', 'Custom integrations', 'On-premises option', 'SLA' ], buttonText: 'Contact Sales' }
];

const customerLogos = [
    { src: '/images/logos/company1.png', alt: 'Company 1' },
    { src: '/images/logos/company2.png', alt: 'Company 2' },
    { src: '/images/logos/company3.png', alt: 'Company 3' },
    { src: '/images/logos/company4.png', alt: 'Company 4' },
    { src: '/images/logos/company5.png', alt: 'Company 5' },
];

const integrations = [
    { name: 'Slack', icon: '/images/integrations/slack.png' },
    { name: 'Google Drive', icon: '/images/integrations/google-drive.png' },
    { name: 'GitHub', icon: '/images/integrations/github.png' },
    { name: 'Jira', icon: '/images/integrations/jira.png' },
    { name: 'Salesforce', icon: '/images/integrations/salesforce.png' },
];

const footerColumns = [
    { title: 'Product', items: [ 'Features', 'Pricing', 'Integrations', 'API' ] },
    { title: 'Company', items: [ 'About Us', 'Careers', 'Contact', 'Partners' ] },
    { title: 'Resources', items: [ 'Blog', 'Help Center', 'Community', 'Webinars' ] },
    { title: 'Legal', items: [ 'Privacy Policy', 'Terms of Service', 'Security' ] }
];

const faqs = ref( [
    { question: 'What is TaskFlow Pro?', answer: 'TaskFlow Pro is a powerful project management tool that helps teams organize, track, and manage their work using Kanban-style boards.', isOpen: false },
    { question: 'How does the free trial work?', answer: 'Our 14-day free trial gives you full access to all TaskFlow Pro features. No credit card required to start.', isOpen: false },
    { question: 'Can I integrate TaskFlow Pro with other tools?', answer: 'Yes, TaskFlow Pro offers integrations with popular tools like Slack, Google Drive, and many more.', isOpen: false },
    { question: 'Is my data secure with TaskFlow Pro?', answer: 'Absolutely. We use industry-standard encryption and security practices to keep your data safe and secure.', isOpen: false }
] );

const scrollToFeatures = () =>
{
    featuresSection.value.scrollIntoView( { behavior: 'smooth' } );
};

const animateFeature = ( index ) =>
{
    // Add animation logic here, e.g., using CSS transitions or animations
};

const prevTestimonial = () =>
{
    currentTestimonial.value = ( currentTestimonial.value - 1 + testimonials.length ) % testimonials.length;
};

const nextTestimonial = () =>
{
    currentTestimonial.value = ( currentTestimonial.value + 1 ) % testimonials.length;
};

const selectPlan = ( planName ) =>
{
    console.log( `Selected plan: ${ planName }` );
    // Implement plan selection logic, e.g., redirect to sign-up page with selected plan
};

const startFreeTrial = () =>
{
    console.log( 'Starting free trial' );
    // Implement free trial logic, e.g., redirect to sign-up page
};

const navigate = ( item ) =>
{
    console.log( `Navigating to: ${ item }` );
    // Implement navigation logic
};

const openSocialMedia = ( platform ) =>
{
    const socialLinks = {
        twitter: 'https://twitter.com/taskflowpro',
        linkedin: 'https://www.linkedin.com/company/taskflowpro',
        facebook: 'https://www.facebook.com/taskflowpro'
    };
    window.open( socialLinks[ platform ], '_blank' );
};

const showPrivacyPolicy = () =>
{
    console.log( 'Showing privacy policy' );
    // Implement logic to show privacy policy, e.g., open modal or navigate to policy page
};

const showTerms = () =>
{
    console.log( 'Showing terms of service' );
    // Implement logic to show terms of service, e.g., open modal or navigate to terms page
};

const toggleFaq = ( index ) =>
{
    faqs.value[ index ].isOpen = !faqs.value[ index ].isOpen;
};

onMounted( () =>
{
    // Set up any necessary event listeners or initializations
    setInterval( () =>
    {
        nextTestimonial();
    }, 5000 ); // Auto-advance testimonials every 5 seconds
} );
</script>

<template layout="main">
    <div class="bg-white">

        <!-- Top navigation bar -->
        <nav class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <!-- Add your logo here -->
                            <svg class="h-8 w-auto text-indigo-600" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12L9 15L10.5 16.5L12 15L15 18L16.5 16.5L12 12Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <h4>TaskFlow Pro</h4>
                        </div>
                    </div>
                    <div v-if=" !user " class="flex items-center">
                        <router-link :href="route('login')"
                            class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Sign
                            In</router-link>
                        <a href="#"
                            class="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign
                            Up</a>
                    </div>
                    <div v-else class="flex items-center">
                        <router-link :href="route('dashboard')">Dashboard</router-link>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero section -->
        <header class="bg-indigo-600 text-white">
            <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                    TaskFlow Pro
                </h1>
                <p class="mt-6 text-xl sm:text-2xl max-w-3xl mx-auto">
                    Streamline Your Workflow, Amplify Your Success
                </p>
                <div class="mt-10 flex justify-center">
                    <div class="inline-flex rounded-md shadow">
                        <button @click="scrollToFeatures"
                            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600">
                            Discover Our Features
                        </button>
                    </div>
                    <div class="ml-3 inline-flex">
                        <button @click="startFreeTrial"
                            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                            Start Free Trial
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Features section -->
        <section class="py-16 bg-gray-50" ref="featuresSection">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Powerful Tools for Unparalleled Productivity
                    </h2>
                </div>
                <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div v-for="(feature, index) in features" :key="index"
                        class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-6">
                            <div class="flex items-center">
                                <i :class="[feature.icon, 'text-indigo-500 text-3xl']"></i>
                                <h3 class="ml-3 text-xl font-medium text-gray-900">{{ feature.title }}</h3>
                            </div>
                            <p class="mt-4 text-base text-gray-500">{{ feature.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="container py-4">
            <TaskBoard />
        </div>
        <!-- CTA section -->
        <section class="bg-indigo-700">
            <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
                    <span class="block">Ready to transform your workflow?</span>
                    <span class="block">Start your free trial today.</span>
                </h2>
                <p class="mt-4 text-lg leading-6 text-indigo-200">
                    Join thousands of teams already using TaskFlow Pro to achieve their goals.
                </p>
                <button @click="startFreeTrial"
                    class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
                    Start Free Trial
                </button>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-800">
            <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div v-for="(column, index) in footerColumns" :key="index">
                        <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            {{ column.title }}
                        </h3>
                        <ul class="mt-4 space-y-4">
                            <li v-for="(item, itemIndex) in column.items" :key="itemIndex">
                                <a href="#" @click.prevent="navigate(item)"
                                    class="text-base text-gray-300 hover:text-white">
                                    {{ item }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
                    <div class="flex space-x-6 md:order-2">
                        <a href="#" @click.prevent="openSocialMedia('twitter')"
                            class="text-gray-400 hover:text-gray-300">
                            <span class="sr-only">Twitter</span>
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" @click.prevent="openSocialMedia('linkedin')"
                            class="text-gray-400 hover:text-gray-300">
                            <span class="sr-only">LinkedIn</span>
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#" @click.prevent="openSocialMedia('facebook')"
                            class="text-gray-400 hover:text-gray-300">
                            <span class="sr-only">Facebook</span>
                            <i class="fab fa-facebook"></i>
                        </a>
                    </div>
                    <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                        &copy; {{ new Date().getFullYear() }} TaskFlow Pro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
/* Tailwind CSS classes will be used instead of custom CSS */
</style>
