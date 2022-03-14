import { Body, Controller, Delete, Get, HttpCode, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, MoreThan, Repository } from "typeorm";
import { CreateEventDto } from "./create-event.dto";
import { Event } from "./event.entity";
import { UpdateEventDto } from "./update-event.dto";

@Controller('/events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name);
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,
    ) { }


    @Get()
    async findAll() {
        return await this.repository.find();
    }

    @Get('/practice')
    async Practice() {
        return await this.repository.find({
            where: [{
                id: MoreThan(3),
            }, {
                description: Like('%meet%'),
            }],
            take: 2,
        });
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id) {
        // console.log(typeof id);
        const event = await this.repository.findOne(id);

        if (!event) {
            throw new NotFoundException();
        }
    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when),
        });
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdateEventDto) {
        const event = await this.repository.findOne(id);
        if (!event) {
            throw new NotFoundException();
        }
        return await this.repository.save(
            {
                ...event,
                ...input,
                when: input.when ? new Date(input.when) : event.when,
            }
        );

    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const event = await this.repository.findOne(id);
        if (!event) {
            throw new NotFoundException();
        }
        await this.repository.remove(event);
    }

}