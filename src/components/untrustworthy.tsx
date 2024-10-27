import { Metadata } from 'next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
  title: 'Untrustworthy Figures - WatchDog',
  description: 'View credibility scores and analysis of potentially untrustworthy public figures.',
};

export default function UntrustworthyPage() {
  const celebrities = [
    {
      name: "John Doe",
      credibilityScore: "32%",
      description: "Frequently shares unverified health claims and conspiracy theories. Multiple fact-checking organizations have debunked their statements."
    },
    {
      name: "Jane Smith",
      credibilityScore: "45%",
      description: "Known for spreading misleading financial advice and promoting questionable investment schemes without proper disclaimers."
    },
    {
      name: "Mike Johnson",
      credibilityScore: "28%",
      description: "Regular publisher of manipulated images and false news stories. Has been flagged multiple times for content violations."
    },
    {
      name: "Sarah Williams",
      credibilityScore: "39%",
      description: "Often shares pseudoscientific claims and promotes unproven medical treatments to their large follower base."
    },
    {
      name: "David Brown",
      credibilityScore: "41%",
      description: "Known for spreading misinformation about current events and sharing doctored videos without verification."
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-brand-purple-900 mb-6">
            Untrustworthy Public Figures
          </h1>
          
          <div className="prose prose-purple max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Our AI analysis has identified these public figures as having consistently low credibility scores based on their social media activity and content authenticity.
            </p>

            <div className="mt-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead className="w-[150px]">Credibility Score</TableHead>
                    <TableHead>Analysis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {celebrities.map((celebrity) => (
                    <TableRow key={celebrity.name}>
                      <TableCell className="font-medium">{celebrity.name}</TableCell>
                      <TableCell className="text-red-500 font-semibold">{celebrity.credibilityScore}</TableCell>
                      <TableCell className="text-gray-600">{celebrity.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Note: Credibility scores are calculated based on multiple factors including content authenticity, fact-checking history, and cross-referenced information. Scores are updated regularly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
