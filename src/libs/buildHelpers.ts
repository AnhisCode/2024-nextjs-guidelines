import {UserJobHelper} from "~/libs/user/userJobHelper";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const userJobHelper = new UserJobHelper(prisma);