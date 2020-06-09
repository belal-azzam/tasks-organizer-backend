import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProjectEntity} from "./entities/project.entity";
import {ProjectsRepository} from "./projects.repository";
import {DeleteResult, Not, UpdateResult} from "typeorm";
import {ProjectsCreateDto} from "./dto/projects.create.dto";

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: ProjectsRepository
    ){}

    async  findAll(): Promise<ProjectEntity[]> {
        return await this.projectRepository.find();
    }

    async findOne(id: string): Promise<ProjectEntity> {
        const result =  await this.projectRepository.findOne(id);
        return result;
    }

    async  create(project: ProjectsCreateDto): Promise<ProjectEntity> {
        const existProject = await this.projectRepository.findOne({
            where: {name: project.name}
        });
        if (existProject) {
            throw new HttpException('Project With Same Name Exists', HttpStatus.BAD_REQUEST);
        }
        return await this.projectRepository.save(project);
    }

    async update(id: string, project: ProjectsCreateDto): Promise<ProjectEntity> {
        const existProject = await this.projectRepository.findOne({
            where: {name: project.name, id: Not(id)}
        });
        if (existProject) {
            throw new HttpException('Project With Same Name Exists', HttpStatus.BAD_REQUEST);
        }
        await this.projectRepository.update(id, project);
        return await this.projectRepository.findOne(id);
    }

    async delete(id): Promise<UpdateResult> {
        const project = this.projectRepository.findOne(id);
        if(!project) {
            throw new NotFoundException();
        }
        return await this.projectRepository.softDelete(id);

    }
}
