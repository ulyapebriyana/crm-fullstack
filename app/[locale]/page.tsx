import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function RootPage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b bg-white px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            My Awesome App
          </Link>
          <nav className="hidden space-x-7 sm:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              About
            </Link>
          </nav>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>
            <Button asChild>
              <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-hidden">
        <section className="flex h-full items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Welcome to My Awesome App
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Experience the next level of productivity with our innovative
              tools and features.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg">Sign Up Now</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white px-4 py-2">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="text-gray-500">
            © 2023 My Awesome App. All rights reserved.
          </div>
          <nav className="flex space-x-4">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
