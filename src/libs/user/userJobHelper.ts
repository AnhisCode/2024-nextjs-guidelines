import {Job, type PrismaClient} from "@prisma/client";

export class UserJobHelper {
    constructor(private prisma: PrismaClient) {}


    async insertJob(userId:string) {
        try {
            const userRes = await this.prisma.job.create({
                data: {
                    title: 'test',
                    description: 'test',
                    dueDate: new Date(),
                    userId: userId
                },
            })
            console.log(userRes)
            return true
        }
        catch (e){
            return false
        }
    }

    async getJobs(userId:string): Promise<Job[]>{
        try {
            return await this.prisma.job.findMany({
                where: {
                    userId
                }
            });
        }
        catch (e) {
            console.log("Error in getJobs procedure", e)
            return []
        }
    }
}
