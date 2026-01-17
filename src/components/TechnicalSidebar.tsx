import { Shield, Award, Users, Building2 } from 'lucide-react';

export function TechnicalSidebar() {
  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Enterprise Security',
      description: 'End-to-end encryption with zero-knowledge architecture'
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'Certified Accuracy',
      description: '99.2% detection rate validated by independent auditors'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Expert Support',
      description: '24/7 forensic analyst consultation available'
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: 'Institutional Trust',
      description: 'Deployed by Fortune 500 and government agencies'
    }
  ];

  return (
    <div className="mt-12 grid md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-[0_4px_24px_rgba(10,31,53,0.06)] p-6 border border-[#0A1F35]/5 hover:border-[#C5A059]/30 transition-all hover:shadow-[0_8px_32px_rgba(197,160,89,0.12)]"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#C5A059]/10 flex items-center justify-center flex-shrink-0 text-[#C5A059]">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-bold text-[#0A1F35] mb-1">{feature.title}</h4>
              <p className="text-sm text-[#0A1F35]/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
