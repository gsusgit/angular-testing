import { Project } from '../../src/app/shared/data/models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'rule_the_world',
    name: 'Rule the world',
    description: 'Take over the world',
    startDate: new Date(2020, 0, 1),
    endDate: new Date(2024, 11, 31),
    budget: 5000,
    status: 'active',
    ownerId: 'world_admin',
  },
  {
    id: 'conquer_mars',
    name: 'Conquer Mars',
    description: 'Establish a civilization on Mars',
    startDate: new Date(2022, 0, 1),
    budget: 99000,
    status: 'planned',
    ownerId: 'world_admin',
  },
];
