import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const BooksPageNumberLogger = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryPageNumbers = useMutation(api.books.pagesAnalysis);

  const handleQuery = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryResults = await queryPageNumbers();
      setResults(queryResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Button onClick={handleQuery} disabled={isLoading}>
        {isLoading ? "Querying..." : "Query Page Numbers"}
      </Button>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Query Results:</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
