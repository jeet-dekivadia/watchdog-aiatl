export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "This tool has been invaluable in helping us keep track of My own and my teams Stats!.",
      author: "Lionel Messi",
      role: "Forward",
      company: "Inter Miami",
    },
    {
      id: 2,
      quote: "The star credibility feature helps us make informed decisions about potential brand partnerships.",
      author: "Elon Musk",
      role: "CEO",
      company: "Twitter, Spacex, Tesla",
    },
    {
      id: 3,
      quote: "Fast, accurate, and incredibly user-friendly. It's become an essential part of our fact-checking process.",
      author: "Harvey Specter",
      role: "Closer",
      company: "Pearson Specter",
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-purple-900 sm:text-4xl">
            Trusted by professionals
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            See what industry professionals are saying about our platform
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                <blockquote className="text-gray-900">
                  <p>"{testimonial.quote}"</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <div>
                    <div className="font-semibold text-brand-purple-900">{testimonial.author}</div>
                    <div className="text-gray-600">{`${testimonial.role}, ${testimonial.company}`}</div>
                  </div>
                </figcaption>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
