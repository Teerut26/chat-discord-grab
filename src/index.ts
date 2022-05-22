import HttpRequest from "./http_request";
import _ from "lodash";
import { promises } from "fs";
import path from "path";
import { Message } from "./interfaces/message";

class Grab {
    private httpRequest = new HttpRequest("channel id");
    private last_id: string = "";
    private more: boolean = true;
    private index: number = 0;

    private keyInterval: NodeJS.Timer;

    constructor() {
        this.saveData();
        this.keyInterval = setInterval(async () => {
            await this.saveDataMore();
        }, 1000);
    }

    async saveData() {
        let data = await this.httpRequest.getInit();
        this.last_id = _.last(data)?.id as string;
        await this.httpRequest.saveFile(data);
        this.index += 1;
        console.log(`index : ${this.index}`);
    }

    async saveDataMore() {
        let data = await this.httpRequest.getMore(this.last_id);
        console.log(
            `[${_.last(data)?.id}][${new Date(
                _.last(data)?.timestamp as string
            ).toLocaleString()}] => ${_.last(data)?.author.username}`
        );
        if (data.length < 100) {
            this.more = false;
        }
        if (this.more) {
            this.last_id = _.last(data)?.id as string;
            await this.httpRequest.saveFile(data);
            this.index += 1;
            console.log(`index : ${this.index}`);
        } else {
            console.log("end");
            clearInterval(this.keyInterval);
        }
        return;
    }
}

(async () => {
    const old_data_raw = await promises.readFile(
        path.join(__dirname, "data.json")
    );
    const old_data_json: Message[] = JSON.parse(old_data_raw.toString());
    let new_data = old_data_json.map((item) => ({
        id: item.id,
        username: item.author.username,
        content: item.content,
        attachments: item.content.length === 0 ? true : false
    }));
    await promises.writeFile(
        path.join(__dirname, "data_new.json"),
        JSON.stringify(new_data)
    );
})();

// let grab = new Grab();
