import { z } from "zod";

export const SpacecraftTypeEnum = z.enum(["orbiter", "lander", "rover"]);
export const DestinationEnum = z.enum(["Mars", "Moon", "ISS", "Venus"]);
export const AstronautRankEnum = z.enum(["Commander", "Pilot", "Engineer", "Scientist"]);
export const ExperimentFieldEnum = z.enum(["Biology", "Physics", "Chemistry", "Astronomy"]);



export const SpacecraftInput = z.object({
  name: z.string(),
  type: SpacecraftTypeEnum,
  launchDate: z.date(),
  active: z.boolean(),
  crewCapacity: z.number().int().positive(),
});

export const MissionInput = z.object({
  name: z.string(),
  destination: DestinationEnum,
  startDate: z.date(),
  endDate: z.date().optional(),
  spacecraftId: z.string(),
  crewIds: z.array(z.string()),
});

export const AstronautInput = z.object({
  name: z.string(),
  rank: AstronautRankEnum,
  skills: z.array(z.string()),
});

export const ExperimentInput = z.object({
  name: z.string(),
  field: ExperimentFieldEnum,
  conductedOn: z.date(),
  missionId: z.string(),
  result: z.string().optional(),
});


export type SpacecraftData = z.infer<typeof SpacecraftInput>
export type MissionData = z.infer<typeof MissionInput>
export type AstronautData = z.infer<typeof AstronautInput>
export type ExperimentData = z.infer<typeof ExperimentInput>