# Better-Auth Setup with PostgreSQL and Drizzle

This project is now configured with better-auth using PostgreSQL and Drizzle ORM.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/chat0"

# GitHub OAuth (optional)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Better Auth
BETTER_AUTH_SECRET="your_random_secret_key"
BETTER_AUTH_URL="http://localhost:3000" # Change for production
```

## Database Setup

1. **Create a PostgreSQL database:**
   ```bash
   createdb chat0
   ```

2. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

   Or push schema directly (for development):
   ```bash
   npm run db:push
   ```

3. **View your database (optional):**
   ```bash
   npm run db:studio
   ```

## Available Scripts

- `npm run db:generate` - Generate migration files from schema changes
- `npm run db:migrate` - Run pending migrations
- `npm run db:push` - Push schema changes directly to database (dev only)
- `npm run db:studio` - Open Drizzle Studio to view/edit data

## OAuth Setup

### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to your `.env.local`

### Google OAuth
1. Go to Google Cloud Console
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Set redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env.local`

## Usage

The authentication is now integrated into your app. You can:

1. **Use the AuthButton component:**
   ```tsx
   import AuthButton from '@/frontend/components/AuthButton';
   
   function MyComponent() {
     return <AuthButton />;
   }
   ```

2. **Use auth hooks in components:**
   ```tsx
   import { useSession } from '@/lib/auth-client';
   
   function MyComponent() {
     const { data: session, isPending } = useSession();
     
     if (isPending) return <div>Loading...</div>;
     if (!session) return <div>Please sign in</div>;
     
     return <div>Hello, {session.user.name}!</div>;
   }
   ```

3. **Protect API routes:**
   ```tsx
   import { auth } from '@/lib/auth';
   import { headers } from 'next/headers';
   
   export async function GET() {
     const session = await auth.api.getSession({
       headers: await headers()
     });
     
     if (!session) {
       return Response.json({ error: 'Unauthorized' }, { status: 401 });
     }
     
     // Your protected logic here
   }
   ```

## Database Schema

The following tables are created:

- **user** - User accounts
- **session** - User sessions
- **account** - OAuth provider accounts
- **verification** - Email verification tokens
- **chat** - Chat conversations
- **message** - Chat messages

## Next Steps

1. Set up your PostgreSQL database
2. Configure environment variables
3. Run migrations
4. Set up OAuth providers (optional)
5. Start using authentication in your components

The authentication system is now ready to use! 