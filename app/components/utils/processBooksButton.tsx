import { useProcessBooks } from "./processBooks";
import { Button } from "@/components/ui/button";

export function ProcessBooksButton() {
  const processBooks = useProcessBooks();

  return (
    <Button className="mt-2" onClick={processBooks}>
      Process Images to Books
    </Button>
  );
}
