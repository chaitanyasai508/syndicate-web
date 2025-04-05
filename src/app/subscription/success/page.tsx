'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/api/axios';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!sessionId) {
      router.replace('/pricing');
      return;
    }

    api.get(`/subscriptions/verify-checkout-session/${sessionId}`).then(res => {
        if(res.data.success && res.data?.subscription?.status === 'active') {
            setStatus('success');
        } else {
            setStatus('error');
        }
    }).catch(err => {
        console.error('Verification error:', err);
        setStatus('error');
    });
    // Verify the session
    // fetch(`/api/verify-subscription?session_id=${sessionId}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.success) {
    //       setStatus('success');
    //     } else {
    //       throw new Error('Verification failed');
    //     }
    //   })

  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {status === 'loading' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Confirming your subscription...</h1>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {status === 'success' && (
          <div>
            <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Subscription Successful!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for subscribing. You now have access to all features.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {status === 'error' && (
          <div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-8">
              We couldn&apos;t verify your subscription. Please contact support.
            </p>
            <button
              onClick={() => router.push('/pricing')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Return to Pricing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}