import {EntityRepository, Repository} from "typeorm";
import {ProjectEntity} from "./entities/project.entity";

@EntityRepository(ProjectsRepository)
export class ProjectsRepository extends Repository<ProjectEntity>{

}