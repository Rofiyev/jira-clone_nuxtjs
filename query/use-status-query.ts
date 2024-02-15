import { useQuery } from "@tanstack/vue-query";
import { Query } from "appwrite";
import { COLLECTION_DEALS, DB_ID, status } from "~/constants";
import { DATABASE } from "~/libs/appwrite";
import { useAuthStore } from "~/store/auth.store";
import type { IDeal, IColumn } from "~/types";

export const useStatusQuery = () => {
  const { currentUser } = useAuthStore();

  return useQuery({
    queryKey: ["deals"],
    queryFn: () =>
      DATABASE.listDocuments(DB_ID, COLLECTION_DEALS, [
        Query.equal("userId", currentUser.id),
      ]),
    select: (data) => {
      const newBoard: IColumn[] = status.map((item: IColumn) => ({
        ...item,
        items: [],
      }));

      const deals = data.documents as unknown as IDeal[];

      for (const deal of deals) {
        const column: IColumn | undefined = newBoard.find(
          (item: IColumn) => item.id === deal.status
        );

        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            name: deal.name,
            description: deal.description,
            status: deal.status,
            $id: deal.$id,
          });
        }
        return newBoard;
      }
    },
  });
};
