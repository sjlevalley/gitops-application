import Image from "next/image";

export default function Home() {
  const features = [
    {
      title: "GitOps Workflow",
      description: "Automated deployment and configuration management using Git as the single source of truth.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Kubernetes Integration",
      description: "Seamless integration with Kubernetes clusters for container orchestration and management.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Real-time Monitoring",
      description: "Comprehensive monitoring and observability for your applications and infrastructure.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const stats = [
    { label: "Active Applications", value: "24" },
    { label: "Deployments Today", value: "156" },
    { label: "Success Rate", value: "99.8%" },
    { label: "Uptime", value: "99.9%" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              GitOps Frontend
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
              Modern, scalable, and efficient GitOps workflow management for your Kubernetes applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 focus-ring"
                style={{ 
                  backgroundColor: 'var(--primary)', 
                  color: 'var(--primary-foreground)' 
                }}
              >
                Get Started
              </button>
              <button 
                className="px-8 py-3 rounded-lg font-semibold border transition-all duration-200 focus-ring"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)'
                }}
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Powerful Features
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
              Everything you need to manage your GitOps workflows efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl border transition-all duration-200 hover:shadow-lg"
                style={{ 
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--border)',
                  color: 'var(--card-foreground)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--muted-foreground)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Ready to get started?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--muted-foreground)' }}>
            Join thousands of developers who are already using GitOps Frontend to streamline their workflows.
          </p>
          <button 
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 focus-ring"
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'var(--primary-foreground)' 
            }}
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                GitOps Frontend
              </span>
            </div>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-sm hover:underline"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Documentation
              </a>
              <a 
                href="#" 
                className="text-sm hover:underline"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Support
              </a>
              <a 
                href="#" 
                className="text-sm hover:underline"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
