import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  authorizationParams: { 
    max_age: 0,
    prompt: 'login'
  },
  // Setting a very short cookie expiration
  session: {
    rollingDuration: 0, // Don't extend session automatically
    absoluteDuration: 300 // 5 minutes in seconds
  }
});