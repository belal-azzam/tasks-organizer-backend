import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {ProjectsService} from "./projects.service";
import {ProjectEntity} from "./entities/project.entity";
import {ProjectsCreateDto} from "./dto/projects.create.dto";
import {DeleteResult, UpdateResult} from "typeorm";


@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}
    @Get()
    index(): Promise<ProjectEntity[]> {
        return this.projectsService.findAll();
    }

    @Get(":id")
    async show(@Param("id") id): Promise<ProjectEntity> {
        const project = await this.projectsService.findOne(id);
        if(project === undefined) {
            throw new NotFoundException();
        }
        return project;
    }

    @Post()
    async create(@Body() projectCreateDto: ProjectsCreateDto): Promise<any> {
        return this.projectsService.create(projectCreateDto);
    }

    @Put(':id')
    async update(@Param("id") id,@Body() projectCreateDto: ProjectsCreateDto) : Promise<ProjectEntity> {
        const project = await this.projectsService.update(id, projectCreateDto);
        if(project === undefined) {
            throw new NotFoundException();
        }
        return project;
    }

    @Delete(':id')
    delete(@Param("id") id) : Promise<UpdateResult> {
         return this.projectsService.delete(id);
    }

}
