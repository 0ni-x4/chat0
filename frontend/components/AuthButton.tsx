import { useSession, signIn, signOut } from '@/lib/auth-client';
import { Button } from '@/frontend/components/ui/button';

export default function AuthButton() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <Button disabled>Loading...</Button>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Welcome, {session.user.name || session.user.email}
        </span>
        <Button
          variant="outline"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => signIn.social({ provider: 'github' })}
      >
        Sign in with GitHub
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn.social({ provider: 'google' })}
      >
        Sign in with Google
      </Button>
    </div>
  );
} 