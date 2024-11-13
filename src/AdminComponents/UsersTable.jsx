import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from "@windmill/react-ui";

const UsersTable = ({ searchTerm, users }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]); // New state for paginated data

  useEffect(() => {
    const filteredData = users.filter((user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPaginatedData(filteredData.slice(page - 1, page));
  }, [data, searchTerm, page]); // Dependencies updated
  // pagination setup
  const totalResults = users.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(users.slice(page - 1, page));
  }, [page, searchTerm]);

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nom Complet</TableCell>
              <TableCell>Nom d'utilisateur</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>N° Téléphone</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {paginatedData.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </div>
  );
};

export default UsersTable;
