import { auth0 } from "../lib/auth0";
import './styles/landing.css'

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <>
        <main className="landing-hero">
          <section className="hero-section">
            <h1 className="hero-title">Datamaskinkontroll</h1>
            <p className="hero-subtitle">
              Log in for å fortsette til datamaskinkontroll
            </p>
            <div className="cta-group">
              <a href="/auth/login" className="cta-primary">
                Log In
              </a>
            </div>
          </section>
        </main>
      </>
    );
  }

    return (
      <main className="landing-hero">
      <h1 className="hero-title">Velkommen</h1>
      <div className="cta-group">
          <a href="/datamaskiner" className="cta-primary">
            Fortsett til Datamaskinkontroll
          </a>
        </div>
      </main>
  );
}
