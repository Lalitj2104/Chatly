import OpenAI from "openai";

const openai = new OpenAI({
    organization: Process.env.Organisation_AI_ID,
    project: Process.env.Project_AI_ID,
});