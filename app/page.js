import { auth0 } from "../lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <main className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Datamaskinkontroll</h1>
          <p className="text-gray-600 mb-6">
            Logg inn for å fortsette til datamaskinkontroll
          </p>
          <div className="mt-4">
            <a 
              href="/auth/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors inline-block"
            >
              Logg inn
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <main className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Velkommen</h1>
        <div>
          <a 
            href="/datamaskiner" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors inline-block"
          >
            Fortsett til Datamaskinkontroll
          </a>
        </div>
      </main>
    </div>
  );
}