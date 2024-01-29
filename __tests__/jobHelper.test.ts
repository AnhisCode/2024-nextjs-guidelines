import { PrismaClient } from "@prisma/client";
import { UserJobHelper } from "~/libs/user/userJobHelper";
import { mockDeep } from "jest-mock-extended";

// Mock the PrismaClient

describe("userHelper", () => {
  let userJobHelper: UserJobHelper;
  const mockPrisma = mockDeep<PrismaClient>();

  beforeEach(() => {
    userJobHelper = new UserJobHelper(mockPrisma);
  });

  describe("insertJob", () => {
    it("should inserts a user job successfully", async () => {
      const result = await userJobHelper.insertJob("user123");

      expect(result).toBe(true);
      expect(mockPrisma.job.create).toHaveBeenCalledWith({
        data: {
          title: "test",
          description: "test",
          dueDate: expect.any(Date),
          userId: "user123",
        },
      });
    });

    it("should handles insert user job failure gracefully", async () => {
      // Mock the Prisma job.create method to throw an error
      mockPrisma.job.create.mockRejectedValueOnce(
        new Error("Insert user failed"),
      );

      const result = await userJobHelper.insertJob("user123");

      expect(result).toBe(false);
    });
  });

  describe("getJobs", () => {
    it("should gets user jobs successfully", async () => {
      const expectedJobs = [
        {
          id: "1",
          title: "user1",
          description: "description1",
          dueDate: new Date(),
          userId: "user123",
        },
        {
          id: "2",
          title: "user2",
          description: "description2",
          dueDate: new Date(),
          userId: "user123",
        },
      ];

      // Mock the Prisma jobs.findMany method to return expected jobs
      mockPrisma.job.findMany.mockResolvedValueOnce(expectedJobs);

      const jobs = await userJobHelper.getJobs("user123");

      expect(jobs).toEqual(expectedJobs);
      expect(mockPrisma.job.findMany).toHaveBeenCalledWith({
        where: {
          userId: "user123",
        },
      });
    });

    it("should handles get users failure gracefully", async () => {
      // Mock the Prisma user.findMany method to throw an error
      mockPrisma.job.findMany.mockRejectedValue(
        new Error("Get user jobs failed"),
      );

      const jobs = await userJobHelper.getJobs("user123");

      expect(jobs).toEqual([]);
    });
  });
});
