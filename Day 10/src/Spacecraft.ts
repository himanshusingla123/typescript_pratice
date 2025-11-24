import z from "zod";
import { prisma } from "../lib/db.js";
import { createTRPCRouter, publicProcedure } from "./trpc.js";
import {
  AstronautInput,
  AstronautRankEnum,
  DestinationEnum,
  ExperimentFieldEnum,
  ExperimentInput,
  MissionInput,
  SpacecraftInput,
} from "./Entities.js";
import { Prisma } from "@prisma/client";

// const cleanObject = <T extends object>(obj: T): Partial<T> => {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([_, v]) => v !== undefined)
//   ) as Partial<T>;
// };

export const spaceRouter = createTRPCRouter({
  getSpacecraft: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.spacecraft.findUnique({
      where: { id: input },
      include: { missions: true },
    });
  }),

  addSpacecraft: publicProcedure
    .input(SpacecraftInput)
    .mutation(({ input }) => {
      return prisma.spacecraft.create({ data: input });
    }),

  updateSpaceCraft: publicProcedure
    .input(z.object({ id: z.string() }).extend(SpacecraftInput.partial()))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      return prisma.spacecraft.update({
        where: { id },
        data: data as Prisma.SpacecraftUpdateInput,
      });
    }),

  deleteSpacecraft: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await prisma.spacecraft.delete({ where: { id: input } });
  }),

  listActiveSpacecraft: publicProcedure.query(() => {
    return prisma.spacecraft.findMany({ where: { active: true } });
  }),

  getMission: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.mission.findUnique({
      where: { id: input },
      include: {
        crew: { include: { skills: true } },
        experiments: true,
        spacecraft: true,
      },
    });
  }),

  addMission: publicProcedure
    .input(MissionInput)
    .mutation(async ({ input }) => {
      const { crewIds, spacecraftId, ...data } = input;
      return prisma.mission.create({
        data: {
          ...data,
          spacecraft: { connect: { id: spacecraftId } },
          crew: { connect: crewIds.map((id) => ({ id })) },
        } as Prisma.MissionCreateInput,
        include: { crew: true, spacecraft: true },
      });
  }),

  updateMission: publicProcedure
    .input(z.object({ id: z.string() }).extend(MissionInput.partial()))
    .mutation(async ({ input }) => {
      const { id, crewIds, ...data } = input as unknown as {
        id: string;
        crewIds?: string[];
        [k: string]: any;
      };
      return prisma.mission.update({
        where: { id },
        data: {
          ...data,
          ...(crewIds ? { crew: { set: crewIds.map((id) => ({ id })) } } : {}),
        },
        include: { crew: true },
      });
  }),

  delteMission: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await prisma.mission.delete({ where: { id: input } });
      return { success: true };
  }),

  listMissionByDestination: publicProcedure
    .input(DestinationEnum)
    .query(({ input }) => {
      return prisma.mission.findMany({ where: { destination: input } });
  }),

  listFutureMissions: publicProcedure.query(() => {
    return prisma.mission.findMany({
      where: { startDate: { gt: new Date() } },
    });
  }),

  getMissionSummary: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const mission = await prisma.mission.findUnique({
        where: { id: input },
        include: { crew: true, experiments: true, spacecraft: true },
      });
      if (!mission) throw new Error("Mission not found");
      return {
        spacecraftId: mission.spacecraftId,
        crewCount: mission.crew.length,
        experimentsCount: mission.experiments.length,
        active: mission.endDate ? mission.endDate > new Date() : true,
      };
  }),

  getMissionWithScientists: publicProcedure.query(() => {
    return prisma.mission.findMany({
      where: { crew: { some: { rank: "Scientist" } } },
      include: { crew: true },
    });
  }),

  getAstronaut: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.astronaut.findUnique({
      where: { id: input },
      include: { missions: true, skills: true },
    });
  }),

  addAstronaut: publicProcedure
    .input(AstronautInput)
    .mutation(async ({ input }) => {
      const { skills, ...data } = input;
      return prisma.astronaut.create({
        data: {
          ...data,
          skills: { create: skills.map((skill) => ({ skill })) },
        },
        include: { skills: true },
      });
  }),

  updateAstronaut: publicProcedure
    .input(z.object({ id: z.string() }).merge(AstronautInput.partial()))
    .mutation(async ({ input }) => {
      const { id, skills, ...data } = input;
      return prisma.astronaut.update({
        where: { id },
        data: {
          ...data,
          ...(skills
            ? {
                skills: {
                  deleteMany: {},
                  create: skills.map((skill) => ({ skill })),
                },
              }
            : {}),
        } as Prisma.AstronautUpdateInput,
        include: { skills: true },
      });
  }),

  deleteAstronaut: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await prisma.astronaut.delete({ where: { id: input } });
      return { success: true };
  }),

  listAstronautsByRank: publicProcedure
    .input(AstronautRankEnum)
    .query(({ input }) => {
      return prisma.astronaut.findMany({
        where: { rank: input },
        include: { skills: true },
      });
  }),

  getExperimentsByAstronaut: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const astronaut = await prisma.astronaut.findUnique({
        where: { id: input },
        include: { missions: { include: { experiments: true } } },
      });
      if (!astronaut) throw new Error("Astronaut not found");
      return astronaut.missions.flatMap((m) => m.experiments);
  }),

  getExperiment: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.experiment.findUnique({
      where: { id: input },
      include: { mission: true },
    });
  }),

  addExperiment: publicProcedure
    .input(ExperimentInput)
    .mutation(async ({ input }) => {
      const data = { ...input, result: input.result ?? null };
      return prisma.experiment.create({ data });
  }),

  // update left
  updateExperiment: publicProcedure
    .input(z.object({ id: z.string() }).extend(ExperimentInput.partial()))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.experiment.update({
        where: { id },
        data: data as Prisma.ExperimentUpdateInput,
      });
  }),

  deleteExperiment: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await prisma.experiment.delete({ where: { id: input } });
      return { success: true };
  }),

  listExperimentsByField: publicProcedure
    .input(ExperimentFieldEnum)
    .query(({ input }) => {
      return prisma.experiment.findMany({ where: { field: input } });
  }),

  getSpacecraftWithMissionsCount: publicProcedure
    .input(z.number().int().min(0))
    .query(async ({ input }) => {
      const spacecrafts = await prisma.spacecraft.findMany({
        include: { missions: true },
      });
      return spacecrafts.filter((sc) => sc.missions.length >= input);
  }),
});
