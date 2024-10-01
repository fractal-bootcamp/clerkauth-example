import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = "pk_test_dHJ1c3RlZC1zZWFndWxsLTk4LmNsZXJrLmFjY291bnRzLmRldiQ"

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}


export default function RootLayout() {
    const navigate = useNavigate()

    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
            publishableKey={PUBLISHABLE_KEY}
        >
            <header className="header">
                <div>
                    <div>
                        <p>Clerk + React + React Router App</p>
                    </div>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Link to="/sign-in">Sign In</Link>
                    </SignedOut>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </ClerkProvider>
    )
}