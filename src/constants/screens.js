import { withGameHeader } from "../components/hoc/withGameHeader";
import { Final } from "../components/screens/Final";
import { Intro } from "../components/screens/Intro";
import { Level1 } from "../components/screens/levels/Level1";
import { Level2 } from "../components/screens/levels/Level2";
import { Level3 } from "../components/screens/levels/Level3";
import { Level3Finish } from '../components/screens/levels/Level3/Finish';
import { Level4 } from "../components/screens/levels/Level4";
import { Level5 } from "../components/screens/levels/Level5";

export const screens = [
    Intro, 
    withGameHeader(Level1, false, true), 
    withGameHeader(Level2, true), 
    withGameHeader(Level3, true), 
    withGameHeader(Level3Finish), 
    withGameHeader(Level4), 
    withGameHeader(Level5), 
    Final
];