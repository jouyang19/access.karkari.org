import { useProcessBooks } from "./processBooks";
import { Button } from "@/components/ui/button";

export function ProcessBooksButton() {
  const processBooks = useProcessBooks();

  return <Button onClick={processBooks}>Process Images to Books</Button>;
}
