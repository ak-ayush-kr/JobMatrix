import { User } from "../models/user";
import { cosineSimilarity } from "./cosineSimilarity";
import { generateEmbedding } from "./generateEmbedding";
import { getSkillsFromDescription } from "./getSkillFunction";
import { sendJobEmail } from "./sendEmail";

const matchedUser = ({jobembedding,users,threshold = 60}) => {
    const matchUser = [];
    users.forEach((user)=>{
        const userembedding = generateEmbedding(user?.profile?.skills);
        if(!userembedding) return;


        const similarity = cosineSimilarity(jobembedding,userembedding);
        if(similarity > 0.6){
            matchUser.push({user});
        }
    })
    return matchUser;
}


export const jobProcessing = async(job)=>{
    try {
        const skills = await getSkillsFromDescription(job.description);
        const jobembedding = await generateEmbedding(skills);

        const user = await User.find({
            role:"user",
        });

        const matchuser = matchedUser({jobembedding,user,threshold=60});

        for(const item of matchuser){
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