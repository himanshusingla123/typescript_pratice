import path from "node:path";
import {defineConfig} from 'prisma/config';

const day10Path = path.join(__dirname , 'Day 10');

export default defineConfig({
    schema: path.join(day10Path , 'prisma' , 'schema.prisma'),
    migrations: {
        path: path.join(day10Path , 'prisma' , 'migrations')
    },
})