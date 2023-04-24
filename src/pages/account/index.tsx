import React from 'react'
import { Container } from 'components/common';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@mui/material';

export default function Account() {
    const router = useRouter();
    const { data: session } = useSession()
    
    if (session) {
        return (
            <Container 
            header='Signed in'
            menu={[
            {
                icon: 'Groups',
                text: 'Recent Groups',
                onClick: () => router.push('/tools/recentGroups'),
            },
            {
                icon: 'Search',
                text: 'Find Group',
                onClick: () => router.push('/tools/findGroup'),
            },
            ]}
            >
                <h3>Signed in as {session.user.email}</h3>
                <Button onClick={() => signOut()}>Sign out</Button>
            </Container>
        )
    } else {
        return (
            <Container 
            header='Not signed in'
            menu={[
            {
                icon: 'Groups',
                text: 'Recent Groups',
                onClick: () => router.push('/tools/recentGroups'),
            },
            {
                icon: 'Search',
                text: 'Find Group',
                onClick: () => router.push('/tools/findGroup'),
            },
            ]}
            >
                <h3>Not signed in</h3>
                <Button onClick={() => signIn()}>Sign in</Button>
            </Container>
        )
    }
}
