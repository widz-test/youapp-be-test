import mongoose, { Model } from "mongoose";
import { Dateparser } from "src/common/utils/dateparser.utils";

export abstract class BaseRepository {
    protected driver: typeof mongoose;

    constructor() {
        this.driver = mongoose;
    }

    abstract modelName(): string;

    abstract modelSchema(): any;

    model(): Model<any> {
        return !this.driver.models[this.modelName()] ? 
            this.driver.model(this.modelName(), this.modelSchema(), this.modelName()) :
            this.driver.models[this.modelName()];
    }

    async all(condition: any = {}) {
        return await this.model().find(condition);
    }    

    async findOne(condition: any = {}, attribute: any = {}) {
        return await this.model().findOne(condition, attribute);
    }

    async findById(id: string) {
        return await this.model().findById(id);
    }

    async create(input: any = {}) {
        input.created_at = Dateparser.now();
		input.updated_at = Dateparser.now();
        return await this.model().create(input);
    }

    async update(condition: any = {}, input: any = {}) {
        input.updated_at = Dateparser.now();
        return await this.model().findOneAndUpdate(condition, input, { 
            new:true 
        });
    }

    async delete(condition: any = {}) {
        return await this.model().findOneAndDelete(condition);
    }

    async updateById(id: string, input: any = {}) {
        input.updated_at = Dateparser.now();
        return await this.model().findByIdAndUpdate(id, input, { 
            new:true 
        });
    }

    async deleteById(id: string) {
        return await this.model().findByIdAndDelete(id);
    }
}