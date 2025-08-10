import { UnifiedLayout } from "@/components/layout/unified-layout";

export default function PortfolioPage() {
  return (
    <UnifiedLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">Portfolio</h1>
          <p className="text-gray-300">This page uses responsive navigation that adapts to screen size.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gray-800 rounded-xl p-6 hover:border-yellow-500 border border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">Project {item}</h3>
              <p className="text-gray-400 text-sm mb-4">
                A sample project description showcasing various technologies and skills.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-700 text-yellow-500 text-xs rounded">React</span>
                <span className="px-2 py-1 bg-gray-700 text-yellow-500 text-xs rounded">Node.js</span>
                <span className="px-2 py-1 bg-gray-700 text-yellow-500 text-xs rounded">MongoDB</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UnifiedLayout>
  );
}


