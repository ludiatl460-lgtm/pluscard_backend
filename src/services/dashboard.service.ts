import { prisma } from "../config/prisma";

const ALL_STATUSES = [
  "MATCHED",
  "AMOUNT_MISMATCH",
  "PARTIAL_MATCH",
  "ONLY_IN_FRONTEND",
  "ONLY_IN_BACKEND",
] as const;

type StatusKey = (typeof ALL_STATUSES)[number];

export const DashboardService = {
  dashboardReport: async () => {
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(endOfToday.getDate() + 1);
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const [
      resultCount,
      userCount,
      resultOlderThanThreeMonth,
      resultToday,
      statusRaw,
      latestRaw,
    ] = await Promise.all([
      prisma.result.count(),
      prisma.user.count(),
      prisma.result.count({
        where: { createdAt: { lt: threeMonthsAgo } },
      }),
      prisma.result.count({
        where: { createdAt: { gte: startOfToday, lt: endOfToday } },
      }),
      prisma.result.aggregateRaw({
        pipeline: [
          { $unwind: "$items" },
          { $group: { _id: "$items.status", count: { $sum: 1 } } },
        ],
      }),
      prisma.result.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          createdAt: true,
          manageBy: true,
        },
      }),
    ]);
    const statusCounts = Object.fromEntries(
      ALL_STATUSES.map((s) => [s, 0])
    ) as Record<StatusKey, number>;

    (statusRaw as unknown as { _id: StatusKey; count: number }[]).forEach(
      (row) => {
        if (row._id in statusCounts) statusCounts[row._id] = row.count;
      }
    );
    const statusChart = ALL_STATUSES.map((s) => ({
      status: s,
      count: statusCounts[s],
    }));
    const latestResults = latestRaw.map((r) => ({
      id: r.id,
      name: r.manageBy.name,
      lastname: r.manageBy.lastname ?? "",
      gender: r.manageBy.gender,
      contact: r.manageBy.contact,
      email: r.manageBy.email ?? "",
      createdAt: r.createdAt,
    }));

    return {
      cards: {
        resultCount,
        userCount,
        resultOlderThanThreeMonth,
        resultToday,
      },
      statusCounts,
      statusChart,  
      latestResults,
    };
  },
};