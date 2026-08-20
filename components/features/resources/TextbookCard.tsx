import LevelFolder from "@/components/features/resources/LevelFolder";
import type { Textbook } from "@/constants/resourcesData";

interface TextbookCardProps {
  textbook: Textbook;
}

export default function TextbookCard({ textbook }: TextbookCardProps) {
  return <LevelFolder level={textbook.name} to={textbook.link} />;
}
