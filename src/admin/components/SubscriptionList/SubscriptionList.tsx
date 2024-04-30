import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  IconButton,
  Typography,
  VisuallyHidden,
  Tbody,
  Td,
  Flex,
} from "@strapi/design-system";
import { Trash } from "@strapi/icons";
import { Pencil } from "@strapi/icons";
import { SubscriptionService } from "../../services/Subscription";
import { SubscriptionEntry } from "../../../common/types/index";
import DeleteSubscriptionDialog from "../Dialogs/DeleteSubscriptionDialog";
import { getCollectionNameFormUid } from "../../../common/utils/getCollectionNameFormUid";

interface SubscriptionListProps {
  onEdit: (_: SubscriptionEntry) => void;
  loadSubs: () => void;
  subList: SubscriptionEntry[];
}

export const SubscriptionList = ({
  onEdit,
  loadSubs,
  subList,
}: SubscriptionListProps) => {
  const [toDelete, setToDelete] = useState<null | string>(null);

  const deleteSub = async () => {
    if (!toDelete) return;
    SubscriptionService.delete(toDelete).then(() => {
      loadSubs();
    });
    setToDelete(null);
  };

  return (
    <Box padding={10} background="neutral100">
      <Table colCount={3} rowCount={subList?.length}>
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">Subject</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Collection name</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {subList?.map((entry) => (
            <Tr key={entry.id}>
              <Td>
                <Typography textColor="neutral800">{entry.subject}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {getCollectionNameFormUid(entry.collectionName)}
                </Typography>
              </Td>
              <Td>
                <Flex>
                  <IconButton
                    data-testid="edit-button"
                    onClick={() => onEdit(entry)}
                    label="Edit"
                    noBorder
                    icon={<Pencil />}
                  />
                  <Box paddingLeft={1}>
                    <IconButton
                      data-testid="delete-button"
                      onClick={() => setToDelete(entry.id)}
                      label="Delete"
                      noBorder
                      icon={<Trash />}
                    />
                  </Box>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <DeleteSubscriptionDialog
        isVisible={!!toDelete}
        onCancel={() => setToDelete(null)}
        onConfirm={deleteSub}
      />
    </Box>
  );
};

export default SubscriptionList;
