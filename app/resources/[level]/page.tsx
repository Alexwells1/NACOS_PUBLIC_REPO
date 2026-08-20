import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { resourcesData } from "@/constants/resourcesData";
import LevelFolder from "@/components/features/resources/LevelFolder";

export default async function LevelResources({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const levelName = `${level} Level`;
  const levelData = resourcesData.find(
    (l) => l.level.toLowerCase() === levelName.toLowerCase()
  );

  if (!levelData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Resources not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back */}
        <Link
          href="/resources"
          className="inline-flex items-center text-sm text-[#168706] hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Resources
        </Link>

        <h1 className="text-3xl font-bold mb-10">
          {levelData.level} Resources
        </h1>

        <div className="space-y-8">
          {/* Semesters */}
          {levelData.semesters.map((semester) => (
            <div
              key={semester.name}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
                <h2 className="text-xl font-semibold">{semester.name}</h2>

                {semester.pastQuestionsLink && (
                  <a
                    href={semester.pastQuestionsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 mt-2 sm:mt-0"
                  >
                    {/* Folder icon */}
                    <div className="w-16 h-16 mb-2 relative">
                      <div className="absolute inset-0 bg-green-700 rounded-t-lg"></div>
                      <div className="absolute bottom-0 left-1/4 w-3/4 h-2 bg-green-400 rounded-b-lg"></div>
                    </div>
                    <span className="text-sm font-semibold text-center">
                      Past Questions
                    </span>
                  </a>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {semester.courses?.map((course) => (
                  <LevelFolder
                    key={course.code}
                    level={course.code}
                    to={course.link}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Others Section */}
          {levelData.others && levelData.others.length > 0 && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-5">
                Other Useful Files
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {levelData.others.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
                  >
                    {/* Green folder icon */}
                    <div className="w-16 h-16 mb-2 relative">
                      <div className="absolute inset-0 bg-green-700 rounded-t-lg"></div>
                      <div className="absolute bottom-0 left-1/4 w-3/4 h-2 bg-green-400 rounded-b-lg"></div>
                    </div>
                    <span className="text-sm font-semibold text-center">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
