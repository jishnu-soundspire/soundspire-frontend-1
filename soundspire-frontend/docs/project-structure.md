# SoundSpire Project Documentation

## Project Overview

Built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Google OAuth 2.0
- **State Management**: React Context API
- **Icons**: React Icons

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/               # API routes
│   │   │   └── auth/          # Authentication endpoints
│   │   ├── explore/           # Explore page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable UI components
│   ├── context/               # React context providers
│   ├── lib/                   # Utility functions
│   └── styles/                # Global styles
├── public/                    # Static assets
└── docs/                      # Project documentation
```

## Key Components

### 1. Authentication Components

#### AuthContext (`context/AuthContext.tsx`)

- Manages user authentication state
- Provides login/logout functionality
- Handles session persistence
- Protects routes based on auth state

#### Login Page (`app/page.tsx`)

- Entry point for authentication
- Provides Google OAuth login
- Handles automatic redirection for authenticated users

### 2. Navigation Components

#### Navbar (`components/Navbar.tsx`)

- Top navigation bar
- Theme toggle functionality
- Logout button
- Responsive sidebar menu
- Mobile-friendly design

### 3. Theme Components

#### ThemeContext (`context/ThemeContext.tsx`)

- Manages dark/light mode
- Persists theme preference
- Provides theme toggle functionality

### 4. Explore Page Components

#### Carousel (`components/Carousel.tsx`)

- Displays featured content
- Smooth transitions
- Responsive design

#### ArtistCard (`components/ArtistCard.tsx`)

- Displays artist information
- Image and basic details
- Interactive hover effects

#### ReviewCard (`components/ReviewCard.tsx`)

- Shows user reviews
- Rating display
- Review content

#### GenreCard (`components/GenreCard.tsx`)

- Genre categorization
- Visual representation
- Quick navigation

## Component Interactions

### Authentication Flow

1. User clicks "Login with Google"
2. `AuthContext` initiates OAuth flow
3. Google authentication page opens
4. After successful auth:
   - User data is stored in httpOnly cookie
   - User is redirected to explore page
   - Auth state is updated in context

### Theme Management

1. Theme preference is stored in localStorage
2. `ThemeContext` provides theme state
3. Components use theme context for styling
4. Theme toggle updates global state

### Navigation

1. Navbar provides main navigation
2. Sidebar menu for mobile view
3. Protected routes check auth state
4. Automatic redirects based on auth status

## API Routes

### Authentication Endpoints

1. `/api/auth/google`

   - Initiates Google OAuth flow
   - Generates state parameter
   - Redirects to Google auth page
2. `/api/auth/google/callback`

   - Handles OAuth callback
   - Exchanges code for tokens
   - Creates user session
   - Sets authentication cookies
3. `/api/auth/logout`

   - Clears authentication cookies
   - Terminates user session
4. `/api/auth/session`

   - Checks current session status
   - Returns user data if authenticated

## State Management

### Context Providers

1. **AuthContext**

   - User authentication state
   - Login/logout functions
   - Session management
2. **ThemeContext**

   - Dark/light mode state
   - Theme toggle function
   - Theme persistence

## Styling System

### Tailwind CSS Configuration

- Custom color palette
- Dark mode support
- Responsive design utilities
- Animation classes

### Component Styling

- Consistent design language
- Responsive layouts
- Dark mode compatibility
- Interactive states

## Development Guidelines

### Code Organization

1. Components should be:

   - Single responsibility
   - Reusable
   - Well-documented
   - Type-safe
2. File naming:

   - PascalCase for components
   - camelCase for utilities
   - kebab-case for pages

### Best Practices

1. Use TypeScript for type safety
2. Implement proper error handling
3. Follow React hooks rules
4. Maintain consistent styling
5. Write meaningful comments

## Testing

### Component Testing

1. Test authentication flows
2. Verify theme switching
3. Check responsive behavior
4. Validate form submissions

### API Testing

1. Verify OAuth flow
2. Test session management
3. Check error handling
4. Validate security measures

## Deployment

### Environment Setup

1. Set required environment variables
2. Configure OAuth credentials
3. Set up production URLs
4. Enable secure cookies

### Build Process

1. Run type checking
2. Build static assets
3. Optimize images
4. Generate production build

## Maintenance

### Regular Tasks

1. Update dependencies
2. Review security measures
3. Monitor performance
4. Check error logs

### Common Issues

1. Authentication problems
2. Theme persistence
3. Responsive design
4. API connectivity

## Future Enhancements

1. User profile management
2. Additional OAuth providers
3. Advanced search functionality
4. Social features
5. Analytics integration
