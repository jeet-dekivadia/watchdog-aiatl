import { formatNumber } from '@/lib/utils';

export default function StatsSection() {
  const stats = [
    { id: 1, name: 'Content Verified', value: '1M+' },
    { id: 2, name: 'Stars Analyzed', value: '50K+' },
    { id: 3, name: 'Accuracy Rate', value: '96%' },
    { id: 4, name: 'Daily Users', value: '10K+' },
  ];

  return (
    <div className="bg-brand-purple-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-purple-900 sm:text-4xl">
              Trusted by millions worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-brand-purple-600">
              Our AI-powered platform has helped millions verify content and make informed decisions.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-white p-8">
                <dt className="text-sm font-semibold leading-6 text-brand-purple-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-brand-purple-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
