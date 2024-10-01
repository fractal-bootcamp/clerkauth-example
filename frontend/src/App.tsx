import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import AuthedStuff from './AuthedStuff'
import UnauthedStuff from './UnauthedStuff'

export default function App() {
  return (
    <header>
      <SignedOut>
        <UnauthedStuff />
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <AuthedStuff />
        <UserButton />
      </SignedIn>
    </header>
  )
}