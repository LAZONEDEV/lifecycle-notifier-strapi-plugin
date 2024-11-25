import {
  Box,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Typography,
  VisuallyHidden,
} from '@strapi/design-system';
import { Pencil, Trash } from '@strapi/icons';
import { useAuth } from '@strapi/strapi/admin';
import { useState } from 'react';
import { SubscriptionEntry } from '../../common/types/index';
import { getCollectionNameFormUid } from '../../common/utils/getCollectionNameFormUid';
import { SubscriptionService } from '../../services/Subscription';
import DeleteSubscriptionDialog from '../Dialogs/DeleteSubscriptionDialog';

interface SubscriptionListProps {
  onEdit: (_: SubscriptionEntry) => void;
  loadSubs: () => void;
  subList: SubscriptionEntry[];
}

export const SubscriptionList = ({ onEdit, loadSubs, subList }: SubscriptionListProps) => {
  const token = useAuth('lifecycle-notifier-strapi-plugin', (state) => state.token!);
  const [toDelete, setToDelete] = useState<null | string>(null);

  const deleteSub = async () => {
    if (!toDelete) return;
    SubscriptionService.delete(toDelete, token).then(() => {
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
              <Typography variant="sigma">Event type</Typography>
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
                <Typography textColor="neutral800">{entry.eventType}</Typography>
              </Td>
              <Td>
                <Flex justifyContent="flex-end">
                  <IconButton
                    withTooltip={false}
                    data-testid="edit-button"
                    onClick={() => onEdit(entry)}
                    label="Edit"
                    noBorder
                  >
                    <Pencil />
                  </IconButton>
                  <Box paddingLeft={1}>
                    <IconButton
                      withTooltip={false}
                      data-testid="delete-button"
                      onClick={() => setToDelete(entry.id)}
                      label="Delete"
                      noBorder
                    >
                      <Trash />
                    </IconButton>
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
