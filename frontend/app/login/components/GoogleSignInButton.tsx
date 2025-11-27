// frontend/app/components/GoogleSignInButton.tsx
'use client';

interface Props {
  loading:boolean;
  onClick: () => void;
  error?: string;
}

export default function GoogleSignInButton({ loading, onClick, error }: Props) {
  return (
    <div className="space-y-4">
      <button
        onClick={onClick}
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
      >
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}
