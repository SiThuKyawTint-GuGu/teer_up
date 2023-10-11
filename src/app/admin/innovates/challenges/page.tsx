import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

import { Table } from '@radix-ui/themes';

const ChallengesPage: NextPage = () => {
  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                {/* <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink> */}
                {/* {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />} */}
                {column.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))} */}

          <Table.Row>
            <Table.Cell>
              <Link href={'/issues'}>Name</Link>
              <div className="block md:hidden">
                {/* <IssueStatusBadge status={issue.status} /> */}
                status
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {/* <IssueStatusBadge status={issue.status} /> */}
              status
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">date</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
            <Table.Cell>zahra@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
            <Table.Cell>jasper@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </>
  );
};

const columns: {
  label: string;
  value: string;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  {
    label: 'Status',
    value: 'status',
    className: 'hidden md:table-cell',
  },
  {
    label: 'Created',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

export const columnNames = columns.map(column => column.value);

export default ChallengesPage;
