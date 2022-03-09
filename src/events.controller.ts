import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";

@Controller('/events')
export class EventsController {

    @Get()
    findAll() {
        return [
            { id: 1, name: 'Event 1' },
            { id: 2, name: 'Event 2' },
        ]
    }

    @Get(':id')
    findOne(@Param('id') id) {
        return id;
    }

    @Post()
    create(@Body() input) {
        return input;
    }

    @Patch(':id')
    update(@Param('id') id, @Body() input) {

    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id) {
    }

}