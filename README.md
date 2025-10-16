# DevFest 

Standard Web App for DevFest's Events. <br>
Show some ❤️ and star the repo to support the project

![asd](/public/thumbnail.png)

## Getting Started
1. Fork the repo
1. Setup Environment
    - Install [Node.js (v20 or above)](https://nodejs.org/en/download/)
1. Install project dependencies: `npm install` 
1. Compiles and hot-reloads for development use `npm run dev`
1. Update JSON files from `/data` directory
1. Upload all images related to Speakers, Team and Sponsors in `/public/speakers/` | `/public/team/` directories with 1:1 aspect ratio
1. For production: `npm run generate` and then `.output` directory will be created for static hosting

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Generate static files
npm run generate

# Preview production build
npm run preview
```

### Troubleshooting

- If you encounter TypeScript errors, run `npm run type-check` to identify issues
- For build issues, ensure all dependencies are installed with `npm install`
- Check that Node.js version is 20 or above

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Deployment on Firebase
1. Install required tools for performing Firebase deployment
    - Install Firebase CLI: `npm i -g firebase-tools`
1. Login into Firebase CLI using the following command -  `firebase login`
1. Now type `firebase login` command in your Terminal/CMD/Powershell
1. Update the `Firebase Project ID` in `.firebasesrc` file. This value should match the project ID in your Project Settings of the Firebase project you created in the previous section.
1. Go to the Firebase Console Dashboard and Click on Hosting in the left navigation.
1. Click on Get Started
1. Click through all steps till you’re taken to the Hosting page in the console.
1. You’ll be provided with a ready domain with your project ID. It should look like - `<project-id>.web.app or <project-id>.firebaseapp.com`
1. Copy the sub-domain name of the URL provided. In this case, it will be the project ID. However, to be precise, you have to copy the part before .web.aap or .firebaseapp.com. This is your Site ID
1. Update `Firebase.json` file, set the site key to Site ID
    ```js
        {
            "hosting": {
                "site":"Your_Firebase_Hosting_id",
                "public": ".output/public",
                "rewrites": [ {
                    "source": "**",
                    "destination": "/index.html"
                } ],
                "ignore": [
                    "firebase.json",
                    "**/.*",
                    "**/node_modules/**"
                ]
            }
        }
    ```
1. In your terminal at the root directory of the project,  build and deploy using the following command     
    - `firebase deploy`

## Developed by
1. [Vrijraj Singh](https://vrijraj.xyz/)
2. [Shivam Singh](https://shivam.live/)
3. [Sandali Singh](https://sandali.xyz/)

## Technology Stack

* [VueJS](https://vuejs.org/)
* [Nuxt](https://nuxt.com/)
* [Firebase](https://firebase.google.com/)

## Contributing
Awesome! We would greatly appreciate it if you could contribute to all kinds. To help smoothen the process we have a few non-exhaustive guidelines to follow which should get you going in no time.

## Code Quality

### Linting and Formatting
```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Type check with TypeScript
npm run type-check
```

## LICENSE
Check out the [LICENSE](https://github.com/mashoun/devfest.gdglebanon.com/blob/main/LICENSE)

## Facing Any Problem or need any Help?
Write us in the [issues](https://github.com/mashoun/devfest.gdglebanon.com/issues) section. Our team will try to solve your issue within 10-12 hours.
