import express, { type NextFunction, type Request, type Response } from 'express'
import { clerkClient, clerkMiddleware, getAuth, requireAuth } from '@clerk/express'
import cors from "cors";

const app = express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(identifyUserMiddleware)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function identifyUserMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("in middleware")
    const { userId } = getAuth(req);
    if (!userId) {
        return next(); // if no authed user, do nothing
    }
    console.log()

    try {
        const clerkUser = await clerkClient.users.getUser(userId);

        // Assuming you have a Prisma client instance named 'prisma'
        let user = await prisma.user.findUnique({
            where: { clerkId: userId }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: clerkUser.firstName || 'Unknown',
                    secretProprietaryInformation: 'Default secret info',
                    clerkId: userId
                }
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in identifyUserMiddleware:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


app.get('/', (req, res) => {
    console.log("redirected")
    res.send("hello")
})

app.get('/protected', async (req, res) => {
    console.log("in protected")
    const { userId } = getAuth(req)
    console.log(userId)
    if (userId) {
        const user = await clerkClient.users.getUser(userId)
        console.log(user, userId)
        return res.json({ user })
    }
    // const user = await clerkClient.users.getUser(userId)
    // const user = null
    return res.json({ message: "you are not logged in" })
})

app.get('/sign-in', (req, res) => {
    // Assuming you have a template engine installed and are using a Clerk JavaScript SDK on this page
    res.render('sign-in')
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})