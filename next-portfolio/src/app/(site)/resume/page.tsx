import { SidebarLayout } from "@/components/layout/sidebar-layout";

export default function ResumePage() {
  return (
    <SidebarLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">Resume</h1>
          <p className="text-gray-300">This page uses the sidebar navigation layout.</p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Experience</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-medium text-white">Senior Full Stack Developer</h3>
              <p className="text-gray-400">Company Name • 2020 - Present</p>
              <p className="text-gray-300 mt-2">
                Led development of scalable web applications using modern technologies.
              </p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-medium text-white">Full Stack Developer</h3>
              <p className="text-gray-400">Previous Company • 2018 - 2020</p>
              <p className="text-gray-300 mt-2">
                Developed and maintained multiple client projects using Angular and Node.js.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}


