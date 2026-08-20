import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PayStatePanel({ variant }: { variant: "error" | "empty" }) {
  const copy =
    variant === "error"
      ? {
          title: "Couldn't load associations",
          description: "We couldn't load associations right now. Please try again in a moment.",
        }
      : {
          title: "No associations available",
          description: "No associations are currently accepting payments right now. Please check back later.",
        };

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">{copy.title}</CardTitle>
          <CardDescription>{copy.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}