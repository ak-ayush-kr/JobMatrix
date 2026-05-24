import { User } from "../models/user.js";
import { cosineSimilarity } from "./cosineSimilarity.js";
import { generateEmbedding } from "./generateEmbedding.js";
import { getSkillsFromDescription } from "./getSkillFunction.js";
import { sendJobEmail } from "./sendEmail.js";

const matchedUser = async({jobembedding,users,threshold}) => {
    const matchUser = [];
    for(const user of users){
        const userembedding = await generateEmbedding(user?.profile?.skills);
        if(!userembedding?.length){
            continue;
        }

        const similarity = cosineSimilarity(jobembedding,userembedding);
        if(similarity > 0.6){
            matchUser.push({user});
        }
    }
    return matchUser;
}


export const jobProcessing = async(job)=>{
    try {
        const skills = await getSkillsFromDescription(job.description);
        console.log("skilling",skills);
        const jobembedding = await generateEmbedding(skills);

        const users = await User.find({
            role:"user",
        });
        const threshold = 0.6;
        console.log("usering ",users.length);
        const matchuser = await matchedUser({jobembedding,users,threshold});
        console.log("user is ",matchuser);

        for(const item of matchuser){
            console.log("emailing",item.user.email)
            await sendJobEmail({
                to:item.user.email,
                userName : item.user.name,
                jobTitle : job.title,
                company: "nalli company",
            });
        }
        console.log("get matching user");
    } catch (error) {
        console.log("error while job processing ",error);
    }
}