import { randomBytes } from 'crypto';

/**
 * Generates a random state parameter for OAuth flow
 * This helps prevent CSRF attacks by ensuring the response
 * comes from the same request that initiated the flow
 */
export function generateState(): string {
  return randomBytes(32).toString('hex');
} 