import { coursesData } from '../src/data/coursesData';
import * as fs from 'fs';
fs.writeFileSync('scratch/dumped.json', JSON.stringify(coursesData, null, 2));
