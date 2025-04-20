import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            name: string,
            email: string,
            role: string,
            token: string,
            user_id: string
        }
    }
    interface User {
        _id: string
        name: string
        email: string
        role: string
        token: string
      }
    
}