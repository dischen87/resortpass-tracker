import { PostHog } from 'posthog-node';

const posthogApiKey = process.env.POSTHOG_API_KEY;
const posthogHost = process.env.POSTHOG_HOST;

let posthogClient: PostHog | null = null;

function getPostHog(): PostHog | null {
  if (!posthogApiKey || !posthogHost) return null;
  if (!posthogClient) {
    posthogClient = new PostHog(posthogApiKey, {
      host: posthogHost,
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return posthogClient;
}

export function captureEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>,
  sessionId?: string | null,
) {
  const ph = getPostHog();
  if (!ph) return;

  try {
    ph.capture({
      distinctId,
      event,
      properties: {
        ...properties,
        ...(sessionId ? { $session_id: sessionId } : {}),
      },
    });
  } catch (err) {
    console.error('PostHog capture error:', err);
  }
}

export async function shutdownPostHog() {
  if (posthogClient) {
    await posthogClient.shutdown();
    posthogClient = null;
  }
}
