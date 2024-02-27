import z from "zod";

const schema = z.object({
  title: z.string().min(3).max(50),
});

export type todosDtos = z.infer<typeof schema>;

