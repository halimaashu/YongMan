import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-black text-white py-24 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Emojis Header */}
        <div className="flex items-center justify-center gap-4 text-4xl sm:text-5xl mb-6">
          <span>🔥</span>
          <span>💃</span>
          <span>🚴‍♂️</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Ready to Get Started
        </h2>

        {/* Subtitle / Description */}
        <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed mb-10">
          Take control of your gym’s operations with ease. <br className="hidden sm:block" />
          Start now or book a demo to see how we can help
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary Button with subtle glow effect */}
          <Link
            href="/logIn"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#ff551f] text-black font-semibold rounded-xl hover:bg-red-500 transition-all duration-200 shadow-[0_0_25px_rgba(187,247,88,0.3)] text-center text-sm"
          >
            Get Started
          </Link>

          {/* Secondary Button */}
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#222425] text-white font-semibold rounded-xl border border-gray-800 hover:bg-[#2e3133] hover:border-gray-700 transition-all duration-200 text-center text-sm"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}