import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TableContent = ({ members, groupID }) => {
  const today = new Date();
  // console.log(members);
  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <TableCaption>List of Members</TableCaption>
          <Thead>
            <Tr>
              <Th fontSize={16}>Name</Th>
              <Th fontSize={16}>{groupID == "all" ? "Gender" : "Expiry"}</Th>
              <Th fontSize={16} isNumeric>
                Contact
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {members &&
              members.map((member) => {
                // console.log(member)
                const groupMembership =member.groupsExpiry?.length
                const expiryDate = new Date(member.expiry);
                console.log(expiryDate) // Convert expiry to Date object
                const daysUntilExpiry = Math.floor(
                  (expiryDate - today) / (1000 * 60 * 60 * 24)
                ); // Calculate days until expiry

                const isExpiringSoon = daysUntilExpiry <= 10; // Check if expiry is within 10 days
                // console.log(member.expiry);
                return (
                  <Tr
                    key={member.email}
                    
                  >
                    <Td style={{backgroundColor: isExpiringSoon || (groupMembership!==null &&groupMembership===0) ? "#fa8072" : ""}}>
                    
                        {groupID === "all" || groupID === "Requests"
                          ? member.name
                          : member.member.name}
                  
                    </Td>
                    <Td style={{backgroundColor: isExpiringSoon || (groupMembership!==null &&groupMembership===0) ? "#fa8072" : ""}}>
                      {groupID === "all" || groupID === "Requests"
                        ? member.gender
                        : member.expiry.slice(0,10)}
                    </Td>
                    <Td isNumeric style={{backgroundColor: isExpiringSoon || (groupMembership!==null &&groupMembership===0) ? "#fa8072" : ""}}>
                      {groupID === "all" || groupID === "Requests"
                        ? member.email
                        : member.member.email}
                    </Td>
                    <Td className="text-blue-400 underline" >
                      <Link
                        to={`/admin/user-details/${
                          groupID === "all" || groupID === "Requests"
                            ? member.email
                            : member.member.email
                        }`}
                      >
                        More Info
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableContent;
