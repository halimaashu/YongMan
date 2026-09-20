import Image from 'next/image';

const testimonials = [
  {
    quote: "I've seen massive improvements in my gym's performance thanks to the expert trainers. Highly recommend!",
    name: 'John Cena',
    role: 'Gym Owner',
    rating: '4.9',
    avatar: '/avater1.jpg',
  },
  {
    quote: 'The trainers are dedicated and professional. My gym members love them!',
    name: 'Maria Gomez',
    role: 'Personal Trainer',
    rating: '4.9',
    avatar: '/avater2.jpg',
  },
  {
    quote: "Excellent trainers, fantastic customer support. Couldn't ask for more!",
    name: 'David Lee',
    role: 'Gym Manager',
    rating: '4.9',
    avatar: '/avater3.WEBP',
  },
  {
    quote: 'Great results from dedicated trainers! My gym has flourished.',
    name: 'Esther Howard',
    role: 'Gym Owner',
    rating: '4.9',
    avatar: '/avater4.WEBP',
  },
  {
    quote: 'Expert trainers who know their craft! Highly recommend for any gym',
    name: 'Devon Lane',
    role: 'Gym Manager',
    rating: '4.9',
    avatar: '/avater5.jpg',
  },
  {
    quote: "The trainers have transformed my workout routine! I'm more motivated than ever",
    name: 'Marvin McKinney',
    role: 'Fitness Coach',
    rating: '4.9',
    avatar: '/avater6.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Header */}
        <h1 className='text-[#ff551f] font-bold text-center m-5'>. REVIEW .</h1>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base mb-16">
          Hear from gym owners and fitness enthusiasts who trust our trainers to help them reach
          their fitness goals. Their feedback inspires us to continue delivering top-tier services.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#121413] border border-gray-800/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-lg hover:border-gray-700 transition duration-200"
            >
              <div>
                {/* Quote Icon */}
                <div className="text-gray-500 font-serif text-5xl leading-none select-none mb-4">
                  “
                </div>
                {/* Quote Text */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                  {item.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-emerald-100 flex-shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400">{item.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs font-semibold text-gray-200">
                  <span className="text-yellow-400">★</span>
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}