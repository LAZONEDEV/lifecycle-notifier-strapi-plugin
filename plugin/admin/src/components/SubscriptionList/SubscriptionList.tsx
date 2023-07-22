import React, { useEffect, useState } from "react";
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
import { SubscriptionEntry } from "../../../../common/types/index";

export const SubscriptionList = () => {
  const [subList,setSubList] = useState<SubscriptionEntry[]|null>(null)
   useEffect(() => {
      SubscriptionService.get().then(res=> setSubList(res));
  },[]);

  return (
    <Box padding={8} background="neutral100">
      <Table
      rowCount={subList?.length}>
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">Title</Typography>
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
                <Typography textColor="neutral800">{entry.title}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.collectionName}</Typography>
              </Td>
              <Td>
                <Flex>
                  <IconButton
                    onClick={() => console.log("edit")}
                    label="Edit"
                    noBorder
                    icon={<Pencil />}
                  />
                  <Box paddingLeft={1}>
                    <IconButton
                      onClick={() => console.log("delete")}
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
    </Box>
  );
};

export default SubscriptionList;
