import React from "react";
import { allTransition } from "@/lib/actions/api/bookedClass";
import { Button, Card, Chip, Pagination, Table } from "@heroui/react";
// Gravity UI Icons matching image_7cc546.png
import { ArrowUpRight, Funnel, ArrowDownToSquare } from "@gravity-ui/icons";

export default async function TransactionsPage() {
  // Fetch data dynamically from your Server Action
  const payments = await allTransition();

  // Stats overview data mapping matching the screenshot UI
  const stats = [
    {
      title: "Total Revenue",
      value: "$1,284,500",
      trend: "+12.4%",
      icon: <ArrowUpRight className="text-success" />,
    },
    {
      title: "Monthly Revenue",
      value: "$94,210",
      trend: "+8.1%",
      icon: <ArrowUpRight className="text-success" />,
    },
    {
      title: "Active Pro Users",
      value: "12,408",
      trend: "+2.3%",
      icon: <ArrowUpRight className="text-warning" />,
    },
    {
      title: "Active Enterprise Users",
      value: "842",
      trend: "+15.7%",
      icon: <ArrowUpRight className="text-success" />,
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto bg-[#121212] min-h-screen text-dark-foreground selection:bg-primary/30">
      {/* 1. Top Section - Summary Cards */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">
          Payments & Subscriptions
        </h1>
        <p className="text-sm text-default-400 mb-6">
          Comprehensive overview of platform revenue and active subscriptions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className="bg-[#1c1c1e] border border-default-100/10 shadow-sm p-4"
            >
              <Card.Header className="flex justify-between items-start p-0 pb-2">
                <div>
                  <Card.Title className="text-xs font-medium text-default-400 uppercase tracking-wider block">
                    {stat.title}
                  </Card.Title>
                </div>
                <div className="flex items-center gap-1 text-xs bg-default-100/5 px-2 py-0.5 rounded-full">
                  {stat.trend}
                </div>
              </Card.Header>

              <Card.Content className="p-0 pt-1 flex flex-row justify-between items-end">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </h2>
                <div className="p-2 bg-default-100/5 rounded-lg text-default-400">
                  {stat.icon}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>

      {/* 2. Main Section - Recent Transactions Table Wrapper */}
      <Card className="bg-[#1c1c1e] border border-default-100/10 shadow-md">
        <Card.Header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5">
          <div>
            <Card.Title className="text-lg font-semibold text-white">
              Recent Transactions
            </Card.Title>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              variant="flat"
              className="bg-default-100/5 text-white"
              startContent={<Funnel size={16} />}
            >
              Filter
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-white text-black font-medium"
              startContent={<ArrowDownToSquare size={16} />}
            >
              Export CSV
            </Button>
          </div>
        </Card.Header>

        <Card.Content className="p-0">
          <Table
            aria-label="Transactions collection"
            removewrapper="true"
            className={{
              th: "bg-transparent text-default-400 border-b border-default-100/10 text-xs font-semibold py-4 uppercase tracking-wider first:pl-6 last:pr-6",
              td: "py-4 border-b border-default-100/5 text-sm text-default-300 first:pl-6 last:pr-6",
            }}
          >
            <Table.ScrollContainer>
              <Table.Content aria-label="Team members" className="min-w-[660px]">
                <Table.Header>
                  <Table.Column isRowHeader>USER EMAIL</Table.Column>
                  <Table.Column>PLAN</Table.Column>
                  <Table.Column>AMOUNT</Table.Column>
                  <Table.Column className="hidden md:table-cell">
                    TRANSACTION ID
                  </Table.Column>
                  <Table.Column align="end">STATUS</Table.Column>
                </Table.Header>

                <Table.Body emptyContent={"No recent transactions available."}>
                  {payments?.map((payment) => (
                    <Table.Row
                      key={payment._id}
                      className="hover:bg-default-50/5 transition-colors"
                    >
                      {/* User Email with dynamic initial logo bubble */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-default-200/10 flex items-center justify-center text-xs text-default-300 font-medium font-mono uppercase">
                            {payment.userEmail
                              ? payment.userEmail.substring(0, 2)
                              : "US"}
                          </div>
                          <span className="font-medium text-white">
                            {payment.userEmail}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Plan Identifier logic based on price tier */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                          className="bg-default-100/10 text-default-300 capitalize text-xs"
                        >
                          {Number(payment.price) >= 10000
                            ? "Enterprise"
                            : "Starter"}
                        </Chip>
                      </Table.Cell>

                      {/* Properly Formatted Price Target */}
                      <Table.Cell>
                        <span className="font-semibold text-white">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          }).format(Number(payment.price))}
                        </span>
                      </Table.Cell>

                      {/* Fallback to _id if SessionId format breaks */}
                      <Table.Cell className="hidden md:table-cell font-mono text-xs text-default-400">
                        <span className="uppercase">
                          {payment.sessionId
                            ? payment.sessionId.substring(0, 12)
                            : payment._id.substring(0, 12)}
                        </span>
                      </Table.Cell>

                      {/* Status indicator style based on image_7cc546.png */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="dot"
                          color="success"
                          className="bg-success-500/10 border-none text-success-400 font-medium text-xs uppercase tracking-wide px-2"
                        >
                          Success
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card.Content>

        {/* 3. Card Footer for Dashboard Pagination */}
        <Card.Footer className="flex flex-col sm:flex-row justify-between items-center p-5 gap-4 border-t border-default-100/10">
          <p className="text-xs text-default-400">
            Showing <span className="text-white">1</span> to{" "}
            <span className="text-white">{payments?.length || 0}</span> of{" "}
            <span className="text-white">{payments?.length || 0}</span>{" "}
            transactions
          </p>
          <Pagination
            total={3}
            initialpage={1}
            size="sm"
            variant="flat"
            className={{
              wrapper: "gap-1 bg-transparent",
              item: "bg-transparent text-default-400 hover:bg-default-100/5",
              active: "bg-white text-black font-semibold",
            }}
          />
        </Card.Footer>
      </Card>
    </div>
  );
}
